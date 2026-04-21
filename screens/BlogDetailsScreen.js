import React from "react";
import { StatusBar } from "expo-status-bar";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  Pressable,
} from "react-native";

const BlogDetailsScreen = ({ route, navigation }) => {
  const { product } = route.params || {};

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <StatusBar style="dark" />

      <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backText}>← Terug</Text>
      </Pressable>

      <Image
        source={product?.image || require("../assets/sne.webp")}
        style={styles.image}
      />

      <View style={styles.mainCard}>
        <Text style={styles.label}>Blog details</Text>
        <Text style={styles.title}>{product?.title || "Sneaker blog"}</Text>

        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Korte beschrijving</Text>
          <Text style={styles.description}>
            {product?.description || "Geen beschrijving beschikbaar."}
          </Text>
        </View>

        <View style={styles.sectionCardAlt}>
          <Text style={styles.sectionTitle}>Inhoud</Text>
          <Text style={styles.infoText}>
            {product?.details || "Geen bloginhoud beschikbaar."}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f4f6",
  },
  content: {
    padding: 16,
    paddingBottom: 36,
  },
  backButton: {
    alignSelf: "flex-start",
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 14,
    marginBottom: 16,
  },
  backText: {
    color: "#111827",
    textAlign: "center",
    fontWeight: "700",
    fontSize: 14,
  },
  image: {
    width: "100%",
    height: 240,
    borderRadius: 22,
    marginBottom: 16,
    backgroundColor: "#e5e7eb",
  },
  mainCard: {
    backgroundColor: "#ffffff",
    padding: 18,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  label: {
    color: "#1f4432",
    fontSize: 12,
    fontWeight: "800",
    marginBottom: 8,
    textTransform: "uppercase",
  },
  title: {
    color: "#111827",
    fontSize: 28,
    fontWeight: "800",
    marginBottom: 14,
  },
  sectionCard: {
    backgroundColor: "#f9fafb",
    borderRadius: 16,
    padding: 14,
    marginBottom: 14,
  },
  sectionCardAlt: {
    backgroundColor: "#f3f4f6",
    borderRadius: 16,
    padding: 14,
  },
  sectionTitle: {
    color: "#111827",
    fontSize: 15,
    fontWeight: "800",
    marginBottom: 6,
  },
  description: {
    color: "#4b5563",
    fontSize: 14,
    lineHeight: 21,
  },
  infoText: {
    color: "#374151",
    lineHeight: 21,
    fontSize: 14,
  },
});

export default BlogDetailsScreen;
