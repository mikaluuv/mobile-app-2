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
            {type === "blog" ? "Lees blog" : "Bekijk product"}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 22,
    width: "48%",
    marginBottom: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 6 },
    elevation: 4,
  },
  image: {
    width: "100%",
    height: 140,
    backgroundColor: "#f6f6f6",
  },
  content: {
    padding: 14,
  },
  title: {
    fontWeight: "800",
    fontSize: 16,
    color: "black",
    marginBottom: 7,
  },
  description: {
    color: "black",
    fontSize: 13,
    lineHeight: 18,
    minHeight: 52,
    marginBottom: 10,
  },
  price: {
    color: "#1f4432",
    fontWeight: "800",
    fontSize: 16,
    marginBottom: 12,
  },
  button: {
    backgroundColor: "#1f4432",
    paddingVertical: 11,
    borderRadius: 14,
  },
  buttonText: {
    color: "#fffaf5",
    textAlign: "center",
    fontWeight: "700",
    fontSize: 13,
  },
});
