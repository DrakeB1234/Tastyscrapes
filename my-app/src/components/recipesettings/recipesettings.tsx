'use client'

import Image from 'next/image'
import styles from './recipesettings.module.css'
import { useState } from 'react'

import MessagePopup from '../messagepopup/messagepop'
import { ClearTable } from '@/db/dbhelpers'

export default function RecipeSettings(props: any) {
    const [toggleDialog, setToggleDialog] = useState(false);
    const [message, setMessage] = useState('');
    const [currentCallback, setCurrentCallback] = useState('');

    const ClearAllRecipesConfirm = () => {
        setMessage('Are you sure you want to remove all recipes? This action cannot be reversed.');
        setCurrentCallback('ClearAll');
        setToggleDialog(true);
    }

    const ClearAllRecipes = async () => {
        const res = await ClearTable();
        setToggleDialog(false);
        location.reload();
    }

  return (
    <>
    {toggleDialog
    ? 
    <MessagePopup toggleMessage={setToggleDialog} messageType={'Dialog'} message={message} 
    callback={currentCallback == 'ClearAll' ? ClearAllRecipes : null}
    />
    : <></>}
    <main className={styles.MainContainer}>
        <div className={styles.ParentContainer}>

            <div className={styles.TitleContainer}>
                <h1>Settings</h1>
                <button
                onClick={() => props.toggle(false)}
                >
                    <Image
                    width={20}
                    height={20}
                    quality={100}
                    alt='x'
                    src='/graphics/icons/icon-exit-outline.svg'
                    /> 
                </button>
            </div>
            <div className={styles.SettingsContainer}>

                <div className={styles.Group}>
                    <button
                    className={styles.NormalButton}
                    >
                        Import Recipes
                    </button>
                    <button
                    className={styles.NormalButton}
                    >
                        Export Recipes
                    </button>
                </div>
                <button
                onClick={ClearAllRecipesConfirm}
                className={styles.DeleteButton}
                >
                    Clear All Recipes
                </button>

            </div>

        </div>
    </main>
    </>
  )
}