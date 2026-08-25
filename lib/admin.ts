import "server-only";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL ?? "";

export function isAdminEmail(email: string | null | undefined) {
  return Boolean(ADMIN_EMAIL) && email === ADMIN_EMAIL;
}
