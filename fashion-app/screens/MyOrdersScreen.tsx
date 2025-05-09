"use client";

import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";

// Sample order data
const activeOrders = [
  {
    id: "1",
    name: "Brown Jacket",
    size: "XL",
    quantity: 10,
    price: 83.97,
    image: require("../assets/product1.jpg"),
  },
  {
    id: "2",
    name: "Brown Suite",
    size: "XL",
    quantity: 10,
    price: 120,
    image: require("../assets/product2.jpg"),
  },
  {
    id: "3",
    name: "Brown Suite",
    size: "XL",
    quantity: 10,
    price: 120,
    image: require("../assets/product3.jpg"),
  },
  {
    id: "4",
    name: "Brown Jacket",
    size: "XL",
    quantity: 10,
    price: 83.97,
    image: require("../assets/product1.jpg"),
  },
  {
    id: "5",
    name: "Brown Jacket",
    size: "XL",
    quantity: 10,
    price: 83.97,
    image: require("../assets/product2.jpg"),
  },
  {
    id: "6",
    name: "Brown Jacket",
    size: "XL",
    quantity: 10,
    price: 83.97,
    image: require("../assets/product3.jpg"),
  },
];

const completedOrders = [
  {
    id: "1",
    name: "Brown Jacket",
    size: "XL",
    quantity: 10,
    price: 83.97,
    image: require("../assets/product4.jpg"),
  },
  {
    id: "2",
    name: "Brown Suite",
    size: "XL",
    quantity: 10,
    price: 120,
    image: require("../assets/product1.jpg"),
  },
  {
    id: "3",
    name: "Brown Suite",
    size: "XL",
    quantity: 10,
    price: 120,
    image: require("../assets/product2.jpg"),
  },
  {
    id: "4",
    name: "Brown Jacket",
    size: "XL",
    quantity: 10,
    price: 83.97,
    image: require("../assets/product3.jpg"),
  },
  {
    id: "5",
    name: "Brown Jacket",
    size: "XL",
    quantity: 10,
    price: 83.97,
    image: require("../assets/product4.jpg"),
  },
  {
    id: "6",
    name: "Brown Jacket",
    size: "XL",
    quantity: 10,
    price: 83.97,
    image: require("../assets/product1.jpg"),
  },
];

const cancelledOrders = [
  {
    id: "1",
    name: "Brown Jacket",
    size: "XL",
    quantity: 10,
    price: 83.97,
    image: require("../assets/product2.jpg"),
  },
  {
    id: "2",
    name: "Brown Suite",
    size: "XL",
    quantity: 10,
    price: 120,
    image: require("../assets/product3.jpg"),
  },
  {
    id: "3",
    name: "Brown Suite",
    size: "XL",
    quantity: 10,
    price: 120,
    image: require("../assets/product4.jpg"),
  },
  {
    id: "4",
    name: "Brown Jacket",
    size: "XL",
    quantity: 10,
    price: 83.97,
    image: require("../assets/product1.jpg"),
  },
  {
    id: "5",
    name: "Brown Jacket",
    size: "XL",
    quantity: 10,
    price: 83.97,
    image: require("../assets/product2.jpg"),
  },
  {
    id: "6",
    name: "Brown Jacket",
    size: "XL",
    quantity: 10,
    price: 83.97,
    image: require("../assets/product3.jpg"),
  },
];

export default function MyOrdersScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList, "MyOrders">>();
  const [activeTab, setActiveTab] = useState("Active");

  const handleTrackOrder = (order: any) => {
    // Navigate to order tracking screen
    navigation.navigate("TrackOrder", { order });
  };

  const handleLeaveReview = (orderId: any) => {
    // Navigate to review screen
    alert(`Leave review for order ${orderId}`);
  };

  const handleReOrder = (orderId: any) => {
    // Add to cart and navigate to cart
    alert(`Re-ordering order ${orderId}`);
  };

  const renderOrderItem = ({
    item,
  }: {
    item: {
      id: string;
      name: string;
      size: string;
      quantity: number;
      price: number;
      image: any;
    };
  }) => {
    let actionButton;

    if (activeTab === "Active") {
      actionButton = (
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => handleTrackOrder(item)}
        >
          <Text style={styles.actionButtonText}>Track Order</Text>
        </TouchableOpacity>
      );
    } else if (activeTab === "Completed") {
      actionButton = (
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => handleLeaveReview(item.id)}
        >
          <Text style={styles.actionButtonText}>Leave Review</Text>
        </TouchableOpacity>
      );
    } else {
      actionButton = (
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => handleReOrder(item.id)}
        >
          <Text style={styles.actionButtonText}>Re-Order</Text>
        </TouchableOpacity>
      );
    }

    return (
      <View style={styles.orderItem}>
        <Image source={item.image} style={styles.productImage} />
        <View style={styles.orderDetails}>
          <View style={styles.orderInfo}>
            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.productDetails}>
              Size : {item.size} | Qty : {item.quantity}pcs
            </Text>
            <Text style={styles.productPrice}>${item.price}</Text>
          </View>
          {actionButton}
        </View>
      </View>
    );
  };

  const getOrdersData = () => {
    switch (activeTab) {
      case "Active":
        return activeOrders;
      case "Completed":
        return completedOrders;
      case "Cancelled":
        return cancelledOrders;
      default:
        return activeOrders;
    }
  };

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
        <Text style={styles.headerTitle}>My Orders</Text>
        <View style={styles.placeholder} />
      </View>

      <View style={styles.tabsContainer}>
        {["Active", "Completed", "Cancelled"].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && styles.activeTab]}
            onPress={() => setActiveTab(tab)}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === tab && styles.activeTabText,
              ]}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={getOrdersData()}
        renderItem={renderOrderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.ordersList}
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
  tabsContainer: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  tab: {
    flex: 1,
    paddingVertical: 15,
    alignItems: "center",
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: "#8B6E4E",
  },
  tabText: {
    fontFamily: "Poppins-Medium",
    fontSize: 14,
    color: "#999",
  },
  activeTabText: {
    color: "#8B6E4E",
  },
  ordersList: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  orderItem: {
    flexDirection: "row",
    marginBottom: 15,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#f5f5f5",
  },
  productImage: {
    width: 70,
    height: 70,
    borderRadius: 10,
  },
  orderDetails: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: 15,
  },
  orderInfo: {
    flex: 1,
    justifyContent: "center",
  },
  productName: {
    fontFamily: "Poppins-Medium",
    fontSize: 14,
    color: "#333",
    marginBottom: 2,
  },
  productDetails: {
    fontFamily: "Poppins-Regular",
    fontSize: 12,
    color: "#999",
    marginBottom: 5,
  },
  productPrice: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 14,
    color: "#333",
  },
  actionButton: {
    backgroundColor: "#8B6E4E",
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
    justifyContent: "center",
    alignSelf: "center",
  },
  actionButtonText: {
    fontFamily: "Poppins-Medium",
    fontSize: 12,
    color: "#fff",
  },
});
