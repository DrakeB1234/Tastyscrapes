'use client'

import Image from 'next/image'
import Link from 'next/link'
import styles from './navbar.module.css'
import { useRouter } from 'next/navigation'
import { useForm, SubmitHandler } from 'react-hook-form'

type Inputs = {
    url: string
}

type Props = {
    searchBar: boolean,
}

export default function Navbar(props: Props){

const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    } = useForm<Inputs>();

    const router = useRouter();


    const onSubmit: SubmitHandler<Inputs> = (data) => {
        router.push(`/recipe?url=${data.url}`);
        reset();
    };

  return (
    <div className={styles.MainContainer}>
        <div className={styles.ParentContainer}>
            <Link href={'/'}>                    
                <Image 
                width={100}
                height={70}
                quality={100}
                alt='>'
                src={'/graphics/icons/ClarifiedRecipe.png'}
                />
            </Link>

            {props.searchBar
            ?
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
            : <></>
            }

        </div>
    </div>
  )
}