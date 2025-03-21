import './globals.css'
    import { Inter } from 'next/font/google'

    const inter = Inter({ subsets: ['latin'] })

    export const metadata = {
      title: 'AI Call Automation',
      description: 'Automate your phone calls with AI',
    }

    export default function RootLayout({ children }) {
      return (
        <html lang="en">
          <body className={inter.className}>{children}</body>
        </html>
      )
    }
