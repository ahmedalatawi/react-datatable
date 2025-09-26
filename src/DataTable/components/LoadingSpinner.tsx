interface LoadingSpinnerProps {
  text?: string;
  useTailwind?: boolean;
}

export function LoadingSpinner({ text = "Loading...", useTailwind = false }: LoadingSpinnerProps) {
  return (
    <div className={`loading-spinner ${useTailwind ? 'use-tailwind' : 'use-css'}`} role="status" aria-live="polite">
      <div className="spinner" aria-hidden="true" />
      <span className="loading-text">{text}</span>
      <span className="sr-only">Loading content, please wait</span>
    </div>
  );
}
