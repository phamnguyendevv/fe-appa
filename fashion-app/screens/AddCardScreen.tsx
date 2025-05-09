"use client";

import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Checkbox from "expo-checkbox";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";

export default function AddCardScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList, "AddCard">>();
  const [cardHolderName, setCardHolderName] = useState("Esther Howard");
  const [cardNumber, setCardNumber] = useState("4716 9627 1635 8047");
  const [expiryDate, setExpiryDate] = useState("02/30");
  const [cvv, setCvv] = useState("");
  const [saveCard, setSaveCard] = useState(true);

  const formatCardNumber = (text: string): string => {
    // Remove all non-digits
    const cleaned = text.replace(/\D/g, "");
    // Add a space after every 4 digits
    const formatted = cleaned.replace(/(\d{4})(?=\d)/g, "$1 ");
    // Limit to 19 characters (16 digits + 3 spaces)
    return formatted.slice(0, 19);
  };

  const handleCardNumberChange = (text: string): void => {
    setCardNumber(formatCardNumber(text));
  };

  const handleExpiryDateChange = (text: string): void => {
    // Remove all non-digits
    const cleaned: string = text.replace(/\D/g, "");
    // Format as MM/YY
    if (cleaned.length <= 2) {
      setExpiryDate(cleaned);
    } else {
      setExpiryDate(`${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}`);
    }
  };

  const handleAddCard = () => {
    if (!cardHolderName.trim()) {
      alert("Please enter card holder name");
      return;
    }

    if (cardNumber.replace(/\s/g, "").length !== 16) {
      alert("Please enter a valid 16-digit card number");
      return;
    }

    if (!expiryDate || expiryDate.length !== 5) {
      alert("Please enter a valid expiry date (MM/YY)");
      return;
    }

    if (!cvv || cvv.length !== 3) {
      alert("Please enter a valid 3-digit CVV");
      return;
    }

    // Navigate back to payment methods with the new card
    navigation.navigate("PaymentMethods", {
      newCard: {
        name: cardHolderName,
        number: cardNumber,
        expiry: expiryDate,
      },
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
        <Text style={styles.headerTitle}>Add Card</Text>
        <View style={styles.placeholder} />
      </View>

      <View style={styles.content}>
        <View style={styles.cardPreview}>
          <View style={styles.cardChip} />
          <Text style={styles.cardNumber}>4716 9627 1635 8047</Text>
          <View style={styles.cardDetails}>
            <View>
              <Text style={styles.cardLabel}>Card holder name</Text>
              <Text style={styles.cardValue}>
                {cardHolderName || "Your Name"}
              </Text>
            </View>
            <View>
              <Text style={styles.cardLabel}>Expiry date</Text>
              <Text style={styles.cardValue}>{expiryDate || "MM/YY"}</Text>
            </View>
          </View>
          <Text style={styles.cardBrand}>VISA</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Card Holder Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter card holder name"
              placeholderTextColor="#999"
              value={cardHolderName}
              onChangeText={setCardHolderName}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Card Number</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter card number"
              placeholderTextColor="#999"
              keyboardType="number-pad"
              value={cardNumber}
              onChangeText={handleCardNumberChange}
              maxLength={19}
            />
          </View>

          <View style={styles.rowContainer}>
            <View style={[styles.inputContainer, { flex: 1, marginRight: 10 }]}>
              <Text style={styles.inputLabel}>Expiry Date</Text>
              <TextInput
                style={styles.input}
                placeholder="MM/YY"
                placeholderTextColor="#999"
                keyboardType="number-pad"
                value={expiryDate}
                onChangeText={handleExpiryDateChange}
                maxLength={5}
              />
            </View>

            <View style={[styles.inputContainer, { flex: 1, marginLeft: 10 }]}>
              <Text style={styles.inputLabel}>CVV</Text>
              <TextInput
                style={styles.input}
                placeholder="000"
                placeholderTextColor="#999"
                keyboardType="number-pad"
                value={cvv}
                onChangeText={setCvv}
                maxLength={3}
                secureTextEntry
              />
            </View>
          </View>

          <View style={styles.checkboxContainer}>
            <Checkbox
              style={styles.checkbox}
              value={saveCard}
              onValueChange={setSaveCard}
              color={saveCard ? "#8B6E4E" : undefined}
            />
            <Text style={styles.checkboxLabel}>Save Card</Text>
          </View>
        </View>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.addButton} onPress={handleAddCard}>
          <Text style={styles.addButtonText}>Add Card</Text>
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
  cardPreview: {
    height: 180,
    backgroundColor: "#8B6E4E",
    borderRadius: 16,
    padding: 20,
    marginBottom: 30,
    position: "relative",
    justifyContent: "space-between",
  },
  cardChip: {
    width: 40,
    height: 30,
    backgroundColor: "#D4B996",
    borderRadius: 6,
    marginBottom: 20,
  },
  cardNumber: {
    fontFamily: "Poppins-Medium",
    fontSize: 18,
    color: "#fff",
    letterSpacing: 2,
    marginBottom: 20,
  },
  cardDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cardLabel: {
    fontFamily: "Poppins-Regular",
    fontSize: 10,
    color: "#D4B996",
    marginBottom: 4,
  },
  cardValue: {
    fontFamily: "Poppins-Medium",
    fontSize: 12,
    color: "#fff",
  },
  cardBrand: {
    position: "absolute",
    top: 20,
    right: 20,
    fontFamily: "Poppins-Bold",
    fontSize: 18,
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
  addButton: {
    backgroundColor: "#8B6E4E",
    borderRadius: 10,
    paddingVertical: 16,
    alignItems: "center",
  },
  addButtonText: {
    fontFamily: "Poppins-Medium",
    color: "#fff",
    fontSize: 16,
  },
});
