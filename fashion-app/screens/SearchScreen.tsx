"use client";

import { useState, useEffect, useRef, SetStateAction } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  FlatList,
  Image,
  Dimensions,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import { getProducts } from "../api/product";

const { width } = Dimensions.get("window");
const productWidth = (width - 40 - 10) / 2; // 40 for padding, 10 for gap
const numColumns = 1; // Default number of columns for FlatList

// Sample recent searches
const recentSearches = [
  "Blue Shirt",
  "CosmicChic Jacket",
  "EnchantedElegance Dress",
  "WhimsyWhirl Top",
  "Fluffernova Coat",
];

// Sample search results
const searchResults = [
  {
    id: "1",
    name: "Brown Jacket",
    price: 83.97,
    rating: 4.9,
    image: require("../assets/product1.jpg"),
    isFavorite: false,
  },
  {
    id: "2",
    name: "Brown Suite",
    price: 120.0,
    rating: 5.0,
    image: require("../assets/product2.jpg"),
    isFavorite: false,
  },
  {
    id: "3",
    name: "Brown Jacket",
    price: 83.97,
    rating: 4.9,
    image: require("../assets/product3.jpg"),
    isFavorite: false,
  },
  {
    id: "4",
    name: "Yellow Shirt",
    price: 120.0,
    rating: 5.0,
    image: require("../assets/product4.jpg"),
    isFavorite: false,
  },
  {
    id: "5",
    name: "Beige Jacket",
    price: 83.97,
    rating: 4.8,
    image: require("../assets/product1.jpg"),
    isFavorite: false,
  },
  {
    id: "6",
    name: "Blue Jacket",
    price: 120.0,
    rating: 5.0,
    image: require("../assets/product2.jpg"),
    isFavorite: false,
  },
];

