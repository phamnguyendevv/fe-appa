"use client";

import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Ionicons, Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import { useUser } from "../contexts/UserContext";
import { changePassword } from "../api/user";

export default function PasswordManagerScreen() {
  const navigation =
    useNavigation<
      NativeStackNavigationProp<RootStackParamList, "PasswordManager">
    >();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [currentPasswordVisible, setCurrentPasswordVisible] = useState(false);
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const {
    userData: { email, name: username, isLoggedIn },
  } = useUser();

  const toggleCurrentPasswordVisibility = () => {
    setCurrentPasswordVisible(!currentPasswordVisible);
  };

  const toggleNewPasswordVisibility = () => {
    setNewPasswordVisible(!newPasswordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  const handleForgotPassword = () => {
    navigation.navigate("ForgotPassword");
  };

  const handleChangePassword = async () => {
    // Validate inputs
    if (!currentPassword) {
      Alert.alert("Error", "Please enter your current password");
      return;
    }

    if (!newPassword) {
      Alert.alert("Error", "Please enter a new password");
      return;
    }

    if (newPassword.length < 6) {
      Alert.alert("Error", "New password must be at least 6 characters long");
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert("Error", "New passwords don't match");
      return;
    }

    try {
      const respone = await changePassword({
        email: email,
        password: currentPassword,
        newPassword: newPassword,
      });

      if (respone.status === 200) {
        Alert.alert("Success", "Password changed successfully");
        navigation.goBack();
      } else {
        Alert.alert("Error", respone.message);
      }
    } catch (error) {
      console.error("Error changing password:", error);
      Alert.alert("Error", "Curent password is incorrect");
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
        <Text style={styles.headerTitle}>Password Manager</Text>
        <View style={styles.placeholder} />
      </View>

      <View style={styles.content}>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Current Password</Text>
          <View style={styles.passwordInputWrapper}>
            <TextInput
              style={styles.passwordInput}
              placeholder="••••••••••••••"
              placeholderTextColor="#999"
              secureTextEntry={!currentPasswordVisible}
              value={currentPassword}
              onChangeText={setCurrentPassword}
            />
            <TouchableOpacity
              style={styles.eyeIcon}
              onPress={toggleCurrentPasswordVisibility}
            >
              <Feather
                name={currentPasswordVisible ? "eye" : "eye-off"}
                size={20}
                color="#999"
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.forgotPasswordLink}
            onPress={handleForgotPassword}
          >
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>New Password</Text>
          <View style={styles.passwordInputWrapper}>
            <TextInput
              style={styles.passwordInput}
              placeholder="••••••••••••••"
              placeholderTextColor="#999"
              secureTextEntry={!newPasswordVisible}
              value={newPassword}
              onChangeText={setNewPassword}
            />
            <TouchableOpacity
              style={styles.eyeIcon}
              onPress={toggleNewPasswordVisibility}
            >
              <Feather
                name={newPasswordVisible ? "eye" : "eye-off"}
                size={20}
                color="#999"
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Confirm New Password</Text>
          <View style={styles.passwordInputWrapper}>
            <TextInput
              style={styles.passwordInput}
              placeholder="••••••••••••••"
              placeholderTextColor="#999"
              secureTextEntry={!confirmPasswordVisible}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
            <TouchableOpacity
              style={styles.eyeIcon}
              onPress={toggleConfirmPasswordVisibility}
            >
              <Feather
                name={confirmPasswordVisible ? "eye" : "eye-off"}
                size={20}
                color="#999"
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.changePasswordButton}
          onPress={handleChangePassword}
        >
          <Text style={styles.changePasswordText}>Change Password</Text>
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
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontFamily: "Poppins-Medium",
    fontSize: 14,
    color: "#333",
    marginBottom: 8,
  },
  passwordInputWrapper: {
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 10,
    paddingHorizontal: 15,
  },
  passwordInput: {
    flex: 1,
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    color: "#333",
    paddingVertical: 12,
  },
  eyeIcon: {
    padding: 5,
  },
  forgotPasswordLink: {
    alignSelf: "flex-end",
    marginTop: 8,
  },
  forgotPasswordText: {
    fontFamily: "Poppins-Medium",
    fontSize: 14,
    color: "#8B6E4E",
  },
  footer: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  changePasswordButton: {
    backgroundColor: "#8B6E4E",
    borderRadius: 10,
    paddingVertical: 16,
    alignItems: "center",
  },
  changePasswordText: {
    fontFamily: "Poppins-Medium",
    color: "#fff",
    fontSize: 16,
  },
});
