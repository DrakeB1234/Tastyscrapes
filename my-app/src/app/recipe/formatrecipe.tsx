import * as cheerio from 'cheerio'

export async function FormatHTML_URL(html: any, url: URL) {
  if (url.hostname == 'www.allrecipes.com') return await Format_AllRecipes(html, url);
  else if (url.hostname == 'www.bonappetit.com') return await Format_Bonappetit(html, url);
  else if (url.hostname == 'www.seriouseats.com') return await Format_Seriouseats(html, url);
}

async function Format_AllRecipes(html: any, url:URL) {
  let originURL = url.toString();
  let recipeCreator: string = '';
  let recipeName: string = '';
  let recipeImg: string | undefined = '';

  let prepTime: string | undefined = '';
  let cookTime: string | undefined = '';
  let totalTime: string | undefined = '';
  let servings: string | undefined = '';

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
    // Check if null, if so try another method
    if (!recipeCreator) {
      recipeCreator = $(
        '#mntl-bylines__item_1-0:nth-child(2n)'
      ).text().trim();
    }
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

    // Get nutririton
    let prev = '';
    $(
      '#recipe-details_1-0 > div.mntl-recipe-details__content > div:nth-child(n)'
    ).children().each((i: number, e: any) => {

      let text = $(e).text()
      if (i % 2 == 0) {
        // gets last data value
        prev = text;
      }
      else {
        if (prev.includes('Prep')) { prepTime = text }
        else if (prev.includes('Cook')) { cookTime = text }
        else if (prev.includes('Total')) { totalTime = text }
        else if (prev.includes('Servings')) { servings = text }
      }
    })
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
    return {
      'originURL' : originURL, 
      'originHostname' : new URL(originURL).hostname, 
      'recipeCreator' : recipeCreator, 
      'recipeName' : recipeName,
      'recipeImg' : recipeImg,
      'prepTime' : prepTime,
      'cookTime' : cookTime,
      'totalTime' : totalTime,
      'servings' : servings,   
      'ingredientData' : ingredientData,
      'stepsData' : stepsData,
    }

  } catch (err) { 
    console.log(err);
  }
}

async function Format_Bonappetit(html: any, url:URL) {
  let originURL = url.toString();
  let recipeCreator: string = '';
  let recipeName: string = '';
  let recipeImg: string | undefined = '';

  let prepTime: string = '';

  let ingredientData: any = [];
  let stepsData: any = [];

  let tempData = '';

  try {
      // Load body data
      const $ = cheerio.load(html);

    // Gets Creator Name from HTML
    recipeCreator = $(
      '#main-content > article > div:nth-child(1) > header > div.GridWrapper-cAzTTK.dfqcEG.grid.grid-items-2.grid-full-bleed.grid-no-gap.SplitScreenContentHeaderMain-fNigKG.daohZh > div:nth-child(1) > div > div.BylinesWrapper-KIudk.irTIfE.bylines.SplitScreenContentHeaderByline-kvEhqE.hxYjFq > p > span > span > a'
    ).text().trim();
    // END

    // Gets Recipe Name from HTML
    recipeName = $(
      '#main-content > article > div:nth-child(1) > header > div.GridWrapper-cAzTTK.dfqcEG.grid.grid-items-2.grid-full-bleed.grid-no-gap.SplitScreenContentHeaderMain-fNigKG.daohZh > div:nth-child(1) > div > h1'
    ).text().trim();
    // END

    // Gets Recipe Img from HTML
    recipeImg = $(
      '#main-content > article > div:nth-child(1) > header > div.GridWrapper-cAzTTK.dfqcEG.grid.grid-items-2.grid-full-bleed.grid-no-gap.SplitScreenContentHeaderMain-fNigKG.daohZh > div:nth-child(2) > div > div > span > picture > img'
    ).attr('src');
    // END

    // Gets Ingredients from HTML
    $(
      '#main-content > article > div.RecipePageContentBackground-hTPcuF.sFwiB > div.GridWrapper-cAzTTK.gtpYgB.grid.grid-margins.grid-items-2.grid-layout--adrail > div.GridItem-buujkM.ckUkOW.grid--item.grid-layout__content > div > div.Wrapper-dxnTBC.jIWNsq > div'
    ).children().each((i: number, e: any) => {
      if (i % 2 == 0) {
        ingredientData.push(tempData);
        if ($(e).text()) tempData = $(e).text().trim() + ' ';
        else tempData = ''
      }
      else {
        // Check if empty text
        if ($(e).text()) tempData += $(e).text().trim() + ' ';
      }
    })
    // END

    // Gets Steps from HTML
    $(
      '#main-content > article > div.RecipePageContentBackground-hTPcuF.sFwiB > div.GridWrapper-cAzTTK.gtpYgB.grid.grid-margins.grid-items-2.grid-layout--adrail > div.GridItem-buujkM.ckUkOW.grid--item.grid-layout__content > div > div.InstructionsWrapper-hZXqPx.RmryN > ol > li'
    ).children().each((i: number, e: any) => {
      // Ignore 'step' in text and any img tags
      if (!$(e).text().includes('Step') && !$(e).text().includes('<img'))
      {
        stepsData.push($(e).text().trim());
      }
    })
    // END
    // Return all data into obj
    return {
      'originURL' : originURL, 
      'originHostname' : new URL(originURL).hostname, 
      'recipeCreator' : recipeCreator, 
      'recipeName' : recipeName,
      'recipeImg' : recipeImg,
      'ingredientData' : ingredientData,
      'stepsData' : stepsData
    }

  } catch (err) { 
    console.log(err);
  }
}

