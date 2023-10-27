'use client'

import Image from 'next/image'
import styles from './actioncontainer.module.css'

type Props = {
}

export default function ActionContainer(props: Props) {

    const PrintPDF = () => {
        window.print();
    }
    
  return (
    <div className={styles.ActionContainer}>
        <button className={styles.ActionItem} onClick={() => PrintPDF()}>
            <h1>Print</h1>
            <Image 
            height={30} 
            width={30} 
            alt='' 
            src={'/graphics/icons/icon-printer-outline.svg'}
            />
        </button>
    </div>
  )
}
