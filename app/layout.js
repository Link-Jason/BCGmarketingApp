import './globals.css';

export const metadata = {
  title: 'BCG Marketing Dashboard',
  description:
    'A dynamic marketing dashboard built with React and the BCG Matrix framework.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

