'use client'

import Image from 'next/image'
import Link from 'next/link'
import styles from '@/styles/recipeboxview.module.css'
import { useEffect, useState } from 'react'

import Navbar from '@/components/navbar/navbar'
import MessagePopup from '@/components/messagepopup/messagepop'
import RecipeSettings from '@/components/recipesettings/recipesettings'
import { GetRecipes } from '@/db/dbhelpers'

type Inputs = {
  id: string | undefined,
  recipeName: string | undefined,
  prepTime: string | undefined,
  cookTime: string | undefined,
  totalTime: string | undefined,
  servings: string | undefined,
  ingredients: {ingredient: string}[],
  steps: {step: string}[],
  notes: {note: string}[] | undefined,
}

export default function RecipeBoxView() {

    const [recipeCardData, setRecipeCardData] = useState([]);
    const [message, setMessage] = useState('');
    const [toggleMessage, setToggleMessage] = useState(false);
    const [toggleRecipeSettings, setToggleRecipeSettings] = useState(false);

    const GetRecipeCardData = async () => {
        // Limit applied
        const res: any = await GetRecipes(1000);
        setRecipeCardData(res.data)
    };

    useEffect(() => {
        GetRecipeCardData();
    }, []);

    const ErrorHandler = (error: any) => {
        console.error(error);
        setMessage(error.data?.message);
        setToggleMessage(true);
    }

    return (
    <>
        <Navbar searchBar={false} mobileLogo={false} />
        {toggleMessage
        ? <MessagePopup toggleMessage={setToggleMessage} messageType={'Error'} message={message} />
        : <></>
        }
        {toggleRecipeSettings
        ? <RecipeSettings toggle={setToggleRecipeSettings} />
        : <></>
        }
        <main className={styles.MainContainer}>
            <div className={styles.RecipeContainer}>

                <div className={styles.ExitContainer}>
                    <Link href={'/'}>
                        <Image 
                        width={20}
                        height={20}
                        alt='>'
                        src={'/graphics/icons/icon-arrow-outline.svg'}
                        />
                    </Link>
                </div>
                <div className={styles.TitleContainer}>
                    <h1>Recipe Box</h1>
                    <button
                    onClick={() => setToggleRecipeSettings(true)}
                    >
                        <h1>Settings</h1>
                        <Image 
                        width={20}
                        height={20}
                        alt='>'
                        src={'/graphics/icons/icon-settings-outline.svg'}
                        />
                    </button>
                </div>
                <div className={styles.RecipeCardContainer}>

                    {recipeCardData.map((e: any, index: number) => (
                    <Link key={'recipe' + index} href={`/recipebox?name=${e.recipeName}&id=${e.id}`} className={styles.RecipeCard}>
                        <Image 
                        width={300}
                        height={150}
                        alt='>'
                        src={e.recipeImg ? e.recipeImg : '/graphics/images/missing-image.png'}
                        />        
                        <div className={styles.TextContainer}>
                            <h1>{e.recipeName}</h1>
                            <h2>{e.originHostname?.replace('www.', '')}</h2>
                        </div>
                    </Link>
                    ))}

                </div>

            </div>
        </main>
    </>
    )
    }