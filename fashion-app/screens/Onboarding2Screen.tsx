import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Feather, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";

const { width } = Dimensions.get("window");

export default function Onboarding2Screen() {
  const navigation =
    useNavigation<
      NativeStackNavigationProp<RootStackParamList, "Onboarding2">
    >();

  const handleSignIn = () => {
    navigation.navigate("SignIn");
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />

      <View style={styles.header}>
        <Text style={styles.appName}>InsightVancer</Text>
        <TouchableOpacity style={styles.skipButton} onPress={handleSignIn}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.phoneContainer}>
        <Image
          source={require("../assets/boad1.png")}
          style={styles.phoneFrame}
          resizeMode="contain"
        />
      </View>

      <View style={styles.bottomContent}>
        <Text style={styles.onboardingTitle}>Seamless Shopping Experience</Text>
        <Text style={styles.onboardingDescription}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt
        </Text>

        <View style={styles.navigationControls}>
          <View style={styles.paginationDotsBottom}>
            <View style={styles.dotBottom} />
            <View style={[styles.dotBottom, styles.activeDotBottom]} />
            <View style={styles.dotBottom} />
          </View>

          <TouchableOpacity style={styles.nextButton} onPress={handleSignIn}>
            <Ionicons name="arrow-forward" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
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
    paddingTop: 10,
  },
  appName: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 18,
    color: "#ccc",
    opacity: 0.7,
  },
  fullImage: {
    width: "100%",
    height: "100%",
    borderRadius: 20, // Nếu muốn bo góc
  },

  skipButton: {
    padding: 5,
  },
  skipText: {
    fontFamily: "Poppins-Medium",
    fontSize: 14,
    color: "#8B6E4E",
  },
  phoneContainer: {
    alignItems: "center",
    marginTop: 20,
    height: 400,
  },
  phoneFrame: {
    width: width * 0.7,
    height: "100%",
    position: "absolute",
    zIndex: 1,
  },
  phoneContent: {
    width: width * 0.6,
    height: "90%",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 15,
    zIndex: 0,
    marginTop: 20,
  },
  phoneHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  locationText: {
    fontFamily: "Poppins-Medium",
    fontSize: 12,
    color: "#333",
    marginHorizontal: 4,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  searchBar: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginRight: 8,
  },
  searchText: {
    fontFamily: "Poppins-Regular",
    fontSize: 12,
    color: "#999",
    marginLeft: 5,
  },
  searchButton: {
    backgroundColor: "#8B6E4E",
    borderRadius: 8,
    padding: 6,
  },
  bannerContainer: {
    marginBottom: 15,
  },
  bannerContent: {
    flexDirection: "row",
    backgroundColor: "#F5F2EA",
    borderRadius: 10,
    padding: 10,
    justifyContent: "space-between",
    alignItems: "center",
  },
  bannerTitle: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 12,
    color: "#333",
  },
  bannerSubtitle: {
    fontFamily: "Poppins-Regular",
    fontSize: 8,
    color: "#666",
    width: "80%",
    marginBottom: 5,
  },
  shopNowButton: {
    backgroundColor: "#8B6E4E",
    borderRadius: 5,
    paddingVertical: 3,
    paddingHorizontal: 8,
    alignSelf: "flex-start",
  },
  shopNowText: {
    fontFamily: "Poppins-Medium",
    fontSize: 8,
    color: "#fff",
  },
  bannerImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  paginationDots: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 5,
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#ddd",
    marginHorizontal: 2,
  },
  activeDot: {
    backgroundColor: "#8B6E4E",
    width: 10,
  },
  categorySection: {
    marginBottom: 15,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  sectionTitle: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 12,
    color: "#333",
  },
  seeAll: {
    fontFamily: "Poppins-Regular",
    fontSize: 10,
    color: "#8B6E4E",
  },
  categoryIcons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  categoryItem: {
    alignItems: "center",
  },
  categoryIconContainer: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 5,
  },
  categoryIcon: {
    width: 15,
    height: 15,
  },
  categoryLabel: {
    fontFamily: "Poppins-Regular",
    fontSize: 8,
    color: "#333",
  },
  flashSaleSection: {
    marginBottom: 10,
  },
  flashSaleTitle: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 12,
    color: "#333",
    marginBottom: 8,
  },
  filterContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  filterChip: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 15,
    backgroundColor: "#f5f5f5",
    marginRight: 5,
  },
  activeFilterChip: {
    backgroundColor: "#8B6E4E",
  },
  filterText: {
    fontFamily: "Poppins-Regular",
    fontSize: 8,
    color: "#666",
  },
  activeFilterText: {
    fontFamily: "Poppins-Medium",
    fontSize: 8,
    color: "#fff",
  },
  bottomContent: {
    flex: 1,
    paddingHorizontal: 40,
    justifyContent: "flex-end",
    paddingBottom: 120,
  },
  onboardingTitle: {
    fontFamily: "Poppins-Bold",
    fontSize: 24,
    color: "#333",
    textAlign: "center",
    marginBottom: 10,
  },
  onboardingDescription: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginBottom: 30,
  },
  navigationControls: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  paginationDotsBottom: {
    flexDirection: "row",
  },
  dotBottom: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#ddd",
    marginRight: 5,
  },
  activeDotBottom: {
    backgroundColor: "#8B6E4E",
  },
  nextButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#8B6E4E",
    justifyContent: "center",
    alignItems: "center",
  },
});
