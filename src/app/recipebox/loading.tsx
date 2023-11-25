import React from 'react'

import styles from '@/app/loading.module.css'

export default function Loading() {
  return (
    <main>
      <main className={'WidthAdjustParent'}>
        <div className={styles.RecipeCardsContainer + ' WidthAdjustContent'}>
          <div className={styles.RecipeCardsItem}>
            <div className={styles.RecipeCardsImage} />
            <div className={styles.RecipeCardsText} />
            <div className={styles.RecipeCardsText} />
          </div>
          <div className={styles.RecipeCardsItem}>
            <div className={styles.RecipeCardsImage} />
            <div className={styles.RecipeCardsText} />
            <div className={styles.RecipeCardsText} />
          </div>
          <div className={styles.RecipeCardsItem}>
            <div className={styles.RecipeCardsImage} />
            <div className={styles.RecipeCardsText} />
            <div className={styles.RecipeCardsText} />
          </div>
          <div className={styles.RecipeCardsItem}>
            <div className={styles.RecipeCardsImage} />
            <div className={styles.RecipeCardsText} />
            <div className={styles.RecipeCardsText} />
          </div>
          <div className={styles.RecipeCardsItem}>
            <div className={styles.RecipeCardsImage} />
            <div className={styles.RecipeCardsText} />
            <div className={styles.RecipeCardsText} />
          </div>
          <div className={styles.RecipeCardsItem}>
            <div className={styles.RecipeCardsImage} />
            <div className={styles.RecipeCardsText} />
            <div className={styles.RecipeCardsText} />
          </div>
          <div className={styles.RecipeCardsItem}>
            <div className={styles.RecipeCardsImage} />
            <div className={styles.RecipeCardsText} />
            <div className={styles.RecipeCardsText} />
          </div>
        </div>
      </main>
    </main>
    
  )
}
