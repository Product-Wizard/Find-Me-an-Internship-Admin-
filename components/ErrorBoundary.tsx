import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

// Extracted UI into a Functional Component
const ErrorFallback: React.FC<{ error: Error | null; onRetry: () => void }> = ({ error, onRetry }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4 font-sans text-slate-800">
      <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full border border-red-100">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Something went wrong</h1>
        <p className="text-slate-600 mb-6 text-sm">
          The application encountered an unexpected error.
        </p>
        <div className="bg-slate-100 p-4 rounded-lg text-xs font-mono text-slate-700 overflow-auto max-h-40 mb-6">
          {error?.message || "Unknown Error"}
        </div>
        <button 
          onClick={onRetry} 
          className="w-full bg-slate-900 text-white font-bold py-3 rounded-xl hover:bg-slate-800 transition-colors"
        >
          Reload Application
        </button>
      </div>
    </div>
  );
};

// React requires Error Boundaries to be Class Components to use componentDidCatch
export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  handleRetry = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return <ErrorFallback error={this.state.error} onRetry={this.handleRetry} />;
    }

    return this.props.children;
  }
}