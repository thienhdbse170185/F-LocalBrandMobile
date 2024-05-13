import { useState } from "react";
import {
  Image,
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

type FormData = {
  username: string;
  password: string;
};

export default function LoginScreen() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const [borderColorUsername, setBorderColorUsername] = useState("gray");
  const [borderColorPassword, setBorderColorPassword] = useState("gray");

  const onSubmit = handleSubmit(
    ({ username, password }) => {
      if (username === null || password === null) {
        console.error("Null username or password");
      } else {
        alert(username + " " + password);
      }
    },
    (errors) => {
      if (errors !== null) {
        console.error("Form submission errors:", errors);
        if (errors.username !== null) {
          setBorderColorUsername("red");
        }
        if (errors.password !== null) {
          setBorderColorPassword("red");
        }
      }
    }
  );

  return (
    <View style={styles.container}>
      <Text style={{ fontFamily: "MontserratBold", fontSize: 42 }}>
        Welcome {"\n"}Back!
      </Text>
      <KeyboardAvoidingView style={styles.form}>
        <View style={styles.inputLayout}>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInputIcon
                placeholder="Username"
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                borderColorUsername={borderColorUsername}
                setBorderColorUsername={setBorderColorUsername}
                nameIcon="person"
              />
            )}
            name="username"
            rules={{ required: true }}
          />
          {errors.username && (
            <Text style={styles.error}>Username is required.</Text>
          )}
        </View>
        <View style={styles.inputLayout}>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInputIcon
                placeholder="Password"
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                borderColorUsername={borderColorUsername}
                setBorderColorUsername={setBorderColorUsername}
                hasEye={true}
                isSecureTextEntry={true}
                nameIcon="lock-closed"
              />
            )}
            name="password"
            rules={{ maxLength: 100 }}
          />
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
              textDecorationLine: "underline",
            }}
            onPress={() => {
              // router.navigate("/forgot-password");
              alert("Forgot Password coming soon...");
            }}
          >
            Forgot Password?
          </Text>
        </View>
        <TouchableOpacity
          onPress={onSubmit}
          style={styles.button}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
      <View
        style={{
          alignItems: "center",
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
        <Text style={{ fontFamily: "MontserratRegular", fontSize: 14 }}>
          Create An Account?{" "}
          <Text
            style={{
              fontFamily: "MontserratSemiBold",
              color: Colors.light.primary,
              textDecorationLine: "underline",
            }}
            onPress={() => {
              // router.navigate("/register");
              alert("Register Screen coming soon...");
            }}
          >
            Sign Up
          </Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 50,
    paddingHorizontal: 30,
  },
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
    borderRadius: 48 / 2,
  },
});
