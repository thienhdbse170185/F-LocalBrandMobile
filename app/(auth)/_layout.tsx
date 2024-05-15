import { Stack } from "expo-router";

export default function LoginLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="register/index" />
      <Stack.Screen name="forgot-pw/index" />
    </Stack>
  );
}
