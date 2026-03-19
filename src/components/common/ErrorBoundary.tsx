import { Component, type ReactNode, type ErrorInfo } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('ErrorBoundary caught:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-brand-beige px-4">
          <div className="text-center">
            <h1 className="text-3xl font-serif text-brand-navy mb-4">A apărut o eroare</h1>
            <p className="text-gray-600 mb-8">Ne cerem scuze pentru inconvenient.</p>
            <button
              onClick={() => window.location.reload()}
              className="inline-flex items-center justify-center px-6 py-3 bg-brand-gold hover:bg-brand-gold-hover text-white font-medium rounded-lg transition-colors"
            >
              Reîncarcă pagina
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
