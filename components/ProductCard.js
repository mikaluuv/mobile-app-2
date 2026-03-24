import React from "react";
import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function ProductCard({
  title,
  description,
  price,
  image,
  details,
  type,
}) {
  const navigation = useNavigation();

  return (
    <View style={styles.card}>
      <Image
        source={image || require("../assets/sne.webp")}
        style={styles.image}
      />

      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
        <Text style={styles.price}>{price}</Text>

        <Pressable
          style={styles.button}
          onPress={() =>
            navigation.navigate("Details", {
              product: { title, description, price, image, details, type },
            })
          }
        >
          <Text style={styles.buttonText}>
            {type === "blog" ? "Lees blog" : "Bekijk sneaker"}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff7ed",
    borderRadius: 24,
    width: "48%",
    marginBottom: 18,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#fdba74",
    shadowColor: "#ea580c",
    shadowOpacity: 0.12,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 10 },
    elevation: 6,
  },
  image: {
    width: "100%",
    height: 150,
    backgroundColor: "#ffedd5",
  },
  content: {
    padding: 15,
  },
  title: {
    fontWeight: "800",
    fontSize: 17,
    color: "#7c2d12",
    marginBottom: 8,
  },
  description: {
    color: "#9a3412",
    fontSize: 13,
    lineHeight: 19,
    minHeight: 54,
    marginBottom: 12,
  },
  price: {
    color: "#c2410c",
    fontWeight: "800",
    fontSize: 16,
    marginBottom: 14,
  },
  button: {
    backgroundColor: "#ea580c",
    paddingVertical: 12,
    borderRadius: 14,
  },
  buttonText: {
    color: "#fff7ed",
    textAlign: "center",
    fontWeight: "700",
    fontSize: 13,
  },
});
