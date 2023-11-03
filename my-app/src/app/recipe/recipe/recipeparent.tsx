'use client'

import styles from './recipeparent.module.css'
import { useState } from 'react'

import RecipeStyleOne from '../recipeview/styleone'
import RecipePrint from '../recipeprint/recipeprint'
import MessagePopup from '@/components/messagepopup/messagepop'
import MissingRecipe from '@/components/missingrecipe/missingrecipe'

export default function RecipeParent(props: any) {

  const [messageType, setMessageType] = useState('');
  const [message, setMessage] = useState('');
  const [toggleMessage, setToggleMessage] = useState(false);
  const [togglePrint, setTogglePrint] = useState(false);

  const ErrorHandler = (error: any) => {
    console.error(error);
    setMessageType('Error');
    setMessage(error.data?.message);
    setToggleMessage(true);
  };

  return (
    <>
      {toggleMessage
      ? <MessagePopup toggleMessage={setToggleMessage} messageType={messageType} message={message} />
      : <></>
      }
      {togglePrint
      ? <RecipePrint recipeData={props.recipeData} togglePrint={setTogglePrint} />
      :
      <main className={styles.MainContainer + ' ' + styles.HidePrint}>
        {/* Check if data is present */}
        {props.recipeData.recipeName == null || props.recipeData?.ingredientData.length == 0
        ? 
        <div className={styles.RecipeMissingView}>
          <MissingRecipe type={'failURL'} />
        </div>
        : 
        <div className={styles.RecipeView}>
          <RecipeStyleOne recipeData={props.recipeData} togglePrint={setTogglePrint} errorCallback={ErrorHandler} />
        </div>
        } 

      </main>
      }
    </>
  )
}