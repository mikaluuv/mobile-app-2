import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "./screens/HomeScreen";
import ProductDetail from "./screens/ProductDetail";

const Stack = createNativeStackNavigator();

const products = [
  {
    id: 1,
    type: "product",
    title: "Nike Air Force 1",
    description: "Klassieke witte sneaker",
    price: "€120",
    details: "Comfortabele sneaker die bij alles past.",
  },
  {
    id: 2,
    type: "product",
    title: "Nike Dunk Low",
    description: "Populaire street sneaker",
    price: "€110",
    details: "Perfect voor dagelijks gebruik.",
  },
];

const blogs = [
  {
    id: 1,
    type: "blog",
    title: "Beste sneakers 2026",
    description: "Top sneakers van dit jaar",
    price: "Blog",
    details: "Dit zijn de populairste sneakers van 2026.",
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}
