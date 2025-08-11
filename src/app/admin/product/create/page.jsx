'use client';
import React, { Suspense, useEffect, useRef, useState } from 'react';
import CreateProductPage from './CreateProductPage'

export default function page() {
 
  return (
    <Suspense fallback={<div>Loading...</div>}>
   <CreateProductPage />
   </Suspense>
  );
}

