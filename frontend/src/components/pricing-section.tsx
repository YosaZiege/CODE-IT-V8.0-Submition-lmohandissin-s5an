import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const PricingSection = () => {
  const pricingPlans = [
    {
      name: "Gratuit",
      price: "0€",
      description: "Pour commencer à apprendre",
      features: [
        "3 cartes mentales",
        "Ressources de base",
        "Exportation PNG",
        "Support communautaire",
      ],
      badge: "",
      buttonText: "Commencer gratuitement",
    },
    {
      name: "Pro",
      price: "9.99€",
      period: "/mois",
      description: "Pour les apprenants sérieux",
      features: [
        "Cartes mentales illimitées",
        "Ressources premium",
        "Exportation multiple formats",
        "Support prioritaire",
        "Collaboration en temps réel",
        "Analyses avancées",
      ],
      badge: "Populaire",
      buttonText: "Essai gratuit de 14 jours",
    },
    {
      name: "Entreprise",
      price: "49.99€",
      period: "/mois",
      description: "Pour les équipes et organisations",
      features: [
        "Tout dans Pro",
        "Administration d'équipe",
        "SSO & Sécurité avancée",
        "API accès",
        "Formations personnalisées",
        "Support dédié 24/7",
      ],
      badge: "",
      buttonText: "Contacter les ventes",
    },
  ];

  return (
    <section className="py-20 px-6 bg-gray-50">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-gray-900">
            Tarifs Simples et Transparents
          </h2>
          <p className="text-xl max-w-2xl mx-auto text-gray-600">
            Choisissez le plan qui correspond à vos besoins d'apprentissage
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <Card
              key={index}
              className={`relative ${plan.badge === "Populaire" ? "border-indigo-500 border-2" : ""}`}
            >
              {plan.badge && (
                <Badge className="absolute top-4 right-4 bg-indigo-600">
                  {plan.badge}
                </Badge>
              )}
              <CardHeader>
                <CardTitle className="text-2xl text-gray-900">{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                  {plan.period && (
                    <span className="text-sm ml-1 text-gray-600">{plan.period}</span>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-gray-700">
                      <i className="fa fa-check text-green-500 mr-2"></i>
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button
                  className={`w-full rounded-button whitespace-nowrap ${
                    plan.badge === "Populaire" ? "bg-indigo-600 hover:bg-indigo-700" : ""
                  }`}
                  variant={plan.badge === "Populaire" ? "default" : "outline"}
                >
                  {plan.buttonText}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-lg mb-4 text-gray-700">Vous avez des besoins spécifiques ?</p>
          <Button variant="outline" className="rounded-button whitespace-nowrap">
            <i className="fa fa-envelope mr-2"></i>
            Contactez-nous
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