async function Format_Seriouseats(html: any, url:URL) {
  let originURL = url.toString();
  let recipeCreator: string = '';
  let recipeName: string = '';
  let recipeImg: string | undefined = '';

  let prepTime: string | undefined = '';
  let cookTime: string | undefined = '';
  let totalTime: string | undefined = '';
  let servings: string | undefined = '';

  let ingredientData: any = [];
  let stepsData: any = [];

  let tempData = '';

  try {
      // Load body data
      const $ = cheerio.load(html);

    // Gets Creator Name from HTML
    recipeCreator = $(
      '#mntl-bylines__item_4-0 > div > a'
    ).text().trim();
    // END

    // Gets Recipe Name from HTML
    recipeName = $(
      '#heading_1-0 > h1'
    ).text().trim();
    // END

    // Gets Recipe Img from HTML
    recipeImg = $(
      '#primary-image_1-0 > div > div > img'
    ).attr('src');
    // END

    // Gets Ingredients from HTML
    $(
      '#ingredient-list_1-0 > li:nth-child(n)'
    ).each((i: number, e: any) => {
      ingredientData.push($(e).text().trim());
    })
    // END

    // Gets times from HTML
    let prev = '';
    $(
      '#recipe-decision-block__container_1-0 > div.project-meta__times-container > div > span > span:nth-child(n)'
    ).each((i: number, e: any) => {
      let text = $(e).text()
      if (i % 2 == 0) {
        // gets last data value
        prev = text;
      }
      else {
        if (prev.includes('Prep')) { prepTime = text }
        else if (prev.includes('Cook')) { cookTime = text }
        else if (prev.includes('Total')) { totalTime = text }
      }
    })
    // END


    // Gets servings from HTML
    $(
      '#meta-text_6-0 > span.meta-text__data'
    ).each((i: number, e: any) => {
      servings = $(e).text();
    })
    // END

    // Gets Steps from HTML
    $(
      'li.mntl-sc-block-group--LI:nth-child(n) > p'
    ).each((i: number, e: any) => {
      stepsData.push($(e).text().trim());
    })
    // END
    // Return all data into obj
    return {
      'originURL' : originURL, 
      'originHostname' : new URL(originURL).hostname, 
      'recipeCreator' : recipeCreator, 
      'recipeName' : recipeName,
      'recipeImg' : recipeImg,
      'prepTime' : prepTime,
      'cookTime' : cookTime,
      'totalTime' : totalTime,
      'servings' : servings,   
      'ingredientData' : ingredientData,
      'stepsData' : stepsData,
    }

  } catch (err) { 
    console.log(err);
  }
}