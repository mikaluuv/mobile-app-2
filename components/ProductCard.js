import { View, Text, StyleSheet } from "react-native";

export default function ProductCard() {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Product</Text>
      <Text>€50</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#ffffff",
    padding: 10,
    marginTop: 10,
  },
  title: {
    fontWeight: "bold",
  },
});
