"use client"
import ExamplesSection from "@/components/example-section";
import Hero from "@/components/hero";
import PricingSection from "@/components/pricing-section";
import { useAuth } from "@/components/shared/auth/AuthContext";
import { redirect } from "next/navigation";



// const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms)) 

const Homepage = () => {
   const { user } = useAuth();

  

   if (!user) {
      redirect("/login");
   }
   return (
      <>
         <Hero />
         <ExamplesSection />
         <PricingSection />
      </>
   )

};

export default Homepage;
