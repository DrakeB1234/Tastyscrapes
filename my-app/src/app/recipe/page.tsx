'use client'

import Image from 'next/image'
import styles from '@/styles/page.module.css'
import React, { useEffect, useState } from 'react';
import { FormatHTML_URL } from './formatrecipe';

export default function Recipe({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {

  type RecipeData = {
    originURL : string | undefined, 
    recipeCreator : string | undefined, 
    recipeName : string | undefined,
    recipeImg : string | undefined,
    ingredientData : [string] | null,
    stepsData : [string] | null
  }

  const [recipeData, setRecipeData] = useState<RecipeData>()

  const GetHTML_AllRecipes = async (url: string) => {

    try {
        // Fetch data from URL and store the response into a const
        const res = await fetch(url);
        // Convert the response into text
        const body = await res.text();
        // Convert HTML into usuable data
        const data = await FormatHTML_URL(body, new URL(url));
        // Change states
        console.log(data)

    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    if (searchParams && searchParams.url)
    {
      GetHTML_AllRecipes(searchParams.url.toString());
    }
  }, [searchParams])

  return (
    <main className={styles.MainLayout}>
      <div className={styles.MainContainer}>
        <h1>Recipe</h1>
      </div>

        <h1>{recipeData?.recipeName}</h1>
        <img height={100} width={100} src={recipeData?.recipeImg ? recipeData?.recipeImg : ''}/>
        <h1>Origin URL: {recipeData?.originURL}</h1>
        <h1>Created By: {recipeData?.recipeCreator}</h1>
        <h2>Ingredients</h2>
        {recipeData?.ingredientData?.map((ele: any, idx: number) => <p key={`ingredient-${idx}`}>{ele}</p>)}

        <h2>Steps</h2>
        {recipeData?.stepsData?.map((ele: any, idx: number) => <p key={`step-${idx}`}>{`Step ${idx + 1}: ${ele}`}</p>)}

    </main>
  )
}