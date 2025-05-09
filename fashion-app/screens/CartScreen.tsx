"use client";

import { useState, useEffect, SetStateAction } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
  Modal,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Ionicons, Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";

// Sample cart items
const initialCartItems = [
  {
    id: "1",
    name: "Brown Jacket",
    price: 83.97,
    size: "XL",
    quantity: 1,
    image: require("../assets/product1.jpg"),
  },
  {
    id: "2",
    name: "Brown Suite",
    price: 120.0,
    size: "M",
    quantity: 1,
    image: require("../assets/product2.jpg"),
  },
  {
    id: "3",
    name: "Brown Jacket",
    price: 83.97,
    size: "XL",
    quantity: 1,
    image: require("../assets/product3.jpg"),
  },
];

export default function CartScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList, "Cart">>();
  const [cartItems, setCartItems] = useState(initialCartItems);
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(35.0);
  const [deliveryFee, setDeliveryFee] = useState(25.0);
  const [subtotal, setSubtotal] = useState(0);
  const [total, setTotal] = useState(0);
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [productToRemove, setProductToRemove] = useState<{
    id: string;
    name: string;
    price: number;
    size: string;
    quantity: number;
    image: any;
  } | null>(null);

  useEffect(() => {
    calculateTotals();
  }, [cartItems]);

  const calculateTotals = () => {
    const newSubtotal = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    setSubtotal(newSubtotal);
    setTotal(newSubtotal + deliveryFee - discount);
  };

  const handleQuantityChange = (id: string, change: number) => {
    setCartItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newQuantity = Math.max(1, item.quantity + change);
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  };

  const confirmRemoveItem = (item: {
    id: string;
    name: string;
    price: number;
    size: string;
    quantity: number;
    image: any;
  }) => {
    setProductToRemove(item);
    setShowRemoveModal(true);
  };

  const handleRemoveItem = () => {
    if (productToRemove) {
      setCartItems((prev) =>
        prev.filter((item) => item.id !== productToRemove.id)
      );
      setShowRemoveModal(false);
      setProductToRemove(null);
    }
  };

  const handleApplyPromo = () => {
    if (promoCode.trim()) {
      // In a real app, you would validate the promo code with an API
      alert(`Promo code "${promoCode}" applied!`);
      // For demo purposes, we'll just set a fixed discount
      setDiscount(35.0);
    } else {
      alert("Please enter a promo code");
    }
  };

  const handleCheckout = () => {
    // Navigate to checkout screen
    navigation.navigate("Checkout", { cartItems, selectedAddress: null });
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
        <Text style={styles.headerTitle}>My Cart</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {cartItems.map((item) => (
          <View key={item.id} style={styles.cartItem}>
            <Image source={item.image} style={styles.productImage} />
            <View style={styles.productInfo}>
              <Text style={styles.productName}>{item.name}</Text>
              <Text style={styles.productSize}>Size : {item.size}</Text>
              <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
            </View>
            <View style={styles.quantityContainer}>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={() => handleQuantityChange(item.id, -1)}
              >
                <Feather name="minus" size={16} color="#666" />
              </TouchableOpacity>
              <Text style={styles.quantityText}>{item.quantity}</Text>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={() => handleQuantityChange(item.id, 1)}
              >
                <Feather name="plus" size={16} color="#666" />
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => confirmRemoveItem(item)}
            >
              <Ionicons name="trash-outline" size={20} color="#FF6B6B" />
            </TouchableOpacity>
          </View>
        ))}

        <View style={styles.promoContainer}>
          <TextInput
            style={styles.promoInput}
            placeholder="Promo Code"
            placeholderTextColor="#999"
            value={promoCode}
            onChangeText={setPromoCode}
          />
          <TouchableOpacity
            style={styles.applyButton}
            onPress={handleApplyPromo}
          >
            <Text style={styles.applyButtonText}>Apply</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.summaryContainer}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Sub-Total</Text>
            <Text style={styles.summaryValue}>${subtotal.toFixed(2)}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Delivery Fee</Text>
            <Text style={styles.summaryValue}>${deliveryFee.toFixed(2)}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Discount</Text>
            <Text style={[styles.summaryValue, styles.discountText]}>
              -${discount.toFixed(2)}
            </Text>
          </View>
          <View style={[styles.summaryRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>Total Cost</Text>
            <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.checkoutButton}
          onPress={handleCheckout}
        >
          <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
        </TouchableOpacity>
      </ScrollView>

      <View style={styles.bottomNavigation}>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate("Home")}
        >
          <Ionicons name="home-outline" size={24} color="#999" />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.navItem, styles.activeNavItem]}>
          <Feather name="shopping-bag" size={24} color="#8B6E4E" />
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
      <Modal visible={showRemoveModal} transparent={true} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Remove from Cart?</Text>

            {productToRemove && (
              <View style={styles.modalItemContainer}>
                <Image
                  source={productToRemove.image}
                  style={styles.modalItemImage}
                />
                <View style={styles.modalItemInfo}>
                  <Text style={styles.modalItemName}>
                    {productToRemove.name}
                  </Text>
                  <Text style={styles.modalItemSize}>
                    Size : {productToRemove.size}
                  </Text>
                  <Text style={styles.modalItemPrice}>
                    ${productToRemove.price.toFixed(2)}
                  </Text>
                </View>
                <View style={styles.quantityContainer}>
                  <TouchableOpacity style={styles.quantityButton}>
                    <Feather name="minus" size={16} color="#666" />
                  </TouchableOpacity>
                  <Text style={styles.quantityText}>
                    {productToRemove.quantity}
                  </Text>
                  <TouchableOpacity style={styles.quantityButton}>
                    <Feather name="plus" size={16} color="#666" />
                  </TouchableOpacity>
                </View>
              </View>
            )}

            <View style={styles.modalButtonsContainer}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setShowRemoveModal(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.removeButton}
                onPress={handleRemoveItem}
              >
                <Text style={styles.removeButtonText}>Yes, Remove</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
    paddingTop: 10,
  },
  cartItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#f5f5f5",
    position: "relative",
  },
  productImage: {
    width: 70,
    height: 70,
    borderRadius: 10,
  },
  productInfo: {
    flex: 1,
    marginLeft: 15,
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
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
  },
  quantityButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    alignItems: "center",
  },
  quantityText: {
    fontFamily: "Poppins-Medium",
    fontSize: 14,
    color: "#333",
    marginHorizontal: 10,
  },
  deleteButton: {
    padding: 5,
  },
  promoContainer: {
    flexDirection: "row",
    marginTop: 20,
    marginBottom: 20,
  },
  promoInput: {
    flex: 1,
    height: 50,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 10,
    paddingHorizontal: 15,
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    color: "#333",
    marginRight: 10,
  },
  applyButton: {
    backgroundColor: "#8B6E4E",
    borderRadius: 10,
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  applyButtonText: {
    fontFamily: "Poppins-Medium",
    fontSize: 14,
    color: "#fff",
  },
  summaryContainer: {
    marginBottom: 20,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  summaryLabel: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    color: "#666",
  },
  summaryValue: {
    fontFamily: "Poppins-Medium",
    fontSize: 14,
    color: "#333",
  },
  discountText: {
    color: "#FF6B6B",
  },
  totalRow: {
    marginTop: 5,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: "#f5f5f5",
  },
  totalLabel: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 16,
    color: "#333",
  },
  totalValue: {
    fontFamily: "Poppins-Bold",
    fontSize: 16,
    color: "#333",
  },
  checkoutButton: {
    backgroundColor: "#8B6E4E",
    borderRadius: 10,
    paddingVertical: 16,
    alignItems: "center",
    marginBottom: 30,
  },
  checkoutButtonText: {
    fontFamily: "Poppins-Medium",
    fontSize: 16,
    color: "#fff",
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
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContainer: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  modalTitle: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 18,
    color: "#333",
    textAlign: "center",
    marginBottom: 20,
  },
  modalItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#f5f5f5",
    borderTopWidth: 1,
    borderTopColor: "#f5f5f5",
  },
  modalItemImage: {
    width: 70,
    height: 70,
    borderRadius: 10,
  },
  modalItemInfo: {
    flex: 1,
    marginLeft: 15,
  },
  modalItemName: {
    fontFamily: "Poppins-Medium",
    fontSize: 14,
    color: "#333",
    marginBottom: 2,
  },
  modalItemSize: {
    fontFamily: "Poppins-Regular",
    fontSize: 12,
    color: "#999",
    marginBottom: 5,
  },
  modalItemPrice: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 14,
    color: "#333",
  },
  modalButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    alignItems: "center",
    marginRight: 10,
  },
  cancelButtonText: {
    fontFamily: "Poppins-Medium",
    fontSize: 14,
    color: "#666",
  },
  removeButton: {
    flex: 1,
    backgroundColor: "#8B6E4E",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    marginLeft: 10,
  },
  removeButtonText: {
    fontFamily: "Poppins-Medium",
    fontSize: 14,
    color: "#fff",
  },
});
