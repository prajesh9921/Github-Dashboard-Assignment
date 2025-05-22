import './ErrorDisplay.scss';

interface ErrorDisplayProps {
  message: string;
  onRetry?: () => void;
}

const ErrorDisplay = ({ message, onRetry }: ErrorDisplayProps) => {
  return (
    <div className="error-display">
      <p className="error-display__title">Error</p>
      <p className="error-display__message">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="error-display__retry"
        >
          Try Again
        </button>
      )}
    </div>
  );
};

export default ErrorDisplay;

