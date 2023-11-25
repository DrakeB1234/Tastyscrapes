import React from 'react'

import styles from './navbar.module.css'
import SearchBar from '../searchbar'
import Link from 'next/link'
import Image from 'next/image'

type Props = {
  refresh: boolean,
}

export default function Navbar(props: Props) {
  return (
    <main>
      <div className={styles.NavbarParent + ' WidthAdjustParent'}>
        <div className={styles.NavbarContent}>
          <Link href={'/'}>
            <Image 
            width={480}
            height={80}
            quality={100}
            alt='Tastyscrapes'
            src={'/graphics/images/tastyscrapes-banner.png'}
            />
          </Link>
          <SearchBar refresh={props.refresh}/>
        </div>
      </div>
    </main>
  )
}
