import { cx } from "@/lib/cx";

type TagListProps = {
  items: string[];
  /** Accessible name of the list, e.g. "Technologies". */
  label?: string;
  className?: string;
};

/** Row of pill-shaped tags, used for project technologies and skill lists. */
export function TagList({ items, label, className }: TagListProps) {
  return (
    <ul aria-label={label} className={cx("flex flex-wrap gap-2", className)}>
      {items.map((item) => (
        <li key={item} className="rounded-full border border-line px-3.5 py-1.5 text-sm text-paper/75">
          {item}
        </li>
      ))}
    </ul>
  );
}
