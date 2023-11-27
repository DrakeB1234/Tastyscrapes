'use client'

import React, { Suspense, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { ExportRecipes, DeleteAllRecipes, ImportRecipes, AddRecipe} from '@/db/dbhelpers'
import styles from './recipebox.module.css'
import RecipeCards from '@/components/recipecards'
import DropDown from '@/components/dropdown'
import Popup from '@/components/popup'
import Prompt from '@/components/prompt'

export default function RecipeBox() {

  const [dropdown, setDropdown] = useState(false);
  const [popup, setPopup] = useState(false);
  const [popupInfo, setPopupInfo] = useState<any>({});
  const [prompt, setPrompt] = useState(false);
  const [addRecipePrompt, setAddRecipePrompt] = useState(false);

  const curTime = new Date(Date.now());

  async function AddBlankRecipeFunction (e: any) {
    e.preventDefault();
    const input = e.target[0].value;
    // Check if input has been provided
    if (!input) {
      setAddRecipePrompt(false);
      return;
    }
    const res = AddRecipe({recipeName: input});
    location.reload();
  }

  async function ExportRecipesFunction () {
    const res = await ExportRecipes();
    // Make new link element to be able to download blob file, IF res data is not null
    if (res.data == null) return;
    const exportDownload = document.createElement("a");
    exportDownload.href = URL.createObjectURL(res.data);
    exportDownload.setAttribute("download", `tastyscrapes-recipesexport--${curTime.getFullYear()}-${curTime.getMonth() + 1}-${curTime.getDate()}--${curTime.getHours()}-${curTime.getMinutes()}-${curTime.getSeconds()}.json`);
    document.body.appendChild(exportDownload);
    exportDownload.click();
    document.body.removeChild(exportDownload);
  }

  async function ImportRecipesFunction (e: any) {
    e.preventDefault();
    const res = await ImportRecipes(e.target[0].files[0])
    if (res.status == 'error') { throw new Error('There was an error processing your request. Please try again later'); }
    location.reload();
  }

  async function DeleteAllRecipesFunction() {
    const res: any = await DeleteAllRecipes();
    if (res.status == 'error') { throw new Error('There was an error processing your request. Please try again later'); }
    location.replace('/');
  }

  return (
    <main>
      <Popup open={popup} setOpen={setPopup} title={popupInfo.title} message={popupInfo.message} callback={popupInfo.callback} confimButtonText={popupInfo.confirmButtonText} />
      <Prompt open={prompt} setOpen={setPrompt} callback={ImportRecipesFunction}>
        <h2>Add Recipes File</h2>
        <input type='file' className='InputStyle' accept='application/json' />
      </Prompt>
      <Prompt open={addRecipePrompt} setOpen={setAddRecipePrompt} callback={AddBlankRecipeFunction}>
        <h2>Add Blank Recipe</h2>
        <input type='text' className='InputStyle' placeholder='Recipe Name' />
      </Prompt>
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
                onClick={() => setAddRecipePrompt(true)}
                >
                  <Image 
                  width={25}
                  height={25}
                  quality={100}
                  alt=''
                  src={'/graphics/icons/icon-plus-outline.svg'}
                  />
                  <h4>Add Blank Recipe</h4>
                </button>
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
                onClick={() => setPrompt(true)}
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
                  setPopupInfo({ title: 'Delete All Recipes?', message: 'This action can not be reversed', confirmButtonText: 'Delete All', callback: DeleteAllRecipesFunction });
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

          <RecipeCards cardLimit={1000} viewSearch={true}/>
      
        </div>
      </div>
    </main>
  )
}
