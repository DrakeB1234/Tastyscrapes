'use client'

import Image from 'next/image'
import Link from 'next/link'
import styles from './styleone.module.css'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

import { AddRecipe } from '@/db/dbhelpers'

export default function RecipeStyleOne(props: any) {

    const pathName = usePathname();

    const [addLoadingState, setAddLoadingState] = useState(false);
    const [successAddState, setSuccessAddState] = useState(false);

    const RecipeAddItems = async () => {
        setAddLoadingState(true);
        const res = await AddRecipe(props.recipeData);
        // Check for errors
        if (res.status == 'success') {
            console.log(res)
            setSuccessAddState(true);
        }
        else {
            props.errorCallback(res)
        }
        setAddLoadingState(false);
    }

    const ShareData = async () => {
        try {
          await navigator.share({
            title: 'Tastyscrapes',
            text: 'Remove all the fluff off your favorite recipes!',
            url: pathName
          })
        } catch(error) {
            props.errorCallback(error)
        }
      }
    
  return (
    <div className={styles.MainContainer}>
        {!props.printView
         ?
        <div className={styles.SelectorContainer}>
            <Link href={'/'}
            className={styles.SelectButton}
            >
                <Image
                width={25}
                height={25}
                quality={100}
                alt='print'
                src='/graphics/icons/icon-arrow-outline.svg'
                />
            </Link>
            {addLoadingState
            ?
            <button
            className={styles.LoadButton}
            >
                <Image
                width={25}
                height={25}
                quality={100}
                alt='print'
                src='/graphics/icons/icon-loading.svg'
                /> 
            </button>
            :
            <>
            {!successAddState 
            ?
                <button
                onClick={() => RecipeAddItems()}
                className={styles.SaveButton}
                >
                    <h1>Save</h1>
                    <Image
                    width={25}
                    height={25}
                    quality={100}
                    alt='print'
                    src='/graphics/icons/icon-whiteplus-outline.svg'
                    /> 
                </button>
            : 
                <button
                disabled={true}
                className={styles.SelectButton}
                >
                    <Image
                    width={25}
                    height={25}
                    quality={100}
                    alt='print'
                    src='/graphics/icons/icon-checkmark-outline.svg'
                    /> 
                </button>
            }
            </>
            }

            <button
            onClick={() => props.togglePrint(true)}
            className={styles.SelectButton}
            >
                <Image
                width={25}
                height={25}
                quality={100}
                alt='print'
                src='/graphics/icons/icon-printer-outline.svg'
                /> 
            </button>
            <button 
            onClick={() => ShareData()} 
            className={styles.SelectButton}
            >
                <Image
                width={25}
                height={25}
                quality={100}
                alt='print'
                src='/graphics/icons/icon-share-outline.svg'
                />
            </button>

        </div>
        : 
        <></>
        }

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
                    <Link href={props.recipeData?.originURL ? props.recipeData.originURL : ''} target='_blank'>From: <span>{props.recipeData?.originHostname}</span></Link>
                </div>
            </div>

            <div className={styles.RecipeNutrition}>

                <div className={styles.RecipeNutritionItem}>
                    <h1>Prep Time</h1>
                    {props.recipeData.prepTime
                    ? <h2>{props.recipeData?.prepTime}</h2>
                    : <h2>-</h2>
                    } 
                </div>

                <div className={styles.RecipeNutritionItem}>
                    <h1>Cook Time</h1>
                    {props.recipeData.cookTime
                    ? <h2>{props.recipeData?.cookTime}</h2>
                    : <h2>-</h2>
                    }               
                </div>

                <div className={styles.RecipeNutritionItem}>
                    <h1>Total Time</h1>
                    {props.recipeData.totalTime
                    ? <h2>{props.recipeData?.totalTime}</h2>
                    : <h2>-</h2>
                    }
                </div>

                <div className={styles.RecipeNutritionItem}>
                    <h1>Servings</h1>
                    {props.recipeData.servings
                    ? <h2>{props.recipeData?.servings}</h2>
                    : <h2>-</h2>
                    }                
                </div>

            </div>

            {!props.RowLayout
            ?
            <>
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
            </>
            :
            <div className={styles.RowContainer}>
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
            }

        </div>
    </div>
  )
}