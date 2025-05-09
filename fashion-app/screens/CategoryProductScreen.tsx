"use client";

import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  FlatList,
  Dimensions,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import { getProducts } from "../api/product";
import ProductItem from "../components/ProductItem";

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

type CaProuctRouteProp = RouteProp<
  { CategoryProduct: { category: any } },
  "CategoryProduct"
>;

export default function CategoryProductScreen() {
  const navigation =
    useNavigation<
      NativeStackNavigationProp<RootStackParamList, "CategoryProduct">
    >();

  const route = useRoute<CaProuctRouteProp>(); // Sử dụng kiểu đã định nghĩa
  const { category } = route.params || { category: "Jacket" };

  const [productsList, setProductsList] = useState<(typeof products)[0][]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const categoryId = category._id; // Assuming category has an id property
        const data = await getProducts({ category_id: categoryId });
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
  }, [category]);

  const toggleFavorite = (id: string) => {
    setProductsList((prev) =>
      prev.map((product) =>
        product.id === id
          ? { ...product, isFavorite: !product.isFavorite }
          : product
      )
    );
  };

  const handleProductPress = (product: any) => {
    navigation.navigate("ProductDetail", { product });
  };
  // Replace the renderProductItem function with:
  const renderProductItem = ({
    item,
    index,
  }: {
    item: (typeof products)[0];
    index: number;
  }) => (
    <ProductItem
      product={item}
      onToggleFavorite={toggleFavorite}
      index={index}
      isLastInRow={index % 2 === 1}
    />
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
        <Text style={styles.headerTitle}>{category.name}</Text>
        <View style={styles.placeholder} />
      </View>

      <FlatList
        data={productsList}
        renderItem={renderProductItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.productRow}
        contentContainerStyle={styles.productList}
        showsVerticalScrollIndicator={false}
      />
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
  placeholder: {
    width: 34,
  },
  productList: {
    padding: 20,
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
