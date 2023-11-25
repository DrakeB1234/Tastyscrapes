'use client'

import React from 'react'

export default function Error(error: Error) {

  console.error(error);

  return (
    <div>There has been an error!</div>
  )
}
