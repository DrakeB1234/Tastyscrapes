import React from 'react'

import { FormatHTML_URL } from '@/db/datascrapeformat'
import RecipeCard from '@/components/recipecard';

export default async function RecipeScrape(params: any) {

  const searchURL: any = params.searchParams.url;
  // Check if url param was provided
  let res: any = null;
  try {
    res = await FormatHTML_URL(new URL(searchURL));
  } catch (error: any) {
    throw new Error('Invalid URL Provided');
  }

  return (
    <RecipeCard returnURL='/' savedRecipe={false} data={res} />
  )
}
