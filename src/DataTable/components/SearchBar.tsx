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
  theme = "",
  placeholder = "Search...",
}: SearchBarProps) {
  return (
    <div className={`datatable-search ${theme}`}>
      <div className="search-wrapper">
        <SearchIcon className="search-icon" size={18} />
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
