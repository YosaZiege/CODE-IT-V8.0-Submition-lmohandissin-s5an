'use client';

import { Button } from "@/components/ui/button";
import { useAuth } from "./AuthContext";
import router from "next/router";
import { useState } from "react";


export default function Login() {
   const { signInWithGoogle, user } = useAuth();
   const handleGoogleSignIn = async () => {
      try {
         await signInWithGoogle();
      } catch (err) {
      }
   };

   if (user) {
      return null;
   }

   return (
      <Button onClick={handleGoogleSignIn}>
         Google Sign Up
      </Button>
   );
}
