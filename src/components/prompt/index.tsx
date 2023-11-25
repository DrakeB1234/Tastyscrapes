'use client'

import React, { useEffect} from 'react'

import styles from './prompt.module.css'

type Props = {
  children: any,
  open: boolean,
  setOpen: any,
  callback: any,
}

// Button that does the action is passed as a child to this component

export default function Prompt(props: Props) {

  useEffect(() => {
    // Check if no listener is already made
    document.addEventListener('mousedown', CloseMenu);
    // Callback removes event listener once page switches
    return () => document.removeEventListener('mousedown', CloseMenu);
  }, []);

  function CloseMenu(event: any) {
    const target = event.target;
    // check if any parent element has id of dropdown, dropdown buttons and content will return true, anything else will be false
    if (!target.closest('#popup')) {
      props.setOpen(false);
    }
  }

  return (
    <>
    {!props.open
    ? ''
    : 
    <main className={styles.PopupParent}>
      <form onSubmit={props.callback} className={styles.PopupContent} id='popup' >
        {props.children}
        <div className={styles.PopupButtonContainer}>
          <button onClick={() => props.setOpen(false)}>Cancel</button>
          <button type='submit'>Save</button>
        </div>
      </form>
    </main>
    }
    </>
  )
}
