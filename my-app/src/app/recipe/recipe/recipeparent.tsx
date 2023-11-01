'use client'

import styles from './recipeparent.module.css'
import { useState } from 'react'

import RecipeStyleOne from '../recipeview/styleone'
import RecipePrint from '../recipeprint/recipeprint'

export default function RecipeParent(props: any) {

  const [togglePrint, setTogglePrint] = useState(false);

  return (
    <>
      {togglePrint
      ? <RecipePrint recipeData={props.recipeData} togglePrint={setTogglePrint} />
      :
      <main className={styles.MainContainer + ' ' + styles.HidePrint}>
        <div className={styles.RecipeView}>
            <RecipeStyleOne recipeData={props.recipeData} togglePrint={setTogglePrint} />
        </div>
      </main>
      }
    </>
  )
}