import { SearchIcon } from "../icons/Icons";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  theme?: string;
  useTailwind?: boolean;
}

export function SearchBar({
  value,
  onChange,
  placeholder = "Search...",
  theme,
  useTailwind = false,
}: SearchBarProps) {
  return (
    <div className={`datatable-search ${useTailwind ? 'use-tailwind' : 'use-css'} ${theme || ""}`}>
      <div className="search-wrapper">
        <span className="search-icon" aria-hidden="true">
          <SearchIcon />
        </span>
        <input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="search-input"
          aria-label={placeholder}
        />
      </div>
    </div>
  );
}
