import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { Text, SafeAreaView, Pressable } from "react-native";

export default function Index() {
  return (
    <SafeAreaView>
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
