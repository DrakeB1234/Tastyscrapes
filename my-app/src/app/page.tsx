'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import styles from '@/styles/page.module.css'
import { useForm, SubmitHandler } from 'react-hook-form'

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
    <main className={styles.MainLayout}>
      <div className={styles.MainContainer}>
        <h1>This is a site</h1>

        <form onSubmit={handleSubmit(onSubmit)}>

          <input {...register("url", { required: true })} />

          {errors.url && <span>This field is required</span>}

          <input type="submit" />
        </form>
      </div>
    </main>
  )
}