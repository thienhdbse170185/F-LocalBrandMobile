import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Controller, useForm } from "react-hook-form";
import { Colors } from "@/constants/Colors";
import TextInputIcon from "@/components/form/TextInputIcon";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";

type FormData = {
  username: string;
  password: string;
};

/**
 * Login screen component.
 *
 * @returns {JSX.Element} Login screen component.
 */
export default function LoginScreen(): JSX.Element {
  // react-hook-form Controller hook for handling form data.
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    // Set default form values.
    defaultValues: {
      username: "",
      password: "",
    },
  });

  // State for handling border color of username input.
  const [borderColorUsername, setBorderColorUsername] =
    useState<string>("gray");
  // State for handling border color of password input.
  const [borderColorPassword, setBorderColorPassword] =
    useState<string>("gray");
  // State for handling loading state.
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const preLoad = async () => {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        setIsLoading(true);
        setTimeout(() => {
          router.navigate("(tabs)");
        }, 3000);
      } else {
        setIsLoading(false);
      }
    };
    preLoad();
  }, []);

  /**
   * Handle form submission.
   *
   * @param {FormData} data Form data.
   */
  const onSubmit = handleSubmit(
    ({ username, password }) => {
      Keyboard.dismiss();
      if (username && password) {
        setIsLoading(true);
        setTimeout(() => {
          setIsLoading(false);
          // alert(username + " " + password);
          router.navigate("(tabs)");
        }, 2000);
      } else {
        console.error("Null username or password");
      }
    },
    (errors) => {
      if (errors) {
        console.error("Form submission errors:", errors);
        if (errors.username) {
          setBorderColorUsername("red");
        }
        if (errors.password) {
          setBorderColorPassword("red");
        }
      }
    }
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ height: 105 }}>
        <Text style={styles.title}>
          {isLoading ? `Logging in...` : `Welcome ${"\n"}Back!`}
        </Text>
      </View>
      <KeyboardAvoidingView style={styles.form}>
        <View style={styles.inputLayout}>
          <Controller
            control={control}
            // Render method for handling form data.
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInputIcon
                // Input placeholder text.
                placeholder="Username"
                // onChange event handler.
                onChange={onChange}
                // onBlur event handler.
                onBlur={onBlur}
                // Input value.
                value={value}
                // Border color of input.
                borderColor={borderColorUsername}
                // Set border color.
                setBorderColor={setBorderColorUsername}
                // Name of icon to be displayed on the left side of the input.
                nameIcon="person"
              />
            )}
            // Name of the input.
            name="username"
            // Validation rules for the input.
            rules={{ required: true }}
          />
          {/* Display error message if there is an error. */}
          {errors.username && (
            <Text style={styles.error}>Username is required.</Text>
          )}
        </View>
        <View style={styles.inputLayout}>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInputIcon
                // Input placeholder text.
                placeholder="Password"
                // onChange event handler.
                onChange={onChange}
                // onBlur event handler.
                onBlur={onBlur}
                // Input value.
                value={value}
                // Border color of input.
                borderColor={borderColorPassword}
                // Set border color.
                setBorderColor={setBorderColorPassword}
                // Determine whether to show the eye icon or not.
                hasEye={true}
                // Determine whether the input is secure or not.
                isSecureTextEntry={true}
                // Name of icon to be displayed on the left side of the input.
                nameIcon="lock-closed"
              />
            )}
            // Name of the input.
            name="password"
            // Validation rules for the input.
            rules={{ maxLength: 100 }}
          />
          {/* Display error message if there is an error. */}
          {errors.password && (
            <Text style={styles.error}>Password is required.</Text>
          )}
          <Text
            style={{
              textAlign: "right",
              fontFamily: "MontserratRegular",
              fontSize: 16,
              color: Colors.light.primary,
              marginTop: 10,
            }}
            // onPress event handler.
            onPress={() => {
              router.navigate("/forgot-pw");
            }}
          >
            Forgot Password?
          </Text>
        </View>
        <TouchableOpacity
          // onPress event handler.
          onPress={onSubmit}
          style={styles.button}
          activeOpacity={0.8}
        >
          {isLoading ? (
            <ActivityIndicator size="large" color="white" />
          ) : (
            <Text style={styles.buttonText}>Login</Text>
          )}
        </TouchableOpacity>
      </KeyboardAvoidingView>
      <View
        style={{
          alignItems: "center",
          marginTop: 10,
        }}
      >
        <Text
          style={{
            fontFamily: "MontserratMedium",
            fontSize: 14,
            color: Colors.light.hint,
          }}
        >
          - OR Continue with -
        </Text>
        <View style={{ justifyContent: "center", marginVertical: 15 }}>
          <TouchableOpacity
            style={styles.socialButton}
            activeOpacity={0.8}
            onPress={() => {
              //Call login google method.
              //loginWithGoogle()
              alert("Login with Google coming soon...");
            }}
          >
            <Image source={require("@/assets/images/google.png")} />
          </TouchableOpacity>
        </View>
        <Text
          style={{
            fontFamily: "MontserratRegular",
            fontSize: 16,
            marginTop: 15,
          }}
        >
          Create An Account?{" "}
          <Text
            style={{
              fontFamily: "MontserratSemiBold",
              color: Colors.light.primary,
              textDecorationLine: "underline",
            }}
            // onPress event handler.
            onPress={() => {
              router.navigate("/register");
            }}
          >
            Sign Up
          </Text>
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 30,
  },
  title: { fontFamily: "MontserratBold", fontSize: 42 },
  form: {
    marginVertical: 38,
  },
  button: {
    backgroundColor: Colors.light.primary,
    height: 60,
    borderRadius: 6,
    justifyContent: "center",
    marginTop: 30,
  },
  buttonText: {
    fontSize: 22,
    textAlign: "center",
    color: "white",
    fontFamily: "MontserratSemiBold",
  },
  error: {
    color: "red",
  },
  inputLayout: {
    height: 90,
  },
  socialButton: {
    backgroundColor: Colors.light.backgroundOutlined,
    borderColor: Colors.light.primary,
    width: 48,
    height: 48,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 999,
  },
});
