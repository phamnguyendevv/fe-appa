"use client";

import { useState } from "react";
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
// import Slider from "@react-native-community/slider";

// Filter options
const brands = ["All", "Nike", "Adidas", "Puma", "Fila"];
const genders = ["All", "Men", "Women"];
const sortOptions = ["Most Recent", "Popular", "Price Low"];
const reviewOptions = [
  { label: "4.5 and above", value: 4.5 },
  { label: "4.0 - 4.5", value: 4.0 },
  { label: "3.5 - 4.0", value: 3.5 },
  { label: "3.0 - 3.5", value: 3.0 },
  { label: "2.5 - 3.0", value: 2.5 },
];

export default function FilterScreen() {
  const navigation = useNavigation();
  const [selectedBrand, setSelectedBrand] = useState("All");
  const [selectedGender, setSelectedGender] = useState("All");
  const [selectedSortOption, setSelectedSortOption] = useState("Popular");
  const [priceRange, setPriceRange] = useState([7, 100]);
  const [selectedRating, setSelectedRating] = useState(4.5);

  const handleReset = () => {
    setSelectedBrand("All");
    setSelectedGender("All");
    setSelectedSortOption("Most Recent");
    setPriceRange([7, 100]);
    setSelectedRating(4.5);
  };

  const handleApply = () => {
    // Here you would pass the filter options back to the previous screen
    // For now, we'll just navigate back
    navigation.goBack();
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
        <Text style={styles.headerTitle}>Filter</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Brands</Text>
          <View style={styles.optionsContainer}>
            {brands.map((brand) => (
              <TouchableOpacity
                key={brand}
                style={[
                  styles.optionChip,
                  selectedBrand === brand && styles.selectedChip,
                ]}
                onPress={() => setSelectedBrand(brand)}
              >
                <Text
                  style={[
                    styles.optionText,
                    selectedBrand === brand && styles.selectedOptionText,
                  ]}
                >
                  {brand}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Gender</Text>
          <View style={styles.optionsContainer}>
            {genders.map((gender) => (
              <TouchableOpacity
                key={gender}
                style={[
                  styles.optionChip,
                  selectedGender === gender && styles.selectedChip,
                ]}
                onPress={() => setSelectedGender(gender)}
              >
                <Text
                  style={[
                    styles.optionText,
                    selectedGender === gender && styles.selectedOptionText,
                  ]}
                >
                  {gender}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Sort by</Text>
          <View style={styles.optionsContainer}>
            {sortOptions.map((option) => (
              <TouchableOpacity
                key={option}
                style={[
                  styles.optionChip,
                  selectedSortOption === option && styles.selectedChip,
                ]}
                onPress={() => setSelectedSortOption(option)}
              >
                <Text
                  style={[
                    styles.optionText,
                    selectedSortOption === option && styles.selectedOptionText,
                  ]}
                >
                  {option}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Pricing Range</Text>
          <View style={styles.sliderContainer}>
            {/* <Slider
              style={styles.slider}
              minimumValue={2}
              maximumValue={150}
              value={priceRange[1]}
              onValueChange={(value: number) =>
                setPriceRange([priceRange[0], value])
              }
              minimumTrackTintColor="#8B6E4E"
              maximumTrackTintColor="#E0E0E0"
              thumbTintColor="#8B6E4E"
            /> */}
            <View style={styles.priceLabels}>
              <Text style={styles.priceLabel}>2</Text>
              <Text style={styles.priceLabel}>7</Text>
              <Text style={styles.priceLabel}>22</Text>
              <Text style={styles.priceLabel}>50</Text>
              <Text style={styles.priceLabel}>100</Text>
              <Text style={styles.priceLabel}>150+</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Reviews</Text>
          <View style={styles.reviewsContainer}>
            {reviewOptions.map((option) => (
              <TouchableOpacity
                key={option.value}
                style={styles.reviewOption}
                onPress={() => setSelectedRating(option.value)}
              >
                <View style={styles.starsContainer}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Ionicons
                      key={star}
                      name="star"
                      size={16}
                      color="#FFD700"
                    />
                  ))}
                </View>
                <Text style={styles.reviewText}>{option.label}</Text>
                <View style={styles.radioButton}>
                  {selectedRating === option.value && (
                    <View style={styles.radioButtonSelected} />
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
          <Text style={styles.resetButtonText}>Reset Filter</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.applyButton} onPress={handleApply}>
          <Text style={styles.applyButtonText}>Apply</Text>
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
    marginBottom: 10,
  },
  sectionTitle: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 16,
    color: "#333",
    marginBottom: 15,
  },
  optionsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  optionChip: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: "#f5f5f5",
    marginRight: 10,
    marginBottom: 10,
  },
  selectedChip: {
    backgroundColor: "#8B6E4E",
  },
  optionText: {
    fontFamily: "Poppins-Medium",
    fontSize: 14,
    color: "#333",
  },
  selectedOptionText: {
    color: "#fff",
  },
  sliderContainer: {
    marginBottom: 20,
  },
  slider: {
    width: "100%",
    height: 40,
  },
  priceLabels: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  priceLabel: {
    fontFamily: "Poppins-Regular",
    fontSize: 12,
    color: "#666",
  },
  reviewsContainer: {
    marginBottom: 20,
  },
  reviewOption: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  starsContainer: {
    flexDirection: "row",
  },
  reviewText: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    color: "#333",
    flex: 1,
    marginLeft: 10,
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#8B6E4E",
    justifyContent: "center",
    alignItems: "center",
  },
  radioButtonSelected: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#8B6E4E",
  },
  footer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: "#f5f5f5",
  },
  resetButton: {
    flex: 1,
    paddingVertical: 15,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 10,
    marginRight: 10,
  },
  resetButtonText: {
    fontFamily: "Poppins-Medium",
    fontSize: 14,
    color: "#333",
  },
  applyButton: {
    flex: 1,
    backgroundColor: "#8B6E4E",
    paddingVertical: 15,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    marginLeft: 10,
  },
  applyButtonText: {
    fontFamily: "Poppins-Medium",
    fontSize: 14,
    color: "#fff",
  },
});
