"use client";

import React, { Suspense } from "react";
import AllProductPage from './AllProductPage'

export default function page() {
  

  return (
     <Suspense fallback={<div>Loading...</div>}>
   <AllProductPage />
    </Suspense>
  );
}
