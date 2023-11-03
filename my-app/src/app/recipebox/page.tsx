'use client'

import Image from 'next/image'
import styles from '@/styles/recipebox.module.css'
import rstyles from '../recipe/recipeview/styleone.module.css'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

import Navbar from '@/components/navbar/navbar'
import RecipePrint from '../recipe/recipeprint/recipeprint'
import MessagePopup from '@/components/messagepopup/messagepop'
import MissingRecipe from '@/components/missingrecipe/missingrecipe'
import { GetRecipesID } from '@/db/dbhelpers'

export default function RecipeBox({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {

  const pathName = usePathname();

  const [recipeData, setRecipeData] = useState<any>([]);
  const [messageType, setMessageType] = useState('');
  const [message, setMessage] = useState('');
  const [toggleMessage, setToggleMessage] = useState(false);
  const [togglePrint, setTogglePrint] = useState(false);
  const [toggleDropdown, setToggleDropdown] = useState(false);

  const GetRecipeCardData = async () => {
    // if no recipe id is present, set id to -1 
    const res: any = await GetRecipesID(Number(searchParams?.id));

    // Check for error
    if (res.status == 'error') { ErrorHandler(res) }
    else { setRecipeData(res.data) }
  }
  const ShareData = async () => {
    try {
      await navigator.share({
        title: 'Tastyscrapes',
        text: 'Remove all the fluff off your favorite recipes!',
        url: pathName
      })
    } catch(error) {
      ErrorHandler(error);
    }
  }

  const ErrorHandler = (error: any) => {
    console.error(error);
    setMessageType('Error');
    setMessage(error.data?.message);
    setToggleMessage(true);
  }

  useEffect(() => {
    GetRecipeCardData();
  }, [])

  return (
    <>
      <Navbar searchBar={false} mobileLogo={false} />
      {toggleMessage
      ? <MessagePopup toggleMessage={setToggleMessage} messageType={messageType} message={message} />
      : <></>
      }
      {togglePrint
      ? <RecipePrint recipeData={recipeData} togglePrint={setTogglePrint} />
      :
      <main className={styles.MainContainer}>
        {recipeData == undefined
        ? 
        <div className={styles.RecipeMissingView}>
          <MissingRecipe type={'failRecipe'}/>
        </div>
        :
        <div className={styles.RecipeView}>
          <div className={rstyles.MainContainer}>
              <div className={rstyles.SelectorContainer}>
                  <Link href={'/'}
                  className={rstyles.SelectButton}
                  >
                      <Image
                      width={25}
                      height={25}
                      quality={100}
                      alt='print'
                      src='/graphics/icons/icon-arrow-outline.svg'
                      />
                  </Link>

                  <button
                  onClick={() => setTogglePrint(true)}
                  className={rstyles.SelectButton}
                  >
                      <Image
                      width={25}
                      height={25}
                      quality={100}
                      alt='print'
                      src='/graphics/icons/icon-printer-outline.svg'
                      /> 
                  </button>
                  <button className={rstyles.SelectButton}
                  onClick={() => ShareData()}
                  >
                      <Image
                      width={25}
                      height={25}
                      quality={100}
                      alt='print'
                      src='/graphics/icons/icon-share-outline.svg'
                      />
                  </button>
                  <div 
                  onClick={() => setToggleDropdown(true)}
                  className={rstyles.SelectButton}>
                      <Image
                      width={25}
                      height={25}
                      quality={100}
                      alt='print'
                      src='/graphics/icons/icon-info-outline.svg'
                      />
                      {toggleDropdown
                      ?
                      <div className={styles.DropDownMenu}>
                        <button>
                          <Image
                          width={20}
                          height={20}
                          quality={100}
                          alt='print'
                          src='/graphics/icons/icon-pencil-outline.svg'
                          />
                          Edit
                        </button>
                        <button>
                          <Image
                          width={20}
                          height={20}
                          quality={100}
                          alt='print'
                          src='/graphics/icons/icon-trash-outline.svg'
                          />
                          Delete
                        </button>
                        <button
                        onClick={() => setToggleDropdown(false)}
                        >
                          <Image
                          width={20}
                          height={20}
                          quality={100}
                          alt='print'
                          src='/graphics/icons/icon-exit-outline.svg'
                          />
                          Close
                        </button>                      
                      </div>
                      :
                      <></>
                      }
                  </div>
              </div>
              <div className={rstyles.RecipeDataParent}>
                  <div className={rstyles.TitleContainer}>
                  <Image 
                  height={150} 
                  width={150} 
                  alt='' 
                  src={recipeData?.recipeImg ? recipeData?.recipeImg : '/graphics/images/missing-image.png'}
                  />
                  <div className={rstyles.RecipeNameContainer}>
                      <h1>{recipeData?.recipeName}</h1>
                      <h2>Creator: {recipeData?.recipeCreator}</h2>
                      <Link href={recipeData?.originURL ? recipeData.originURL : ''} target='_blank'>From: <span>{recipeData?.originHostname}</span></Link>
                  </div>
                  </div>

                  <div className={rstyles.RecipeNutrition}>

                      <div className={rstyles.RecipeNutritionItem}>
                          <h1>Prep Time</h1>
                          {recipeData.prepTime
                          ? <h2>{recipeData?.prepTime}</h2>
                          : <h2>-</h2>
                          } 
                      </div>

                      <div className={rstyles.RecipeNutritionItem}>
                          <h1>Cook Time</h1>
                          {recipeData.cookTime
                          ? <h2>{recipeData?.cookTime}</h2>
                          : <h2>-</h2>
                          }               
                      </div>

                      <div className={rstyles.RecipeNutritionItem}>
                          <h1>Total Time</h1>
                          {recipeData.totalTime
                          ? <h2>{recipeData?.totalTime}</h2>
                          : <h2>-</h2>
                          }
                      </div>

                      <div className={rstyles.RecipeNutritionItem}>
                          <h1>Servings</h1>
                          {recipeData.servings
                          ? <h2>{recipeData?.servings}</h2>
                          : <h2>-</h2>
                          }                
                      </div>

                  </div>

                  <div className={rstyles.IngredientsContainer}>
                    <h1>Ingredients</h1>
                    {recipeData?.ingredientData?.map((ele: any, idx: number) => <h2 key={`ingredient-${idx}`}>{ele}</h2>)}
                  </div>

                    <div className={rstyles.StepsContainer}>
                      <h1>Steps</h1>
                      {recipeData?.stepsData?.map((ele: any, idx: number) => (
                          <div key={`step-${idx}`} className={rstyles.StepsItem}>
                          <h1>{`${idx + 1}`}</h1>
                          <h2>{`${ele}`}</h2>
                          </div>
                      ))}
                    </div>
              </div>
          </div>
        </div>
        }
      </main>
      }
    </>
  )
}