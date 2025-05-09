"use client";

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
import { Ionicons, Feather } from "@expo/vector-icons";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";

type TrackOrderRouteParams = {
  order: {
    id: string;
    name: string;
    size: string;
    quantity: number;
    price: number;
    image: any;
    expectedDelivery: string;
    trackingId: string;
    status: {
      id: string;
      title: string;
      date: string;
      time: string;
      completed: boolean;
      icon: keyof typeof Ionicons.glyphMap;
    }[];
  };
};

export default function TrackOrderScreen() {
  const navigation = useNavigation();
  const route = useRoute();

  const { order } = {
    order: {
      id: "1",
      name: "Brown Suite",
      size: "XL",
      quantity: 10,
      price: 120,
      image: require("../assets/product2.jpg"),
      expectedDelivery: "03 Sep 2023",
      trackingId: "TRK452126542",
      status: [
        {
          id: "1",
          title: "Order Placed",
          date: "23 Aug 2023",
          time: "04:25 PM",
          completed: true,
          icon: "receipt-outline",
        },
        {
          id: "2",
          title: "In Progress",
          date: "23 Aug 2023",
          time: "03:54 PM",
          completed: true,
          icon: "cube-outline",
        },
        {
          id: "3",
          title: "Shipped",
          date: "Expected 02 Sep 2023",
          time: "",
          completed: true,
          icon: "car-outline",
        },
        {
          id: "4",
          title: "Delivered",
          date: "23 Aug 2023",
          time: "2023",
          completed: true,
          icon: "home-outline",
        },
      ],
    },
  };

  console.log("Order Details:", order);

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
        <Text style={styles.headerTitle}>Track Order</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.productContainer}>
          <Image source={order.image} style={styles.productImage} />
          <View style={styles.productInfo}>
            <Text style={styles.productName}>{order.name}</Text>
            <Text style={styles.productDetails}>
              Size : {order.size} | Qty : {order.quantity}pcs
            </Text>
            <Text style={styles.productPrice}>${order.price}</Text>
          </View>
        </View>

        <View style={styles.detailsContainer}>
          <Text style={styles.sectionTitle}>Order Details</Text>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Expected Delivery Date</Text>
            <Text style={styles.detailValue}>{order.expectedDelivery}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Tracking ID</Text>
            <Text style={styles.detailValue}>{order.trackingId}</Text>
          </View>
        </View>

        <View style={styles.statusContainer}>
          <Text style={styles.sectionTitle}>Order Status</Text>
          <View style={styles.timeline}>
            {order.status.map((status, index) => (
              <View key={status.id} style={styles.timelineItem}>
                <View style={styles.timelineLeft}>
                  <View
                    style={[
                      styles.timelineDot,
                      status.completed
                        ? styles.completedDot
                        : styles.pendingDot,
                    ]}
                  >
                    {status.completed && (
                      <Feather name="check" size={12} color="#fff" />
                    )}
                  </View>
                  {index < order.status.length - 1 && (
                    <View
                      style={[
                        styles.timelineLine,
                        status.completed && order.status[index + 1].completed
                          ? styles.completedLine
                          : styles.pendingLine,
                      ]}
                    />
                  )}
                </View>

                <View style={styles.timelineContent}>
                  <Text style={styles.timelineTitle}>{status.title}</Text>
                  <Text style={styles.timelineDate}>
                    {status.date}
                    {status.time && `, ${status.time}`}
                  </Text>
                </View>

                <View style={styles.timelineIconContainer}>
                  <Ionicons
                    name={status.icon as keyof typeof Ionicons.glyphMap}
                    size={20}
                    color={status.completed ? "#8B6E4E" : "#ccc"}
                  />
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
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
  productContainer: {
    flexDirection: "row",
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#f5f5f5",
  },
  productImage: {
    width: 70,
    height: 70,
    borderRadius: 10,
  },
  productInfo: {
    marginLeft: 15,
    justifyContent: "center",
  },
  productName: {
    fontFamily: "Poppins-Medium",
    fontSize: 16,
    color: "#333",
    marginBottom: 2,
  },
  productDetails: {
    fontFamily: "Poppins-Regular",
    fontSize: 12,
    color: "#999",
    marginBottom: 5,
  },
  productPrice: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 16,
    color: "#333",
  },
  detailsContainer: {
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#f5f5f5",
  },
  sectionTitle: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 16,
    color: "#333",
    marginBottom: 15,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  detailLabel: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    color: "#666",
  },
  detailValue: {
    fontFamily: "Poppins-Medium",
    fontSize: 14,
    color: "#333",
  },
  statusContainer: {
    paddingVertical: 20,
  },
  timeline: {
    marginLeft: 10,
  },
  timelineItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 25,
    position: "relative",
  },
  timelineLeft: {
    alignItems: "center",
    marginRight: 15,
  },
  timelineDot: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 5,
    zIndex: 1,
  },
  completedDot: {
    backgroundColor: "#8B6E4E",
  },
  pendingDot: {
    backgroundColor: "#f5f5f5",
    borderWidth: 1,
    borderColor: "#ddd",
  },
  timelineLine: {
    position: "absolute",
    top: 24,
    width: 2,
    height: 50,
    left: 11,
    zIndex: 0,
  },
  completedLine: {
    backgroundColor: "#8B6E4E",
  },
  pendingLine: {
    backgroundColor: "#ddd",
  },
  timelineContent: {
    flex: 1,
    paddingTop: 2,
  },
  timelineTitle: {
    fontFamily: "Poppins-Medium",
    fontSize: 14,
    color: "#333",
    marginBottom: 2,
  },
  timelineDate: {
    fontFamily: "Poppins-Regular",
    fontSize: 12,
    color: "#999",
  },
  timelineIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },
});
