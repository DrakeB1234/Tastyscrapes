'use client'

import Image from 'next/image'
import styles from './recipeprint.module.css'
import { useState } from 'react'

import RecipeStyleOne from '../recipeview/styleone'

export default function RecipePrint(props: any) {

    const [activeLayout, setActiveLayout] = useState('column');

    const PrintPage = () => {
        window.print();
    }

  return (
    <div className={styles.MainContainer}>
        <div className={styles.ParentContainer}>

            <div className={styles.SelectorContainer + ' ' + styles.HidePrint}>
                <button
                onClick={() => props.togglePrint(false)}
                >
                    <Image
                    width={20}
                    height={20}
                    quality={100}
                    alt='x'
                    src='/graphics/icons/icon-exit-outline.svg'
                    /> 
                </button>
                <h1>Print Preview</h1>
            </div>

            <div className={styles.RowContainer}>
                <div className={styles.RecipeView}>
                    <RecipeStyleOne recipeData={props.recipeData} togglePrint={props.togglePrint} printView={true} RowLayout={activeLayout == 'row' ? true : false} />
                </div>
                <div className={styles.PrintOptions + ' ' + styles.HidePrint}>
                    <h1>Print Options</h1>

                    <div className={styles.LayoutButtonContainer}>
                        <button className={activeLayout == 'column' ? styles.LayoutButton + ' ' + styles.ActiveButton : styles.LayoutButton}
                        onClick={() => setActiveLayout('column')}
                        >
                            <h1>Column</h1>
                            <Image
                            width={25}
                            height={25}
                            quality={100}
                            alt='print'
                            src='/graphics/icons/icon-whiteprinter-outline.svg'
                            /> 
                        </button>
                        <button className={activeLayout == 'row' ? styles.LayoutButton + ' ' + styles.ActiveButton : styles.LayoutButton}
                        onClick={() => setActiveLayout('row')}
                        >
                            <h1>Row</h1>
                            <Image
                            width={25}
                            height={25}
                            quality={100}
                            alt='print'
                            src='/graphics/icons/icon-whiteprinter-outline.svg'
                            /> 
                        </button>
                    </div>
                    
                    <button className={styles.PrintButton}
                    onClick={PrintPage}
                    >
                        <h1>Print</h1>
                        <Image
                        width={25}
                        height={25}
                        quality={100}
                        alt='print'
                        src='/graphics/icons/icon-whiteprinter-outline.svg'
                        /> 
                    </button>
                </div>
            </div>

            <div className={styles.RowContainerMobile}>
                <div className={styles.RecipeViewParent}>
                    <div className={styles.RecipeView}>
                        <RecipeStyleOne recipeData={props.recipeData} togglePrint={props.togglePrint} printView={true} />
                    </div>
                </div>
                <div className={styles.PrintOptions + ' ' + styles.HidePrint}>
                    <h1>Print Options</h1>
                    
                    <div className={styles.LayoutButtonContainer}>
                        <button className={activeLayout == 'column' ? styles.LayoutButton + ' ' + styles.ActiveButton : styles.LayoutButton}
                        onClick={() => setActiveLayout('column')}
                        >
                            <h1>Column</h1>
                            <Image
                            width={25}
                            height={25}
                            quality={100}
                            alt='print'
                            src='/graphics/icons/icon-whiteprinter-outline.svg'
                            /> 
                        </button>
                        <button className={activeLayout == 'row' ? styles.LayoutButton + ' ' + styles.ActiveButton : styles.LayoutButton}
                        onClick={() => setActiveLayout('row')}
                        >
                            <h1>Row</h1>
                            <Image
                            width={25}
                            height={25}
                            quality={100}
                            alt='print'
                            src='/graphics/icons/icon-whiteprinter-outline.svg'
                            /> 
                        </button>
                    </div>

                    <button className={styles.PrintButton}
                    onClick={PrintPage}
                    >
                        <h1>Print</h1>
                        <Image
                        width={25}
                        height={25}
                        quality={100}
                        alt='print'
                        src='/graphics/icons/icon-whiteprinter-outline.svg'
                        /> 
                    </button>
                </div>
            </div>


        </div>
    </div>
  )
}