import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useEffect } from "react";
import { View, Text, SafeAreaView, Pressable } from "react-native";

export default function Index() {
  return (
    <SafeAreaView>
      <Text>Home Screen</Text>
      <Pressable onPress={() => router.navigate("/login")}>
        <Text>Go to login</Text>
      </Pressable>
      <Pressable
        onPress={() => {
          AsyncStorage.removeItem("token");
          router.replace("(auth)");
        }}
        style={{
          marginTop: 30,
        }}
      >
        <Text>Signout</Text>
      </Pressable>
    </SafeAreaView>
  );
}
