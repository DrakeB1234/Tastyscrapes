import React, { Suspense } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import styles from './home.module.css'
import RecipeCards from '@/components/recipecards'
import SearchBar from '@/components/searchbar'
import Loading from './recipebox/loading'

export default async function Home() {

  return (
    <main>
      <div className={styles.HeaderParent}>
        <div className={styles.HeaderContent}>
          <Image 
          width={480}
          height={80}
          quality={100}
          alt='Tastyscrapes'
          src={'/graphics/images/tastyscrapes-banner.png'}
          />
          <SearchBar refresh={false} />
        </div>
      </div>
      <main className='WidthAdjustParent'>
        <div className='WidthAdjustContent'>
          <div className={styles.RecipeBoxTitle}>
            <h2>Recipe Box</h2>
            <Link className='ButtonParent' href={'/recipebox'}>
            <h4>View All</h4>
            <Image 
            width={25}
            height={25}
            quality={100}
            alt='->'
            src={'/graphics/icons/icon-rightarrow-outline.svg'}
            />
            </Link>
          </div>

          <Suspense fallback='loading...' >
            <RecipeCards cardLimit={8} />
          </Suspense>
        </div>
      </main>
    </main>
  )
}
