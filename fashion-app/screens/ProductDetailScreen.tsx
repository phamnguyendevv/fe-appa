"use client";

import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
  Dimensions,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";

const { width } = Dimensions.get("window");

// Sample gallery images
const galleryImages = [
  require("../assets/icon.png"),
  require("../assets/icon.png"),
  require("../assets/icon.png"),
  require("../assets/icon.png"),
  require("../assets/icon.png"),
  require("../assets/icon.png"),
  require("../assets/icon.png"),
];

// Sample sizes
const sizes = ["S", "M", "L", "XL", "XXL", "XXXL"];

// Sample colors
const colors = [
  { id: "1", color: "#E6C7B8", name: "Beige" },
  { id: "2", color: "#6D6D6D", name: "Gray" },
  { id: "3", color: "#E8A887", name: "Peach" },
  { id: "4", color: "#B87A54", name: "Tan" },
  { id: "5", color: "#8B6E4E", name: "Brown" },
  { id: "6", color: "#1A1A1A", name: "Black" },
];

export default function ProductDetailScreen() {
  const navigation = useNavigation();
  const [added, setAdded] = useState(false);
  const route = useRoute();
  type ProductDetailRouteParams = {
    product: {
      id: string;
      name: string;
      price: number;
      rating: number;
      image: any;
      isFavorite: boolean;
      description: string;
      isMan?: boolean;
      carouselImages?: any[];
    };
  };

  const { product } = (route.params as ProductDetailRouteParams) || {
    product: {
      id: "1",
      name: "Light Brown Jacket",
      price: 83.97,
      rating: 4.5,
      image: require("../assets/product1.jpg"),
      isFavorite: false,
      description:
        "This is a light brown jacket made from high-quality materials. It is perfect for both casual and formal occasions.",
      isMan: true,
      carouselImages: galleryImages,
      isNew: true,
      isPopular: true,
    },
  };

  const [isFavorite, setIsFavorite] = useState(product.isFavorite);
  const [selectedSize, setSelectedSize] = useState("S");
  const [selectedColor, setSelectedColor] = useState("5"); 
  const [expanded, setExpanded] = useState(false);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };
  const handleAddToCart = () => {
    setAdded(true);
  };

  const renderGalleryItem = ({ item, index }: { item: any; index: number }) => (
    <TouchableOpacity style={styles.galleryItem}>
      <Image source={{ uri: item }} style={styles.galleryImage} />
      {index === 5 && (
        <View style={styles.moreOverlay}>
          <Text style={styles.moreText}>+10</Text>
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />

      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Product Details</Text>
        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={toggleFavorite}
        >
          <Ionicons
            name={isFavorite ? "heart" : "heart-outline"}
            size={24}
            color={isFavorite ? "#FF6B6B" : "#333"}
          />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.mainImageContainer}>
          <Image
            source={{ uri: product.image }}
            style={styles.mainImage}
            resizeMode="contain"
          />
        </View>

        <View style={styles.galleryContainer}>
          <FlatList
            data={product.carouselImages}
            renderItem={renderGalleryItem}
            keyExtractor={(_, index) => index.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.galleryList}
          />
        </View>

        <View style={styles.productInfoContainer}>
          <View style={styles.categoryRow}>
            <Text style={styles.categoryText}>
              {product.isMan ? "Male's Style" : "Female's Style"}
            </Text>
            <View style={styles.ratingContainer}>
              <Ionicons name="star" size={16} color="#FFD700" />
              <Text style={styles.ratingText}>{product.rating}</Text>
            </View>
          </View>

          <Text style={styles.productName}>{product.name}</Text>

          <View style={styles.detailsSection}>
            <Text style={styles.sectionTitle}>Product Details</Text>
            <Text style={styles.descriptionText}>
              {expanded
                ? product.description || "No description available"
                : `${(product.description || "No description available").slice(
                    0,
                    100
                  )}${(product.description?.length || 0) > 100 ? "... " : ""}`}
              {(product.description?.length || 0) > 100 && (
                <Text
                  style={styles.readMoreText}
                  onPress={() => setExpanded(!expanded)}
                >
                  {expanded ? " Read less" : " Read more"}
                </Text>
              )}
            </Text>
          </View>

          <View style={styles.sizeSection}>
            <Text style={styles.sectionTitle}>Select Size</Text>
            <View style={styles.sizeOptions}>
              {sizes.map((size) => (
                <TouchableOpacity
                  key={size}
                  style={[
                    styles.sizeOption,
                    selectedSize === size && styles.selectedSizeOption,
                  ]}
                  onPress={() => setSelectedSize(size)}
                >
                  <Text
                    style={[
                      styles.sizeText,
                      selectedSize === size && styles.selectedSizeText,
                    ]}
                  >
                    {size}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.colorSection}>
            <View style={styles.colorHeader}>
              <Text style={styles.sectionTitle}>Select Color</Text>
              <Text style={styles.selectedColorText}>
                : {colors.find((c) => c.id === selectedColor)?.name}
              </Text>
            </View>
            <View style={styles.colorOptions}>
              {colors.map((color) => (
                <TouchableOpacity
                  key={color.id}
                  style={[
                    styles.colorOption,
                    { backgroundColor: color.color },
                    selectedColor === color.id && styles.selectedColorOption,
                  ]}
                  onPress={() => setSelectedColor(color.id)}
                />
              ))}
            </View>
          </View>

          <View style={styles.priceSection}>
            <View>
              <Text style={styles.priceLabel}>Total Price</Text>
              <Text style={styles.priceValue}>${product.price}</Text>
            </View>
            <TouchableOpacity
              style={styles.addToCartButton}
              onPress={handleAddToCart}
            >
              <Ionicons name="cart-outline" size={20} color="#fff" />
              <Text style={styles.addToCartText}>
                {added ? "Added to Cart" : "Add to Cart"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#f5f5f5",
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 18,
    color: "#333",
  },
  favoriteButton: {
    padding: 5,
  },
  content: {
    flex: 1,
  },
  mainImageContainer: {
    width: "100%",
    height: 350,
  },
  mainImage: {
    width: "100%",
    height: "100%",
  },
  galleryContainer: {
    marginTop: 10,
    paddingHorizontal: 15,
  },
  galleryList: {
    paddingVertical: 5,
  },
  galleryItem: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 8,
    overflow: "hidden",
    position: "relative",
  },
  galleryImage: {
    width: "100%",
    height: "100%",
  },
  moreOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  moreText: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 14,
    color: "#fff",
  },
  productInfoContainer: {
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 30,
  },
  categoryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
  },
  categoryText: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    color: "#999",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingText: {
    fontFamily: "Poppins-Medium",
    fontSize: 14,
    color: "#333",
    marginLeft: 5,
  },
  productName: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 22,
    color: "#333",
    marginBottom: 15,
  },
  detailsSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 16,
    color: "#333",
    marginBottom: 10,
  },
  descriptionText: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    color: "#666",
    lineHeight: 22,
  },
  readMoreText: {
    fontFamily: "Poppins-Medium",
    color: "#8B6E4E",
  },
  sizeSection: {
    marginBottom: 20,
  },
  sizeOptions: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  sizeOption: {
    width: 40,
    height: 40,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
    marginBottom: 10,
  },
  selectedSizeOption: {
    backgroundColor: "#8B6E4E",
    borderColor: "#8B6E4E",
  },
  sizeText: {
    fontFamily: "Poppins-Medium",
    fontSize: 14,
    color: "#333",
  },
  selectedSizeText: {
    color: "#fff",
  },
  colorSection: {
    marginBottom: 25,
  },
  colorHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  selectedColorText: {
    fontFamily: "Poppins-Medium",
    fontSize: 16,
    color: "#666",
    marginLeft: 10,
    marginBottom: 10,
  },
  colorOptions: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  colorOption: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 15,
    marginBottom: 10,
  },
  selectedColorOption: {
    borderWidth: 2,
    borderColor: "#8B6E4E",
  },
  priceSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  priceLabel: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    color: "#999",
    marginBottom: 5,
  },
  priceValue: {
    fontFamily: "Poppins-Bold",
    fontSize: 20,
    color: "#333",
  },
  addToCartButton: {
    backgroundColor: "#8B6E4E",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  addToCartText: {
    fontFamily: "Poppins-Medium",
    fontSize: 16,
    color: "#fff",
    marginLeft: 8,
  },
});
