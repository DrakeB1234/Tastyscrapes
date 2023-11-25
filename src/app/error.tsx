'use client'

import React from 'react'
import Link from 'next/link';
import Image from 'next/image';

import styles from '@/app/error.module.css'

export default function Error(error: any) {

  console.error(error.error);

  return (
    <div className={styles.ErrorParent}>
      <h1>Uh Oh!</h1>
      <Image 
      width={500}
      height={500}
      quality={100}
      alt='->'
      src={'/graphics/images/tastyscrapes-error.png'}
      />
      <h3>{error.error.message}</h3>
      <h3>Please try again later</h3>
      <Link href={'/'} className='ButtonParent'><h3>Go Back</h3></Link>
    </div>
  )
}
