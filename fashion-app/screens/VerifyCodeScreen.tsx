"use client";

import { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types";
import { verifyCode } from "../api/user";
import { useUser } from "../contexts/UserContext";

type VerifyCodeRouteProp = RouteProp<
  { VerifyCode: { email: string } },
  "VerifyCode"
>;

export default function VerifyCodeScreen() {
  const { resetPassword } = useUser();
  const navigation =
    useNavigation<
      NativeStackNavigationProp<RootStackParamList, "VerifyCode">
    >();
  const route = useRoute<VerifyCodeRouteProp>(); // Sử dụng kiểu đã định nghĩa
  const email = route.params?.email || "example@gmail.com";

  const [code, setCode] = useState(["", "", "", ""]);
  const inputRefs = useRef<(TextInput | null)[]>([]); // Dùng kiểu TextInput
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (timer > 0 && !canResend) {
      const interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else if (timer === 0 && !canResend) {
      setCanResend(true);
    }
  }, [timer, canResend]);

  const handleCodeChange = async (text: string, index: number) => {
    // Only allow numbers
    if (/^[0-9]?$/.test(text)) {
      const newCode = [...code];
      newCode[index] = text;
      setCode(newCode);

      // Tự động chuyển đến input tiếp theo nếu nhập số
      if (text && index < 3) {
        inputRefs.current[index + 1]?.focus();
      }
      if (newCode.every((digit) => digit !== "")) {
        const fullCode = newCode.join("");

        try {
          const response = await verifyCode({ email: email, code: fullCode });
          console.log("Verification response:", response.data);

          if (response.status === 200) {
            alert("Verification successful!");
            await resetPassword(email);
            navigation.navigate("NewPassword");
          } else {
            alert("Verification failed. Please try again.");
          }
        } catch (error) {
          console.error("Verification error:", error);
          alert("Verification failed. Please try again.");
        }
      }
    }
  };

  const handleKeyPress = (
    e: NativeSyntheticEvent<TextInputKeyPressEventData>,
    index: number
  ) => {
    // Xóa input hiện tại nếu nhấn Backspace
    if (e.nativeEvent.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleResendCode = () => {
    if (canResend) {
      // Reset the timer and canResend state
      setTimer(30);
      setCanResend(false);

      // Here you would implement the actual code resend logic
      alert("New verification code sent to " + email);
    }
  };

  const handleVerify = async () => {
    const fullCode = code.join("");
    if (fullCode.length === 4) {
      try {
        const response = await verifyCode({ email: email, code: fullCode });
        console.log("Verification response:", response.data);

        if (response.status === 200) {
          alert("Verification successful!");
          navigation.navigate("NewPassword");
        } else {
          alert("Verification failed. Please try again.");
        }
      } catch (error) {
        console.error("Verification error:", error);
        alert("Verification failed. Please try again.");
      }
    } else {
      alert("Please enter the complete 4-digit code");
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
        <Text style={styles.appName}>InsightVancer</Text>
        <View style={styles.placeholder} />
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Verify Code</Text>
        <Text style={styles.subtitle}>
          Please enter the code we just sent to email{"\n"}
          <Text style={styles.emailText}>{email}</Text>
        </Text>

        <View style={styles.codeContainer}>
          {[0, 1, 2, 3].map((index) => (
            <TextInput
              key={index}
              ref={(ref) => (inputRefs.current[index] = ref)}
              style={styles.codeInput}
              value={code[index]}
              onChangeText={(text) => handleCodeChange(text, index)}
              onKeyPress={(e) => handleKeyPress(e, index)}
              keyboardType="number-pad"
              maxLength={1}
              selectTextOnFocus
            />
          ))}
        </View>

        <View style={styles.resendContainer}>
          <Text style={styles.resendText}>Didn't receive OTP?</Text>
          <TouchableOpacity onPress={handleResendCode} disabled={!canResend}>
            <Text
              style={[
                styles.resendCodeText,
                !canResend && styles.resendCodeDisabled,
              ]}
            >
              {canResend ? "Resend code" : `Resend code (${timer}s)`}
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.verifyButton} onPress={handleVerify}>
          <Text style={styles.verifyButtonText}>Verify</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>InsightVancer</Text>
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
  backButton: {
    padding: 5,
  },
  appName: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 18,
    color: "#ccc",
    opacity: 0.7,
  },
  placeholder: {
    width: 24,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
    alignItems: "center",
  },
  title: {
    fontFamily: "Poppins-Bold",
    fontSize: 28,
    color: "#333",
    marginBottom: 15,
    textAlign: "center",
  },
  subtitle: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginBottom: 40,
    lineHeight: 22,
  },
  emailText: {
    color: "#8B6E4E",
  },
  codeContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 40,
  },
  codeInput: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    textAlign: "center",
    fontSize: 24,
    fontFamily: "Poppins-Medium",
    marginHorizontal: 8,
    color: "#333",
  },
  resendContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  resendText: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
  },
  resendCodeText: {
    fontFamily: "Poppins-Medium",
    fontSize: 14,
    color: "#8B6E4E",
  },
  resendCodeDisabled: {
    opacity: 0.5,
  },
  verifyButton: {
    backgroundColor: "#8B6E4E",
    borderRadius: 10,
    paddingVertical: 16,
    width: "100%",
    alignItems: "center",
  },
  verifyButtonText: {
    fontFamily: "Poppins-Medium",
    color: "#fff",
    fontSize: 16,
  },
  footer: {
    paddingBottom: 30,
    alignItems: "center",
  },
  footerText: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 18,
    color: "#ccc",
    opacity: 0.3,
  },
});
