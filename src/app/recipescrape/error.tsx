'use client'

import React from 'react'

export default function Error(error: any) {

  console.error(error.error);

  return (
    <div>
      <h1>Recipe Scrape Error!</h1>
      <h1>{error.error.message}</h1>
    </div>
  )
}
