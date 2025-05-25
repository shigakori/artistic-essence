import "./globals.css";
import AppShell from "@/components/AppShell/AppShell";
import { PageTransitionProvider } from "@/components/PageTransition/PageTransition";

export const metadata = {
  title: "Artistic Essence",
  description: "The Art Of Painting",
  keywords: "art, painting, gallery, artist, portfolio",
  openGraph: {
    title: "Artistic Essence",
    description: "The Art Of Painting",
    type: "website",
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico?v=3" />
        <link rel="shortcut icon" href="/favicon.ico?v=3" />
        <link rel="apple-touch-icon" href="/favicon.ico?v=3" />
      </head>
      <body>
        <PageTransitionProvider>
          <AppShell>{children}</AppShell>
        </PageTransitionProvider>
      </body>
    </html>
  );
}
