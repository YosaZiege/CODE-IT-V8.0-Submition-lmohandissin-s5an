
type Card = {
   id: string;
   title: string;
   description: string;
   image: string;
};

const cards: Card[] = [
   {
      id: "1",
      title: "React",
      description: "A JavaScript library for building user interfaces.",
      image: "https://reactjs.org/logo-og.png",
   },
   {
      id: "2",
      title: "TypeScript",
      description: "Typed JavaScript at any scale.",
      image: "https://cdn.worldvectorlogo.com/logos/typescript.svg",
   },
   {
      id: "3",
      title: "Tailwind CSS",
      description: "A utility-first CSS framework for rapidly building custom designs.",
      image: "https://tailwindcss.com/_next/static/media/social-card-large.6c9a5f3b.jpg",
   },
];

export default function CardDisplay() {
   return (
      <div className="min-h-screen bg-gray-50 p-10">
         <h1 className="text-4xl font-bold mb-8 text-center">Tech Cards</h1>
         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {cards.map((card) => (
               <div key={card.id} className="bg-white shadow-md rounded-2xl overflow-hidden">
                  <img src={card.image} alt={card.title} className="w-full h-48 object-cover" />
                  <div className="p-4">
                     <h2 className="text-xl font-semibold mb-2">{card.title}</h2>
                     <p className="text-gray-600">{card.description}</p>
                  </div>
               </div>
            ))}
         </div>
      </div>
   );
}

