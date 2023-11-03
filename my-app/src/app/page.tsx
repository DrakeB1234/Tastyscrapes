'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import styles from '@/styles/page.module.css'
import { useForm, SubmitHandler } from 'react-hook-form'
import Link from 'next/link'
import { useEffect, useState } from 'react'

import { GetRecipes } from '@/db/dbhelpers'
import RecipeSettings from '@/components/recipesettings/recipesettings'

type Inputs = {
  url: string
}

export default function Home() {

  const [recipeCardData, setRecipeCardData] = useState([]);
  const [toggleRecipeSettings, setToggleRecipeSettings] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const router = useRouter();


  const onSubmit: SubmitHandler<Inputs> = (data) => {
    router.push(`/recipe?url=${data.url}`);
  };

  const GetRecipeCardData = async () => {
    // Limit applied
    const res: any = await GetRecipes(8)
    setRecipeCardData(res.data)
  }

  useEffect(() => {
    GetRecipeCardData();
  }, []);

  return (
    <>
    {toggleRecipeSettings
    ? <RecipeSettings toggle={setToggleRecipeSettings} />
    : <></>
    }
    <main className={styles.MainLayout}>
      <div className={styles.MainContainer}>

        <div className={styles.LogoContainer}>
            <Image 
            width={428}
            height={80}
            quality={100}
            alt='>'
            src={'/graphics/images/banner.png'}
            />

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className={styles.SearchContainer}>
                    <input {...register("url", { required: true })} 
                    placeholder='Paste a URL to Clean Up Your Recipe'
                    />
                    <button type="submit">
                        <Image 
                        width={20}
                        height={20}
                        alt='>'
                        src={'/graphics/icons/icon-rightarrow-outline.svg'}
                        />
                    </button>
                </div>
            </form>

        </div>

        <div className={styles.SliderMainContainer}>
          <h1>Supported Sites</h1>
          <div className={styles.SliderContainer}>
            <div className={styles.SliderTrack}>

              <div className={styles.Slide}>
                <Image 
                width={70}
                height={70}
                alt='>'
                src={'/graphics/images/supportedwebsites/allrecipes.jpg'}
                />
                <h1>Allrecipes</h1>
              </div>
              <div className={styles.Slide}>
                <Image 
                width={70}
                height={70}
                alt='>'
                src={'/graphics/images/supportedwebsites/bonappetit.jpeg'}
                />
                <h1>Bonappetit</h1>
              </div>
              <div className={styles.Slide}>
                <Image 
                width={70}
                height={70}
                alt='>'
                src={'/graphics/images/supportedwebsites/seriouseats.jpg'}
                />
                <h1>Seriouseats</h1>
              </div>
              <div className={styles.Slide}>
                <Image 
                width={70}
                height={70}
                alt='>'
                src={'/graphics/images/supportedwebsites/delish.jpg'}
                />
                <h1>Delish</h1>
              </div>

              {/* duplicate */}

              <div className={styles.Slide}>
                <Image 
                width={70}
                height={70}
                alt='>'
                src={'/graphics/images/supportedwebsites/allrecipes.jpg'}
                />
                <h1>Allrecipes</h1>
              </div>
              <div className={styles.Slide}>
                <Image 
                width={70}
                height={70}
                alt='>'
                src={'/graphics/images/supportedwebsites/bonappetit.jpeg'}
                />
                <h1>Bonappetit</h1>
              </div>
              <div className={styles.Slide}>
                <Image 
                width={70}
                height={70}
                alt='>'
                src={'/graphics/images/supportedwebsites/seriouseats.jpg'}
                />
                <h1>Seriouseats</h1>
              </div>
              <div className={styles.Slide}>
                <Image 
                width={70}
                height={70}
                alt='>'
                src={'/graphics/images/supportedwebsites/delish.jpg'}
                />
                <h1>Delish</h1>
              </div>

            </div>
          </div>
        </div>

        <div className={styles.RecipeMainContainer}>
          <div className={styles.RecipeContainer}>

            <div className={styles.TitleContainer}>
              <h1>Recipe Box</h1>
              <button
              onClick={() => setToggleRecipeSettings(true)}
              >
                <h1>Settings</h1>
                <Image 
                width={20}
                height={20}
                alt='>'
                src={'/graphics/icons/icon-settings-outline.svg'}
                />
              </button>
            </div>

            <div className={styles.ButtonContainer}>
              <Link
              href={'/recipeboxview'}
              >
                <h1>View All</h1>
                <Image 
                width={20}
                height={20}
                alt='>'
                src={'/graphics/icons/icon-rightarrow-outline.svg'}
                />
              </Link>
            </div>

            <div className={styles.RecipeCardContainer}>

              {recipeCardData.map((e: any, index: number) => (
                <Link key={'recipe' + index} href={`/recipebox?name=${e.recipeName}&id=${e.id}`} className={styles.RecipeCard}>
                <Image 
                width={300}
                height={150}
                alt='>'
                src={e.recipeImg ? e.recipeImg : '/graphics/images/missing-image.png'}
                />        
                <div className={styles.TextContainer}>
                  <h1>{e.recipeName}</h1>
                  <h2>{e.originHostname?.replace('www.', '')}</h2>
                </div>
              </Link>
              ))}

            </div>
          </div>
        </div>

      </div>
    </main>
    </>
  )
}