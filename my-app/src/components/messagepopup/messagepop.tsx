'use client'

import styles from './messagepop.module.css'

export default function MessagePopup(props: any) {

  console.log(props)

  return (
    <>
    {props.messageType == 'Error'
    ?
        <main className={styles.MainContainer}>
            <div className={styles.ParentContainer}>
                <h1>Error</h1>
                <h2>{props.message ? props.message : 'Oops, something went wrong. Please try again later.'}</h2>
                <button
                onClick={() => props.toggleMessage(false)}
                >
                    Dismiss
                </button>
            </div>
        </main>
    :
    <></>
    }
    </>
  )
}