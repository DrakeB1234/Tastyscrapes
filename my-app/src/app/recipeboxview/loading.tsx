import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/components/navbar/navbar'
import styles from '@/styles/loading.module.css'

export default function Loading() {
    return (
        <main className={styles.MainContainer + ' ' + styles.HidePrint}>
            <div>
                <Navbar searchBar={false} mobileLogo={false} />
            </div>

            <div className={styles.ExitContainer}>
                <Link href={'/'}>
                    <Image
                    width={25}
                    height={25}
                    quality={100}
                    alt='print'
                    src='/graphics/icons/icon-exit-outline.svg'
                    />
                </Link>                
            </div>

            <div className={styles.SkelMainContainer}>
                <div className={styles.SkelRecipeCards}>
                    <div className={styles.SkelLoading} />
                    <div className={styles.SkelLoading} />
                    <div className={styles.SkelLoading} />
                    <div className={styles.SkelLoading} />
                    <div className={styles.SkelLoading} />
                    <div className={styles.SkelLoading} />
                    <div className={styles.SkelLoading} />
                    <div className={styles.SkelLoading} />
                    <div className={styles.SkelLoading} />
                    <div className={styles.SkelLoading} />
                    <div className={styles.SkelLoading} />
                    <div className={styles.SkelLoading} />
                </div>
            </div>
        </main>
    )
}