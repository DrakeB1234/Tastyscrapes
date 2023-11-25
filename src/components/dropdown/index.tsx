'use client'

import React, { useEffect } from 'react'

import styles from './dropdown.module.css'

type Props = {
  children: any,
  open: any,
  setOpen: any,
}

export default function DropDown(props: Props) {

  useEffect(() => {
    document.addEventListener('mousedown', CloseMenu);
    // Callback removes event listener once page switches
    return () => document.removeEventListener('mousedown', CloseMenu);
  }, []);

  function CloseMenu(event: any) {
    const target = event.target;
    // check if any parent element has id of dropdown, dropdown buttons and content will return true, anything else will be false
    if (!target.closest('#dropdown')) {
      props.setOpen(false);
    }
  }

  return (
    <>
      {!props.open
      ? ''
      : 
      <div className={styles.DropDownParent} id='dropdown'>
        {props.children}
      </div>
      }
    </>
  )
}
