import "./globals.css";

export const metadata = {
  title: "BCGmarketing",
  description: "Cafe menu BCG Matrix powered by static data"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

