'use client'

import Image from 'next/image'
import styles from '@/styles/recipeboxedit.module.css'
import Link from 'next/link'
import { useForm, useFieldArray } from 'react-hook-form'
import { useEffect, useState } from 'react'

import Navbar from '@/components/navbar/navbar'
import MessagePopup from '@/components/messagepopup/messagepop'
import MissingRecipe from '@/components/missingrecipe/missingrecipe'
import { GetRecipesID, EditRecipe } from '@/db/dbhelpers'

type Inputs = {
  id: string | undefined,
  recipeName: string | undefined,
  prepTime: string | undefined,
  cookTime: string | undefined,
  totalTime: string | undefined,
  servings: string | undefined,
  ingredients: {ingredient: string}[],
  steps: {step: string}[],
}

export default function RecipeBoxEdit({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {

  const [recipeData, setRecipeData] = useState<any>([]);
  const [message, setMessage] = useState('');
  const [toggleMessage, setToggleMessage] = useState(false);

  const GetRecipeCardData = async () => {
    // if no recipe id is present, set id to -1 
    const res: any = await GetRecipesID(Number(searchParams?.id));

    // Check for error
    if (res.status == 'error') { ErrorHandler(res) }
    else { 
      setRecipeData(res.data) 

      // Set values
      setValue('id', res.data.id);
      setValue('recipeName', res.data.recipeName);
      setValue('prepTime', res.data.prepTime);
      setValue('cookTime', res.data.cookTime);
      setValue('totalTime', res.data.totalTime);
      setValue('servings', res.data.servings);
      // Set ingredients
      res.data.ingredientData?.forEach((e: any) => {
        append({ingredient: e});
      });
      // Set steps
      res.data.stepsData?.forEach((e: any) => {
        stepsAppend({step: e});
      });

    }
  }

  const ErrorHandler = (error: any) => {
    console.error(error);
    setMessage(error.data?.message);
    setToggleMessage(true);
  }

  useEffect(() => {
    GetRecipeCardData();
  }, [])

  const { control, register, handleSubmit, setValue, formState: { errors } } = useForm<Inputs>();

  const { fields, append, remove } = useFieldArray({
    name: 'ingredients',
    control,
    rules: {
        required: 'Must have at least 1 ingredient',
        maxLength: {
          value: 40,
          message: 'Must have less than 40 ingredients'
        }
    }
  });

  const { fields: stepsFields, append: stepsAppend, remove: stepsRemove } = useFieldArray({
    name: 'steps',
    control,
    rules: {
        required: 'Must have at least 1 step',
        maxLength: {
          value: 30,
          message: 'Must have less than 30 steps'
        }
    }
  });

  const onSubmit = (data: Inputs) => {
    // fix arrays
    let temp: any[] = [];
    // ingredients
    data.ingredients.forEach(e => {
      temp.push(e.ingredient);
    });
    data.ingredients = temp;
    temp = [];
    // steps
    data.steps.forEach(e => {
      temp.push(e.step);
    });
    data.steps = temp;

    // Reconstruct Object to fit table schema
    const res = EditRecipe({
      collection: undefined,
      recipeImg: recipeData.recipeImg,
      recipeCreator: recipeData.recipeCreator,
      originURL: recipeData.originURL,
      originHostname: recipeData.originHostname,
      id: data.id,
      recipeName: data.recipeName,
      prepTime: data.prepTime,
      cookTime: data.cookTime,
      totalTime: data.totalTime,
      servings: data.servings,
      ingredientData: data.ingredients,
      stepsData: data.steps
    });
    location.replace(`/recipebox?id=${data.id}`);
  };

  return (
    <>
      <Navbar searchBar={false} mobileLogo={false} />
      {toggleMessage
      ? <MessagePopup toggleMessage={setToggleMessage} messageType={'Error'} message={message} />
      : <></>
      }
      <main className={styles.MainContainer}>
        {recipeData == undefined || !searchParams?.id
        ? 
        <div className={styles.RecipeMissingView}>
          <MissingRecipe type={'failRecipe'}/>
        </div>
        :
        <div className={styles.RecipeView}>
          <form onSubmit={handleSubmit(onSubmit)}
          className={styles.MainContainer}
          >

            <div className={styles.EditTitle}>
              <h1>Recipe Edit</h1>
            </div>
            <div className={styles.SelectorContainer}>
              <Link href={`/recipebox?id=${recipeData.id}`}
              className={styles.ExitButton}
              >
                <Image
                width={25}
                height={25}
                quality={100}
                alt='print'
                src='/graphics/icons/icon-exit-outline.svg'
                />
              </Link>
            </div>

            <div className={styles.TitleContainer}>
              <Image 
              height={150} 
              width={150} 
              alt='' 
              src={recipeData?.recipeImg ? recipeData?.recipeImg : '/graphics/images/missing-image.png'}
              />
              <div className={styles.RecipeNameContainer}>

                <input {...register('recipeName', {
                      required: {
                          value: true,
                          message: 'Required'
                      },
                      maxLength: {
                        value: 100,
                        message: 'Must have less than 100 Characters'
                      }, 
                  })}
                  autoComplete='off' placeholder='Recipe Name'
                />
                {errors?.recipeName && <h1 className={styles.InputError}>{errors?.recipeName?.message}</h1>}

              </div>
            </div>

            <div className={styles.RecipeNutrition}>

              <div className={styles.RecipeNutritionItem}>
                <h1>Prep Time</h1>
                <input {...register('prepTime', {
                      required: {
                          value: false,
                          message: 'Required'
                      },
                      maxLength: {
                        value: 30,
                        message: 'Must have less than 30 Characters'
                      }, 
                  })}
                  autoComplete='off' placeholder='Prep Time'
                />
                {errors?.prepTime && <h1 className={styles.InputError}>{errors?.prepTime?.message}</h1>}
              </div>
              <div className={styles.RecipeNutritionItem}>
                <h1>Cook Time</h1>
                <input {...register('cookTime', {
                      required: {
                          value: false,
                          message: 'Required'
                      },
                      maxLength: {
                        value: 30,
                        message: 'Must have less than 30 Characters'
                      }, 
                  })}
                  autoComplete='off' placeholder='Cook Time'
                />
                {errors?.cookTime && <h1 className={styles.InputError}>{errors?.cookTime?.message}</h1>}
              </div>
              <div className={styles.RecipeNutritionItem}>
                <h1>Total Time</h1>
                <input {...register('totalTime', {
                      required: {
                          value: false,
                          message: 'Required'
                      },
                      maxLength: {
                        value: 30,
                        message: 'Must have less than 30 Characters'
                      }, 
                  })}
                  autoComplete='off' placeholder='Total Time'
                />
                {errors?.totalTime && <h1 className={styles.InputError}>{errors?.totalTime?.message}</h1>}
              </div>
              <div className={styles.RecipeNutritionItem}>
                <h1>Servings</h1>
                <input {...register('servings', {
                      required: {
                          value: false,
                          message: 'Required'
                      },
                      maxLength: {
                        value: 30,
                        message: 'Must have less than 30 Characters'
                      }, 
                  })}
                  autoComplete='off' placeholder='Servings'
                />
                {errors?.servings && <h1 className={styles.InputError}>{errors?.servings?.message}</h1>}
              </div>
              
            </div>

            <div className={styles.IngredientsContainer}>
              <h1>Ingredients</h1>
              {fields.map((field: any, index:  number) => (
                <div key={field.id}>
                  <div className={styles.IngredientInputContainer}>
                    <input {...register(`ingredients.${index}.ingredient`, {
                      required: {
                        value: true,
                        message: 'Required'
                      },
                      maxLength: {
                          value: 200,
                          message: 'Must have less than 200 Characters'
                      }, 
                    })}
                    autoComplete='off' type='text' placeholder='Ingredient'
                    />
                    <button
                    onClick={() => remove(index)}
                    >
                      <Image
                      width={25}
                      height={25}
                      quality={100}
                      alt='print'
                      src='/graphics/icons/icon-trash-outline.svg'
                      />
                    </button>
                  </div>
                  {errors?.ingredients?.[index]?.ingredient && <h1 className={styles.InputError}>{errors?.ingredients?.[index]?.ingredient?.message}</h1>}
                </div>
              ))}
              <button
              onClick={() => {
                if (fields.length < 30){
                    append({
                        ingredient: '',
                    })
                }
              }}              
              >
                <Image
                width={25}
                height={25}
                quality={100}
                alt='print'
                src='/graphics/icons/icon-plus-outline.svg'
                />
              </button>
            </div>

            <div className={styles.IngredientsContainer}>
              <h1>Steps</h1>
              {stepsFields.map((field: any, index:  number) => (
                <div key={field.id}>
                  <div className={styles.IngredientInputContainer}>
                    <textarea {...register(`steps.${index}.step`, {
                      required: {
                        value: true,
                        message: 'Required'
                      },
                      maxLength: {
                          value: 2000,
                          message: 'Must have less than 2000 Characters'
                      }, 
                    })}
                    autoComplete='off' type='text' placeholder='Step'
                    />
                    <button
                    onClick={() => stepsRemove(index)}
                    >
                      <Image
                      width={25}
                      height={25}
                      quality={100}
                      alt='print'
                      src='/graphics/icons/icon-trash-outline.svg'
                      />
                    </button>
                  </div>
                  {errors?.steps?.[index]?.step && <h1 className={styles.InputError}>{errors?.steps?.[index]?.step?.message}</h1>}
                </div>
              ))}
              <button
              onClick={() => {
                if (stepsFields.length < 30){
                    stepsAppend({
                        step: '',
                    })
                }
              }}              
              >
                <Image
                width={25}
                height={25}
                quality={100}
                alt='print'
                src='/graphics/icons/icon-plus-outline.svg'
                />
              </button>
            </div>

            <div className={styles.SubmitContainer}>
              <button className={styles.SubmitButton}>submit</button>
            </div>
          </form>
        </div>
        }
      </main>
    </>
  )
}