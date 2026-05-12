"use client";

import { BRAND, WHATSAPP_DEFAULT_MESSAGE } from "@/lib/constants";
import { waLink } from "@/lib/whatsapp";
import { motion } from "framer-motion";

export default function FloatingWhatsApp() {
  const href = waLink(BRAND.phoneE164, WHATSAPP_DEFAULT_MESSAGE);

  return (
    <motion.a
      href={href}
      target="_blank"
      className="fixed bottom-5 right-5 z-50 rounded-2xl bg-[color:var(--fh-blue)] px-4 py-3 text-sm font-bold text-white shadow-lg"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      rel="noreferrer"
    >
      WhatsApp • Free Trial
    </motion.a>
  );
}