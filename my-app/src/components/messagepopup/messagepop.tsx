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
                <h2>{props.message ? props.message : 'Oops, something went wrong. Please try again later.'}</h2>
                <button
                onClick={() => props.toggleMessage(false)}
                >
                    Dismiss
                </button>
            </div>
        </main>
    :
    props.messageType == 'Dialog'
    ?
    <main className={styles.MainContainer}>
      <div className={styles.DialogParentContainer}>
          <h1>Confirm</h1>
          <h2>{props.message ? props.message : 'Are you sure you want to continue with this action?'}</h2>
          <div className={styles.ButtonContainer}>
            <button
            onClick={() => props.toggleMessage(false)}
            >
                Cancel
            </button>
            <button
            onClick={() => props.callback ? props.callback() : props.toggleMessage(false)}
            >
                Confirm
            </button>
          </div>
      </div>
    </main>
    :
    <></>
    }
    </>
  )
}