import type { Metadata } from 'next'

import Navbar from '@/components/navbar'

export const metadata: Metadata = {
  title: 'Tasty Scrapes',
  description: 'Clear out the fluff in your favorite recipes!',
}

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Navbar refresh={true}/>
      {children}
    </>
  )
}
