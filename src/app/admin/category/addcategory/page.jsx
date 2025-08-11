'use client';

import { Suspense } from "react";
import AddCategoryClient from './AddCategoryClient'


export default function page() {
  
  return (
     <Suspense fallback={<div>Loading...</div>}>
      <AddCategoryClient />
    </Suspense>
  );
}

