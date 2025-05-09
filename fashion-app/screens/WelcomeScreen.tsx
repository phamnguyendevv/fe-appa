import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export default function WelcomeScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList, "Welcome">>();

  const handleGetStarted = () => {
    navigation.navigate("Onboarding");
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />

      <View style={styles.header}>
        <Text style={styles.appName}>InsightVancer</Text>
      </View>

      <View style={styles.imageContainer}>
        <View style={[styles.imageWrapper, styles.leftImage]}>
          <Image
            source={require("../assets/fashion1.jpg")}
            style={styles.image}
            resizeMode="cover"
          />
        </View>

        <View style={styles.rightImagesContainer}>
          <View style={[styles.imageWrapper, styles.topRightImage]}>
            <Image
              source={require("../assets/fashion2.jpg")}
              style={styles.image}
              resizeMode="cover"
            />
          </View>
          <View style={[styles.imageWrapper, styles.bottomRightImage]}>
            <Image
              source={require("../assets/fashion3.jpg")}
              style={styles.image}
              resizeMode="cover"
            />
          </View>
        </View>
      </View>

      <View style={styles.contentContainer}>
        <Text style={styles.title}>
          The <Text style={styles.highlightedText}>Fashion App</Text> That Makes
          You Look Your Best
        </Text>

        <Text style={styles.description}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt
        </Text>

        <TouchableOpacity style={styles.button} onPress={handleGetStarted}>
          <Text style={styles.buttonText}>Let's Get Started</Text>
        </TouchableOpacity>

        <View style={styles.signInContainer}>
          <Text style={styles.signInText}>
            Already have an account?{" "}
            <Text
              style={styles.signInLink}
              onPress={() => navigation.navigate("SignIn")}
            >
              Sign In
            </Text>
          </Text>
        </View>

        <View style={styles.divider} />
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
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  appName: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 18,
    color: "#ccc",
    opacity: 0.7,
  },
  imageContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    marginTop: 20,
    height: 300,
  },
  imageWrapper: {
    borderRadius: 40,
    overflow: "hidden",
  },
  leftImage: {
    flex: 1,
    marginRight: 10,
    height: "100%",
  },
  rightImagesContainer: {
    flex: 1,
    marginLeft: 10,
  },
  topRightImage: {
    height: "48%",
    marginBottom: "4%",
  },
  bottomRightImage: {
    height: "48%",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  contentContainer: {
    paddingHorizontal: 20,
    marginTop: 30,
    flex: 1,
  },
  title: {
    fontFamily: "Poppins-Bold",
    fontSize: 28,
    lineHeight: 36,
    color: "#333",
    marginBottom: 15,
  },
  highlightedText: {
    color: "#8B6E4E",
  },
  description: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    color: "#666",
    lineHeight: 22,
    marginBottom: 30,
  },
  button: {
    backgroundColor: "#8B6E4E",
    borderRadius: 10,
    paddingVertical: 16,
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: {
    fontFamily: "Poppins-Medium",
    color: "#fff",
    fontSize: 16,
  },
  signInContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  signInText: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    color: "#666",
  },
  signInLink: {
    fontFamily: "Poppins-Medium",
    color: "#8B6E4E",
  },
  divider: {
    height: 4,
    width: 60,
    backgroundColor: "#ddd",
    borderRadius: 2,
    alignSelf: "center",
  },
});
