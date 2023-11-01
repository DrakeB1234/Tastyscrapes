'use client'

import styles from './recipeparent.module.css'

import StyleOne from '../recipeview/styleone'

export default async function RecipeParent(props: any) {

  return (
    <main className={styles.MainContainer}>
        <div className={styles.RecipeView}>
            <StyleOne recipeData={props.recipeData} />
        </div>
        <div className={styles.PrintView}>
        </div>
    </main>
  )
}