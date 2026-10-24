import { Component, type ReactNode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles.css';

class AppBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() {
    return this.state.failed ? <main className="app-shell card"><h1>Let’s try that again.</h1><p>The app couldn’t finish loading this check.</p><button onClick={() => window.location.reload()}>Reload app</button></main> : this.props.children;
  }
}

createRoot(document.getElementById('root')!).render(<AppBoundary><App /></AppBoundary>);
