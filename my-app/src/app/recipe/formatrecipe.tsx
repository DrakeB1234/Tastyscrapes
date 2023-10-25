import * as cheerio from 'cheerio'

export async function FormatHTML_URL(html: any, url: URL) {
  if (url.hostname == 'www.allrecipes.com') return await Format_AllRecipes(html, url);
}

type RecipeData = {
  originURL : string | undefined, 
  recipeCreator : string | undefined, 
  recipeName : string | undefined,
  recipeImg : string | undefined,
  ingredientData : [string] | null,
  stepsData : [string] | null
} | null

async function Format_AllRecipes(html: any, url:URL) {
  let originURL = url.toString();
  let recipeCreator: string = '';
  let recipeName: string = '';
  let recipeImg: string | undefined = '';
  let ingredientData: any = [];
  let stepsData: any = [];

  let tempData = '';

  try {
      // Load body data
      const $ = cheerio.load(html);

    // Gets Creator Name from HTML
    recipeCreator = $(
      '#mntl-bylines__item_1-0 > a'
    ).text().trim();
    // END

    // Gets Recipe Name from HTML
    recipeName = $(
      '#article-heading_1-0'
    ).text().trim();
    // END

    // Gets Recipe Img from HTML
    recipeImg = $(
      '#mntl-sc-block-image_1-0-1'
    ).attr('data-src');

    // Check if image is null, if so try to grab another type
    if (recipeImg == undefined) {
      recipeImg = $(
        '#figure-article_1-0 > div > div > img'
      ).attr('src');
    }
    // END

    // Gets Ingredients from HTML
    $(
      '#mntl-structured-ingredients_1-0 > ul > li:nth-child(n) > p > span:nth-child(n)'
    ).each((i: number, e: any) => {

      if (i % 3 == 0) {
        ingredientData.push(tempData);
        if ($(e).text()) tempData = $(e).text().trim() + ' ';
        else tempData = ''
      }
      else {
        // Check if empty text
        if ($(e).text()) tempData += $(e).text().trim() + ' ';
      }
    })

    // Drop first ele of array (bug, empty ele added during loop above)
    ingredientData.shift();
    // END

    // Gets Steps from HTML
    $(
      '#mntl-sc-block_2-0 > li > p'
    ).each((i: number, e: any) => {

      stepsData.push($(e).text().trim());
    })
    // END
    // Return all data into obj
    const data: RecipeData = {
      originURL, 
      recipeCreator, 
      recipeName,
      recipeImg,
      ingredientData,
      stepsData
    }
    return data;

  } catch (err) { 
    console.log(err);
  }
}