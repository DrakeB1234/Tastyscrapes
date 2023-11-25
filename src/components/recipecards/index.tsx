'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

import { GetRecipes, GetCollections } from '@/db/dbhelpers'
import styles from './recipecards.module.css'

type Props = {
  cardLimit: number,
  orderAlpha?: boolean,
  viewSearch?: boolean,
}

export default function RecipeCards(props: Props) {

  const [data, setData] = useState<any>();
  const [searchData, setSearchData] = useState<any>();
  const [collections, setCollections] = useState<any>();
  const [searchValues, setSearchValues] = useState<any>({collection: 'All Recipes', recipeName: ''});

  useEffect(() => {
    async function GetData() {
      let res: any = await GetRecipes(props.cardLimit);
      if (res.status == 'error') { throw new Error(res.data)}
      // Organize data by recipe name
      if (props.orderAlpha) {
        res.data.sort((a: any, b:any) => {
        return a.recipeName.localeCompare(b.recipeName)
        });
      }
      setData(res.data);
      setSearchData(res.data);
      res = await GetCollections();
      if (res.status == 'error') { throw new Error(res.data)}
      setCollections(res.data);
    }
    GetData();
  }, [])

  function SearchRecipe (e: any) {
    e.preventDefault();
    const selectData = e.target[0].value; 
    const inputData = e.target[1].value; 
    if (!selectData) return;
    // get all current data
    let recipeData = data;
    // If no input, show all recipes in the selected category
    if (!inputData) {
      // Category is set to see every recipe
      if (selectData != 'All Recipes') {
        recipeData = recipeData.filter((e: any) => e.collection == selectData);
      }
    }
    else {
      // Category is set to see every recipe
      if (selectData != 'All Recipes') {
        recipeData = recipeData.filter((e: any) => e.collection == selectData);
        recipeData = recipeData.filter((e: any) => e.recipeName.includes(inputData));
      }
      else {
        recipeData = recipeData.filter((e: any) => e.recipeName.includes(inputData));
      }
    }
    // Organize data by recipe name
    recipeData.sort((a: any, b:any) => {
    return a.recipeName.localeCompare(b.recipeName)
    });
    // Set state
    setSearchValues({collection: selectData, recipeName: inputData})
    setSearchData(recipeData);
  }

  return (
    <main>
      {props.viewSearch
      ?
      <form className={styles.RecipeSelectContainer} onSubmit={SearchRecipe}>
        <select>
          <option defaultChecked value={'All Recipes'}>All Recipes</option>
          {collections && collections?.map((e: any, index: number) => (
            <option value={`${e.collectionName}`} key={`option-${index}`}>{`${e.collectionName != 'none' ? e.collectionName : 'Unorganized'} - ${e.count}`}</option>
          ))}
        </select>
        <div className={styles.RecipeInputContainer}>
          <input className='InputStyle' />
          <button>
            <Image 
            width={25}
            height={25}
            quality={100}
            alt=''
            src={'/graphics/icons/icon-search-outline.svg'}
            />
          </button>
        </div>
      </form>
      : '' 
      }
      {props.viewSearch && searchValues
      ? 
      <div className={styles.SearchValuesContainer}>
        {searchValues.recipeName
        ? <h4>{`Showing results for '${searchValues.recipeName}'  in ${searchValues.collection != 'none' ? searchValues.collection : 'Unorganized'}`}</h4>
        : <h4>{`Showing all results in ${searchValues.collection != 'none' ? searchValues.collection : 'Unorganized'}`}</h4>
        }
      </div>
      : ''
      }
      <div className={styles.CardContainer}>
        {searchData && searchData?.map((e: any) => (
          <Link href={`/recipebox/${e.id}`} key={`recipe-${e.id}`} className={styles.CardParent}>
            <Image 
            width={500}
            height={500}
            quality={100}
            alt=''
            src={e.recipeImg ? e.recipeImg : '/graphics/images/Missing-Image.png'}
            />
            <div className={styles.CardText}>
              <h3>{e.recipeName}</h3>
              <h5>{e.originHostname}</h5>
              <div className={styles.RecipeCollectionText}>
                <Image 
                width={15}
                height={15}
                quality={100}
                alt=''
                src={'/graphics/icons/icon-collection-outline.svg'}
                />
                <h5>{e.collection != 'none' ? e.collection : 'Unorganized'}</h5>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  )
}
