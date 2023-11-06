export function formatDate(date: Date): string {
  const yyyy = date.getFullYear();
  // JavaScript's getMonth() returns 0-11, so we add 1 to get 1-12
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}
