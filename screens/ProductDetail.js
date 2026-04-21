import React, { useState } from "react";
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
  const [quantity, setQuantity] = useState(1);
  const price = Number(product?.price?.replace("USD ", "")) || 0;
  const totalPrice = price * quantity;

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

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
        <View style={styles.topRow}>
          <View style={styles.typeBadge}>
            <Text style={styles.typeBadgeText}>
              {isBlog ? "Blog details" : "Product details"}
            </Text>
          </View>

          <Text style={styles.price}>{product?.price || "EUR 129.95"}</Text>
        </View>

        <Text style={styles.title}>{product?.title || "Smart Sneaker"}</Text>

        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Beschrijving</Text>
          <Text style={styles.description}>
            {product?.description ||
              "Stijlvolle sneaker met een moderne look voor dagelijks gebruik."}
          </Text>
        </View>

        <View style={styles.sectionCardAlt}>
          <Text style={styles.sectionTitle}>Alle details</Text>
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
                <Pressable
                  style={styles.quantityButton}
                  onPress={decreaseQuantity}
                >
                  <Text style={styles.quantityButtonText}>-</Text>
                </Pressable>

                <View style={styles.quantityValueBox}>
                  <Text style={styles.quantityText}>{quantity}</Text>
                </View>

                <Pressable
                  style={styles.quantityButton}
                  onPress={increaseQuantity}
                >
                  <Text style={styles.quantityButtonText}>+</Text>
                </Pressable>
              </View>
            </View>

            <View style={styles.totalBox}>
              <Text style={styles.totalText}>
                Totaalprijs: USD {totalPrice.toFixed(2)}
              </Text>
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
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
    gap: 10,
  },
  typeBadge: {
    backgroundColor: "#f3f4f6",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
  },
  typeBadgeText: {
    color: "#374151",
    fontSize: 11,
    fontWeight: "800",
    textTransform: "uppercase",
  },
  title: {
    color: "#111827",
    fontSize: 28,
    fontWeight: "800",
    marginBottom: 14,
  },
  price: {
    color: "#1f4432",
    fontWeight: "800",
    fontSize: 18,
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
    marginBottom: 16,
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
  quantityBox: {
    backgroundColor: "#f9fafb",
    borderRadius: 16,
    padding: 14,
    marginBottom: 16,
  },
  quantityLabel: {
    color: "#111827",
    fontSize: 15,
    fontWeight: "800",
    marginBottom: 10,
  },
  quantityControls: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
  quantityButton: {
    backgroundColor: "#1f4432",
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  quantityButtonText: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "800",
  },
  quantityValueBox: {
    flex: 1,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 12,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
  },
  quantityText: {
    color: "#111827",
    fontSize: 18,
    fontWeight: "800",
  },
  totalBox: {
    backgroundColor: "#f3f4f6",
    borderRadius: 14,
    padding: 14,
    marginBottom: 16,
  },
  totalText: {
    color: "#111827",
    fontSize: 16,
    fontWeight: "800",
    textAlign: "center",
  },
  buyButton: {
    backgroundColor: "#1f4432",
    paddingVertical: 15,
    borderRadius: 14,
    alignItems: "center",
  },
  buyButtonText: {
    color: "#ffffff",
    fontWeight: "800",
    fontSize: 15,
  },
});

export default ProductDetail;
