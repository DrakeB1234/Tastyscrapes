'use client'

import React, { useRef } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

import styles from './searchbar.module.css'

type Props = {
  refresh: boolean,
}

export default function SearchBar(props: Props) {

  const router = useRouter();
  const input = useRef();

  function SearchFunction(e: any) {
    e.preventDefault();
    if (input.current) {
      router.push(`/recipescrape?url=${input.current}`);
    }
    // check if props says to refresh page
    if (props.refresh) location.reload();
  }

  return (
    <form className={styles.SearchBarParent} onSubmit={SearchFunction}>
      <input type='text' placeholder='Paste a URL to Scrape' onChange={(e: any) => input.current = e.target.value} />
      <button type='submit'>
        <Image
        width={25}
        height={25}
        quality={100}
        alt='->'
        src={'/graphics/icons/icon-search-outline.svg'}
        />
      </button>
    </form>
  )
}
