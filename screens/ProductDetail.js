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
          {isBlog ? "Blog details" : "Sneaker details"}
        </Text>
        <Text style={styles.title}>{product?.title || "ASICS Street Runner"}</Text>
        <Text style={styles.price}>{product?.price || "EUR 129"}</Text>

        <Text style={styles.sectionTitle}>Beschrijving</Text>
        <Text style={styles.description}>
          {product?.description ||
            "Comfortabele sneaker met een moderne look voor dagelijks gebruik."}
        </Text>

        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>Alle details</Text>
          <Text style={styles.infoText}>
            {product?.details ||
              "Deze sneaker combineert een lichte feel, stevige zool en een opvallende afwerking voor een sportieve streetwear stijl."}
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
    backgroundColor: "#fffaf5",
  },
  content: {
    padding: 18,
    paddingBottom: 44,
  },
  backButton: {
    alignSelf: "flex-start",
    backgroundColor: "#ffffff",
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 999,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: "#fdba74",
  },
  backText: {
    color: "#7c2d12",
    textAlign: "center",
    fontWeight: "700",
  },
  image: {
    width: "100%",
    height: 300,
    borderRadius: 28,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#fdba74",
  },
  card: {
    backgroundColor: "#ffedd5",
    padding: 22,
    borderRadius: 28,
    borderWidth: 1,
    borderColor: "#fdba74",
    shadowColor: "#ea580c",
    shadowOpacity: 0.14,
    shadowRadius: 22,
    shadowOffset: { width: 0, height: 12 },
    elevation: 8,
  },
  label: {
    color: "#c2410c",
    fontSize: 12,
    fontWeight: "800",
    textTransform: "uppercase",
    marginBottom: 8,
    letterSpacing: 1.8,
  },
  title: {
    color: "#7c2d12",
    fontSize: 32,
    fontWeight: "800",
    marginBottom: 10,
  },
  price: {
    color: "#ea580c",
    fontWeight: "800",
    fontSize: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    color: "#7c2d12",
    fontSize: 16,
    fontWeight: "800",
    marginBottom: 8,
  },
  description: {
    color: "#9a3412",
    fontSize: 15,
    lineHeight: 24,
    marginBottom: 18,
  },
  infoBox: {
    backgroundColor: "#ffffff",
    borderRadius: 22,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#fed7aa",
  },
  infoTitle: {
    fontWeight: "800",
    fontSize: 16,
    color: "#7c2d12",
    marginBottom: 8,
  },
  infoText: {
    color: "#9a3412",
    lineHeight: 22,
    fontSize: 14,
  },
  quantityBox: {
    backgroundColor: "#ffffff",
    borderRadius: 22,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#fed7aa",
  },
  quantityLabel: {
    color: "#7c2d12",
    fontSize: 16,
    fontWeight: "800",
    marginBottom: 12,
  },
  quantityControls: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  quantityButton: {
    backgroundColor: "#ea580c",
    width: 46,
    height: 46,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  quantityButtonText: {
    color: "#fff7ed",
    fontSize: 20,
    fontWeight: "800",
  },
  quantityText: {
    color: "#7c2d12",
    fontSize: 20,
    fontWeight: "800",
  },
  buyButton: {
    backgroundColor: "#c2410c",
    paddingVertical: 16,
    borderRadius: 18,
    alignItems: "center",
    shadowColor: "#c2410c",
    shadowOpacity: 0.24,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
    elevation: 6,
  },
  buyButtonText: {
    color: "#fff7ed",
    fontWeight: "800",
    fontSize: 15,
  },
});

export default ProductDetail;
