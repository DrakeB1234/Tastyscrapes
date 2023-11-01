import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/components/navbar/navbar'
import styles from '@/styles/recipes.module.css'

export default function Loading() {
    return (
        <main className={styles.MainContainer}>
            <div className={styles.HidePrint}>
                <Navbar searchBar={false} mobileLogo={true} />
            </div>
            <div className={styles.ParentContainer}>
                <div className={styles.TitleContainer}>
                    <Image 
                    height={150} 
                    width={150} 
                    alt='' 
                    src={''}
                    className={styles.SkeletonLoading}
                    />
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