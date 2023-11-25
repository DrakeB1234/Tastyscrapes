'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

import { GetCollections } from '@/db/dbhelpers'
import styles from './recipecollections.module.css'

type Props = {
}

export default function RecipeCollections(props: Props) {

  const [data, setData] = useState<any>();

  useEffect(() =>{
    async function GetData() {
      let res: any = await GetCollections();
      if (res.status == 'error') { throw new Error(res.data)}
      setData(res.data);
    }
    // Call function in use effect hook
    GetData();
  }, [])

  return (
    <>
    <div className={styles.CardContainer}>
      {data && data?.map((e: any, index: number) => (
        <Link href={`/collection?key=${e.collectionName}`} key={`recipe-${index}`} className={styles.CardParent}>
          <div className={styles.CardImageContainer}>
            <Image 
            width={300}
            height={300}
            quality={100}
            alt=''
            src={'/graphics/images/Collection-Image.png'}
            />
            <h2>{e.count}</h2>
          </div>

          <div className={styles.CardText}>
            <h3>{e.collectionName != 'none' ? e.collectionName : 'Unorganized'}</h3>
          </div>
        </Link>
      ))}
    </div>
    </>
  )
}
