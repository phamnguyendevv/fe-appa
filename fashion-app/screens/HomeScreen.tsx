"use client";

import { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
  Dimensions,
  ViewToken,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Feather, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import { useUser } from "../contexts/UserContext";
import { getCategories } from "../api/categories";
import { getProducts } from "../api/product";

const { width } = Dimensions.get("window");
const productWidth = (width - 40 - 10) / 2; // 40 for padding, 10 for gap

const products = [
  {
    id: "1",
    name: "Brown Jacket",
    price: 83.97,
    rating: 4.9,
    image: require("../assets/product1.jpg"),
    carouselImages: [
      require("../assets/product1.jpg"),
      require("../assets/product2.jpg"),
      require("../assets/product3.jpg"),
    ],
    isFavorite: false,
    isNew: true,
    isPopular: true,
    isMan: true,
  },
];

const banners = [
  {
    id: 1,
    title: "New Collection",
    subtitle: "Discount 50% for\nthe first transaction",
    image: require("../assets/banner-image.jpg"),
  },
  {
    id: 2,
    title: "Summer Sale",
    subtitle: "Get up to 70% off\non selected items",
    image: require("../assets/banner-image.jpg"),
  },
  {
    id: 3,
    title: "Exclusive Deals",
    subtitle: "Limited-time offers\njust for you!",
    image: require("../assets/banner-image.jpg"),
  },
];

export default function HomeScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList, "Home">>();
  const [activeFilter, setActiveFilter] = useState("Newest");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [productsList, setProductsList] = useState<(typeof products)[0][]>([]);
  const [productsFilter, setProductsFilter] = useState<(typeof products)[0][]>(
    []
  );
  const [categories, setCategories] = useState([]);
  const flatListRef = useRef(null);
  const {
    userData: { email, isLoggedIn },
  } = useUser();
  const [countdown, setCountdown] = useState({
    hours: 2,
    minutes: 12,
    seconds: 56,
  });
  const [loading, setLoading] = useState<boolean>(false); // Khai báo state loading

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        const cate = data.data.data;
        setCategories(cate);
      } catch (err) {
        // setError(err.message);
        console.error("Error fetching categories:", err);
      } finally {
        setLoading(false);
      }
    };
    const fetchProducts = async () => {
      try {
        const data = await getProducts({ keyword: "" });
        const products = data.data;
        setProductsList(products);
      } catch (err) {
        // setError(err.message);
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();

    fetchCategories();
  }, [email]); // Chạy lại khi email thay đổi

  const onViewableItemsChanged = ({
    viewableItems,
  }: {
    viewableItems: ViewToken<{ title: string; subtitle: string; image: any }>[];
  }) => {
    if (viewableItems.length > 0 && viewableItems[0].index !== null) {
      setCurrentIndex(viewableItems[0].index);
    }
  };

  const setActiveFilterApi = (filter: string) => {
    setLoading(true);
    // Call API to fetch products based on the selected filter
    const fetchFilteredProducts = async () => {
      console.log("Fetching filtered products for:", filter);

      const filterParams: Record<string, { [key: string]: boolean }> = {
        Newest: { isNewProduct: true },
        Popular: { isPopular: true },
        Man: { isMan: true },
        Woman: { isMan: false },
      };

      try {
        if (filter === "All") {
          const data = await getProducts({}); // Fetch all products
          setProductsList(data.data || []);
          setActiveFilter(filter);
          return;
        }

        console.log("Filter params:", filterParams);
        const params = filterParams[filter];
        if (!params) {
          console.warn(`Invalid filter: ${filter}`);
          setProductsList([]);
          return;
        }

        const data = await getProducts(params);
        setProductsList(data.data || []);
      } catch (err) {
        console.error("Error fetching filtered products:", err);
        setProductsList([]); // Clear list on error
      } finally {
        setLoading(false); // Set loading to false after fetching
      }

      setActiveFilter(filter);
    };
    fetchFilteredProducts();
  };

  // Countdown timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);



  type Category = {
    id: string;
    name: string;
    image: any; // Replace 'any' with the appropriate type if available
  };
  const handleProductPress = (product: any) => {
    navigation.navigate("ProductDetail", { product });
  };
  const handleCategoryPress = (category: any) => {
    navigation.navigate("CategoryProduct", { category });
  };

  const renderCategoryItem = ({ item }: { item: Category }) => (
    <TouchableOpacity
      style={styles.categoryItem}
      onPress={() => handleCategoryPress(item)}
    >
      <View style={styles.categoryIconContainer}>
        <Image source={{ uri: item.image }} style={styles.categoryIcon} />
      </View>
      <Text style={styles.categoryName}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />

      <View style={styles.header}>
        <View style={styles.locationContainer}>
          <Text style={styles.locationLabel}>Location</Text>
          <View style={styles.locationSelector}>
            <Ionicons name="location-outline" size={16} color="#8B6E4E" />
            <TouchableOpacity
              onPress={() => navigation.navigate("ShippingAddress")}
            >
              <Text style={styles.locationText}>New York, USA</Text>
            </TouchableOpacity>
            <Ionicons name="chevron-down" size={16} color="#333" />
          </View>
        </View>

        <View style={styles.headerRight}>
          <Text style={styles.appName}>InsightVancer</Text>
          <TouchableOpacity style={styles.notificationButton}>
            <Ionicons name="notifications-outline" size={24} color="#333" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.searchContainer}>
        <TouchableOpacity
          style={styles.searchBar}
          onPress={() => navigation.navigate("Search")}
        >
          <Feather name="search" size={20} color="#999" />
          <Text style={styles.searchPlaceholder}>Search</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => navigation.navigate("FilterScreen")}
        >
          <Feather name="sliders" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.bannerContainer}>
          <FlatList
            ref={flatListRef}
            data={banners}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            snapToAlignment="center"
            snapToInterval={width}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={[styles.banner, { width }]}>
                <View style={styles.bannerContent}>
                  <View>
                    <Text style={styles.bannerTitle}>{item.title}</Text>
                    <Text style={styles.bannerSubtitle}>{item.subtitle}</Text>
                    <TouchableOpacity style={styles.shopNowButton}>
                      <Text style={styles.shopNowText}>Shop Now</Text>
                    </TouchableOpacity>
                  </View>
                  <Image source={item.image} style={styles.bannerImage} />
                </View>
              </View>
            )}
            onViewableItemsChanged={onViewableItemsChanged}
            viewabilityConfig={{ viewAreaCoveragePercentThreshold: 50 }}
          />

          {/* Pagination Dots */}
          <View style={styles.paginationDots}>
            {banners.map((_, index) => (
              <View
                key={index}
                style={[styles.dot, index === currentIndex && styles.activeDot]}
              />
            ))}
          </View>
        </View>

        <View style={styles.categorySection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Category</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>

          <FlatList
            data={categories}
            renderItem={renderCategoryItem}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoryList}
          />
        </View>

        <View style={styles.flashSaleSection}>
          <View style={styles.flashSaleHeader}>
            <Text style={styles.sectionTitle}>Flash Sale</Text>
            <View style={styles.countdownContainer}>
              <Text style={styles.countdownLabel}>Closing in : </Text>
              <View style={styles.countdownTimer}>
                <Text style={styles.countdownDigit}>
                  {countdown.hours.toString().padStart(2, "0")}
                </Text>
                <Text style={styles.countdownSeparator}>:</Text>
                <Text style={styles.countdownDigit}>
                  {countdown.minutes.toString().padStart(2, "0")}
                </Text>
                <Text style={styles.countdownSeparator}>:</Text>
                <Text style={styles.countdownDigit}>
                  {countdown.seconds.toString().padStart(2, "0")}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.filterContainer}>
            <TouchableOpacity
              style={[
                styles.filterChip,
                activeFilter === "All" && styles.activeFilterChip,
              ]}
              onPress={() => setActiveFilterApi("All")}
            >
              <Text
                style={[
                  styles.filterText,
                  activeFilter === "All" && styles.activeFilterText,
                ]}
              >
                All
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.filterChip,
                activeFilter === "Newest" && styles.activeFilterChip,
              ]}
              onPress={() => setActiveFilterApi("Newest")}
            >
              <Text
                style={[
                  styles.filterText,
                  activeFilter === "Newest" && styles.activeFilterText,
                ]}
              >
                Newest
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.filterChip,
                activeFilter === "Popular" && styles.activeFilterChip,
              ]}
              onPress={() => setActiveFilterApi("Popular")}
            >
              <Text
                style={[
                  styles.filterText,
                  activeFilter === "Popular" && styles.activeFilterText,
                ]}
              >
                Popular
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.filterChip,
                activeFilter === "Man" && styles.activeFilterChip,
              ]}
              onPress={() => setActiveFilterApi("Man")}
            >
              <Text
                style={[
                  styles.filterText,
                  activeFilter === "Man" && styles.activeFilterText,
                ]}
              >
                Man
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.filterChip,
                activeFilter === "Woman" && styles.activeFilterChip,
              ]}
              onPress={() => setActiveFilterApi("Woman")}
            >
              <Text
                style={[
                  styles.filterText,
                  activeFilter === "Woman" && styles.activeFilterText,
                ]}
              >
                Woman
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.productsGrid}>
            {productsList.map((item, index) => (
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
                  <Image
                    source={{ uri: item.image }}
                    style={styles.productImage}
                  />
                  <TouchableOpacity
                    style={styles.favoriteButton}
                    // onPress={() => toggleFavorite(item.id)}
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
                  <Text style={styles.productPrice}>${item.price}</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      <View style={styles.bottomNavigation}>
        <TouchableOpacity style={[styles.navItem, styles.activeNavItem]}>
          <Ionicons name="home" size={24} color="#8B6E4E" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate("Cart")}
        >
          <Feather name="shopping-bag" size={24} color="#999" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate("Wishlist")}
        >
          <Ionicons name="heart-outline" size={24} color="#999" />
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
    alignItems: "flex-start",
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  locationContainer: {
    flex: 1,
  },
  locationLabel: {
    fontFamily: "Poppins-Regular",
    fontSize: 12,
    color: "#999",
  },
  locationSelector: {
    flexDirection: "row",
    alignItems: "center",
  },
  locationText: {
    fontFamily: "Poppins-Medium",
    fontSize: 14,
    color: "#333",
    marginHorizontal: 4,
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  appName: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 16,
    color: "#ccc",
    opacity: 0.7,
    marginRight: 15,
  },
  notificationButton: {
    padding: 5,
  },
  searchContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    marginTop: 15,
  },
  searchBar: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginRight: 10,
  },
  searchPlaceholder: {
    flex: 1,
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    color: "#999",
    marginLeft: 10,
  },
  searchInput: {
    flex: 1,
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    color: "#333",
    marginLeft: 10,
  },
  filterButton: {
    backgroundColor: "#8B6E4E",
    borderRadius: 10,
    width: 44,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop: 20,
  },
  bannerContainer: {
    marginBottom: 20,
  },
  banner: {
    backgroundColor: "#F5F2EA",
    borderRadius: 15,
    padding: 10,
    marginRight: 10,
    overflow: "hidden",
  },
  bannerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
  },
  bannerTitle: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 18,
    color: "#333",
    marginBottom: 5,
  },
  bannerSubtitle: {
    fontFamily: "Poppins-Regular",
    fontSize: 12,
    color: "#666",
    marginBottom: 10,
    lineHeight: 18,
  },
  shopNowButton: {
    backgroundColor: "#8B6E4E",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 15,
    alignSelf: "flex-start",
  },
  shopNowText: {
    fontFamily: "Poppins-Medium",
    fontSize: 12,
    color: "#fff",
  },
  bannerImage: {
    width: 120,
    height: 120,
    borderRadius: 10,
  },
  paginationDots: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#ddd",
    marginHorizontal: 3,
  },
  activeDot: {
    backgroundColor: "#8B6E4E",
    width: 16,
  },
  categorySection: {
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  sectionTitle: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 18,
    color: "#333",
  },
  seeAllText: {
    fontFamily: "Poppins-Medium",
    fontSize: 14,
    color: "#8B6E4E",
  },
  categoryList: {
    paddingRight: 20,
  },
  categoryItem: {
    alignItems: "center",
    marginRight: 20,
  },
  categoryIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  categoryIcon: {
    width: 30,
    height: 30,
  },
  categoryName: {
    fontFamily: "Poppins-Medium",
    fontSize: 12,
    color: "#333",
  },
  flashSaleSection: {
    marginBottom: 20,
  },
  flashSaleHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  countdownContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  countdownLabel: {
    fontFamily: "Poppins-Regular",
    fontSize: 12,
    color: "#666",
    marginRight: 5,
  },
  countdownTimer: {
    flexDirection: "row",
    alignItems: "center",
  },
  countdownDigit: {
    fontFamily: "Poppins-Medium",
    fontSize: 12,
    color: "#333",
  },
  countdownSeparator: {
    fontFamily: "Poppins-Medium",
    fontSize: 12,
    color: "#333",
    marginHorizontal: 2,
  },
  filterContainer: {
    flexDirection: "row",
    marginBottom: 15,
  },
  filterChip: {
    paddingHorizontal: 15,
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
    fontSize: 12,
    color: "#666",
  },
  activeFilterText: {
    color: "#fff",
  },
  productsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
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
