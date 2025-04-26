"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React from 'react'
import '@fortawesome/fontawesome-free/css/all.min.css';
const Header = () => {
   return (
      <header className="px-6 py-4 border-b border-gray-200">
         <div className="container mx-auto flex items-center justify-between">
            <div className="flex items-center">
               <div className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  MindMapGen
               </div>
            </div>

            <div className="flex-1 max-w-2xl mx-8">
               <div className="relative flex items-center">
                  <Input
                     type="text"
                     placeholder="Que voulez-vous apprendre ?"
                     className="w-full py-2 pl-10 pr-4 text-sm bg-white border border-gray-300"

                     onKeyDown={(e) => e.key === "Enter"}
                  />
                  <i className="fa fa-search absolute left-3 text-gray-400"></i>
                  <Button
                     className="ml-2 !rounded-button whitespace-nowrap bg-indigo-600 hover:bg-indigo-700"
                  >
                     Générer
                  </Button>
               </div>
            </div>

            <div className="flex items-center space-x-4">
               <Button variant="outline" className="!rounded-button whitespace-nowrap">
                  <i className="fa fa-user mr-2"></i>
                  Connexion
               </Button>

               <Button className="!rounded-button whitespace-nowrap bg-indigo-600 hover:bg-indigo-700">
                  <i className="fa fa-user-plus mr-2"></i>
                  Inscription
               </Button>
            </div>
         </div>
      </header>
   )
}

export default Header
