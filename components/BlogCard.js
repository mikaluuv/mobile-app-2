import React from "react";
import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function BlogCard({ title, description, image, details, type }) {
  const navigation = useNavigation();
  const blog = { title, description, image, details, type };

  return (
    <Pressable
      style={styles.card}
      onPress={() =>
        navigation.navigate("BlogDetails", {
          product: blog,
        })
      }
    >
      <Image
        source={image || require("../assets/sne.webp")}
        style={styles.image}
      />

      <View style={styles.content}>
        <Text style={styles.tag}>Blog</Text>

        <Text numberOfLines={1} style={styles.title}>
          {title}
        </Text>

        <Text numberOfLines={2} style={styles.description}>
          {description}
        </Text>

        <Text style={styles.linkText}>Lees blog</Text>
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

  tag: {
    color: "#1f4432",
    fontSize: 11,
    fontWeight: "800",
    marginBottom: 6,
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
    marginBottom: 10,
  },

  linkText: {
    color: "#1f4432",
    fontWeight: "700",
    fontSize: 12,
  },
});
