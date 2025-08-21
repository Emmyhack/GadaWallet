import { CivicAuthProvider } from "@civic/auth/react";
import { WalletProvider } from './components/WalletProvider';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { ErrorBoundary } from './components/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <CivicAuthProvider 
        clientId={(import.meta as any).env?.VITE_CIVIC_AUTH_CLIENT_ID}
        displayMode="iframe"
        iframeMode="modal"
        onSignIn={(error) => {
          if (error) {
            console.error('Civic sign-in error:', error);
          } else {
            console.log('Civic sign-in successful');
          }
        }}
        onSignOut={() => {
          console.log('Civic sign-out');
        }}
      >
        <WalletProvider>
          <div className="min-h-screen">
            <Header />
            <main className="container mx-auto px-4 py-8">
              <Dashboard />
            </main>
          </div>
        </WalletProvider>
      </CivicAuthProvider>
    </ErrorBoundary>
  );
}

export default App;
