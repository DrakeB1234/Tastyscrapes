import type { Metadata } from 'next'

import Navbar from '@/components/navbar'

export const metadata: Metadata = {
  title: 'Tasty Scrapes | Recipe Box',
  description: 'Clear out the fluff in your favorite recipes!',
}

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Navbar refresh={false}/>
      {children}
    </>
  )
}
