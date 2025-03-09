import { SearchIcon } from "../icons/Icons";
import "../styles/SearchBar.scss";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  theme?: string;
}

export function SearchBar({
  value,
  onChange,
  placeholder = "Search...",
  theme,
}: SearchBarProps) {
  return (
    <div className={`datatable-search ${theme || ""}`}>
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
