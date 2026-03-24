import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  Button,
  Switch,
  Image,
} from "react-native";
import ProductCard from "../components/ProductCard";

const HomeScreen = ({ route }) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [searchText, setSearchText] = useState("");
  const { products = [], blogs = [] } = route.params || {};
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchText.toLowerCase())
  );
  const filteredBlogs = blogs.filter((blog) =>
    blog.title.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <StatusBar style="dark" />

      <View style={styles.hero}>
        <Text style={styles.kicker}>Sneaker Drop</Text>
        <Text style={styles.title}>Street-ready sneakers</Text>
        <Text style={styles.subtitle}>
          Ontdek frisse modellen met comfort, kleur en een sportieve uitstraling
          voor elke dag.
        </Text>

        <Image source={require("../assets/sne.webp")} style={styles.heroImage} />
      </View>

      <TextInput
        placeholder="Zoek sneaker..."
        placeholderTextColor="#9a3412"
        value={searchText}
        onChangeText={setSearchText}
        style={styles.search}
      />

      <View style={styles.controls}>
        <View>
          <Text style={styles.controlTitle}>Sneaker alerts</Text>
          <Text style={styles.controlText}>Demo-switch voor nieuwe drops</Text>
        </View>

        <Switch
          value={isEnabled}
          onValueChange={() => setIsEnabled(!isEnabled)}
          trackColor={{ false: "#fed7aa", true: "#fb923c" }}
          thumbColor="#ffffff"
        />
      </View>

      <View style={styles.buttonWrap}>
        <Button title="Filter sneakers" color="#ea580c" onPress={() => {}} />
      </View>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Populaire sneakers</Text>
        <Text style={styles.sectionText}>
          Klik op een kaart om de details van de sneaker te bekijken.
        </Text>
      </View>

      <View style={styles.grid}>
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            title={product.title}
            description={product.description}
            price={product.price}
            image={product.image}
            details={product.details}
            type={product.type}
          />
        ))}
      </View>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Sneaker blogs</Text>
        <Text style={styles.sectionText}>
          Bekijk trends, releases en tips rond de nieuwste sneakers.
        </Text>
      </View>

      <View style={styles.grid}>
        {filteredBlogs.map((blog) => (
          <ProductCard
            key={`blog-${blog.id}`}
            title={blog.title}
            description={blog.description}
            price={blog.price}
            image={blog.image}
            details={blog.details}
            type={blog.type}
          />
        ))}
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
  hero: {
    backgroundColor: "#ffedd5",
    borderRadius: 32,
    padding: 22,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#fdba74",
    shadowColor: "#ea580c",
    shadowOpacity: 0.14,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 12 },
    elevation: 7,
  },
  kicker: {
    color: "#c2410c",
    fontSize: 12,
    fontWeight: "800",
    textTransform: "uppercase",
    marginBottom: 8,
    letterSpacing: 1.6,
  },
  title: {
    color: "#7c2d12",
    fontSize: 34,
    fontWeight: "800",
    marginBottom: 10,
  },
  subtitle: {
    color: "#9a3412",
    fontSize: 15,
    lineHeight: 23,
    marginBottom: 18,
  },
  heroImage: {
    width: "100%",
    height: 220,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "#fdba74",
    backgroundColor: "#ffffff",
  },
  search: {
    backgroundColor: "#ffffff",
    paddingHorizontal: 18,
    paddingVertical: 16,
    borderRadius: 18,
    marginBottom: 16,
    color: "#7c2d12",
    fontSize: 15,
    borderWidth: 1,
    borderColor: "#fdba74",
  },
  controls: {
    backgroundColor: "#ffffff",
    borderRadius: 22,
    padding: 18,
    marginBottom: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#fed7aa",
  },
  controlTitle: {
    color: "#7c2d12",
    fontWeight: "700",
    fontSize: 15,
    marginBottom: 4,
  },
  controlText: {
    color: "#9a3412",
    fontSize: 12,
  },
  buttonWrap: {
    borderRadius: 18,
    overflow: "hidden",
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "#fb923c",
  },
  sectionHeader: {
    marginBottom: 16,
  },
  sectionTitle: {
    color: "#7c2d12",
    fontSize: 26,
    fontWeight: "800",
    marginBottom: 6,
  },
  sectionText: {
    color: "#9a3412",
    fontSize: 14,
    lineHeight: 21,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
});

export default HomeScreen;
