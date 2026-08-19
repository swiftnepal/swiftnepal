
import './globals.css';

export const metadata = {
  title: 'Swift Nepal Courier — Fast, Reliable & Global Delivery Solutions',
  description:
    'Swift Nepal Courier — fast, reliable and global courier & freight delivery solutions. Track your package and get instant shipping quotes.',
    icons: {
    icon: "/assets/stamp1.png",
  },
  };

export const viewport = {
  width: 'device-width',
  initialScale: 1
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
