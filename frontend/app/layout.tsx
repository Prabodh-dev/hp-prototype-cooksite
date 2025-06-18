import type { Metadata } from 'next'
import './globals.css'
import { Toaster } from 'sonner'

export const metadata: Metadata = {
  title: 'Home Plate',
  description: 'Bring home far from home',
  icons: {
    icon: '/logo-2.png',
  },
  generator: 'v0.dev',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        {children}
        <Toaster 
          position="top-right"
          richColors
          closeButton
        />
      </body>
    </html>
  )
}
