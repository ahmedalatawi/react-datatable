interface StatusIndicatorProps {
  status: string;
  color?: string;
  useTailwind?: boolean;
}

export function StatusIndicator({
  status,
  color,
  useTailwind = false,
}: StatusIndicatorProps) {
  const getStatusColor = (status: string): string => {
    if (color) return color;

    const statusLower = status.toLowerCase();
    if (statusLower.includes("paid") || statusLower.includes("success")) {
      return "#10b981";
    }
    if (
      statusLower.includes("not paid") ||
      statusLower.includes("overdue") ||
      statusLower.includes("error")
    ) {
      return "#ef4444";
    }
    if (statusLower.includes("pending") || statusLower.includes("warning")) {
      return "#f59e0b";
    }
    return "#6b7280";
  };

  const statusColor = getStatusColor(status);

  return (
    <div
      className={`status-indicator ${useTailwind ? "use-tailwind" : "use-css"}`}
    >
      <span
        className="status-dot"
        style={{ backgroundColor: statusColor }}
        aria-hidden="true"
      />
      <span className="status-text">{status}</span>
    </div>
  );
}
