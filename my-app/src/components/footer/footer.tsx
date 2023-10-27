'use client'

import Image from 'next/image'
import Link from 'next/link'
import styles from './footer.module.css'

export default function Footer(){

  return (
    <div className={styles.MainContainer}>
        <div className={styles.ParentContainer}>
            <h1>Clarified Recipes</h1>
        </div>
    </div>
  )
}