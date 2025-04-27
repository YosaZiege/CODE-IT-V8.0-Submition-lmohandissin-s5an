"use client"
import React, { useState, useRef, useEffect } from "react";
import * as echarts from "echarts";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
   Card,
   CardContent,
   CardDescription,
   CardFooter,
   CardHeader,
   CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
   Tooltip,
   TooltipContent,
   TooltipProvider,
   TooltipTrigger,
} from "@/components/ui/tooltip";
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useAuth } from "@/components/shared/auth/AuthContext";
import { useRouter } from "next/navigation";

const App: React.FC = () => {
   const [searchQuery, setSearchQuery] = useState<string>("");
   const [isMapGenerated, setIsMapGenerated] = useState<boolean>(false);
   const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
   const [zoomLevel, setZoomLevel] = useState<number[]>([50]);
   const [progress, setProgress] = useState<number>(67);
   const [isLoading, setIsLoading] = useState<boolean>(false);
   const router = useRouter();
   const [activeTab, setActiveTab] = useState<string>("carte");
   const chartRef = useRef<HTMLDivElement>(null);
   const chartInstance = useRef<echarts.ECharts | null>(null);

   const generateMindMap = async () => {
      if (!searchQuery.trim()) {
         alert("Veuillez entrer un sujet");
         return;
      }

      setIsLoading(true);
      setIsMapGenerated(true);
      setActiveTab("carte");

      try {
         // Create an AbortController for timeout
         const controller = new AbortController();
         const timeoutId = setTimeout(() => controller.abort(), 60000); // 60 seconds timeout

         const response = await fetch('/api/generate-map', {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify({ topic: searchQuery }),
            signal: controller.signal
         });

         clearTimeout(timeoutId);

         if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to generate mindmap');
         }

         const data = await response.json();
         initChart(data);
      } catch (error) {
         console.error('Error:', error);
         alert(error || "Échec de la génération de la carte mentale");
         setIsMapGenerated(false);
      } finally {
         setIsLoading(false);
      }
   };
   const initChart = (data?: any) => {
      if (!chartRef.current) return;

      if (chartInstance.current) {
         chartInstance.current.dispose();
      }

      const chart = echarts.init(
         chartRef.current,
         isDarkMode ? "dark" : undefined,
      );
      chartInstance.current = chart;

      const option = data || {
         animation: false,
         tooltip: {
            trigger: "item",
            formatter: "{b}",
         },
         series: [
            {
               type: "graph",
               layout: "force",
               roam: true,
               label: {
                  show: true,
                  position: "right",
                  formatter: "{b}",
               },
               draggable: true,
               data: [
                  {
                     name: "Machine Learning",
                     symbolSize: 70,
                     category: 0,
                     itemStyle: { color: "#4F46E5" },
                  },
                  {
                     name: "Apprentissage Supervisé",
                     symbolSize: 50,
                     category: 1,
                     itemStyle: { color: "#8B5CF6" },
                  },
                  {
                     name: "Apprentissage Non Supervisé",
                     symbolSize: 50,
                     category: 1,
                     itemStyle: { color: "#8B5CF6" },
                  },
                  {
                     name: "Apprentissage par Renforcement",
                     symbolSize: 50,
                     category: 1,
                     itemStyle: { color: "#8B5CF6" },
                  },
                  {
                     name: "Régression",
                     symbolSize: 35,
                     category: 2,
                     itemStyle: { color: "#EC4899" },
                  },
                  {
                     name: "Classification",
                     symbolSize: 35,
                     category: 2,
                     itemStyle: { color: "#EC4899" },
                  },
                  {
                     name: "Clustering",
                     symbolSize: 35,
                     category: 2,
                     itemStyle: { color: "#EC4899" },
                  },
                  {
                     name: "Réduction de Dimension",
                     symbolSize: 35,
                     category: 2,
                     itemStyle: { color: "#EC4899" },
                  },
                  {
                     name: "Réseaux de Neurones",
                     symbolSize: 40,
                     category: 3,
                     itemStyle: { color: "#10B981" },
                  },
                  {
                     name: "Deep Learning",
                     symbolSize: 40,
                     category: 3,
                     itemStyle: { color: "#10B981" },
                  },
                  {
                     name: "Python",
                     symbolSize: 30,
                     category: 4,
                     itemStyle: { color: "#F59E0B" },
                  },
                  {
                     name: "TensorFlow",
                     symbolSize: 30,
                     category: 4,
                     itemStyle: { color: "#F59E0B" },
                  },
                  {
                     name: "PyTorch",
                     symbolSize: 30,
                     category: 4,
                     itemStyle: { color: "#F59E0B" },
                  },
                  {
                     name: "Scikit-learn",
                     symbolSize: 30,
                     category: 4,
                     itemStyle: { color: "#F59E0B" },
                  },
               ],
               links: [
                  { source: "Machine Learning", target: "Apprentissage Supervisé" },
                  {
                     source: "Machine Learning",
                     target: "Apprentissage Non Supervisé",
                  },
                  {
                     source: "Machine Learning",
                     target: "Apprentissage par Renforcement",
                  },
                  { source: "Apprentissage Supervisé", target: "Régression" },
                  { source: "Apprentissage Supervisé", target: "Classification" },
                  { source: "Apprentissage Non Supervisé", target: "Clustering" },
                  {
                     source: "Apprentissage Non Supervisé",
                     target: "Réduction de Dimension",
                  },
                  {
                     source: "Apprentissage Supervisé",
                     target: "Réseaux de Neurones",
                  },
                  { source: "Réseaux de Neurones", target: "Deep Learning" },
                  { source: "Machine Learning", target: "Python" },
                  { source: "Python", target: "TensorFlow" },
                  { source: "Python", target: "PyTorch" },
                  { source: "Python", target: "Scikit-learn" },
               ],
               categories: [
                  { name: "Concept Principal" },
                  { name: "Domaines" },
                  { name: "Techniques" },
                  { name: "Technologies Avancées" },
                  { name: "Outils" },
               ],
               force: {
                  repulsion: 300,
                  edgeLength: 120,
               },
            },
         ],
      };

      chart.setOption(option);

      window.addEventListener("resize", () => {
         chart.resize();
      });
   };

   const handleZoomChange = (value: number[]) => {
      setZoomLevel(value);
      if (chartInstance.current) {
         const zoom = value[0] / 50;
         chartInstance.current.setOption({
            series: [
               {
                  zoom: zoom,
               },
            ],
         });
      }
   };

   const toggleDarkMode = () => {
      setProgress(67);
      setIsDarkMode(!isDarkMode);
      if (isMapGenerated && chartInstance.current) {
         chartInstance.current.dispose();
         setTimeout(() => {
            initChart();
         }, 100);
      }
   };

   useEffect(() => {
      if (isMapGenerated) {
         initChart();
      }

      return () => {
         if (chartInstance.current) {
            chartInstance.current.dispose();
         }
      };
   }, [isDarkMode]);

   const resources = [
      {
         title: "Cours Complet de Machine Learning",
         source: "Coursera",
         link: "#",
         progress: 80,
         icon: "graduation-cap",
      },
      {
         title: "Introduction à TensorFlow",
         source: "Google AI",
         link: "#",
         progress: 45,
         icon: "code",
      },
      {
         title: "Apprentissage Supervisé en Pratique",
         source: "DataCamp",
         link: "#",
         progress: 60,
         icon: "laptop-code",
      },
      {
         title: "Deep Learning Fondamentaux",
         source: "OpenClassrooms",
         link: "#",
         progress: 30,
         icon: "brain",
      },
      {
         title: "Python pour la Data Science",
         source: "Udemy",
         link: "#",
         progress: 90,
         icon: "python",
      },
   ];

   const { user, loading } = useAuth();

   useEffect(() => {
      if (loading) return;

      if (!user) {
         console.log("No user, redirecting...");
         router.push("/login");
      }
   }, [user, loading, router]);

   return (
      <div
         className={`min-h-screen ${isDarkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"}`}
      >
         {/* Header */}
         <header
            className={`px-6 py-4 border-b ${isDarkMode ? "border-gray-700" : "border-gray-200"}`}
         >
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
                        className={`w-full py-2 pl-10 pr-4 text-sm ${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-300"}`}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && generateMindMap()}
                     />
                     <i className="fa fa-search absolute left-3 text-gray-400"></i>
                     <Button
                        onClick={generateMindMap}
                        className="ml-2 !rounded-button whitespace-nowrap bg-indigo-600 hover:bg-indigo-700"
                        disabled={isLoading}
                     >
                        {isLoading ? (
                           <>
                              <i className="fa fa-spinner fa-spin mr-2"></i>
                              Génération...
                           </>
                        ) : (
                           "Générer"
                        )}
                     </Button>
                  </div>
               </div>

               <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                     <Label htmlFor="dark-mode" className="text-sm">
                        <i className={`fa fa-${isDarkMode ? "moon" : "sun"} mr-2`}></i>
                     </Label>
                     <Switch
                        id="dark-mode"
                        checked={isDarkMode}
                        onCheckedChange={toggleDarkMode}
                     />
                  </div>

                  <Button
                     variant="outline"
                     className="!rounded-button whitespace-nowrap"
                  >
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

         {/* Main Content */}
         <main className="container mx-auto px-6 py-8">
            {!isMapGenerated ? (
               <div className="flex flex-col items-center justify-center min-h-[600px]">
                  <div className="w-full max-w-3xl text-center mb-12">
                     <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                        Générez des Cartes Mentales Interactives
                     </h1>
                     <p className="text-xl mb-8">
                        Saisissez ce que vous souhaitez apprendre et nous créerons
                        instantanément une carte mentale interactive avec les concepts
                        clés, ressources et parcours &apos;apprentissage.
                     </p>
                     <div className="flex justify-center space-x-4">
                        <Button
                           className="!rounded-button whitespace-nowrap bg-indigo-600 hover:bg-indigo-700"
                           onClick={() =>
                              setSearchQuery("Apprendre le machine learning")
                           }
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
                        src="https://readdy.ai/api/search-image?query=A%20modern%20and%20elegant%203D%20visualization%20of%20a%20mind%20map%20with%20interconnected%20nodes%2C%20showing%20a%20learning%20path%20for%20a%20complex%20subject.%20The%20nodes%20are%20colorful%20spheres%20connected%20by%20glowing%20lines%2C%20with%20a%20clean%20white%20background%20and%20professional%20lighting%2C%20suitable%20for%20an%20educational%20website.&width=800&height=450&seq=1&orientation=landscape"
                        alt="Exemple de carte mentale"
                        className="w-full h-auto rounded-xl shadow-xl object-cover object-top"
                     />
                  </div>

                  <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
                     <Card
                        className={`${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white"}`}
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
                              parcours d&apos;apprentissage logique et efficace.
                           </p>
                        </CardContent>
                     </Card>

                     <Card
                        className={`${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white"}`}
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
                        className={`${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white"}`}
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
            ) : (
               <div className="flex flex-col h-[800px]">
                  <Tabs
                     defaultValue="carte"
                     className="w-full"
                     value={activeTab}
                     onValueChange={setActiveTab}
                  >
                     <div className="flex justify-between items-center mb-4">
                        <TabsList>
                           <TabsTrigger
                              value="carte"
                              className="!rounded-button whitespace-nowrap"
                           >
                              <i className="fa fa-sitemap mr-2"></i>
                              Carte Mentale
                           </TabsTrigger>
                           <TabsTrigger
                              value="ressources"
                              className="!rounded-button whitespace-nowrap"
                           >
                              <i className="fa fa-book mr-2"></i>
                              Ressources
                           </TabsTrigger>
                           <TabsTrigger
                              value="progression"
                              className="!rounded-button whitespace-nowrap"
                           >
                              <i className="fa fa-chart-line mr-2"></i>
                              Progression
                           </TabsTrigger>
                        </TabsList>

                        <div className="flex items-center space-x-4">
                           <Button
                              variant="outline"
                              size="sm"
                              className="!rounded-button whitespace-nowrap"
                           >
                              <i className="fa fa-save mr-2"></i>
                              Sauvegarder
                           </Button>
                           <Button
                              variant="outline"
                              size="sm"
                              className="!rounded-button whitespace-nowrap"
                           >
                              <i className="fa fa-share-alt mr-2"></i>
                              Partager
                           </Button>
                           <Button
                              variant="outline"
                              size="sm"
                              className="!rounded-button whitespace-nowrap"
                           >
                              <i className="fa fa-download mr-2"></i>
                              Exporter
                           </Button>
                        </div>
                     </div>

                     <TabsContent value="carte" className="flex h-full">
                        <div className="flex-1 relative">
                           <div
                              ref={chartRef}
                              className="w-full h-full rounded-lg border"
                           ></div>

                           <div
                              className={`absolute bottom-4 left-4 p-4 rounded-lg ${isDarkMode ? "bg-gray-800" : "bg-white"} shadow-lg`}
                           >
                              <div className="flex items-center mb-2">
                                 <span className="mr-2">Zoom:</span>
                                 <Slider
                                    value={zoomLevel}
                                    onValueChange={handleZoomChange}
                                    max={100}
                                    min={10}
                                    step={1}
                                    className="w-32"
                                 />
                              </div>
                              <div className="flex space-x-2">
                                 <TooltipProvider>
                                    <Tooltip>
                                       <TooltipTrigger asChild>
                                          <Button
                                             size="sm"
                                             variant="outline"
                                             className="!rounded-button whitespace-nowrap cursor-pointer"
                                          >
                                             <i className="fa fa-expand"></i>
                                          </Button>
                                       </TooltipTrigger>
                                       <TooltipContent>
                                          <p>Plein écran</p>
                                       </TooltipContent>
                                    </Tooltip>
                                 </TooltipProvider>

                                 <TooltipProvider>
                                    <Tooltip>
                                       <TooltipTrigger asChild>
                                          <Button
                                             size="sm"
                                             variant="outline"
                                             className="!rounded-button whitespace-nowrap cursor-pointer"
                                          >
                                             <i className="fa fa-redo"></i>
                                          </Button>
                                       </TooltipTrigger>
                                       <TooltipContent>
                                          <p>Réinitialiser</p>
                                       </TooltipContent>
                                    </Tooltip>
                                 </TooltipProvider>
                              </div>
                           </div>
                        </div>

                        <div
                           className={`w-80 ml-4 p-4 rounded-lg ${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"} border`}
                        >
                           <h3 className="font-bold text-lg mb-4">Légende</h3>
                           <div className="space-y-3">
                              <div className="flex items-center">
                                 <div className="w-4 h-4 rounded-full bg-indigo-600 mr-2"></div>
                                 <span>Concept Principal</span>
                              </div>
                              <div className="flex items-center">
                                 <div className="w-4 h-4 rounded-full bg-purple-600 mr-2"></div>
                                 <span>Domaines</span>
                              </div>
                              <div className="flex items-center">
                                 <div className="w-4 h-4 rounded-full bg-pink-600 mr-2"></div>
                                 <span>Techniques</span>
                              </div>
                              <div className="flex items-center">
                                 <div className="w-4 h-4 rounded-full bg-green-600 mr-2"></div>
                                 <span>Technologies Avancées</span>
                              </div>
                              <div className="flex items-center">
                                 <div className="w-4 h-4 rounded-full bg-amber-500 mr-2"></div>
                                 <span>Outils</span>
                              </div>
                           </div>

                           <div className="mt-6">
                              <h3 className="font-bold text-lg mb-4">Filtres</h3>
                              <div className="space-y-2">
                                 <div className="flex items-center">
                                    <Switch id="filter-concepts" defaultChecked />
                                    <Label htmlFor="filter-concepts" className="ml-2">
                                       Concepts
                                    </Label>
                                 </div>
                                 <div className="flex items-center">
                                    <Switch id="filter-resources" defaultChecked />
                                    <Label htmlFor="filter-resources" className="ml-2">
                                       Ressources
                                    </Label>
                                 </div>
                                 <div className="flex items-center">
                                    <Switch id="filter-exercises" defaultChecked />
                                    <Label htmlFor="filter-exercises" className="ml-2">
                                       Exercices
                                    </Label>
                                 </div>
                              </div>
                           </div>

                           <div className="mt-6">
                              <h3 className="font-bold text-lg mb-4">
                                 Progression Globale
                              </h3>
                              <Progress value={progress} className="h-2 mb-2" />
                              <div className="text-sm text-right">{progress}%</div>
                           </div>
                        </div>
                     </TabsContent>

                     <TabsContent value="ressources" className="h-full">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                           {resources.map((resource, index) => (
                              <Card
                                 key={index}
                                 className={`${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white"}`}
                              >
                                 <CardHeader className="pb-2">
                                    <div className="flex justify-between items-start">
                                       <div>
                                          <CardTitle className="text-lg">
                                             {resource.title}
                                          </CardTitle>
                                          <CardDescription>
                                             <Badge variant="outline" className="mt-1">
                                                <i
                                                   className={`fa fa-${resource.icon} mr-1`}
                                                ></i>
                                                {resource.source}
                                             </Badge>
                                          </CardDescription>
                                       </div>
                                       <Button
                                          size="sm"
                                          variant="ghost"
                                          className="!rounded-button whitespace-nowrap cursor-pointer"
                                       >
                                          <i className="fa fa-bookmark"></i>
                                       </Button>
                                    </div>
                                 </CardHeader>
                                 <CardContent>
                                    <div className="mt-2">
                                       <div className="flex justify-between text-sm mb-1">
                                          <span>Progression</span>
                                          <span>{resource.progress}%</span>
                                       </div>
                                       <Progress value={resource.progress} className="h-1" />
                                    </div>
                                 </CardContent>
                                 <CardFooter className="pt-0">
                                    <Button
                                       size="sm"
                                       variant="outline"
                                       className="w-full !rounded-button whitespace-nowrap cursor-pointer"
                                    >
                                       <i className="fa fa-external-link-alt mr-2"></i>
                                       Accéder
                                    </Button>
                                 </CardFooter>
                              </Card>
                           ))}
                        </div>
                     </TabsContent>

                     <TabsContent value="progression" className="h-full">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                           <Card
                              className={`col-span-2 ${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white"}`}
                           >
                              <CardHeader>
                                 <CardTitle>Progression par Domaine</CardTitle>
                              </CardHeader>
                              <CardContent>
                                 <div className="space-y-4">
                                    <div>
                                       <div className="flex justify-between mb-1">
                                          <span>Apprentissage Supervisé</span>
                                          <span>75%</span>
                                       </div>
                                       <Progress value={75} className="h-2" />
                                    </div>
                                    <div>
                                       <div className="flex justify-between mb-1">
                                          <span>Apprentissage Non Supervisé</span>
                                          <span>45%</span>
                                       </div>
                                       <Progress value={45} className="h-2" />
                                    </div>
                                    <div>
                                       <div className="flex justify-between mb-1">
                                          <span>Apprentissage par Renforcement</span>
                                          <span>30%</span>
                                       </div>
                                       <Progress value={30} className="h-2" />
                                    </div>
                                    <div>
                                       <div className="flex justify-between mb-1">
                                          <span>Deep Learning</span>
                                          <span>60%</span>
                                       </div>
                                       <Progress value={60} className="h-2" />
                                    </div>
                                    <div>
                                       <div className="flex justify-between mb-1">
                                          <span>Outils et Bibliothèques</span>
                                          <span>80%</span>
                                       </div>
                                       <Progress value={80} className="h-2" />
                                    </div>
                                 </div>
                              </CardContent>
                           </Card>

                           <Card
                              className={`${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white"}`}
                           >
                              <CardHeader>
                                 <CardTitle>Badges et Accomplissements</CardTitle>
                              </CardHeader>
                              <CardContent>
                                 <div className="grid grid-cols-2 gap-4">
                                    <div className="flex flex-col items-center">
                                       <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center mb-2">
                                          <i className="fa fa-rocket text-2xl text-indigo-600"></i>
                                       </div>
                                       <span className="text-sm text-center">Débutant</span>
                                    </div>
                                    <div className="flex flex-col items-center">
                                       <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center mb-2">
                                          <i className="fa fa-code text-2xl text-purple-600"></i>
                                       </div>
                                       <span className="text-sm text-center">
                                          Codeur Python
                                       </span>
                                    </div>
                                    <div className="flex flex-col items-center">
                                       <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center mb-2">
                                          <i className="fa fa-brain text-2xl text-gray-400"></i>
                                       </div>
                                       <span className="text-sm text-center">Expert ML</span>
                                    </div>
                                    <div className="flex flex-col items-center">
                                       <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center mb-2">
                                          <i className="fa fa-robot text-2xl text-gray-400"></i>
                                       </div>
                                       <span className="text-sm text-center">Maître IA</span>
                                    </div>
                                 </div>
                              </CardContent>
                           </Card>

                           <Card
                              className={`col-span-3 ${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white"}`}
                           >
                              <CardHeader>
                                 <CardTitle>Activité Récente</CardTitle>
                              </CardHeader>
                              <CardContent>
                                 <ScrollArea className="h-[200px]">
                                    <div className="space-y-4">
                                       {[1, 2, 3, 4, 5].map((item) => (
                                          <div
                                             key={item}
                                             className="flex items-start space-x-4"
                                          >

                                             <div className="space-y-1">
                                                <p className="text-sm font-medium">
                                                   Concept complété: Classification
                                                </p>
                                                <p className="text-xs text-muted-foreground">
                                                   Il y a {item} jour{item > 1 ? "s" : ""}
                                                </p>
                                             </div>
                                          </div>
                                       ))}
                                    </div>
                                 </ScrollArea>
                              </CardContent>
                           </Card>
                        </div>
                     </TabsContent>
                  </Tabs>
               </div>
            )}
         </main>

         {/* Footer */}
         <footer
            className={`mt-16 py-12 ${isDarkMode ? "bg-gray-800 text-gray-300" : "bg-gray-100 text-gray-600"}`}
         >
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
                        <li>
                           <a href="#" className="hover:underline cursor-pointer">
                              Accueil
                           </a>
                        </li>
                        <li>
                           <a href="#" className="hover:underline cursor-pointer">
                              Fonctionnalités
                           </a>
                        </li>
                        <li>
                           <a href="#" className="hover:underline cursor-pointer">
                              Tarifs
                           </a>
                        </li>
                        <li>
                           <a href="#" className="hover:underline cursor-pointer">
                              Blog
                           </a>
                        </li>
                     </ul>
                  </div>

                  <div>
                     <h3 className="text-lg font-bold mb-4">Ressources</h3>
                     <ul className="space-y-2 text-sm">
                        <li>
                           <a href="#" className="hover:underline cursor-pointer">
                              Centre d&apos;aide
                           </a>
                        </li>
                        <li>
                           <a href="#" className="hover:underline cursor-pointer">
                              Tutoriels
                           </a>
                        </li>
                        <li>
                           <a href="#" className="hover:underline cursor-pointer">
                              API
                           </a>
                        </li>
                        <li>
                           <a href="#" className="hover:underline cursor-pointer">
                              Communauté
                           </a>
                        </li>
                     </ul>
                  </div>

                  <div>
                     <h3 className="text-lg font-bold mb-4">Légal</h3>
                     <ul className="space-y-2 text-sm">
                        <li>
                           <a href="#" className="hover:underline cursor-pointer">
                              Conditions d&apos;utilisation
                           </a>
                        </li>
                        <li>
                           <a href="#" className="hover:underline cursor-pointer">
                              Politique de confidentialité
                           </a>
                        </li>
                        <li>
                           <a href="#" className="hover:underline cursor-pointer">
                              Cookies
                           </a>
                        </li>
                     </ul>
                  </div>
               </div>

               <div className="mt-8 pt-8 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center">
                  <p className="text-sm">© 2025 MindMapGen. Tous droits réservés.</p>

                  <div className="flex space-x-4 mt-4 md:mt-0">
                     <a
                        href="#"
                        className="text-xl hover:text-indigo-500 cursor-pointer"
                     >
                        <i className="fab fa-twitter"></i>
                     </a>
                     <a
                        href="#"
                        className="text-xl hover:text-indigo-500 cursor-pointer"
                     >
                        <i className="fab fa-facebook"></i>
                     </a>
                     <a
                        href="#"
                        className="text-xl hover:text-indigo-500 cursor-pointer"
                     >
                        <i className="fab fa-instagram"></i>
                     </a>
                     <a
                        href="#"
                        className="text-xl hover:text-indigo-500 cursor-pointer"
                     >
                        <i className="fab fa-linkedin"></i>
                     </a>
                  </div>
               </div>
            </div>
         </footer>
      </div>
   );
};

export default App;
