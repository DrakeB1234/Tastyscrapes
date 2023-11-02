import { db, recipesTable } from "./database.config"

export const AddRecipe = async (recipeData: any) => {
    try {

        // await recipesTable.add({
        //     collection: recipeData.collection,
        //     recipeImg: recipeData.recipeImg,
        //     recipeName: recipeData.recipeName,
        //     recipeCreator: recipeData.recipeCreator,
        //     originURL: recipeData.originURL,
        //     prepTime: recipeData.prepTime,
        //     cookTime: recipeData.cookTime,
        //     totalTime: recipeData.totalTime,
        //     servings: recipeData.servings,
        //     ingredientData: recipeData.ingredientData,
        //     stepsData: recipeData.stepsData
        // });

        await new Promise(resolve => setTimeout(resolve, 1000));

        throw Error;

        return {
            status: 'success',
            data: 'Item added successfully!'
        };
    } catch (error) {
        return {
            status: 'error',
            data: error
        };
    }
}

export const GetItems = async () => {
    try {

        const res = await recipesTable.toArray();

        return {
            status: 'success',
            data: res
        };
    } catch (error) {
        return {
            status: 'error',
            data: error
        };
    }
}

export const ClearTable = async () => {
    try {

        const res = await recipesTable.clear();

        return {
            status: 'success',
            data: 'Data Cleared'
        };
    } catch (error) {
        return {
            status: 'error',
            data: error
        };
    }
}