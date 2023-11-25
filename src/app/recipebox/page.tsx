'use client'

import React, { Suspense, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { DeleteAllRecipes } from '@/db/dbhelpers'
import styles from './recipebox.module.css'
import RecipeCards from '@/components/recipecards'
import DropDown from '@/components/dropdown'
import Popup from '@/components/popup'

export default function RecipeBox() {

  const [dropdown, setDropdown] = useState(false);
  const [popup, setPopup] = useState(false);
  const [popupInfo, setPopupInfo] = useState<any>({});

  async function ExportRecipesFunction (){
    // const res = await ExportRecipes();
    // console.log(res.data)
  }

  async function DeleteAllRecipesFunction() {
    const res: any = await DeleteAllRecipes();
    if (res.status == 'error') { throw new Error('There was an error processing your request. Please try again later'); }
    location.replace('/');
  }

  return (
    <main>
      <Popup open={popup} setOpen={setPopup} title={popupInfo.title} message={popupInfo.message} callback={popupInfo.callback} confimButtonText={popupInfo.confirmButtonText} />
      <div className='WidthAdjustParent'>
        <div className='WidthAdjustContent'>
          <div className={styles.RecipeBoxTitleContainer}>
            <Link href={'/'} className='ButtonParent'>
              <Image 
              width={20}
              height={20}
              quality={100}
              alt='->'
              src={'/graphics/icons/icon-leftarrow-outline.svg'}
              />
            </Link>
            <h3>Recipes</h3>
            <Link href={''} className='ButtonParent' onClick={() => setDropdown(!dropdown)}>
              <Image 
              width={20}
              height={20}
              quality={100}
              alt='->'
              src={'/graphics/icons/icon-settings-outline.svg'}
              />
              <DropDown open={dropdown} setOpen={setDropdown}>
                <button
                onClick={() => ExportRecipesFunction()}
                >
                  <Image 
                  width={25}
                  height={25}
                  quality={100}
                  alt=''
                  src={'/graphics/icons/icon-download-outline.svg'}
                  />
                  <h4>Export Recipes</h4>
                </button>
                <button
                >
                  <Image 
                  width={25}
                  height={25}
                  quality={100}
                  alt=''
                  src={'/graphics/icons/icon-upload-outline.svg'}
                  />
                  <h4>Import Recipes</h4>
                </button>
                <button
                value={'red'}
                onClick={() =>{
                  setPopupInfo({ title: 'Delete All Reipes?', message: 'This action can not be reversed', confirmButtonText: 'Delete All', callback: DeleteAllRecipesFunction });
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
                  <h4>Delete All</h4>
                </button>
              </DropDown>
            </Link>
          </div>

          <RecipeCards cardLimit={1000} orderAlpha={true} viewSearch={true}/>
      
        </div>
      </div>
    </main>
  )
}
