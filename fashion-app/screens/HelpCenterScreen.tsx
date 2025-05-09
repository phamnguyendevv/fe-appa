"use client";

import { SetStateAction, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Pressable,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

// Sample FAQ data
const faqCategories = ["All", "Services", "General", "Account"];

const faqItems = [
  {
    id: "1",
    question: "Can I track my order's delivery status?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    category: "Services",
  },
  {
    id: "2",
    question: "Is there a return policy?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    category: "Services",
  },
  {
    id: "3",
    question: "Can I save my favorite items for later?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    category: "General",
  },
  {
    id: "4",
    question: "Can I share products with my friends?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    category: "General",
  },
  {
    id: "5",
    question: "How do I contact customer support?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    category: "Services",
  },
  {
    id: "6",
    question: "What payment methods are accepted?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    category: "Account",
  },
  {
    id: "7",
    question: "How to add review?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    category: "General",
  },
];

// Contact methods
const contactMethods = [
  {
    id: "1",
    name: "Customer Service",
    icon: <Ionicons name="headset-outline" size={22} color="#8B6E4E" />,
    expanded: false,
    content: null,
  },
  {
    id: "2",
    name: "WhatsApp",
    icon: <FontAwesome name="whatsapp" size={22} color="#8B6E4E" />,
    expanded: true,
    content: "(480) 555-0103",
  },
  {
    id: "3",
    name: "Website",
    icon: <Ionicons name="globe-outline" size={22} color="#8B6E4E" />,
    expanded: false,
    content: null,
  },
  {
    id: "4",
    name: "Facebook",
    icon: <FontAwesome name="facebook" size={22} color="#8B6E4E" />,
    expanded: false,
    content: null,
  },
  {
    id: "5",
    name: "Twitter",
    icon: <FontAwesome name="twitter" size={22} color="#8B6E4E" />,
    expanded: false,
    content: null,
  },
  {
    id: "6",
    name: "Instagram",
    icon: <FontAwesome name="instagram" size={22} color="#8B6E4E" />,
    expanded: false,
    content: null,
  },
];

export default function HelpCenterScreen() {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState("FAQ");
  const [activeCategory, setActiveCategory] = useState("All");
  const [expandedFaq, setExpandedFaq] = useState<string | null>("1");
  const [searchQuery, setSearchQuery] = useState("");
  const [contactItems, setContactItems] = useState(contactMethods);

  const handleFaqPress = (id: SetStateAction<string | null>) => {
    setExpandedFaq(expandedFaq === id ? null : id);
  };

  const handleContactPress = (id: string) => {
    setContactItems(
      contactItems.map((item) => ({
        ...item,
        expanded: item.id === id ? !item.expanded : item.expanded,
      }))
    );
  };

  const filteredFaqs = faqItems.filter(
    (faq) =>
      (activeCategory === "All" || faq.category === activeCategory) &&
      (searchQuery === "" ||
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()))
  );

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
        <Text style={styles.headerTitle}>Help Center</Text>
        <View style={styles.placeholder} />
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color="#999" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search"
            placeholderTextColor="#999"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === "FAQ" && styles.activeTab]}
          onPress={() => setActiveTab("FAQ")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "FAQ" && styles.activeTabText,
            ]}
          >
            FAQ
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === "Contact" && styles.activeTab]}
          onPress={() => setActiveTab("Contact")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "Contact" && styles.activeTabText,
            ]}
          >
            Contact Us
          </Text>
        </TouchableOpacity>
      </View>

      {activeTab === "FAQ" ? (
        <>

          <ScrollView
            style={styles.contentFAQ}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            keyboardDismissMode="on-drag"
          >
            {filteredFaqs.map((faq) => (
              <Pressable
                key={faq.id}
                style={styles.faqItem}
                onPress={() => handleFaqPress(faq.id)}
              >
                <View style={styles.faqHeader}>
                  <Text style={styles.faqQuestion}>{faq.question}</Text>
                  <Ionicons
                    name={
                      expandedFaq === faq.id ? "chevron-up" : "chevron-down"
                    }
                    size={20}
                    color="#666"
                  />
                </View>
                {expandedFaq === faq.id && (
                  <Text style={styles.faqAnswer}>{faq.answer}</Text>
                )}
              </Pressable>
            ))}
          </ScrollView>
        </>
      ) : (
        <ScrollView
          style={styles.content}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
        >
          {contactItems.map((item) => (
            <Pressable
              key={item.id}
              style={styles.contactItem}
              onPress={() => handleContactPress(item.id)}
            >
              <View style={styles.contactHeader}>
                <View style={styles.contactLeft}>
                  {item.icon}
                  <Text style={styles.contactName}>{item.name}</Text>
                </View>
                <Ionicons
                  name={item.expanded ? "chevron-up" : "chevron-down"}
                  size={20}
                  color="#666"
                />
              </View>
              {item.expanded && item.content && (
                <View style={styles.contactContent}>
                  <View style={styles.bulletPoint} />
                  <Text style={styles.contactContentText}>{item.content}</Text>
                </View>
              )}
            </Pressable>
          ))}
        </ScrollView>
      )}
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
  searchContainer: {
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  searchInput: {
    flex: 1,
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    color: "#333",
    marginLeft: 10,
  },
  tabsContainer: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  tab: {
    flex: 1,
    paddingVertical: 15,
    alignItems: "center",
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: "#8B6E4E",
  },
  tabText: {
    fontFamily: "Poppins-Medium",
    fontSize: 14,
    color: "#999",
  },
  activeTabText: {
    color: "#8B6E4E",
  },
  categoriesContainer: {
    paddingVertical: 10,
    paddingLeft: 20,
    marginBottom: 0, // hoặc bạn chỉnh nếu cần giãn cách bên dưới
    backgroundColor: "#fff",
    height: 50, // tổng cố định theo yêu cầu
  },
  categoryChip: {
    paddingHorizontal: 16,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#f5f5f5",
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  activeCategoryChip: {
    backgroundColor: "#8B6E4E",
  },
  categoryText: {
    fontFamily: "Poppins-Medium",
    fontSize: 14,

    color: "#666",
  },
  activeCategoryText: {
    color: "#fff",
  },
  contentFAQ: {
    flex: 1,
    paddingHorizontal: 20,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    // marginTop: -600,
  },
  faqItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#f5f5f5",
  },
  faqHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  faqQuestion: {
    fontFamily: "Poppins-Medium",
    fontSize: 14,
    color: "#333",
    flex: 1,
    paddingRight: 10,
  },
  faqAnswer: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    color: "#666",
    marginTop: 10,
    lineHeight: 22,
  },
  contactItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#f5f5f5",
  },
  contactHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  contactLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  contactName: {
    fontFamily: "Poppins-Medium",
    fontSize: 14,
    color: "#333",
    marginLeft: 15,
  },
  contactContent: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    paddingLeft: 10,
  },
  bulletPoint: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#8B6E4E",
    marginRight: 10,
  },
  contactContentText: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    color: "#666",
  },
});
