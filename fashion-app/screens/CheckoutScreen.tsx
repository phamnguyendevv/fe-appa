import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";

// Sample cart items for the order list
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

export default function CheckoutScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList, "Checkout">>();
  const route = useRoute();
  type CheckoutScreenRouteProp = RouteProp<
    {
      params: {
        cartItems: typeof orderItems;
        selectedAddress?: { type: string; address: string };
      };
    },
    "params"
  >;
  const { cartItems, selectedAddress } = (route as CheckoutScreenRouteProp)
    .params || {
    cartItems: orderItems,
    selectedAddress: null,
  };

  const [address, setAddress] = useState({
    type: "Home",
    address: "1901 Thornridge Cir, Shiloh, Hawaii 81063",
  });

  useEffect(() => {
    if (selectedAddress) {
      setAddress(selectedAddress);
    }
  }, [selectedAddress]);

  const handleContinueToPayment = () => {
    navigation.navigate("PaymentMethods");
  };

  const handleChangeAddress = () => {
    // Navigate to address selection/edit screen
    navigation.navigate("ShippingAddress");
  };

  const handleChangeShipping = () => {
    // Navigate to shipping method selection screen
    navigation.navigate("ShippingType");
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
        <Text style={styles.headerTitle}>Checkout</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Shipping Address</Text>
          <View style={styles.addressContainer}>
            <View style={styles.addressLeft}>
              <Ionicons name="location-outline" size={20} color="#8B6E4E" />
              <View style={styles.addressDetails}>
                <Text style={styles.addressType}>Home</Text>
                <Text style={styles.addressText}>
                  1901 Thornridge Cir. Shiloh, Hawaii 81063
                </Text>
              </View>
            </View>
            <TouchableOpacity onPress={handleChangeAddress}>
              <Text style={styles.changeText}>CHANGE</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Choose Shipping Type</Text>
          <View style={styles.shippingContainer}>
            <View style={styles.shippingLeft}>
              <Ionicons name="car-outline" size={20} color="#8B6E4E" />
              <View style={styles.shippingDetails}>
                <Text style={styles.shippingType}>Economy</Text>
                <Text style={styles.shippingText}>
                  Estimated Arrival: 25 August 2023
                </Text>
              </View>
            </View>
            <TouchableOpacity onPress={handleChangeShipping}>
              <Text style={styles.changeText}>CHANGE</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Order List</Text>
          {cartItems.map((item) => (
            <View key={item.id} style={styles.orderItem}>
              <Image source={item.image} style={styles.productImage} />
              <View style={styles.productDetails}>
                <Text style={styles.productName}>{item.name}</Text>
                <Text style={styles.productSize}>Size: {item.size}</Text>
                <Text style={styles.productPrice}>${item.price}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.continueButton}
          onPress={handleContinueToPayment}
        >
          <Text style={styles.continueButtonText}>Continue to Payment</Text>
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
  },
  section: {
    marginTop: 20,
  },
  sectionTitle: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 16,
    color: "#333",
    marginBottom: 15,
  },
  addressContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  addressLeft: {
    flexDirection: "row",
    flex: 1,
  },
  addressDetails: {
    marginLeft: 15,
    flex: 1,
  },
  addressType: {
    fontFamily: "Poppins-Medium",
    fontSize: 14,
    color: "#333",
    marginBottom: 5,
  },
  addressText: {
    fontFamily: "Poppins-Regular",
    fontSize: 12,
    color: "#666",
    lineHeight: 18,
  },
  changeText: {
    fontFamily: "Poppins-Medium",
    fontSize: 12,
    color: "#8B6E4E",
  },
  shippingContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  shippingLeft: {
    flexDirection: "row",
    flex: 1,
  },
  shippingDetails: {
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
  },
  orderItem: {
    flexDirection: "row",
    marginBottom: 15,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#f5f5f5",
  },
  productImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
  },
  productDetails: {
    marginLeft: 15,
    justifyContent: "center",
  },
  productName: {
    fontFamily: "Poppins-Medium",
    fontSize: 14,
    color: "#333",
    marginBottom: 2,
  },
  productSize: {
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
  footer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: "#f5f5f5",
  },
  continueButton: {
    backgroundColor: "#8B6E4E",
    borderRadius: 10,
    paddingVertical: 16,
    alignItems: "center",
  },
  continueButtonText: {
    fontFamily: "Poppins-Medium",
    color: "#fff",
    fontSize: 16,
  },
});