export default function SearchScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList, "Search">>();

  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState<
    {
      id: string;
      name: string;
      price: number;
      rating: number;
      image: any;
      isFavorite: boolean;
    }[]
  >([]);
  const [recent, setRecent] = useState(recentSearches);
  const [resultCount, setResultCount] = useState(0);
  const searchInputRef = useRef<TextInput>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Function to simulate fetching search results from an API
  const fetchSearchResults = async (query: string) => {
    // In a real app, this would be an actual API call
    const reponse = await getProducts({ keyword: query });
    if (reponse.status === 200) {
      const data = reponse.data;
      const toatalCount = data.length || 0;
      console.log("Filtered results:", data);
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            products: data,
            totalCount: toatalCount || 0,
          });
        }, 300);
      });
    }
  };

  const addToRecentSearches = (term: any) => {
    // Don't add duplicates
    if (!recent.includes(term)) {
      // In a real app, you would store this in AsyncStorage or similar
      setRecent((prevRecent) => [term, ...prevRecent.slice(0, 7)]);

      // Here you would also save to persistent storage:
      AsyncStorage.setItem(
        "recentSearches",
        JSON.stringify([term, ...recent.slice(0, 7)])
      );
    }
  };
  // Function to load recent searches (would use AsyncStorage in a real app)
  const loadRecentSearches = () => {
    // In a real app, you would load from AsyncStorage:
    AsyncStorage.getItem("recentSearches").then((value) => {
      if (value) setRecent(JSON.parse(value));
    });

    // For now, we'll use some sample data
    setRecent(["Blue Shirt", "Summer Dress", "Leather Jacket"]);
  };

  useEffect(() => {
    loadRecentSearches();
  }, []);

  useEffect(() => {
    // Focus the search input when the screen mounts
    setTimeout(() => {
      if (searchInputRef.current) {
        searchInputRef.current.focus();
      }
    }, 100);
  }, []);

  useEffect(() => {
    if (searchQuery.trim()) {
      // Simulate API call with loading state
      setIsLoading(true);

      // Simulate network delay
      const timeoutId = setTimeout(() => {
        // This would be a real API call in production
        fetchSearchResults(searchQuery)
          .then((data) => {
            const typedData = data as {
              products: typeof searchResults;
              totalCount: number;
            };
            setResults(typedData.products);
            setResultCount((data as { totalCount: number }).totalCount);
            setIsSearching(true);
            setIsLoading(false);

            // Add to recent searches if not already there
            if (searchQuery.length > 2) {
              addToRecentSearches(searchQuery);
            }
          })
          .catch((error) => {
            console.error("Search error:", error);
            setIsLoading(false);
          });
      }, 500);

      return () => clearTimeout(timeoutId);
    } else {
      setResults([]);
      setIsSearching(false);
    }
  }, [searchQuery]);

  const handleSearch = (text: string) => {
    setSearchQuery(text);
  };

  const handleClearAll = () => {
    setRecent([]);
    // In a real app, you would also clear from AsyncStorage:
    // AsyncStorage.removeItem('recentSearches');
  };

  const handleSearchItemPress = (item: string) => {
    setSearchQuery(item);
    // The search term will be added to recents via the search effect
  };

  const toggleFavorite = (id: any) => {
    setResults((prev) =>
      prev.map((product) =>
        product.id === id
          ? { ...product, isFavorite: !product.isFavorite }
          : product
      )
    );
  };

  const handleProductPress = (product: {
    id: string;
    name: string;
    price: number;
    rating: number;
    image: any;
    isFavorite: boolean;
  }) => {
    navigation.navigate("ProductDetail", { product });
  };

  const renderRecentItem = ({ item }: { item: string }) => (
    <TouchableOpacity
      style={styles.recentItem}
      onPress={() => handleSearchItemPress(item)}
    >
      <Text style={styles.recentItemText}>{item}</Text>
      <Ionicons name="time-outline" size={20} color="#999" />
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
        <Text style={styles.headerTitle}>Search</Text>
        <View style={styles.placeholder} />
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color="#999" />
          <TextInput
            ref={searchInputRef}
            style={styles.searchInput}
            placeholder="Search"
            placeholderTextColor="#999"
            value={searchQuery}
            onChangeText={handleSearch}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity
              style={styles.clearButton}
              onPress={() => setSearchQuery("")}
            >
              <Ionicons name="close-circle" size={18} color="#999" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {!isSearching ? (
        // Recent searches view
        <View style={styles.recentContainer}>
          <View style={styles.recentHeader}>
            <Text style={styles.recentTitle}>Recent</Text>
            {recent.length > 0 && (
              <TouchableOpacity onPress={handleClearAll}>
                <Text style={styles.clearAllText}>Clear All</Text>
              </TouchableOpacity>
            )}
          </View>

          <FlatList
            key={numColumns} // Thêm key để ép FlatList re-render
            numColumns={numColumns} // numColumns có thể thay đổi
            data={recent}
            renderItem={renderRecentItem}
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
          />
        </View>
      ) : (
        // Search results view
        <View style={styles.resultsContainer}>
          <View style={styles.resultsHeader}>
            <Text style={styles.resultsTitle}>Result for "{searchQuery}"</Text>
            <Text style={styles.resultsCount}>
              {resultCount.toLocaleString()} founds
            </Text>
          </View>

          <FlatList
            data={results}
            renderItem={({ item }) => (
              <View style={styles.productItem}>
                <TouchableOpacity
                  style={styles.productImageContainer}
                  onPress={() => handleProductPress(item)}
                >
                  <Image source={item.image} style={styles.productImage} />
                  <TouchableOpacity
                    style={styles.favoriteButton}
                    onPress={() => toggleFavorite(item.id)}
                  >
                    <Ionicons
                      name={item.isFavorite ? "heart" : "heart-outline"}
                      size={20}
                      color={item.isFavorite ? "#FF6B6B" : "#666"}
                    />
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
            )}
            keyExtractor={(item) => item.id}
            numColumns={2}
            columnWrapperStyle={styles.productRow}
            showsVerticalScrollIndicator={false}
          />
        </View>
      )}
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
  searchContainer: {
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  searchInput: {
    flex: 1,
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    color: "#333",
    marginLeft: 10,
    paddingVertical: 5,
  },
  clearButton: {
    padding: 5,
  },
  recentContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  recentHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  recentTitle: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 16,
    color: "#333",
  },
  clearAllText: {
    fontFamily: "Poppins-Medium",
    fontSize: 14,
    color: "#8B6E4E",
  },
  recentItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f5f5f5",
  },
  recentItemText: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    color: "#333",
  },
  resultsContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  resultsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  resultsTitle: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 16,
    color: "#333",
  },
  resultsCount: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    color: "#999",
  },
  productRow: {
    justifyContent: "space-between",
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
});
