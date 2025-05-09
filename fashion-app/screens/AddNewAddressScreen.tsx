"use client";

import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Checkbox from "expo-checkbox";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import { useUser } from "../contexts/UserContext";
import { addAdrress } from "../api/user";

export default function AddNewAddressScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList, "Cart">>();
  const [addressType, setAddressType] = useState("Home");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [isDefault, setIsDefault] = useState(false);

  const addressTypes = ["Home", "Office", "Other"];

  const { userData, logout } = useUser();

  const userId = userData.id;

  const handleSaveAddress = () => {
    // Validate inputs
    if (!name.trim()) {
      alert("Please enter your name");
      return;
    }

    if (!phoneNumber.trim()) {
      alert("Please enter your phone number");
      return;
    }

    if (!address.trim()) {
      alert("Please enter your address");
      return;
    }

    if (!city.trim()) {
      alert("Please enter your city");
      return;
    }

    if (!country.trim()) {
      alert("Please enter your country");
      return;
    }

    // Create new address object
    const newAddress = {
      userId: userId,
      type: addressType,
      address: address,
      name: name,
      phoneNumber: phoneNumber,
      country: country,
      city: city,
    };

    try {
      const response = addAdrress(newAddress);
      console.log("Address added successfully:", response);
      alert("Address added successfully!");
      navigation.goBack();
    } catch (error) {
      console.error("Error adding address:", error);
      alert("Failed to add address. Please try again.");
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
        <Text style={styles.headerTitle}>Add New Address</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.addressTypeContainer}>
          <Text style={styles.sectionTitle}>Address Type</Text>
          <View style={styles.addressTypeOptions}>
            {addressTypes.map((type) => (
              <TouchableOpacity
                key={type}
                style={[
                  styles.addressTypeChip,
                  addressType === type && styles.activeAddressTypeChip,
                ]}
                onPress={() => setAddressType(type)}
              >
                <Text
                  style={[
                    styles.addressTypeText,
                    addressType === type && styles.activeAddressTypeText,
                  ]}
                >
                  {type}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Full Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your full name"
              placeholderTextColor="#999"
              value={name}
              onChangeText={setName}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Phone Number</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your phone number"
              placeholderTextColor="#999"
              keyboardType="phone-pad"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Address</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your street address"
              placeholderTextColor="#999"
              value={address}
              onChangeText={setAddress}
            />
          </View>

          <View style={styles.rowContainer}>
            <View style={[styles.inputContainer, { flex: 1, marginRight: 10 }]}>
              <Text style={styles.inputLabel}>City</Text>
              <TextInput
                style={styles.input}
                placeholder="City"
                placeholderTextColor="#999"
                value={city}
                onChangeText={setCity}
              />
            </View>

            <View style={[styles.inputContainer, { flex: 1, marginLeft: 10 }]}>
              <Text style={styles.inputLabel}>Country</Text>
              <TextInput
                style={styles.input}
                placeholder="Country"
                placeholderTextColor="#999"
                value={country}
                onChangeText={setCountry}
              />
            </View>
          </View>

          <View style={styles.checkboxContainer}>
            <Checkbox
              style={styles.checkbox}
              value={isDefault}
              onValueChange={setIsDefault}
              color={isDefault ? "#8B6E4E" : undefined}
            />
            <Text style={styles.checkboxLabel}>Set as default address</Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.saveButton} onPress={handleSaveAddress}>
          <Text style={styles.saveButtonText}>Save Address</Text>
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
    paddingTop: 20,
  },
  addressTypeContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 16,
    color: "#333",
    marginBottom: 15,
  },
  addressTypeOptions: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  addressTypeChip: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#f5f5f5",
    marginRight: 10,
    marginBottom: 10,
  },
  activeAddressTypeChip: {
    backgroundColor: "#8B6E4E",
  },
  addressTypeText: {
    fontFamily: "Poppins-Medium",
    fontSize: 14,
    color: "#666",
  },
  activeAddressTypeText: {
    color: "#fff",
  },
  form: {
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontFamily: "Poppins-Medium",
    fontSize: 14,
    color: "#333",
    marginBottom: 8,
  },
  input: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    color: "#333",
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  checkbox: {
    marginRight: 10,
    borderRadius: 4,
    width: 20,
    height: 20,
  },
  checkboxLabel: {
    fontFamily: "Poppins-Medium",
    fontSize: 14,
    color: "#333",
  },
  footer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  saveButton: {
    backgroundColor: "#8B6E4E",
    borderRadius: 10,
    paddingVertical: 16,
    alignItems: "center",
  },
  saveButtonText: {
    fontFamily: "Poppins-Medium",
    color: "#fff",
    fontSize: 16,
  },
});
