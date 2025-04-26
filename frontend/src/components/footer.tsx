import React from 'react'

const Footer = () => {
   return (
      <footer className="mt-16 py-12 bg-gray-100 text-gray-600">
         <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
               <div>
                  <h3 className="text-lg font-bold mb-4">MindMapGen</h3>
                  <p className="text-sm">
                     Transformez votre façon d&apos;apprendre avec nos cartes mentales
                     interactives générées par IA.
                  </p>
               </div>

               <div>
                  <h3 className="text-lg font-bold mb-4">Liens Rapides</h3>
                  <ul className="space-y-2 text-sm">
                     <li><a href="#" className="hover:underline cursor-pointer">Accueil</a></li>
                     <li><a href="#" className="hover:underline cursor-pointer">Fonctionnalités</a></li>
                     <li><a href="#" className="hover:underline cursor-pointer">Tarifs</a></li>
                     <li><a href="#" className="hover:underline cursor-pointer">Blog</a></li>
                  </ul>
               </div>

               <div>
                  <h3 className="text-lg font-bold mb-4">Ressources</h3>
                  <ul className="space-y-2 text-sm">
                     <li><a href="#" className="hover:underline cursor-pointer">Centre d&apos;aide</a></li>
                     <li><a href="#" className="hover:underline cursor-pointer">Tutoriels</a></li>
                     <li><a href="#" className="hover:underline cursor-pointer">API</a></li>
                     <li><a href="#" className="hover:underline cursor-pointer">Communauté</a></li>
                  </ul>
               </div>

               <div>
                  <h3 className="text-lg font-bold mb-4">Légal</h3>
                  <ul className="space-y-2 text-sm">
                     <li><a href="#" className="hover:underline cursor-pointer">Conditions d&apos;utilisation</a></li>
                     <li><a href="#" className="hover:underline cursor-pointer">Politique de confidentialité</a></li>
                     <li><a href="#" className="hover:underline cursor-pointer">Cookies</a></li>
                  </ul>
               </div>
            </div>

            <div className="mt-8 pt-8 border-t border-gray-300 flex flex-col md:flex-row justify-between items-center">
               <p className="text-sm">© 2025 MindMapGen. Tous droits réservés.</p>

               <div className="flex space-x-4 mt-4 md:mt-0">
                  <a href="#" className="text-xl hover:text-indigo-500 cursor-pointer">
                     <i className="fab fa-twitter"></i>
                  </a>
                  <a href="#" className="text-xl hover:text-indigo-500 cursor-pointer">
                     <i className="fab fa-facebook"></i>
                  </a>
                  <a href="#" className="text-xl hover:text-indigo-500 cursor-pointer">
                     <i className="fab fa-instagram"></i>
                  </a>
                  <a href="#" className="text-xl hover:text-indigo-500 cursor-pointer">
                     <i className="fab fa-linkedin"></i>
                  </a>
               </div>
            </div>
         </div>
      </footer>
   )
}

export default Footer
