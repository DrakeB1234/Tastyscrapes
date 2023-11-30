'use client'

import React, {useState, useEffect} from 'react'

import styles from './popup.module.css'

type Props = {
  open: boolean,
  setOpen: any,
}

// Button that does the action is passed as a child to this component

export default function SupportedSites(props: Props) {

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
    <main className={styles.SupportParent}>
      <div className={styles.SupportContent} id='popup'>
        <div className={styles.PopupButtonContainer}>
          <button onClick={() => props.setOpen(false)}>Close</button>
        </div>
      </div>
    </main>
    }
    </>
  )
}
