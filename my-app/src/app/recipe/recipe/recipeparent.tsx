'use client'

import styles from './recipeparent.module.css'
import { useState } from 'react'

import RecipeStyleOne from '../recipeview/styleone'
import RecipePrint from '../recipeprint/recipeprint'
import MessagePopup from '@/components/messagepopup/messagepop'

export default function RecipeParent(props: any) {

  const [togglePrint, setTogglePrint] = useState(false);
  const [messageType, setMessageType] = useState('');
  const [toggleMessage, setToggleMessage] = useState(false);

  const ErrorHandler = (error: any) => {
    console.error(error);
    setMessageType('Error');
    setToggleMessage(true);
  }

  return (
    <>
      {toggleMessage
      ? <MessagePopup messageType={messageType} toggleMessage={setToggleMessage} />
      : <></>
      }
      {togglePrint
      ? <RecipePrint recipeData={props.recipeData} togglePrint={setTogglePrint} />
      :
      <main className={styles.MainContainer + ' ' + styles.HidePrint}>
        <div className={styles.RecipeView}>
            <RecipeStyleOne recipeData={props.recipeData} togglePrint={setTogglePrint} errorCallback={ErrorHandler} />
        </div>
      </main>
      }
    </>
  )
}