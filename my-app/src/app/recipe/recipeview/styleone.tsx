'use client'

import Image from 'next/image'
import Link from 'next/link'
import styles from './styleone.module.css'

export default async function RecipeStyleOne(props: any) {

  return (
    <div className={styles.ParentContainerStyleOne}>

        <div className={styles.SelectorContainer}>
            <Link href={'/'}>
                <Image
                width={25}
                height={25}
                quality={100}
                alt='print'
                src='/graphics/icons/icon-arrow-outline.svg'
                />
            </Link>
            <Image
            width={25}
            height={25}
            quality={100}
            alt='print'
            src='/graphics/icons/icon-printer-outline.svg'
            />
            <Image
            width={25}
            height={25}
            quality={100}
            alt='print'
            src='/graphics/icons/icon-share-outline.svg'
            />
            <Image
            width={25}
            height={25}
            quality={100}
            alt='print'
            src='/graphics/icons/icon-info-outline.svg'
            />
        </div>

        <div className={styles.RecipeDataParent}>

            <div className={styles.TitleContainer}>
            <Image 
            height={150} 
            width={150} 
            alt='' 
            src={props.recipeData?.recipeImg ? props.recipeData?.recipeImg : '/graphics/images/missing-image.png'}
            />
            <div className={styles.RecipeNameContainer}>
                <h1>{props.recipeData?.recipeName}</h1>
                <h2>Creator: {props.recipeData?.recipeCreator}</h2>
                <Link href={props.recipeData?.originURL ? props.recipeData.originURL : ''} target='_blank'>From: {props.recipeData?.originHostname}</Link>
                <h3>Edited by Clarified Recipes User</h3>
            </div>
            </div>

            <div className={styles.RecipeNutrition}>
            {props.recipeData?.prepTime
            ?
            <div className={styles.RecipeNutritionItem}>
                <h1>Prep Time</h1>
                <h2>{props.recipeData?.prepTime}</h2>
            </div>
            : <></>
            }

            {props.recipeData?.cookTime
            ?
            <div className={styles.RecipeNutritionItem}>
                <h1>Cook Time</h1>
                <h2>{props.recipeData?.cookTime}</h2>
            </div>
            : <></>
            }

            {props.recipeData?.totalTime
            ?
            <div className={styles.RecipeNutritionItem}>
                <h1>Total Time</h1>
                <h2>{props.recipeData?.totalTime}</h2>
            </div>
            : <></>
            }

            {props.recipeData?.servings
            ?
            <div className={styles.RecipeNutritionItem}>
                <h1>Servings</h1>
                <h2>{props.recipeData?.servings}</h2>
            </div>
            : <></>
            }
            </div>

            <div className={styles.IngredientsContainer}>
            <h1>Ingredients</h1>
            {props.recipeData?.ingredientData?.map((ele: any, idx: number) => <h2 key={`ingredient-${idx}`}>{ele}</h2>)}
            </div>

            <div className={styles.StepsContainer}>
            <h1>Steps</h1>
            {props.recipeData?.stepsData?.map((ele: any, idx: number) => (
                <div key={`step-${idx}`} className={styles.StepsItem}>
                <h1>{`${idx + 1}`}</h1>
                <h2>{`${ele}`}</h2>
                </div>
            ))}
            </div>

        </div>
    </div>
  )
}