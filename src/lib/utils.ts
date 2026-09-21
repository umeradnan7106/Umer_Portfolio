/** Join conditional class names. Kept dependency-free on purpose. */
export function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}
