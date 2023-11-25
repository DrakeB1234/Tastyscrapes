import React from 'react'
import Image from 'next/image'

import styles from './loading.module.css'

export default function Loading() {
  return (
    <div className={styles.MainLoadingParent}>
      <Image 
      width={500}
      height={500}
      quality={100}
      alt='->'
      src={'/graphics/images/tastyscrapes.png'}
      />
      <h1>tastyscrapes</h1>
      <Image 
      width={80}
      height={80}
      quality={100}
      alt='->'
      src={'/graphics/images/loading.svg'}
      />
    </div>
  )
}
