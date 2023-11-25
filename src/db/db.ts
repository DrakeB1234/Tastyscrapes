import Dexie from 'dexie'

export const db = new Dexie("MyDatabase", {});

db.version(1).stores({
    recipes: '++id, collection, recipeImg, recipeName, recipeCreator, originURL, originHostname, prepTime, cookTime, totalTime, servings, ingredientsData, stepsData, notesData'
});