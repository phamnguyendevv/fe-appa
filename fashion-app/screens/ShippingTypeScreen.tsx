"use client";

import { SetStateAction, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";

// Sample shipping types
const shippingTypes: {
  id: string;
  type: string;
  estimatedArrival: string;
  icon: "bicycle-outline" | "car-outline" | "bus-outline" | "home-outline";
}[] = [
  {
    id: "1",
    type: "Economy",
    estimatedArrival: "25 August 2023",
    icon: "bicycle-outline",
  },
  {
    id: "2",
    type: "Regular",
    estimatedArrival: "24 August 2023",
    icon: "car-outline",
  },
  {
    id: "3",
    type: "Cargo",
    estimatedArrival: "22 August 2023",
    icon: "bus-outline",
  },
  {
    id: "4",
    type: "Friend's House",
    estimatedArrival: "2464 Royal Ln, Mesa, New Jersey 45463",
    icon: "home-outline",
  },
];

const orderItems = [
  {
    id: "1",
    name: "Brown Jacket",
    price: 83.97,
    size: "XL",
    image: require("../assets/product1.jpg"),
  },
  {
    id: "2",
    name: "Brown Suite",
    price: 120.0,
    size: "M",
    image: require("../assets/product2.jpg"),
  },
  {
    id: "3",
    name: "Brown Jacket",
    price: 83.97,
    size: "XL",
    image: require("../assets/product3.jpg"),
  },
];
export default function ShippingTypeScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList, "Cart">>();
  const [selectedShipping, setSelectedShipping] = useState("1");

  const handleShippingSelect = (id: any) => {
    setSelectedShipping(id);
  };

  const handleApply = () => {
    // Navigate back to checkout with the selected shipping type
    const selected = shippingTypes.find((type) => type.id === selectedShipping);

    navigation.navigate("Checkout", {
      cartItems: orderItems,
      selectedShipping: selected,
    });
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
        <Text style={styles.headerTitle}>Choose Shipping</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {shippingTypes.map((shipping) => (
          <TouchableOpacity
            key={shipping.id}
            style={styles.shippingItem}
            onPress={() => handleShippingSelect(shipping.id)}
          >
            <View style={styles.shippingLeft}>
              <Ionicons name={shipping.icon} size={22} color="#8B6E4E" />
              <View style={styles.shippingInfo}>
                <Text style={styles.shippingType}>{shipping.type}</Text>
                <Text style={styles.shippingText}>
                  Estimated Arrival: {shipping.estimatedArrival}
                </Text>
              </View>
            </View>
            <View
              style={[
                styles.radioButton,
                selectedShipping === shipping.id && styles.radioButtonSelected,
              ]}
            >
              {selectedShipping === shipping.id && (
                <View style={styles.radioButtonInner} />
              )}
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.applyButton} onPress={handleApply}>
          <Text style={styles.applyButtonText}>Apply</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
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
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  shippingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#f5f5f5",
  },
  shippingLeft: {
    flexDirection: "row",
    flex: 1,
  },
  shippingInfo: {
    marginLeft: 15,
    flex: 1,
  },
  shippingType: {
    fontFamily: "Poppins-Medium",
    fontSize: 14,
    color: "#333",
    marginBottom: 5,
  },
  shippingText: {
    fontFamily: "Poppins-Regular",
    fontSize: 12,
    color: "#666",
    lineHeight: 18,
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    justifyContent: "center",
    alignItems: "center",
  },
  radioButtonSelected: {
    borderColor: "#8B6E4E",
  },
  radioButtonInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#8B6E4E",
  },
  footer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  applyButton: {
    backgroundColor: "#8B6E4E",
    borderRadius: 10,
    paddingVertical: 16,
    alignItems: "center",
  },
  applyButtonText: {
    fontFamily: "Poppins-Medium",
    color: "#fff",
    fontSize: 16,
  },
});
