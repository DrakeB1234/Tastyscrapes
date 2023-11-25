import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import './globals.css'

const montserrat = Montserrat({   
  weight: ['300', '400', '500', '700', '900'],
  subsets: ['latin'], 
})

export const metadata: Metadata = {
  title: 'Tasty Scrapes',
  description: 'Clear out the fluff in your favorite recipes!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        {children}
      </body>
    </html>
  )
}
