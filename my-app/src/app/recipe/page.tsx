import Image from 'next/image'
import Link from 'next/link'
import styles from '@/styles/recipes.module.css'
import { FormatHTML_URL } from './formatrecipe'
import Navbar from '@/components/navbar/navbar'
import Footer from '@/components/footer/footer'
import RecipeParent from './recipe/recipeparent'

export default async function Recipe({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {

  let recipeData: any = {};

  const GetData = async (url: string) => {
    try {
        // Fetch data from URL and store the response into a const
        const res = await fetch(url)
        // Convert the response into text
        const body = await res.text();
        // Convert HTML into usuable data
        return FormatHTML_URL(body, new URL(url));

    } catch (err) {
      return undefined;
    }
  }

  if (searchParams && searchParams.url)
  {
    recipeData = await GetData(searchParams.url.toString());

    // Avoid undefined error if no data is pulled at all from function
    if (recipeData == undefined)
    {
      recipeData = {
        originURL : null, 
        originHostname : null, 
        recipeCreator : null, 
        recipeName : null,
        recipeImg : null,
        prepTime : null,
        cookTime : null,
        totalTime : null,
        servings : null,   
        ingredientData : [],
        stepsData : [],
      };
    }
  }

  return (
    <>
      <Navbar searchBar={true} />
      <RecipeParent recipeData={recipeData} />
    </>
  )
}