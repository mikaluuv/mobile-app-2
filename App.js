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
    details: "Een sportieve sneaker die stijl en draagcomfort combineert.",
    image: require("./assets/sne.webp"),
  },
  {
    id: 2,
    type: "product",
    title: "Veja Campo",
    description: "Minimalistische sneaker met een cleane look.",
    price: "EUR 139.95",
    details: "Perfect voor wie een tijdloze sneaker zoekt voor elke outfit.",
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
