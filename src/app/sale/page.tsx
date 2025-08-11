"use client";
import React, { Suspense, useState } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { Menu } from "lucide-react";
import SaleContent from './SaleContent'

export default function page() {
 
  return (
     <Suspense fallback={<div>Loading...</div>}>
    <SaleContent />
    </Suspense>
  );
}
