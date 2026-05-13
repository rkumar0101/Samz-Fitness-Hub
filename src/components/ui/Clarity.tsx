"use client";

import { useEffect } from "react";
import clarity from "@microsoft/clarity";

/**
 * Microsoft Clarity initialiser.
 *
 * Mounts once at the root of the app (via app/layout.tsx) and starts
 * Clarity's session recording + heatmaps.
 *
 * Env var:
 *   NEXT_PUBLIC_CLARITY_PROJECT_ID — Clarity project id (visible in
 *   clarity.microsoft.com → Settings → Setup).
 *
 * Bonus: mirrors every event we push to window.dataLayer (our GA4
 * tracking surface) into Clarity's custom-event channel via
 * `clarity.event(name)`. This lets us filter recorded sessions in
 * Clarity by "show me sessions where wa_click happened" etc.
 */
export default function Clarity() {
  useEffect(() => {
    const projectId = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID;
    if (!projectId) {
      // Silently no-op when ID is missing — keeps local dev quiet.
      return;
    }

    try {
      clarity.init(projectId);
    } catch (err) {
      console.warn("[clarity] init failed", err);
      return;
    }

    /* -----------------------------------------------------
       Bridge: dataLayer.push → clarity.event
       Wrap dataLayer.push so each new event also fires a
       same-named custom event in Clarity (and the original
       push still reaches GTM untouched).
       ----------------------------------------------------- */
    type DataLayerEvent = { event?: string } & Record<string, unknown>;
    type DataLayerArg = DataLayerEvent | unknown;

    const w = window as Window & {
      dataLayer?: DataLayerArg[];
      __samzClarityBridged?: boolean;
    };

    if (w.__samzClarityBridged) return;
    w.__samzClarityBridged = true;

    w.dataLayer = w.dataLayer || [];
    const originalPush = w.dataLayer.push.bind(w.dataLayer);

    w.dataLayer.push = (...args: DataLayerArg[]) => {
      args.forEach((arg) => {
        if (arg && typeof arg === "object" && "event" in arg) {
          const eventName = (arg as DataLayerEvent).event;
          if (typeof eventName === "string" && eventName) {
            try {
              clarity.event(eventName);

              // Forward a couple of the most useful params as Clarity tags
              // so they're searchable in the Clarity dashboard.
              const obj = arg as DataLayerEvent;
              const tagPairs: Array<[string, unknown]> = [
                ["wa_source", obj.wa_source],
                ["wa_branch", obj.wa_branch],
                ["form_status", obj.form_status],
                ["plan_goal", obj.plan_goal],
              ];
              tagPairs.forEach(([k, v]) => {
                if (typeof v === "string" && v) {
                  try {
                    clarity.setTag(k, v);
                  } catch {
                    /* noop */
                  }
                }
              });
            } catch {
              /* noop */
            }
          }
        }
      });
      return originalPush(...args);
    };
  }, []);

  return null;
}
