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
import { Ionicons, Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";

const { width } = Dimensions.get("window");
const productWidth = (width - 40 - 10) / 2; // 40 for padding, 10 for gap

// Sample filter categories
const filterCategories = [
  { id: "1", name: "All" },
  { id: "2", name: "Jacket" },
  { id: "3", name: "Shirt" },
  { id: "4", name: "Pant" },
  { id: "5", name: "T-Shirt" },
];

// Sample wishlist products
const wishlistProducts = [
  {
    id: "1",
    name: "Brown Jacket",
    price: 83.97,
    rating: 4.9,
    image: require("../assets/product1.jpg"),
    isFavorite: true,
  },
  {
    id: "2",
    name: "Brown Suite",
    price: 120.0,
    rating: 5.0,
    image: require("../assets/product2.jpg"),
    isFavorite: true,
  },
  {
    id: "3",
    name: "Brown Jacket",
    price: 83.97,
    rating: 4.9,
    image: require("../assets/product3.jpg"),
    isFavorite: true,
  },
  {
    id: "4",
    name: "Yellow Shirt",
    price: 120.0,
    rating: 5.0,
    image: require("../assets/product4.jpg"),
    isFavorite: true,
  },
  {
    id: "5",
    name: "Brown Sweater",
    price: 83.97,
    rating: 4.8,
    image: require("../assets/product1.jpg"),
    isFavorite: true,
  },
  {
    id: "6",
    name: "Blue Jacket",
    price: 120.0,
    rating: 5.0,
    image: require("../assets/product2.jpg"),
    isFavorite: true,
  },
];

export default function WishlistScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList, "Wishlist">>();
  const [activeFilter, setActiveFilter] = useState("Jacket");
  const [wishlistItems, setWishlistItems] = useState(wishlistProducts);

  const toggleFavorite = (id: string) => {
    setWishlistItems((prev) => prev.filter((product) => product.id !== id));
  };

  const handleProductPress = (product: any) => {
    navigation.navigate("ProductDetail", { product });
  };

  const renderFilterItem = ({
    item,
  }: {
    item: { id: string; name: string };
  }) => (
    <TouchableOpacity
      style={[
        styles.filterChip,
        activeFilter === item.name && styles.activeFilterChip,
      ]}
      onPress={() => setActiveFilter(item.name)}
    >
      <Text
        style={[
          styles.filterText,
          activeFilter === item.name && styles.activeFilterText,
        ]}
      >
        {item.name}
      </Text>
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
        <Text style={styles.headerTitle}>My Wishlist</Text>
        <View style={styles.placeholder} />
      </View>

      <View style={styles.filterContainer}>
        <FlatList
          data={filterCategories}
          renderItem={renderFilterItem}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterList}
        />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.productsGrid}>
          {wishlistItems.map((item, index) => (
            <View
              key={item.id}
              style={[
                styles.productItem,
                index % 2 === 0 ? { marginRight: 10 } : {},
              ]}
            >
              <TouchableOpacity
                style={styles.productImageContainer}
                onPress={() => handleProductPress(item)}
              >
                <Image source={item.image} style={styles.productImage} />
                <TouchableOpacity
                  style={styles.favoriteButton}
                  onPress={() => toggleFavorite(item.id)}
                >
                  <Ionicons name="heart" size={20} color="#FF6B6B" />
                </TouchableOpacity>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.productInfo}
                onPress={() => handleProductPress(item)}
              >
                <Text style={styles.productName}>{item.name}</Text>
                <View style={styles.ratingContainer}>
                  <Ionicons name="star" size={14} color="#FFD700" />
                  <Text style={styles.ratingText}>{item.rating}</Text>
                </View>
                <Text style={styles.productPrice}>
                  ${item.price.toFixed(2)}
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>

      <View style={styles.bottomNavigation}>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate("Home")}
        >
          <Ionicons name="home-outline" size={24} color="#999" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate("Cart")}
        >
          <Feather name="shopping-bag" size={24} color="#999" />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.navItem, styles.activeNavItem]}>
          <Ionicons name="heart" size={24} color="#8B6E4E" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="chatbubble-outline" size={24} color="#999" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate("Profile")}
        >
          <Feather name="user" size={24} color="#999" />
        </TouchableOpacity>
      </View>
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
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 18,
    color: "#333",
  },
  placeholder: {
    width: 34,
  },
  filterContainer: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f5f5f5",
  },
  filterList: {
    paddingHorizontal: 20,
  },
  filterChip: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#f5f5f5",
    marginRight: 10,
  },
  activeFilterChip: {
    backgroundColor: "#8B6E4E",
  },
  filterText: {
    fontFamily: "Poppins-Medium",
    fontSize: 14,
    color: "#666",
  },
  activeFilterText: {
    color: "#fff",
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  productsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingBottom: 20,
  },
  productItem: {
    width: productWidth,
    marginBottom: 20,
  },
  productImageContainer: {
    position: "relative",
    borderRadius: 10,
    overflow: "hidden",
    height: 150,
  },
  productImage: {
    width: "100%",
    height: "100%",
  },
  favoriteButton: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  productInfo: {
    marginTop: 8,
  },
  productName: {
    fontFamily: "Poppins-Medium",
    fontSize: 14,
    color: "#333",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 4,
  },
  ratingText: {
    fontFamily: "Poppins-Regular",
    fontSize: 12,
    color: "#666",
    marginLeft: 4,
  },
  productPrice: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 14,
    color: "#333",
  },
  bottomNavigation: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#222",
    paddingVertical: 15,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  navItem: {
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    height: 30,
  },
  activeNavItem: {
    borderRadius: 15,
  },
});
