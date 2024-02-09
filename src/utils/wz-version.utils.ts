export function getWzVersion(): string {
  console.log(localStorage.getItem('wzVersion'));
  return localStorage.getItem('wzVersion') || "KMST 1168";
}
