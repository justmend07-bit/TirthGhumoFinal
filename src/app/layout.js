import { Geist, Geist_Mono } from "next/font/google";
import { Inter, Playfair_Display } from 'next/font/google'
import { Roboto_Slab, Rubik } from 'next/font/google'
// import { ClerkProvider, UserButton } from '@clerk/nextjs';
import './globals.css'



import FloatingWhatsApp from "@/component/FloatingWhatsapp";
import Footer from "@/component/footer";

const rubik = Rubik({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-rubik',
  display: 'swap',
})

const robotoSlab = Roboto_Slab({
  subsets: ['latin'],
  variable: '--font-roboto-slab',
  weight: ['300', '400', '500', '700'],
})

export const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
})

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Tirth Ghumo",
  description: "A travel website",
};

export default function RootLayout({ children, auth }) {
  return (
    //<ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
      
    <html lang="en" className="">
      <body
        className={ `bg-white text-gray-900 min-h-screen flex flex-col ${rubik.variable} ` }
      >
        <main className="grow">
          {children}
          {auth}
        </main>
        <FloatingWhatsApp />
        {/* <Footer /> */}
      </body>
    </html>

    //</ ClerkProvider>
    
  );
}
