'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

import { AddRecipe, DeleteRecipe, AddCollection } from '@/db/dbhelpers'
import styles from './recipecard.module.css'
import DropDown from '../dropdown'
import Popup from '../popup'
import Prompt from '../prompt'

type Props = {
  returnURL: string,
  savedRecipe: boolean,
  data: any,
}

export default function RecipeCard(props: Props) {

  const router = useRouter();
  const [dropdown, setDropdown] = useState(false);
  const [popup, setPopup] = useState(false);
  const [popupInfo, setPopupInfo] = useState<any>({});
  const [prompt, setPrompt] = useState(false);

  async function AddRecipeFunction() {
    const res: any = await AddRecipe(props.data);
    if (res.status == 'error') { throw new Error('There was an error processing your request. Please try again later'); }
    router.replace('/');
  }

  async function DeleteRecipeFunction() {
    const res: any = await DeleteRecipe(props.data.id);
    if (res.status == 'error') { throw new Error('There was an error processing your request. Please try again later'); }
    router.replace('/recipebox');
  }

  async function AddCollectionFunction(e: any) {
    e.preventDefault();
    const res = await AddCollection(props.data.id, e.target[0].value);
    if (res.status == 'error') { throw new Error('There was an error processing your request. Please try again later'); }
    router.replace('/recipebox');
  }

  return (
    <main>
      <Popup open={popup} setOpen={setPopup} title={popupInfo.title} message={popupInfo.message} callback={popupInfo.callback} confimButtonText={popupInfo.confirmButtonText} />
      <Prompt open={prompt} setOpen={setPrompt} callback={AddCollectionFunction}>
        <h2>Add to Collection</h2>
        <input type='text' placeholder='Collection Name' className='InputStyle' defaultValue={props.data.collection != 'none' ? props.data.collection : ''} />
      </Prompt>
      <div className='WidthAdjustParent'>
        <div className={styles.RecipeParent + ' WidthAdjustContent'}>

          <div className={styles.RecipeButtonsParent}> 
            <Link href={props.returnURL} className='ButtonParent'>
              <Image 
              width={20}
              height={20}
              quality={100}
              alt='->'
              src={'/graphics/icons/icon-leftarrow-outline.svg'}
              />
            </Link>
            <button className='ButtonParent'
            onClick={() => window.print()}
            >
              <Image 
              width={20}
              height={20}
              quality={100}
              alt='->'
              src={'/graphics/icons/icon-printer-outline.svg'}
              />
            </button>
            {!props.savedRecipe
            ?
            <>
              <button className='ButtonParent'
              onClick={() => navigator.share({title: 'TastyScrapes', url:`tastyscrapes/recipescrape?url=${props.data.originURL}`})}
              >
                <Image 
                width={20}
                height={20}
                quality={100}
                alt='->'
                src={'/graphics/icons/icon-share-outline.svg'}
                />
              </button>
              <button className='ButtonParent'
              onClick={() => AddRecipeFunction()}
              >
                <h4>Save</h4>
                <Image 
                width={20}
                height={20}
                quality={100}
                alt='->'
                src={'/graphics/icons/icon-plus-outline.svg'}
                />
              </button>
            </>
            :
            <div className='ButtonParent'
            onClick={() => setDropdown(true)}
            >
              <Image 
              width={20}
              height={20}
              quality={100}
              alt='->'
              src={'/graphics/icons/icon-info-outline.svg'}
              />
              <DropDown open={dropdown} setOpen={setDropdown}>
                <Link
                href={`/recipebox/${props.data.id}/edit`}
                >
                  <Image 
                  width={25}
                  height={25}
                  quality={100}
                  alt=''
                  src={'/graphics/icons/icon-pencil-outline.svg'}
                  />
                  <h4>Edit</h4>
                </Link>
                <button
                onClick={() => setPrompt(!prompt)}
                >
                  <Image 
                  width={25}
                  height={25}
                  quality={100}
                  alt=''
                  src={'/graphics/icons/icon-collection-outline.svg'}
                  />
                  <h4>Add to Collection</h4>
                </button>
                <button
                value={'red'}
                onClick={() =>{
                  setPopupInfo({ title: 'Confirm Deletion?', message: 'This action can not be reversed', confirmButtonText: 'Delete', callback: DeleteRecipeFunction });
                  setPopup(true);
                }}
                >
                  <Image 
                  width={25}
                  height={25}
                  quality={100}
                  alt=''
                  src={'/graphics/icons/icon-trash-outline.svg'}
                  />
                  <h4>Delete</h4>
                </button>
              </DropDown>
            </div>
            }
          </div>

          <div className={styles.RecipeTitleContainer}>
            <Image 
            width={200}
            height={200}
            quality={100}
            alt=''
            src={props.data.recipeImg != '' ? props.data.recipeImg : '/graphics/images/Missing-Image.png'}
            />
            <div className={styles.RecipeTitleText}>
              <h2>{props.data.recipeName}</h2>
              <h3>Creator: {props.data.recipeCreator}</h3>
              <Link href={props.data.originURL ? props.data.originURL : '/'} target='_blank'>{props.data.originHostname}</Link>
            </div>
          </div>

          <div className={styles.RecipeNutritionContainer}>
            <div className={styles.RecipeNutritionItem}>
              <h4>Prep Time</h4>
              <h4>{props.data.prepTime ? props.data.prepTime : '-'}</h4>
            </div>
            <div className={styles.RecipeNutritionItem}>
              <h4>Cook Time</h4>
              <h4>{props.data.cookTime ? props.data.cookTime : '-'}</h4>
            </div>
            <div className={styles.RecipeNutritionItem}>
              <h4>Total Time</h4>
              <h4>{props.data.totalTime ? props.data.totalTime : '-'}</h4>
            </div>
            <div className={styles.RecipeNutritionItem}>
              <h4>Servings</h4>
              <h4>{props.data.servings ? props.data.servings : '-'}</h4>
            </div>
          </div>

          <div className={styles.RecipeDataParent}>
            <div>
              <h3>Ingredients</h3>
              {props.data.ingredientsData?.map((e: any, index:number) => (
                <h4 className={styles.RecipeIngredientItem} key={`ingredient-${index}`}>{e}</h4>
              ))}
            </div>
            <div>
              <h3>Steps</h3>
              {props.data.stepsData?.map((e: any, index:number) => (
                <div className={styles.RecipeStepItem} key={`step-${index}`}>
                  <h3>{index + 1}</h3>
                  <h4>{e}</h4>
                </div>
              ))}
            </div>
          </div>

          {props.data.notesData
          ?
          <div className={styles.RecipeNotesParent}>
              <h3>Notes</h3>
              <div>
                {props.data.notesData.split('\n').map((e: any, index: number) => (
                  <h4 key={`none-${index}`}>{e}</h4>
                ))}
              </div>
          </div>
          : ''
          }

        </div>
      </div>
    </main>
  )
}
