import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { Tabs, router } from "expo-router";
import { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

export default function TabLayout() {
  const [isTouchCart, setIsTouchCart] = useState(false);

  const CustomTabBarButton: React.FC<{
    children: React.ReactNode;
    onPress: () => void;
  }> = ({ children, onPress }) => (
    <TouchableOpacity
      style={{
        top: -15,
        justifyContent: "center",
        alignItems: "center",
        ...styles.shadow,
      }}
      activeOpacity={0.8}
      onPress={onPress}
    >
      <View
        style={{
          width: 64,
          height: 64,
          borderRadius: 35,
          backgroundColor: isTouchCart ? Colors.light.primary : "white",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {children}
      </View>
    </TouchableOpacity>
  );

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.light.primary,
        tabBarInactiveTintColor: "#000",
        tabBarStyle: {
          position: "absolute",
          backgroundColor: "#ffffff",
          height: 62,
          ...styles.shadow,
        },
        tabBarLabelStyle: {
          fontFamily: "MontserratSemiBold",
          fontSize: 14,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "home" : "home-outline"}
              color={color}
            />
          ),
        }}
        listeners={{
          tabPress: () => {
            setIsTouchCart(false);
          },
        }}
      />
      <Tabs.Screen
        name="wishlist"
        options={{
          title: "Wishlist",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "heart" : "heart-outline"}
              color={color}
            />
          ),
        }}
        listeners={{
          tabPress: () => {
            setIsTouchCart(false);
          },
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "cart" : "cart-outline"}
              color={color}
            />
          ),
          tabBarButton: () => (
            <CustomTabBarButton
              onPress={() => {
                setIsTouchCart(true);
                router.navigate("cart");
              }}
            >
              <TabBarIcon
                name="cart-outline"
                color={isTouchCart ? "#fff" : "#000"}
              />
            </CustomTabBarButton>
          ),
          title: "",
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "search" : "search-outline"}
              color={color}
            />
          ),
        }}
        listeners={{
          tabPress: () => {
            setIsTouchCart(false);
          },
        }}
      />
      <Tabs.Screen
        name="setting"
        options={{
          title: "Setting",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "settings" : "settings-outline"}
              color={color}
            />
          ),
        }}
        listeners={{
          tabPress: () => {
            setIsTouchCart(false);
          },
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  shadow: {
    shadowColor: "#7F5DF0",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
});
