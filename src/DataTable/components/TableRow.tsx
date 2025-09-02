import React from 'react';
import { Column } from '../types';
import { ChevronRight, ChevronDown } from '../icons/Icons';

interface TableRowProps<T> {
  item: T;
  columns: Column<T>[];
  selected?: boolean;
  expanded?: boolean;
  selectable?: boolean;
  expandable?: boolean;
  onSelect?: () => void;
  onExpand?: () => void;
  onClick?: () => void;
  onKeyPress?: (event: React.KeyboardEvent) => void;
  expandedContent?: React.ReactNode;
  theme?: string;
}

export function TableRow<T>({
  item,
  columns,
  selected,
  expanded,
  selectable,
  expandable,
  onSelect,
  onExpand,
  onClick,
  onKeyPress,
  expandedContent,
  theme,
}: TableRowProps<T>) {
  return (
    <>
      <div
        className={`virtual-row ${selected ? 'selected' : ''} ${theme || ''}`}
        onClick={onClick}
        onKeyPress={onKeyPress}
        role="row"
        tabIndex={0}
        aria-selected={selected}
      >
        <div className="row-main">
          {selectable && (
            <div className="checkbox-cell">
              <input
                type="checkbox"
                checked={selected}
                onChange={onSelect}
                onClick={(e) => e.stopPropagation()}
                aria-label="Select row"
              />
            </div>
          )}
          {expandable && (
            <div
              className="expand-cell"
              onClick={(e) => {
                e.stopPropagation();
                onExpand?.();
              }}
              role="button"
              tabIndex={0}
              aria-expanded={expanded}
              onKeyPress={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onExpand?.();
                }
              }}
            >
              {expanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            </div>
          )}
          {columns.map((column) => (
            <div
              key={String(column.key)}
              className={`virtual-cell ${column.align ? `text-${column.align}` : ''}`}
              style={{
                width: column.width || `${100 / columns.length}%`,
                minWidth: column.minWidth,
                maxWidth: column.maxWidth,
              }}
              role="cell"
            >
              <div className="cell-content">
                {column.render
                  ? column.render(item[column.key], item)
                  : String(item[column.key])}
              </div>
            </div>
          ))}
        </div>
        {expanded && expandedContent && (
          <div className="expanded-content" role="region" aria-label="Expanded content">
            {expandedContent}
          </div>
        )}
      </div>
    </>
  );
}