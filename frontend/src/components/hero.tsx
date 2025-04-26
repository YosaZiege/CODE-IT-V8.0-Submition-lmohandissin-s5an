import React from 'react'
import { Button } from './ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'

const Hero = () => {
   return (
      <div className="flex flex-col items-center justify-center min-h-[600px] mt-10">
         <div className="w-full max-w-3xl text-center mb-12">
            <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
               Générez des Cartes Mentales Interactives
            </h1>
            <p className="text-xl mb-8">
               Saisissez ce que vous souhaitez apprendre et nous créerons
               instantanément une carte mentale interactive avec les concepts
               clés, ressources et parcours d'apprentissage.
            </p>
            <div className="flex justify-center space-x-4">
               <Button
                  className="!rounded-button whitespace-nowrap bg-indigo-600 hover:bg-indigo-700"

               >
                  <i className="fa fa-lightbulb mr-2"></i>
                  Essayer un exemple
               </Button>
               <Button
                  variant="outline"
                  className="!rounded-button whitespace-nowrap"
               >
                  <i className="fa fa-info-circle mr-2"></i>
                  Comment ça marche
               </Button>
            </div>
         </div>

         <div className="w-full">
            <img
               src="images/hero_image.jpg" alt="Exemple de carte mentale"
               className="w-full h-auto rounded-xl shadow-xl object-cover object-top"
            />
         </div>

         <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
            <Card
               className={"bg-white"}
            >
               <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center mb-4">
                     <i className="fa fa-brain text-2xl text-indigo-600"></i>
                  </div>
                  <CardTitle>Structurez votre apprentissage</CardTitle>
               </CardHeader>
               <CardContent>
                  <p>
                     Visualisez les connexions entre les concepts et créez un
                     parcours d'apprentissage logique et efficace.
                  </p>
               </CardContent>
            </Card>

            <Card
               className={` bg-white`}
            >
               <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mb-4">
                     <i className="fa fa-book text-2xl text-purple-600"></i>
                  </div>
                  <CardTitle>Ressources personnalisées</CardTitle>
               </CardHeader>
               <CardContent>
                  <p>
                     Accédez à des ressources soigneusement sélectionnées pour
                     chaque concept de votre carte mentale.
                  </p>
               </CardContent>
            </Card>

            <Card
               className={`bg-white`}
            >
               <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center mb-4">
                     <i className="fa fa-chart-line text-2xl text-pink-600"></i>
                  </div>
                  <CardTitle>Suivez votre progression</CardTitle>
               </CardHeader>
               <CardContent>
                  <p>
                     Marquez les concepts maîtrisés et visualisez votre
                     progression à travers la carte mentale.
                  </p>
               </CardContent>
            </Card>
         </div>
      </div>
   )
}

export default Hero
