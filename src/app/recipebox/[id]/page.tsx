'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

import { GetRecipesID } from '@/db/dbhelpers'
import RecipeCard from '@/components/recipecard'

export default function RecipeBoxID(params: any) {

  const router = useRouter();

  const [data, setData] = useState<any>({
    collection: '',
    recipeImg: '',
    recipeName: '',
    recipeCreator: '',
    originURL: '',
    originHostname: '',
    prepTime: '',
    cookTime: '',
    totalTime: '',
    servings: '',
    ingredientsData: [],
    stepsData: []
  });

  useEffect(() =>{
    async function GetData() {
      let res: any = await GetRecipesID(Number(params.params.id));
      // If error or no recipename, then redirect
      if (res.status == 'error' || res.data?.recipeName == undefined) { return router.replace('/recipebox') }
      if (res.data) { setData(res.data); }
    }
    // Call function in use effect hook
    GetData();
  }, []);

  return (
    <main>
      <RecipeCard returnURL='/recipebox' savedRecipe={true} data={data} />
    </main>
  )
}
