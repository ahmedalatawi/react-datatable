import "../styles/LoadingSpinner.scss";

interface LoadingSpinnerProps {
  text?: string;
}

export function LoadingSpinner({ text = "Loading..." }: LoadingSpinnerProps) {
  return (
    <div className="loading-spinner" role="status" aria-live="polite">
      <div className="spinner" aria-hidden="true" />
      <span className="loading-text">{text}</span>
      <span className="sr-only">Loading content, please wait</span>
    </div>
  );
}
