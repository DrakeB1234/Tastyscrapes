import Dexie from "dexie"

export const db = new Dexie("myDatabase");
db.version(1).stores({
    recipes: '++id, collection, recipeImg, recipename, recipeCreator, originURL, originHostname, prepTime, cookTime, totalTime, servings, ingredientsData, stepsData'
});

export const recipesTable = db.table('recipes');

export default db;