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
    mobileLogo?: boolean,
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
        <div className={styles.ParentContainer + ' ' + styles.Desktop}>
            <Link href={'/'}>                    
                <Image 
                width={428}
                height={80}
                quality={100}
                alt='>'
                src={'/graphics/images/banner.png'}
                className={styles.BannerImage}
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
            {props.mobileLogo
            ?
            <div className={styles.ParentContainer + ' ' + styles.Mobile}>
                <Link href={'/'}>                    
                    <Image 
                    width={428/2.5}
                    height={80/2.5}
                    quality={100}
                    alt='<'
                    src={'/graphics/images/banner.png'}
                    />
                </Link>
            </div>
            :
            <></>
            }
    </div>
  )
}