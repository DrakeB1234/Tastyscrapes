'use client'

import React from 'react'
import Link from 'next/link';
import Image from 'next/image';

import styles from '@/app/error.module.css'

export default function NotFound() {

  return (
    <main>
      <div className='WidthAdjustParent'>
        <div className={styles.ErrorParent}>
          <h1>Uh Oh!</h1>
          <Image 
          width={500}
          height={500}
          quality={100}
          alt='->'
          src={'/graphics/images/tastyscrapes-error.png'}
          />
          <h4>{'Page Not Found!'}</h4>
          <Link href={'/'} className='ButtonParent'><h3>Go Back</h3></Link>
        </div>
      </div>
    </main>
  )
}
