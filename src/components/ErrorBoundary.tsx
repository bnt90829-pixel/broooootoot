import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an unhandled error:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
    try {
      if (window.history && typeof window.history.replaceState === 'function') {
        window.history.replaceState(null, '', '#library');
      }
    } catch {}
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen w-full flex flex-col items-center justify-center p-6 bg-[#09090c] text-[#f5f2ed] font-serif text-center select-none" dir="rtl">
          <div className="max-w-md w-full p-8 rounded-lg border border-[#c5a059]/40 bg-[#121216] shadow-2xl">
            <div className="w-12 h-12 rounded-full border border-[#c5a059]/60 flex items-center justify-center mx-auto mb-4 text-[#c5a059] text-xl">
              ❦
            </div>
            <h2 className="font-amiri text-2xl font-bold text-[#f5f2ed] mb-2">
              حدث تنبيه بسيط أثناء القراءة
            </h2>
            <p className="text-xs text-[#9a9792] leading-relaxed mb-6 font-naskh">
              تم استعادة حالة التطبيق للحفاظ على استقرار التجربة القرائية دون فقدان المحتوى.
            </p>
            <button
              onClick={this.handleReset}
              className="px-6 py-2.5 rounded-full bg-[#c5a059] text-[#09090c] font-bold text-xs hover:bg-[#d6b068] transition-all cursor-pointer shadow-md"
            >
              العودة إلى فهرس المجلة
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
