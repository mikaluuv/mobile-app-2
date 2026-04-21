import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "./screens/HomeScreen";
import ProductDetail from "./screens/ProductDetail";
import BlogDetailsScreen from "./screens/BlogDetailsScreen";

const Stack = createNativeStackNavigator();

const products = [
  {
    id: 1,
    type: "product",
    title: "New Balance 530",
    description: "Retro sneaker met modern dagelijks comfort.",
    price: "EUR 119.95",
    category: "Lifestyle",
    details: "Een sportieve sneaker die stijl en draagcomfort combineert.",
    image: require("./assets/sne.webp"),
  },
  {
    id: 2,
    type: "product",
    title: "Veja Campo",
    description: "Minimalistische sneaker met een cleane look.",
    price: "EUR 139.95",
    category: "Minimalistisch",
    details: "Perfect voor wie een tijdloze sneaker zoekt voor elke outfit.",
    image: require("./assets/sne.webp"),
  },
  {
    id: 3,
    type: "product",
    title: "Nike Dunk Low",
    description: "Populaire sneaker met een sportieve streetwear look.",
    price: "USD 129.95",
    category: "Streetwear",
    details: "Een comfortabele sneaker die goed past bij dagelijkse outfits.",
    image: require("./assets/sne.webp"),
  },
  {
    id: 4,
    type: "product",
    title: "Adidas Samba OG",
    description: "Retro sneaker met een herkenbaar en tijdloos design.",
    price: "USD 109.95",
    category: "Retro",
    details: "Een klassiek model dat makkelijk te combineren is.",
    image: require("./assets/sne.webp"),
  },
];

const blogs = [
  {
    id: 1,
    type: "blog",
    title: "Top sneaker trends van dit jaar",
    description: "Ontdek de populairste sneakers en stijlen van het moment.",
    price: "Blog",
    details: "Een blog over de nieuwste sneaker trends, kleuren en modellen.",
    image: require("./assets/sne.webp"),
  },
  {
    id: 2,
    type: "blog",
    title: "Zo onderhoud je je sneakers",
    description: "Tips om je sneakers langer proper en mooi te houden.",
    price: "Blog",
    details:
      "Gebruik een zachte borstel, lauw water en milde zeep om je sneakers voorzichtig schoon te maken.",
    image: require("./assets/sne.webp"),
  },
  {
    id: 3,
    type: "blog",
    title: "Welke sneaker past bij jouw stijl?",
    description: "Ontdek welk model het best bij jouw outfits past.",
    price: "Blog",
    details:
      "Kijk naar kleur, vorm en materiaal om een sneaker te kiezen die bij jouw stijl past.",
    image: require("./assets/sne.webp"),
  },
  {
    id: 4,
    type: "blog",
    title: "Waarom retro sneakers populair blijven",
    description: "Retro sneakers blijven populair door hun herkenbare look.",
    price: "Blog",
    details:
      "Veel retro modellen combineren een klassiek design met modern comfort.",
    image: require("./assets/sne.webp"),
  },
];

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          initialParams={{ products, blogs }}
        />
        <Stack.Screen name="Details" component={ProductDetail} />
        <Stack.Screen name="BlogDetails" component={BlogDetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
