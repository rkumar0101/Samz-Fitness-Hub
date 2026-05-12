export function waLink(phoneE164: string, message: string) {
  const text = encodeURIComponent(message);
  const phone = phoneE164.replace(/[^\d]/g, "");
  return `https://wa.me/${phone}?text=${text}`;
}