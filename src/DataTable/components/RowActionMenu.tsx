import { useState, useRef, useEffect } from "react";
import { MoreVertical, ChevronRight } from "../icons/Icons";

export interface RowAction<T> {
  label: string;
  onClick: (item: T) => void;
  icon?: React.ReactNode;
}

interface RowActionMenuProps<T> {
  item: T;
  actions: RowAction<T>[];
  onNavigate?: (item: T) => void;
  useTailwind?: boolean;
}

export function RowActionMenu<T>({
  item,
  actions,
  onNavigate,
  useTailwind = false,
}: RowActionMenuProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      className={`row-action-menu ${useTailwind ? "use-tailwind" : "use-css"}`}
      ref={menuRef}
    >
      <div className="action-buttons">
        <button
          type="button"
          className="action-button menu-button"
          onClick={(e) => {
            e.stopPropagation();
            setIsOpen(!isOpen);
          }}
          aria-haspopup="menu"
          aria-expanded={isOpen}
          aria-label="More actions"
        >
          <MoreVertical size={16} />
        </button>

        {onNavigate && (
          <button
            type="button"
            className="action-button navigate-button"
            onClick={(e) => {
              e.stopPropagation();
              onNavigate(item);
            }}
            aria-label="View details"
          >
            <ChevronRight size={16} />
          </button>
        )}
      </div>

      {isOpen && actions.length > 0 && (
        <div className="action-menu" role="menu">
          {actions.map((action, index) => (
            <button
              key={index}
              type="button"
              className="action-menu-item"
              onClick={(e) => {
                e.stopPropagation();
                action.onClick(item);
                setIsOpen(false);
              }}
              role="menuitem"
            >
              {action.icon && <span className="action-icon">{action.icon}</span>}
              {action.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
