import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/components/navbar/navbar'
import styles from '@/styles/recipes.module.css'

export default function Loading() {
    return (
        <main className={styles.MainContainer + ' ' + styles.HidePrint}>
            <div>
                <Navbar searchBar={false} mobileLogo={false} />
            </div>

            <div className={styles.SelectorContainer}>
                <Link href={'/'}>
                    <Image
                    width={25}
                    height={25}
                    quality={100}
                    alt='print'
                    src='/graphics/icons/icon-exit-outline.svg'
                    />
                </Link>                
                <div className={styles.SkeletonLoadingCircle} />
                <div className={styles.SkeletonLoadingCircle} />
                <div className={styles.SkeletonLoadingCircle} />
            </div>

            <div className={styles.ParentContainer}>
                <div className={styles.TitleContainer}>
                    <div className={styles.SkeletonLoadingImage} />
                    <div className={styles.SkeletonContainer}>
                        <div className={styles.SkeletonLoading} />
                        <div className={styles.SkeletonLoading} />
                        <div className={styles.SkeletonLoading} />
                    </div>
                </div>
                {/* Nutrition */}
                <div className={styles.SkeletonLoadingNutrition}></div>

                <div className={styles.SkeletonContainerIngredients}>
                    <div className={styles.SkeletonLoading} />
                    <div className={styles.SkeletonLoading} />
                    <div className={styles.SkeletonLoading} />
                </div>

                <div className={styles.SkeletonContainerIngredients}>
                    <div className={styles.SkeletonLoading} />
                    <div className={styles.SkeletonLoading} />
                    <div className={styles.SkeletonLoading} />
                </div>
            </div>
        </main>
    )
}