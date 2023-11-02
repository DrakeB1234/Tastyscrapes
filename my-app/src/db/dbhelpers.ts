import { db, recipesTable } from "./database.config"

export const AddRecipe = async (recipeData: any) => {
    try {
        // Check for repeat URLs to avoid duplicate recipes
        const res: any = await recipesTable
        .orderBy('originURL').keys()

        if (res.includes(recipeData.originURL)) {

            throw new Error('This recipes URL has already been saved, Duplicate Value');
        }
        else {

            await recipesTable.add({
                collection: recipeData.collection,
                recipeImg: recipeData.recipeImg,
                recipeName: recipeData.recipeName,
                recipeCreator: recipeData.recipeCreator,
                originURL: recipeData.originURL,
                originHostname: recipeData.originHostname,
                prepTime: recipeData.prepTime,
                cookTime: recipeData.cookTime,
                totalTime: recipeData.totalTime,
                servings: recipeData.servings,
                ingredientData: recipeData.ingredientData,
                stepsData: recipeData.stepsData
            });
    
            return {
                status: 'success',
                data: 'Item added successfully!'
            };
        }
    } catch (error) {
        return {
            status: 'error',
            data: error
        };
    }
}

export const GetRecipes = async () => {
    try {

        // Check for repeat URLs to avoid duplicate recipes
        const res: any = await recipesTable
        .toArray();

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