import "./globals.css";

export const metadata = {
  title: "E-Page | Unfold Your Next Great Story",
  description: "A digital literary haven to discover, read, and share original ebooks.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900 antialiased">
        {children}
      </body>
    </html>
  );
}