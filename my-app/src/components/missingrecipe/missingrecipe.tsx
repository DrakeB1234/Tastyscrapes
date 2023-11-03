'use client'

import Image from 'next/image'
import Link from 'next/link'
import styles from './missingrecipe.module.css'

export default function MissingRecipe(props: any) {

  return (
    <div className={styles.MainContainer}>
        <div className={styles.ParentContainer}>
            <div className={styles.SelectorContainer}>
                <Link href={'/'}
                className={styles.SelectButton}
                >
                    <Image
                    width={25}
                    height={25}
                    quality={100}
                    alt='<'
                    src='/graphics/icons/icon-whitearrow-outline.svg'
                    />
                </Link>
            </div>
            <div className={styles.TitleContainer}>
                <h1>Uh Oh!</h1>
            </div>
            <div className={styles.ImageContainer}>
                <Image 
                width={500}
                height={500}
                quality={100}
                alt='>'
                src={'/graphics/images/RecipeNotFound.png'}
                />
            </div>

        </div>
        <div className={styles.TextContainer}>
            {props.type == 'failURL'
            ?
            <>
                <h2>The provided URL had nothing to scrape!</h2>
                <h3>This can be caused to the URL not being supported by Tastyscrapes or a bug. Either try again or use a different link.</h3>
            </>
            : 
            props.type == 'failRecipe'
            ?
            <>
                <h2>No Recipe Found!</h2>
                <h3>The provided id was not found in the database. Please try another recipe and make sure to click on the links in the recipe box.</h3>
            </>
            :
            <>
                <h2>There has been an error!</h2>
                <h3>Please try again later.</h3>
            </>
            }
            <Link href={'/'}
            className={styles.SelectButton}
            >
                Go Home
            </Link>
        </div>
    </div>
  )
}