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

const ProductDetail = ({ route, navigation }) => {
  const { product } = route.params || {};
  const isBlog = product?.type === "blog";

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <StatusBar style="dark" />

      <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backText}>Terug</Text>
      </Pressable>

      <Image
        source={product?.image || require("../assets/sne.webp")}
        style={styles.image}
      />

      <View style={styles.card}>
        <Text style={styles.label}>
          {isBlog ? "Blog details" : "Product details"}
        </Text>
        <Text style={styles.title}>{product?.title || "Smart Sneaker"}</Text>
        <Text style={styles.price}>{product?.price || "EUR 129.95"}</Text>

        <Text style={styles.sectionTitle}>Beschrijving</Text>
        <Text style={styles.description}>
          {product?.description ||
            "Stijlvolle sneaker met een moderne look voor dagelijks gebruik."}
        </Text>

        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>Alle details</Text>
          <Text style={styles.infoText}>
            {product?.details ||
              "Deze sneaker combineert comfort, stijl en een sterke afwerking voor elke dag."}
          </Text>
        </View>

        {isBlog ? null : (
          <>
            <View style={styles.quantityBox}>
              <Text style={styles.quantityLabel}>Aantal</Text>

              <View style={styles.quantityControls}>
                <View style={styles.quantityButton}>
                  <Text style={styles.quantityButtonText}>-</Text>
                </View>

                <Text style={styles.quantityText}>1</Text>

                <View style={styles.quantityButton}>
                  <Text style={styles.quantityButtonText}>+</Text>
                </View>
              </View>
            </View>

            <Pressable style={styles.buyButton}>
              <Text style={styles.buyButtonText}>Toevoegen</Text>
            </Pressable>
          </>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  content: {
    padding: 18,
    paddingBottom: 36,
  },
  backButton: {
    alignSelf: "flex-start",
    backgroundColor: "black",
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 14,
    marginBottom: 16,
  },
  backText: {
    color: "#f5f5f5",
    textAlign: "center",
    fontWeight: "700",
  },
  image: {
    width: "100%",
    height: 260,
    borderRadius: 24,
    marginBottom: 18,
  },
  card: {
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 24,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 6 },
    elevation: 4,
  },
  label: {
    color: "#black",
    fontSize: 13,
    fontWeight: "800",
    textTransform: "uppercase",
    marginBottom: 8,
    letterSpacing: 0.8,
  },
  title: {
    color: "black",
    fontSize: 30,
    fontWeight: "800",
    marginBottom: 8,
  },
  price: {
    color: "#1f4432",
    fontWeight: "800",
    fontSize: 20,
    marginBottom: 18,
  },
  sectionTitle: {
    color: "#2f241f",
    fontSize: 16,
    fontWeight: "800",
    marginBottom: 6,
  },
  description: {
    color: "grey",
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 16,
  },
  infoBox: {
    backgroundColor: "#f6f6f6",
    borderRadius: 18,
    padding: 15,
    marginBottom: 18,
  },
  infoTitle: {
    fontWeight: "800",
    fontSize: 16,
    color: "black",
    marginBottom: 6,
  },
  infoText: {
    color: "black",
    lineHeight: 21,
    fontSize: 14,
  },
  quantityBox: {
    backgroundColor: "#f5f5f5",
    borderRadius: 18,
    padding: 15,
    marginBottom: 18,
  },
  quantityLabel: {
    color: "black",
    fontSize: 16,
    fontWeight: "800",
    marginBottom: 10,
  },
  quantityControls: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  quantityButton: {
    backgroundColor: "#1f4432",
    width: 42,
    height: 42,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  quantityButtonText: {
    color: "#1f4432",
    fontSize: 20,
    fontWeight: "800",
  },
  quantityText: {
    color: "#1f4432",
    fontSize: 20,
    fontWeight: "800",
  },
  buyButton: {
    backgroundColor: "#1f4432",
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: "center",
  },
  buyButtonText: {
    color: "#fffaf5",
    fontWeight: "800",
    fontSize: 15,
  },
});

export default ProductDetail;
