'use client'

import Image from 'next/image'
import styles from './recipesettings.module.css'

export default function RecipeSettings(props: any) {

  return (
    <main className={styles.MainContainer}>
        <div className={styles.ParentContainer}>
            <div className={styles.TitleContainer}>
                <h1>Recipe Box Settings</h1>
                <button
                onClick={() => props.toggle(false)}
                >
                    <Image
                    width={20}
                    height={20}
                    quality={100}
                    alt='x'
                    src='/graphics/icons/icon-exit-outline.svg'
                    /> 
                </button>
            </div>
        </div>
    </main>
  )
}