'use client'

import { db } from "./db";

export async function GetRecipes (limit: number) {
  try {
      let res: any = [];

      res = await db.table('recipes')
      .reverse()
      .limit(limit)
      .toArray();

      return {
          status: 'success',
          data: res
      };
  } catch (error) {
      throw new Error('There was an error processing your request. Please try again later');
  }
}

export async function GetRecipesCollection (limit: number, collection: any) {
  try {
      let res: any = [];

      res = await db.table('recipes')
      .where('collection')
      .equals(collection)
      .limit(limit)
      .toArray();

      return {
          status: 'success',
          data: res
      };
  } catch (error) {
      throw new Error('There was an error processing your request. Please try again later');
  }
}

export async function GetCollections () {
  try {
      let res: any = [];
      let count: any = [];

      res = await db.table('recipes')
      .orderBy('collection')
      .uniqueKeys();

      // Forces 'none' to end of array
      res.push(res.splice(res.indexOf('none'), 1)[0]);

      // Get count for each collection INCLUDING undefined ('none')
      // Check if first value in array is undefined (means no data is stored)
      if (res[0] != undefined) {
        for(const e of res) {
          let temp = await db.table('recipes')
          .where('collection')
          .equals(e)
          .count()
          count.push({collectionName: e, count: temp})
        };
      }

      return {
          status: 'success',
          data: count
      };
  } catch (error) {
      throw new Error('There was an error processing your request. Please try again later');
  }
}

export async function GetRecipesID (id: number) {
  try {
      let res: any = [];

      res = await db.table('recipes')
      .get(Number(id));

      return {
          status: 'success',
          data: res
      };
  } catch (error) {
      return {
          status: 'error',
          data: 'There was an error processing your request. Please try again later'
      };
  }
}

export async function AddRecipe (data: any) {
  try {
      let res: any = '';

      res = await db.table('recipes').add({
          collection: data.collection ? data.collection : 'none',
          recipeImg: data.recipeImg,
          recipeName: data.recipeName,
          recipeCreator: data.recipeCreator,
          originURL: data.originURL,
          originHostname: data.originHostname,
          prepTime: data.prepTime,
          cookTime: data.cookTime,
          totalTime: data.totalTime,
          servings: data.servings,
          ingredientsData: data.ingredientsData,
          stepsData: data.stepsData
      });

      return {
          status: 'success',
          data: res
      };
  } catch (error) {
      throw new Error('There was an error processing your request. Please try again later');
  }
}

export async function EditRecipe (data: any) {
  try {

      await db.table('recipes').put(data);

      return {
          status: 'success',
          data: 'Recipe Edited'
      };
  } catch (error) {
      throw new Error('There was an error processing your request. Please try again later');
  }
}

export async function AddCollection (id: number, data: any) {
  try {
      // Check if data was provided, if not then set collection to none
      if (!data || data.length === '') data = 'none';
      else data = data.trim();

      await db.table('recipes').update(id, {collection: data});

      return {
          status: 'success',
          data: 'Recipe Collection Changed'
      };
  } catch (error) {
      throw new Error('There was an error processing your request. Please try again later');
  }
}

export async function DeleteRecipe (id: number) {
  try {
      let res: any = [];

      res = await db.table('recipes')
      .delete(Number(id));

      return {
          status: 'success',
          data: res
      };
  } catch (error) {
      throw new Error('There was an error processing your request. Please try again later');
  }
}

export async function ExportRecipes () {
  try {

      // const blob = await exportDB(db);

      return {
          status: 'success',
          data: ''
      };
  } catch (error) {
      throw new Error('There was an error processing your request. Please try again later');
  }
}

export async function DeleteAllRecipes () {
  try {

      const res = await db.table('recipes').clear();

      return {
          status: 'success',
          data: 'All data cleared'
      };
  } catch (error) {
      throw new Error('There was an error processing your request. Please try again later');
  }
}