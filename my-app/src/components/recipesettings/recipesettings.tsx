'use client'

import Image from 'next/image'
import styles from './recipesettings.module.css'
import { useState } from 'react'

import MessagePopup from '../messagepopup/messagepop'
import { ClearTable, ExportDB, ImportDB } from '@/db/dbhelpers'

export default function RecipeSettings(props: any) {
    
    const [toggleDialog, setToggleDialog] = useState(false);
    const [message, setMessage] = useState('');
    const [currentCallback, setCurrentCallback] = useState('');
    const [toggleMessage, setToggleMessage] = useState(false);

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

    const ImportRecipeDB = async () => {
        var importinput = document.createElement('input');
        importinput.type = 'file';
        importinput.accept = '.json';
        importinput.onchange = (e: any) => { 
            CheckImportFile(e.target?.files[0]); 
        }

        importinput.click();
    }

    const CheckImportFile = async (file: File) => {
        // if file name includes correct strings
        if (file.name.includes('tastyscrapes-recipes') && file.type == 'application/json') {
            // call import function
            const res = await ImportDB(file)
            if (res.status == 'error') { 
                ErrorHandler(res.data); 
            }
            else {
                location.reload();
            }
        }
    }

    const ExportRecipeDB = async () => {
        let res: any = await ExportDB();

        if (res.status == 'error') {
            ErrorHandler(res);
            return;
        }
        // change each id to have 'i' in front for to solve importing issues
        res = await res.data.text();
        res = res.replaceAll(/(?<=id":).*?(?=\,)/g, (match: any) => {
            return `-${Math.floor(Math.random() * (90000 - 10000 + 1) + 10000)}`
        });
        res = new Blob([res], {
            type:'text/json'
        });
        // get current date
        const date = new Date();
        // open up window to download blob
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(res);
        link.download = `tastyscrapes-recipes--${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}--${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}.json`
        link.click();
    }

    const ErrorHandler = (error: any) => {
        console.error(error);
        setMessage(error.data?.message ? error.data?.message : error.message);
        setToggleMessage(true);
    }

  return (
    <>
    {toggleDialog
    ? 
    <MessagePopup toggleMessage={setToggleDialog} messageType={'Dialog'} message={message} 
    callback={currentCallback == 'ClearAll' ? ClearAllRecipes : null}
    />
    : <></>}
    {toggleMessage
    ? 
    <MessagePopup toggleMessage={setToggleMessage} messageType={'Error'} message={message} 
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
                    onClick={ImportRecipeDB}
                    className={styles.NormalButton}
                    >
                        Import Recipes
                    </button>
                    <button
                    onClick={ExportRecipeDB}
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