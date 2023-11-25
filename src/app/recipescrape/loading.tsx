import React from 'react'

import styles from '@/app/loading.module.css'

export default function Loading() {
  return (
    <main>
      <main className={'WidthAdjustParent'}>
        <div className={styles.RecipeCardContainer + ' WidthAdjustContent'}>

          <div className={styles.RecipeCardTitleContainer}>
            <div className={styles.RecipeCardImage} />
            <div className={styles.RecipeCardTextContainer}>
              <div className={styles.RecipeCardText} />
              <div className={styles.RecipeCardText} />
              <div className={styles.RecipeCardText} />
            </div>
          </div>
          <div className={styles.RecipeCardNutrition}>
            <div className={styles.RecipeCardNutritionItem}>
              <div className={styles.RecipeCardText} />
              <div className={styles.RecipeCardText} />
            </div>
            <div className={styles.RecipeCardNutritionItem}>
              <div className={styles.RecipeCardText} />
              <div className={styles.RecipeCardText} />
            </div>
            <div className={styles.RecipeCardNutritionItem}>
              <div className={styles.RecipeCardText} />
              <div className={styles.RecipeCardText} />
            </div>
            <div className={styles.RecipeCardNutritionItem}>
              <div className={styles.RecipeCardText} />
              <div className={styles.RecipeCardText} />
            </div>
          </div>
          <div className={styles.RecipeCardDataContainer}>
            <div className={styles.RecipeCardDataItem} />
            <div className={styles.RecipeCardDataItem} />
          </div>

        </div>
      </main>
    </main>
    
  )
}