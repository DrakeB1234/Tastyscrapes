'use client'

import styles from './messagepop.module.css'

export default function MessagePopup(props: any) {

  return (
    <>
    {props.messageType == 'Error'
    ?
        <main className={styles.MainContainer}>
            <div className={styles.ParentContainer}>
                <h1>Error</h1>
                <h2>Oops, something went wrong. Please try again later.</h2>
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