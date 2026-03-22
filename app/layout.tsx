import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'VR Papers (Mock)',
  description: 'Daily VR paper digest – frontend mock',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body className="min-h-screen bg-bg text-ink">
        <div className="mx-auto max-w-md min-h-screen safe-pad">
          {children}
        </div>
      </body>
    </html>
  );
}
