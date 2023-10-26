import Image from 'next/image'
import Link from 'next/link'
import styles from '@/styles/recipes.module.css'
import { FormatHTML_URL } from './formatrecipe'
import Navbar from '@/components/navbar/navbar'

export default async function Recipe({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {

  let recipeData: any = {};

  const GetData = async (url: string) => {
    try {
        // Fetch data from URL and store the response into a const
        const res = await fetch(url);
        // Convert the response into text
        const body = await res.text();
        // Convert HTML into usuable data
        return FormatHTML_URL(body, new URL(url));

    } catch (err) {
      console.log(err)
    }
  }

  if (searchParams && searchParams.url)
  {
    recipeData = await GetData(searchParams.url.toString());
  }

  return (
    <>
      <Navbar />
      <main className={styles.MainContainer}>
        <div className={styles.ParentContainer}>

          <div className={styles.TitleContainer}>
            <Image 
            height={150} 
            width={150} 
            alt='' 
            src={recipeData?.recipeImg ? recipeData?.recipeImg : ''}
            />
            <div className={styles.RecipeNameContainer}>
              <h1>{recipeData?.recipeName}</h1>
              <h2>Creator: {recipeData?.recipeCreator}</h2>
              <Link href={recipeData ? recipeData.originURL : ''}>From: {recipeData?.originHostname}</Link>
              <h3>Edited by Clarified Recipes User</h3>
            </div>
          </div>

          <div className={styles.RecipeNutrition}>
            <div className={styles.RecipeNutritionItem}>
              <h1>Prep Time</h1>
              <h2>{recipeData?.prepTime}</h2>
            </div>
            <div className={styles.RecipeNutritionItem}>
              <h1>Cook Time</h1>
              <h2>{recipeData?.cookTime}</h2>
            </div>
            <div className={styles.RecipeNutritionItem}>
              <h1>Total Time</h1>
              <h2>{recipeData?.totalTime}</h2>
            </div>
            <div className={styles.RecipeNutritionItem}>
              <h1>Servings</h1>
              <h2>{recipeData?.servings}</h2>
            </div>
          </div>

          <h2>Ingredients</h2>
          {recipeData?.ingredientData?.map((ele: any, idx: number) => <p key={`ingredient-${idx}`}>{ele}</p>)}

          <h2>Steps</h2>
          {recipeData?.stepsData?.map((ele: any, idx: number) => <p key={`step-${idx}`}>{`Step ${idx + 1}: ${ele}`}</p>)}
        </div>
      </main>
    </>
  )
}