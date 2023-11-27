'use client'

import React, { useEffect, useState } from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'

import { GetRecipesID, EditRecipe } from '@/db/dbhelpers'
import styles from './recipeboxedit.module.css'
import Prompt from '@/components/prompt'

type Inputs = {
  id: string | undefined,
  recipeImg: any,
  recipeName: string | undefined,
  prepTime: string | undefined,
  cookTime: string | undefined,
  totalTime: string | undefined,
  servings: string | undefined,
  ingredientsData: {ingredient: string}[] | undefined,
  stepsData: {step: string}[] | undefined,
  notesData: string | undefined,
}

export default function RecipeBoxEdit(params: any) {

  const router = useRouter();

  const [data, setData] = useState<any>({});
  const [prompt, setPrompt] = useState(false);

  useEffect(() =>{
    async function GetData() {
      let res: any = await GetRecipesID(Number(params.params.id));
      if (res.status == 'error') { return router.replace('/recipebox') }
      if (res.data) { 
        setData(res.data); 
        // Set default values of recipe
        setValue('id', res.data.id);
        setValue('recipeName', res.data.recipeName);
        setValue('prepTime', res.data.prepTime);
        setValue('cookTime', res.data.cookTime);
        setValue('totalTime', res.data.totalTime);
        setValue('servings', res.data.servings);
        // Set ingredients
        res.data.ingredientsData?.forEach((e: any) => {
          append({ingredient: e});
        });
        // Set steps
        res.data.stepsData?.forEach((e: any) => {
          stepsAppend({step: e});
        });
        setValue('notesData', res.data.notesData);

      }
    }
    // Call function in use effect hook
    GetData();
  }, []);

  const { control, register, handleSubmit, setValue, formState: { errors } } = useForm<Inputs>();

  const { fields, append, remove } = useFieldArray({
    name: 'ingredientsData',
    control,
    rules: {
        maxLength: {
          value: 40,
          message: 'Must have less than 40 ingredients'
        }
    }
  });

  const { fields: stepsFields, append: stepsAppend, remove: stepsRemove } = useFieldArray({
    name: 'stepsData',
    control,
    rules: {
        maxLength: {
          value: 30,
          message: 'Must have less than 30 steps'
        }
    }
  });

  const onSubmit = (formData: Inputs) => {
    // fix arrays
    let temp: any[] = [];

    // Convert fields to arrays for DB, replace all \n expcept for notes
    // Ingredients
    formData.ingredientsData?.forEach((e: any) => { temp.push(e.ingredient.replace('\n', '')) });
    if (temp.length < 1) { formData.ingredientsData = undefined }
    else { formData.ingredientsData = temp };
    temp = [];
    // Steps
    formData.stepsData?.forEach((e: any) => { temp.push(e.step.replace('\n', '')) });
    if (temp.length < 1) { formData.stepsData = undefined }
    else { formData.stepsData = temp };
    temp = [];
    // Notes
    if (formData.notesData == '') { formData.notesData = undefined }

    // Reconstruct Object to fit table schema
    const res = EditRecipe({
      collection: data.collection,
      recipeImg: data.recipeImg,
      recipeImgFile: data.recipeImgFile,
      recipeCreator: data.recipeCreator,
      originURL: data.originURL,
      originHostname: data.originHostname,
      id: data.id,
      recipeName: formData.recipeName,
      prepTime: formData.prepTime,
      cookTime: formData.cookTime,
      totalTime: formData.totalTime,
      servings: formData.servings,
      ingredientsData: formData.ingredientsData,
      stepsData: formData.stepsData,
      notesData: formData.notesData,
    });
    location.replace(`/recipebox/${data.id}`);
  };

  // Prevents enter key from submitting form
  const checkKeyDown = (e: any) => {
    if (e.target.id !== 'NotesInput' && e.key === 'Enter') e.preventDefault();
  };

  const AddImage = (e: any) => {
    e.preventDefault();
    const file = (e.target[0].files[0]);
    // Add image into data if file is selected and is JPG, JPEG, or PNG
    if (file && (file.type == 'image/png' || file.type == 'image/jpeg' || file.type == 'image/jpg')) {
      setData((prev: any) => ({...prev, recipeImgFile: file }));
    };  
    setPrompt(false);
  };

  const RemoveImage = () => {
    return setData((prev: any) => ({...prev, recipeImgFile: undefined }));
  }

  return (
    <main>
      <Prompt open={prompt} setOpen={setPrompt} callback={AddImage}>
        <h2>Add Image</h2>
        <input type='file' className='InputStyle' accept='image/jpeg, image/png' />
      </Prompt>
      <div className={styles.RecipeMain + ' WidthAdjustParent'}>
        <form className={styles.RecipeParent + ' WidthAdjustContent'}
        onSubmit={handleSubmit(onSubmit)} onKeyDown={(e: any) => checkKeyDown(e)}
        >

          <div className={styles.RecipeButtonsParent}> 
            <div className={styles.RecipeButtonsContainer}>
              <Link href={`/recipebox/${data.id}`} className='ButtonParent RedButton'>
                <Image 
                width={20}
                height={20}
                quality={100}
                alt='->'
                src={'/graphics/icons/icon-exit-outline.svg'}
                />
              </Link>
              <h3>Edit</h3>
              <button className={styles.SubmitButton + ' ButtonParent'}
              type='submit'
              >
                <h4>Save Changes</h4>
              </button>
            </div>
          </div>

          <div className={styles.RecipeTitleContainer}>
            <div className={styles.RecipeImageContainer}>
              <Image 
              width={200}
              height={200}
              quality={100}
              alt=''
              src={data.recipeImgFile ? URL.createObjectURL(data.recipeImgFile) : (data.recipeImg ? data.recipeImg : '/graphics/images/Missing-Image.png')}
              onClick={() => setPrompt(true)}
              />
              {!data.recipeImgFile
              ?
              <Image 
              width={20}
              height={20}
              quality={100}
              alt='->'
              src={'/graphics/icons/icon-plus-outline.svg'}
              onClick={() => setPrompt(true)}
              />
              :
              <Image 
              width={20}
              height={20}
              quality={100}
              alt='->'
              src={'/graphics/icons/icon-exit-outline.svg'}
              onClick={() => RemoveImage()}
              />
              }
            </div>

            <div className={styles.RecipeTitleText}>
              <label htmlFor='recipeName' className='InputLabel'>Recipe Name</label>
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
                autoComplete='off' placeholder='Recipe Name' className='InputStyle'
              />
              {errors?.recipeName && <h1 className={styles.InputError}>{errors?.recipeName?.message}</h1>}
            </div>

          </div>

          <div className={styles.RecipeNutritionContainer}>

            <div className={styles.RecipeNutritionItem}>
              <label htmlFor='prepTime' className='InputLabel'>Prep Time</label>
              <input {...register('prepTime', {
                    maxLength: {
                      value: 30,
                      message: 'Must have less than 30 Characters'
                    }, 
                })}
                autoComplete='off' placeholder='-' className='InputStyle'
              />
              {errors?.prepTime && <h1 className={styles.InputError}>{errors?.prepTime?.message}</h1>}
            </div>
            <div className={styles.RecipeNutritionItem}>
              <label htmlFor='cookTime' className='InputLabel'>Cook Time</label>
              <input {...register('cookTime', {
                    maxLength: {
                      value: 30,
                      message: 'Must have less than 30 Characters'
                    }, 
                })}
                autoComplete='off' placeholder='-' className='InputStyle'
              />
              {errors?.cookTime && <h1 className={styles.InputError}>{errors?.cookTime?.message}</h1>}
            </div>
            <div className={styles.RecipeNutritionItem}>
              <label htmlFor='totalTime' className='InputLabel'>Total Time</label>
              <input {...register('totalTime', {
                    maxLength: {
                      value: 30,
                      message: 'Must have less than 30 Characters'
                    }, 
                })}
                autoComplete='off' placeholder='-' className='InputStyle'
              />
              {errors?.totalTime && <h1 className={styles.InputError}>{errors?.totalTime?.message}</h1>}
            </div>
            <div className={styles.RecipeNutritionItem}>
              <label htmlFor='servings' className='InputLabel'>Servings</label>
              <input {...register('servings', {
                    maxLength: {
                      value: 30,
                      message: 'Must have less than 30 Characters'
                    }, 
                })}
                autoComplete='off' placeholder='-' className='InputStyle'
              />
              {errors?.servings && <h1 className={styles.InputError}>{errors?.servings?.message}</h1>}
            </div>

          </div>
          <div className={styles.RecipeDataParent}>

            <div>
              <h3>Ingredients</h3>
              {fields.map((field: any, index:  number) => (
                <div key={field.id}>
                  <div className={styles.DataInputContainer}>
                    <input {...register(`ingredientsData.${index}.ingredient`, {
                      required: {
                        value: true,
                        message: 'Required'
                      },
                      maxLength: {
                          value: 200,
                          message: 'Must have less than 200 Characters'
                      }, 
                    })}
                    autoComplete='off' type='text' placeholder='Ingredient' className='InputStyle'
                    />
                    <button
                    type='button'
                    onClick={() => remove(index)}
                    >
                      <Image
                      width={20}
                      height={20}
                      quality={100}
                      alt='print'
                      src='/graphics/icons/icon-trash-outline.svg'
                      />
                    </button>
                  </div>
                  {errors?.ingredientsData?.[index]?.ingredient && <h1 className={styles.InputError}>{errors?.ingredientsData?.[index]?.ingredient?.message}</h1>}
                </div>
              ))}
              <button
              className={styles.AddFieldButton + ' ButtonParent GreenButton'}
              type='button'
              onClick={() => {
                if (fields.length < 30){ append({ingredient: ''}) }
              }}              
              >
                <h4>Ingredient</h4>
                <Image
                width={20}
                height={20}
                quality={100}
                alt='print'
                src='/graphics/icons/icon-plus-outline.svg'
                />
              </button>
              {errors?.ingredientsData && <h1 className={styles.InputError}>{errors?.ingredientsData?.message}</h1>}
            </div>

            <div>
              <h3>Steps</h3>
              {stepsFields.map((field: any, index:  number) => (
                <div key={field.id}>
                  <div className={styles.DataInputContainer}>
                    <textarea {...register(`stepsData.${index}.step`, {
                      required: {
                        value: true,
                        message: 'Required'
                      },
                      maxLength: {
                          value: 500,
                          message: 'Must have less than 500 Characters'
                      }, 
                    })}
                    autoComplete='off' placeholder={`Step ${index + 1}`} className='InputStyle'
                    />
                    <button
                    type='button'
                    onClick={() => stepsRemove(index)}
                    >
                      <Image
                      width={20}
                      height={20}
                      quality={100}
                      alt='print'
                      src='/graphics/icons/icon-trash-outline.svg'
                      />
                    </button>
                  </div>
                  {errors?.stepsData?.[index]?.step && <h1 className={styles.InputError}>{errors?.stepsData?.[index]?.step?.message}</h1>}
                </div>
              ))}
              <button
              className={styles.AddFieldButton + ' ButtonParent GreenButton'}
              type='button'
              onClick={() => {
                if (stepsFields.length < 30){ stepsAppend({step: ''}) }
              }}              
              >
                <h4>Step</h4>
                <Image
                width={20}
                height={20}
                quality={100}
                alt='print'
                src='/graphics/icons/icon-plus-outline.svg'
                />
              </button>
            </div>

          </div>

          <div className={styles.RecipeNoteContainer}>
            <h3>Notes</h3>
            <textarea {...register('notesData', {
                  maxLength: {
                    value: 1000,
                    message: 'Must have less than 1000 Characters'
                  }, 
              })}
              autoComplete='off' placeholder='Notes' className='InputStyle' id='NotesInput'
            />
            {errors?.notesData && <h1 className={styles.InputError}>{errors?.notesData?.message}</h1>}
          </div>

        </form>
      </div>
    </main>
  )
}
