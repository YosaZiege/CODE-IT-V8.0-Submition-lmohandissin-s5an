import ExamplesSection from "@/components/example-section";
import Hero from "@/components/hero";
import PricingSection from "@/components/pricing-section";

export const metadata = {
   title: 'Home',
}

// const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms)) 

const Homepage = () => {
   return (
      <>
         <Hero />
         <ExamplesSection />
         <PricingSection />
      </>
   )
      
};

export default Homepage;
