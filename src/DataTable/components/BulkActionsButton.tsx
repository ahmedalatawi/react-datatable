import { MenuIcon } from "../icons/Icons";

interface BulkActionsButtonProps {
  onClick: () => void;
  disabled?: boolean;
  useTailwind?: boolean;
}

export function BulkActionsButton({
  onClick,
  disabled = false,
  useTailwind = false,
}: BulkActionsButtonProps) {
  return (
    <button
      type="button"
      className={`bulk-actions-button ${
        useTailwind ? "use-tailwind" : "use-css"
      }`}
      onClick={onClick}
      disabled={disabled}
      aria-label="Bulk actions"
    >
      <MenuIcon size={20} />
    </button>
  );
}
