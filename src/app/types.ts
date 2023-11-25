export type RecipeDataArr = {
  id: number,
  collection: string | undefined,
  recipeImg: string | undefined,
  recipeName: string | undefined,
  recipeCreator: string | undefined,
  originURL: string | undefined,
  originHostname: string | undefined,
  prepTime: string | undefined,
  cookTime: string | undefined,
  totalTime: string | undefined,
  servings: string | undefined,
  ingredientsData: string [] | undefined,
  stepsData: string [] | undefined,
  notesData: string [] | undefined
}[]

export type RecipeData = {
  id: number,
  collection: string | undefined,
  recipeImg: string | undefined,
  recipeName: string | undefined,
  recipeCreator: string | undefined,
  originURL: string | undefined,
  originHostname: string | undefined,
  prepTime: string | undefined,
  cookTime: string | undefined,
  totalTime: string | undefined,
  servings: string | undefined,
  ingredientsData: string [] | undefined,
  stepsData: string [] | undefined,
  notesData: string [] | undefined
}