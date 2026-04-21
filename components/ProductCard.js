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
  const screenName = type === "blog" ? "BlogDetails" : "Details";
  const item = { title, description, price, image, details, type };

  return (
    <Pressable
      style={styles.card}
      onPress={() =>
        navigation.navigate(screenName, {
          product: item,
        })
      }
    >
      <Image
        source={image || require("../assets/sne.webp")}
        style={styles.image}
      />

      <View style={styles.content}>
        <Text numberOfLines={1} style={styles.title}>
          {title}
        </Text>

        <Text numberOfLines={2} style={styles.description}>
          {description}
        </Text>

        <View style={styles.bottomRow}>
          <Text style={styles.price}>{price}</Text>

          <View style={styles.tag}>
            <Text style={styles.tagText}>
              {type === "blog" ? "Blog" : "Sneaker"}
            </Text>
          </View>
        </View>

        <Pressable
          style={styles.button}
          onPress={() =>
            navigation.navigate(screenName, {
              product: item,
            })
          }
        >
          <Text style={styles.buttonText}>
            {type === "blog" ? "Lees" : "Bekijk"}
          </Text>
        </Pressable>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 18,
    width: "48%",
    marginBottom: 16,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },

  image: {
    width: "100%",
    height: 120,
    backgroundColor: "#f3f4f6",
  },

  content: {
    padding: 12,
  },

  title: {
    fontWeight: "700",
    fontSize: 15,
    color: "#111827",
    marginBottom: 4,
  },

  description: {
    color: "#6b7280",
    fontSize: 12,
    lineHeight: 16,
    marginBottom: 8,
  },

  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },

  price: {
    color: "#1f4432",
    fontWeight: "800",
    fontSize: 14,
  },

  tag: {
    backgroundColor: "#f3f4f6",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
  },

  tagText: {
    fontSize: 10,
    fontWeight: "700",
    color: "#374151",
  },

  button: {
    borderWidth: 1,
    borderColor: "#1f4432",
    paddingVertical: 8,
    borderRadius: 12,
  },

  buttonText: {
    color: "#1f4432",
    textAlign: "center",
    fontWeight: "700",
    fontSize: 12,
  },
});
