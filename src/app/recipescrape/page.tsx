import React from 'react'

import { FormatHTML_URL } from '@/db/datascrapeformat'
import RecipeCard from '@/components/recipecard';

export default async function RecipeScrape(params: any) {

  const searchURL: any = params.searchParams.url;
  // Check if url param was provided
  if (!searchURL) { throw new Error('Not a valid URL!') } 

  const res: any = await FormatHTML_URL(new URL(searchURL));

  return (
    <RecipeCard returnURL='/' savedRecipe={false} data={res} />
  )
}
