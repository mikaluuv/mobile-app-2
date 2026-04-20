import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Pressable } from "react-native";
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
import { Picker } from "@react-native-picker/picker";
import ProductCard from "../components/ProductCard";

const WEBFLOW_TOKEN =
  "a687f68ff8a3e8dc0e2ed1459a5b49025f48939e0f99dbc476ad3b8337192893";
const WEBFLOW_SITE_ID = "698c801e43b7dfbbb1749dc3";
const BLOG_COLLECTION_ID = "699efafe63436b31862dd365";

const getImageSource = (...candidates) => {
  const firstValid = candidates.find(
    (value) => typeof value === "string" && value.length > 0,
  );

  return firstValid ? { uri: firstValid } : require("../assets/sne.webp");
};

const stripHtml = (value) => {
  if (typeof value !== "string") {
    return "";
  }

  return value
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
};

const formatPrice = (priceData) => {
  const amount = priceData?.value || 0;
  const currency = priceData?.unit || "EUR";

  return `${currency} ${(amount / 100).toFixed(2)}`;
};

const HomeScreen = ({ route }) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortOption, setSortOption] = useState("price-asc");
  const { products = [], blogs = [] } = route.params || {};
  const [productsList, setProducts] = useState(products);
  const [blogsList, setBlogs] = useState(blogs);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const [productsResponse, blogsResponse] = await Promise.all([
          fetch(
            `https://api.webflow.com/v2/sites/${WEBFLOW_SITE_ID}/products`,
            {
              headers: {
                Authorization: `Bearer ${WEBFLOW_TOKEN}`,
                accept: "application/json",
              },
            },
          ),
          fetch(
            `https://api.webflow.com/v2/collections/${BLOG_COLLECTION_ID}/items`,
            {
              headers: {
                Authorization: `Bearer ${WEBFLOW_TOKEN}`,
                accept: "application/json",
              },
            },
          ),
        ]);

        const productsData = await productsResponse.json();
        const blogsData = await blogsResponse.json();

        if (!isMounted) {
          return;
        }

        setProducts(
          (productsData.items || []).map((item) => ({
            id: item.product?.id || item.id,
            title:
              item.product?.fieldData?.name ||
              item.skus?.[0]?.fieldData?.name ||
              "Sneaker",
            description:
              item.product?.fieldData?.description ||
              "Geen beschrijving beschikbaar.",
            details:
              stripHtml(item.product?.fieldData?.["product-detail-2"]) ||
              item.product?.fieldData?.description ||
              "Geen details beschikbaar.",
            price: formatPrice(item.skus?.[0]?.fieldData?.price),
            image: getImageSource(
              item.skus?.[0]?.fieldData?.["main-image"]?.url,
              item.product?.fieldData?.["main-image"]?.url,
            ),
            type: "product",
          })),
        );

        setBlogs(
          (blogsData.items || []).map((item) => ({
            id: item.id,
            title: item.fieldData?.name || "Blog",
            description:
              item.fieldData?.["post-summary"] || "Geen blog beschrijving.",
            details:
              stripHtml(item.fieldData?.["post-body"]) ||
              item.fieldData?.["post-summary"] ||
              "Geen blog details.",
            price: "Blog",
            image: getImageSource(
              item.fieldData?.["main-image"]?.url,
              item.fieldData?.["thumbnail-image"]?.url,
            ),
            type: "blog",
          })),
        );
      } catch (error) {
        console.log("FULL ERROR:", error);
        console.log("ERROR MESSAGE:", error?.message);
        console.log("ERROR NAME:", error?.name);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  const filteredProducts = productsList
    .filter((product) =>
      product.title.toLowerCase().includes(searchText.toLowerCase()),
    )
    .filter((product) =>
      selectedCategory ? selectedCategory !== "blog" : true,
    )
    .sort((a, b) => {
      const priceA = Number.parseFloat(String(a.price).replace(/[^\d.]/g, ""));
      const priceB = Number.parseFloat(String(b.price).replace(/[^\d.]/g, ""));

      if (sortOption === "price-asc") return priceA - priceB;
      if (sortOption === "price-desc") return priceB - priceA;
      if (sortOption === "title-asc") return a.title.localeCompare(b.title);
      if (sortOption === "title-desc") return b.title.localeCompare(a.title);
      return 0;
    });

  const filteredBlogs = blogsList
    .filter((blog) =>
      blog.title.toLowerCase().includes(searchText.toLowerCase()),
    )
    .filter((blog) => (selectedCategory ? selectedCategory === "blog" : true))
    .sort((a, b) => {
      if (sortOption === "title-asc") return a.title.localeCompare(b.title);
      if (sortOption === "title-desc") return b.title.localeCompare(a.title);
      return 0;
    });

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <StatusBar style="dark" />

      <View style={styles.hero}>
        <Text style={styles.kicker}>Streetstep</Text>
        <Text style={styles.title}>Onze sneakers en blogs</Text>
        <Text style={styles.subtitle}>
          Ontdek nieuwe sneakers en blogs die rechtstreeks uit je Webflow CMS
          worden opgehaald.
        </Text>

        <Image
          source={require("../assets/sne.webp")}
          style={styles.heroImage}
        />
      </View>

      <Picker
        selectedValue={selectedCategory}
        onValueChange={(itemValue) => setSelectedCategory(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Alle categorieën" value="" />
        <Picker.Item label="Sneakers" value="product" />
        <Picker.Item label="Blogs" value="blog" />
      </Picker>

      <Picker
        selectedValue={sortOption}
        onValueChange={(itemValue) => setSortOption(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="prijs oplopend" value="price-asc" />
        <Picker.Item label="prijs aflopend" value="price-desc" />
        <Picker.Item label="titel A-Z" value="title-asc" />
        <Picker.Item label="titel Z-A" value="title-desc" />
      </Picker>

      <TextInput
        placeholder="Zoek sneaker..."
        placeholderTextColor="#8b7f76"
        value={searchText}
        onChangeText={setSearchText}
        style={styles.search}
      />

      <View style={styles.controls}>
        <View>
          <Text style={styles.controlTitle}>Donkere modus</Text>
          <Text style={styles.controlText}>Demo-switch voor de opdracht</Text>
        </View>

        <Switch
          value={isEnabled}
          onValueChange={() => setIsEnabled(!isEnabled)}
          trackColor={{ false: "#d9d9d9", true: "#1f4432" }}
          thumbColor="#ffffff"
        />
      </View>

      <View style={styles.buttonWrap}>
        <Pressable style={styles.customButton} onPress={() => {}}>
          <Text style={styles.customButtonText}>Filter producten</Text>
        </Pressable>
      </View>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Populaire sneakers</Text>
        <Text style={styles.sectionText}>
          {isLoading
            ? "Producten worden geladen vanuit Webflow..."
            : "Klik op een kaart om de details van de sneaker te bekijken."}
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
          {isLoading
            ? "Blogs worden geladen vanuit Webflow..."
            : "Klik op een blog om de volledige inhoud te bekijken."}
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
    backgroundColor: "#f5f5f5",
  },
  content: {
    padding: 18,
    paddingBottom: 36,
  },
  hero: {
    backgroundColor: "#ffffff",
    borderRadius: 28,
    padding: 18,
    marginBottom: 18,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 6 },
    elevation: 4,
  },
  kicker: {
    color: "black",
    fontSize: 13,
    fontWeight: "800",
    textTransform: "uppercase",
    marginBottom: 6,
    letterSpacing: 0.8,
  },
  title: {
    color: "#1f4432",
    fontSize: 30,
    fontWeight: "800",
    marginBottom: 8,
  },
  subtitle: {
    color: "black",
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 16,
  },
  heroImage: {
    width: "100%",
    height: 190,
    borderRadius: 20,
  },
  picker: {
    backgroundColor: "#ffffff",
    marginBottom: 14,
    borderRadius: 16,
  },
  search: {
    backgroundColor: "#ffffff",
    paddingHorizontal: 14,
    paddingVertical: 14,
    borderRadius: 16,
    marginBottom: 14,
    color: "#2f241f",
    fontSize: 15,
  },
  controls: {
    backgroundColor: "#ffffff",
    borderRadius: 18,
    padding: 16,
    marginBottom: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  controlTitle: {
    color: "#1f4432",
    fontWeight: "700",
    fontSize: 15,
    marginBottom: 3,
  },
  controlText: {
    color: "black",
    fontSize: 12,
  },
  buttonWrap: {
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: 18,
  },
  sectionHeader: {
    marginBottom: 14,
  },
  sectionTitle: {
    color: "#1f4432",
    fontSize: 24,
    fontWeight: "800",
    marginBottom: 4,
  },
  sectionText: {
    color: "#1f4432",
    fontSize: 14,
    lineHeight: 20,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  customButton: {
    backgroundColor: "#1f4432",
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: "center",
  },

  customButtonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
});

export default HomeScreen;
