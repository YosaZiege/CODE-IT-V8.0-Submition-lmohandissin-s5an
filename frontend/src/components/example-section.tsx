import React from "react";
import { Button } from "@/components/ui/button";
import {
   Card,
   CardDescription,
   CardFooter,
   CardHeader,
   CardTitle,
} from "@/components/ui/card";

const ExamplesSection = () => {
   const examples = [
      {
         title: "Sciences",
         description: "Biologie, Chimie, Physique",
         image:
            "https://readdy.ai/api/search-image?query=A%20modern%20and%20minimalist%20illustration%20of%20scientific%20concepts%20including%20DNA%20strands%2C%20molecular%20structures%2C%20and%20physics%20equations%2C%20arranged%20in%20an%20artistic%20and%20educational%20manner%20with%20soft%20pastel%20colors%20and%20clean%20white%20background&width=400&height=300&seq=2&orientation=landscape",
         icon: "flask",
      },
      {
         title: "Technologie",
         description: "Programmation, IA, Cybersécurité",
         image:
            "https://readdy.ai/api/search-image?query=A%20sleek%20and%20modern%20representation%20of%20technology%20concepts%20with%20binary%20code%2C%20circuit%20patterns%2C%20and%20AI%20neural%20networks%2C%20using%20a%20cohesive%20color%20scheme%20and%20clean%20design%20on%20white%20background&width=400&height=300&seq=3&orientation=landscape",
         icon: "microchip",
      },
      {
         title: "Langues",
         description: "Anglais, Espagnol, Mandarin",
         image:
            "https://readdy.ai/api/search-image?query=An%20elegant%20visualization%20of%20language%20learning%20concepts%20with%20floating%20text%20in%20different%20languages%2C%20speech%20bubbles%2C%20and%20communication%20symbols%2C%20using%20harmonious%20colors%20on%20white%20background&width=400&height=300&seq=4&orientation=landscape",
         icon: "language",
      },
      {
         title: "Business",
         description: "Marketing, Finance, Management",
         image:
            "https://readdy.ai/api/search-image?query=A%20professional%20illustration%20of%20business%20concepts%20including%20graphs%2C%20charts%2C%20and%20business%20icons%2C%20arranged%20in%20a%20modern%20and%20clean%20style%20with%20corporate%20colors%20on%20white%20background&width=400&height=300&seq=5&orientation=landscape",
         icon: "briefcase",
      },
   ];

   return (
      <section className="py-20 px-6 bg-white">
         <div className="container mx-auto">
            <div className="text-center mb-16">
               <h2 className="text-4xl font-bold mb-4 text-gray-900">
                  Exemples de Cartes Mentales
               </h2>
               <p className="text-xl max-w-2xl mx-auto text-gray-600">
                  Découvrez comment MindMapGen peut transformer votre apprentissage
                  dans différents domaines
               </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
               {examples.map((example, index) => (
                  <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                     <div className="relative h-48">
                        <img
                           src={example.image}
                           alt={example.title}
                           className="w-full h-full object-cover"
                        />
                        <div className="absolute top-4 right-4">
                           <div className="w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center">
                              <i className={`fa fa-${example.icon} text-indigo-600`}></i>
                           </div>
                        </div>
                     </div>
                     <CardHeader>
                        <CardTitle className="text-gray-900">{example.title}</CardTitle>
                        <CardDescription>{example.description}</CardDescription>
                     </CardHeader>
                     <CardFooter>
                        <Button variant="outline" className="w-full rounded-button whitespace-nowrap">
                           Voir l&apos;exemple
                        </Button>
                     </CardFooter>
                  </Card>
               ))}
            </div>
         </div>
      </section>
   );
};

export default ExamplesSection;
