import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Pressable } from "react-native";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  Switch,
  Image,
  Button,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import ProductCard from "../components/ProductCard";
import BlogCard from "../components/BlogCard";

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
  const [showBanner, setShowBanner] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortOption, setSortOption] = useState("price-asc");
  const { products = [], blogs = [] } = route.params || {};
  const [productsList, setProducts] = useState(products);
  const [blogsList, setBlogs] = useState(blogs);
  const [isLoading, setIsLoading] = useState(true);

  const resetFilters = () => {
    setSearchText("");
    setSelectedCategory("");
    setSortOption("price-asc");
  };

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
            category: "Sneakers",
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
    .filter((product) => {
      if (!selectedCategory) {
        return true;
      }

      return product.category === selectedCategory;
    })
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
    .sort((a, b) => {
      if (sortOption === "title-asc") return a.title.localeCompare(b.title);
      if (sortOption === "title-desc") return b.title.localeCompare(a.title);
      return 0;
    });

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <StatusBar style="dark" />

      <View style={styles.topBar}>
        <View>
          <Text style={styles.brand}>Streetstep</Text>
          <Text style={styles.smallText}>Sneakers & blogs</Text>
        </View>
      </View>

      <View style={styles.introBlock}>
        <Text style={styles.pageTitle}>Ontdek jouw volgende pair.</Text>
        <Text style={styles.pageSubtitle}>
          Ontdek sneakers en blogs op één plek.
        </Text>
      </View>

      {showBanner ? (
        <Image
          source={require("../assets/sne.webp")}
          style={styles.bannerImage}
        />
      ) : null}

      <View style={styles.searchCard}>
        <Text style={styles.cardTitle}>Zoeken</Text>
        <TextInput
          placeholder="Zoek sneaker..."
          placeholderTextColor="#8b7f76"
          value={searchText}
          onChangeText={setSearchText}
          style={styles.search}
        />
      </View>

      <View style={styles.filtersRow}>
        <View style={styles.filterBox}>
          <Text style={styles.filterLabel}>Categorie</Text>
          <Picker
            selectedValue={selectedCategory}
            onValueChange={(itemValue) => setSelectedCategory(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Alle categorieën" value="" />
            <Picker.Item label="Lifestyle" value="Lifestyle" />
            <Picker.Item label="Minimalistisch" value="Minimalistisch" />
            <Picker.Item label="Streetwear" value="Streetwear" />
            <Picker.Item label="Retro" value="Retro" />
            <Picker.Item label="Sneakers" value="Sneakers" />
          </Picker>
        </View>

        <View style={styles.filterBox}>
          <Text style={styles.filterLabel}>Sorteren</Text>
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
        </View>
      </View>

      <View style={styles.toolsRow}>
        <View style={styles.switchCard}>
          <Text style={styles.controlTitle}>Banner tonen</Text>
          <Switch
            value={showBanner}
            onValueChange={() => setShowBanner(!showBanner)}
            trackColor={{ false: "#d9d9d9", true: "#1f4432" }}
            thumbColor="#ffffff"
          />
        </View>

        <Pressable style={styles.resetButton} onPress={resetFilters}>
          <Text style={styles.resetButtonText}>Reset filters</Text>
        </Pressable>

        <View style={styles.buttonBox}>
          <Button title="Toon alles" color="#1f4432" onPress={resetFilters} />
        </View>
      </View>

      <View style={styles.sectionHeader}>
        <View>
          <Text style={styles.sectionTitle}>Populaire sneakers</Text>
          <Text style={styles.sectionText}>
            {isLoading
              ? "Producten worden geladen vanuit Webflow..."
              : "Klik op een kaart om de details van de sneaker te bekijken."}
          </Text>
        </View>
        <Text style={styles.resultCount}>{filteredProducts.length}</Text>
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
            category={product.category}
          />
        ))}
      </View>

      <View style={styles.sectionHeader}>
        <View>
          <Text style={styles.sectionTitle}>Sneaker blogs</Text>
          <Text style={styles.sectionText}>
            {isLoading
              ? "Blogs worden geladen vanuit Webflow..."
              : "Klik op een blog om de volledige inhoud te bekijken."}
          </Text>
        </View>
        <Text style={styles.resultCount}>{filteredBlogs.length}</Text>
      </View>

      <View style={styles.grid}>
        {filteredBlogs.map((blog) => (
          <BlogCard
            key={`blog-${blog.id}`}
            title={blog.title}
            description={blog.description}
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
    backgroundColor: "#f3f4f6",
  },
  content: {
    padding: 16,
    paddingBottom: 36,
  },
  topBar: {
    marginBottom: 18,
  },
  brand: {
    fontSize: 22,
    fontWeight: "800",
    color: "#111827",
  },
  smallText: {
    fontSize: 13,
    color: "#6b7280",
    marginTop: 2,
  },
  topBadge: {
    backgroundColor: "#1f4432",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 14,
  },
  topBadgeText: {
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "800",
  },
  introBlock: {
    marginBottom: 14,
  },
  pageTitle: {
    fontSize: 32,
    lineHeight: 38,
    fontWeight: "800",
    color: "#111827",
    marginBottom: 8,
    maxWidth: 260,
  },
  pageSubtitle: {
    fontSize: 15,
    lineHeight: 22,
    color: "#4b5563",
    maxWidth: 320,
  },
  bannerImage: {
    width: "100%",
    height: 180,
    borderRadius: 22,
    marginBottom: 16,
    backgroundColor: "#e5e7eb",
  },
  searchCard: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 14,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: "#111827",
    marginBottom: 10,
  },
  search: {
    backgroundColor: "#f3f4f6",
    paddingHorizontal: 14,
    paddingVertical: 14,
    borderRadius: 14,
    color: "#111827",
    fontSize: 15,
  },
  filtersRow: {
    gap: 12,
    marginBottom: 14,
  },
  filterBox: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 14,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  filterLabel: {
    fontSize: 14,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 6,
  },
  picker: {
    backgroundColor: "#f3f4f6",
    borderRadius: 14,
  },
  toolsRow: {
    gap: 12,
    marginBottom: 22,
  },
  switchCard: {
    backgroundColor: "#ffffff",
    borderRadius: 18,
    padding: 14,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  controlTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#111827",
  },
  resetButton: {
    backgroundColor: "#1f4432",
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: "center",
  },
  resetButtonText: {
    color: "#ffffff",
    fontWeight: "700",
    fontSize: 15,
  },
  buttonBox: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 8,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 14,
    gap: 10,
  },
  sectionTitle: {
    color: "#111827",
    fontSize: 22,
    fontWeight: "800",
    marginBottom: 4,
  },
  sectionText: {
    color: "#4b5563",
    fontSize: 14,
    lineHeight: 20,
    maxWidth: 280,
  },
  resultCount: {
    backgroundColor: "#e5e7eb",
    color: "#111827",
    fontSize: 14,
    fontWeight: "800",
    minWidth: 38,
    textAlign: "center",
    paddingVertical: 9,
    borderRadius: 19,
    overflow: "hidden",
    marginTop: 4,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 18,
  },
});

export default HomeScreen;
