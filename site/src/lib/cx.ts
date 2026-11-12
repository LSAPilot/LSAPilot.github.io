/** Joins class names and skips falsy entries, so conditional classes need no template-string juggling. */
export function cx(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}
