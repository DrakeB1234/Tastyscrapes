import { db, recipesTable } from "./database.config"
import { exportDB, importInto } from "dexie-export-import"

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

export const GetRecipes = async (limit: number) => {
    try {
        let res: any = {};
        // Check if limit was provided
        if (!limit) { 
            res = await recipesTable
            .toArray();
        }
        else {
            res = await recipesTable
            .limit(limit).toArray();
        }

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

export const GetRecipesID = async (id: number) => {
    try {
        // Check for invalid id
        if (id == undefined || Number.isNaN(id) || id == 0) {
            throw new Error('Invalid recipe id provided. Please try again.');
        }

        // Check for repeat URLs to avoid duplicate recipes
        const res: any = await recipesTable
        .get(id);

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

export const EditRecipe = async (data: any) => {
    try {

        await recipesTable.put(data);

        console.log(data)

        return {
            status: 'success',
            data: 'Recipe Edited'
        };
    } catch (error) {
        return {
            status: 'error',
            data: error
        };
    }
}

export const DeleteRecipeID = async (id: number) => {
    try {

        const res = await recipesTable.delete(id);

        return {
            status: 'success',
            data: 'Recipe Deleted'
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

export const ExportDB = async () => {
    try {

        const res = await exportDB(db);

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

export const ImportDB = async (blob: Blob) => {
    try {

        const res = await importInto(db, blob, {
            
        });

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