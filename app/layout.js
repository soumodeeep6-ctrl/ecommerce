import "./globals.css";
import { ThemeProvider } from "./context/ThemeContext";
import { getSiteUrl } from "@/lib/site";


export const metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: "Shopper India | Everyday products, thoughtfully chosen",
    template: "%s | Shopper India",
  },
  description: "Shopper India is a modern online store for thoughtfully chosen products, easy discovery, and simple shopping.",
  keywords: ["Shopper India", "online shopping India", "Shopper online store", "ecommerce India"],
  authors: [{ name: "Soumodeep Sarkar" }],
  creator: "Soumodeep Sarkar",
  publisher: "Soumodeep Sarkar",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Shopper India | Everyday products, thoughtfully chosen",
    description: "Discover thoughtfully chosen products at Shopper India.",
    type: "website",
    siteName: "Shopper India",
    locale: "en_IN",
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@graph": [
                  { "@type": "WebSite", "name": "Shopper India", "url": getSiteUrl(), "description": "A modern online store for thoughtfully chosen products." },
                  { "@type": "Organization", "name": "Shopper India", "url": getSiteUrl(), "founder": { "@type": "Person", "name": "Soumodeep Sarkar" }, "address": { "@type": "PostalAddress", "addressCountry": "IN", "addressLocality": "Kolkata" } },
                ],
              }),
            }}
          />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
