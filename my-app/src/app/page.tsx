'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import styles from '@/styles/page.module.css'
import { useForm, SubmitHandler } from 'react-hook-form'
import Navbar from '@/components/navbar/navbar'

type Inputs = {
  url: string
}

export default function Home() {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const router = useRouter();


  const onSubmit: SubmitHandler<Inputs> = (data) => {
    router.push(`/recipe?url=${data.url}`);
  };

  return (
    <>
    <Navbar searchBar={false} />
    <main className={styles.MainLayout}>
      <div className={styles.MainContainer}>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.SearchContainer}>
                <input {...register("url", { required: true })} 
                placeholder='Paste a URL'
                />
                <button type="submit">
                    <Image 
                    width={20}
                    height={20}
                    alt='>'
                    src={'/graphics/icons/icon-right-arrow.svg'}
                    />
                </button>
            </div>
        </form>

        <p>Currently works with Allrecipes.com, Bonappetit.com, Seriouseats.com, Delish.com</p>
      </div>
    </main>
    </>
  )
}