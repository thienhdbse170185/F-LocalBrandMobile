import TextInputIcon from "@/components/form/TextInputIcon";
import { Colors } from "@/constants/Colors";
import { router } from "expo-router";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { KeyboardAvoidingView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type FormData = {
  username: string;
  password: string;
  confirm: string;
};

/**
 * Register screen component.
 *
 * @returns {JSX.Element} Register screen component.
 */
export default function RegisterScreen(): JSX.Element {
  // react-hook-form Controller hook for handling form data.
  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors
  } = useForm<FormData>({
    // Set default form values.
    defaultValues: {
      username: "",
      password: "",
      confirm: ""
    }
  });

  // State for handling border color of username input.
  const [borderColorUsername, setBorderColorUsername] =
    useState<string>("gray");
  // State for handling border color of password input.
  const [borderColorPassword, setBorderColorPassword] =
    useState<string>("gray");
  // State for handling border color of confirm input.
  const [borderColorConfirm, setBorderColorConfirm] = useState<string>("gray");

  /**
   * Handle form submission.
   *
   * @param {FormData} data Form data.
   */
  const onSubmit = handleSubmit(
    (data) => {
      console.log(data);
    },
    (errors) => {
      if (errors.username) {
        setError("username", { type: "required", message: "Required!" });
        setBorderColorUsername("red");
      }
      if (errors.password) {
        setError("password", { type: "required", message: "Required!" });
        setBorderColorPassword("red");
      }
      if (errors.confirm) {
        setError("confirm", { type: "required", message: "Required!" });
        setBorderColorConfirm("red");
      }
    });

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Create an {"\n"}account</Text>
      <KeyboardAvoidingView style={styles.form}>
        <View style={styles.inputLayout}>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => {
              return (
                <TextInputIcon
                  placeholder="Username"
                  onChange={onChange}
                  onBlur={onBlur}
                  onFocus={() => {
                    clearErrors("username");
                    setBorderColorUsername("black");
                  }}
                  value={value}
                  borderColor={borderColorUsername}
                  setBorderColor={setBorderColorUsername}
                  nameIcon="person"
                />
              );
            }}
            name="username"
            rules={{ required: true }}
            // eslint-disable-next-line jsdoc/require-jsdoc
          />
          {errors.username && (
            <Text style={styles.error}>{errors.username.message}</Text>
          )}
        </View>
        <View style={styles.inputLayout}>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => {
              return (
                <TextInputIcon
                  placeholder="Password"
                  onChange={onChange}
                  onBlur={onBlur}
                  onFocus={() => {
                    clearErrors("password");
                    setBorderColorPassword("black");
                  }}
                  value={value}
                  borderColor={borderColorPassword}
                  setBorderColor={setBorderColorPassword}
                  hasEye={true}
                  isSecureTextEntry={true}
                  nameIcon="lock-closed"
                />
              );
            }}
            name="password"
            rules={{ required: true }}
            // eslint-disable-next-line jsdoc/require-jsdoc
          />
          {errors.password && (
            <Text style={styles.error}>{errors.password.message}</Text>
          )}
        </View>
        <View style={styles.inputLayout}>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => {
              return (
                <TextInputIcon
                  placeholder="Confirm Password"
                  onChange={onChange}
                  onBlur={onBlur}
                  onFocus={() => {
                    clearErrors("confirm");
                    setBorderColorConfirm("black");
                  }}
                  value={value}
                  borderColor={borderColorConfirm}
                  setBorderColor={setBorderColorConfirm}
                  hasEye={true}
                  isSecureTextEntry={true}
                  nameIcon="lock-closed"
                />
              );
            }}
            name="confirm"
            rules={{ required: true }}
            // eslint-disable-next-line jsdoc/require-jsdoc
          />
          {errors.confirm && (
            <Text style={styles.error}>{errors.confirm.message}</Text>
          )}
        </View>
        <View>
          <Text
            style={{
              fontFamily: "MontserratRegular",
              fontSize: 14,
              color: Colors.light.hint
            }}
          >
            By clicking the{" "}
            <Text style={{ color: Colors.light.primary }}>Register</Text>{" "}
            button, you agree to the public offer
          </Text>
        </View>
        <TouchableOpacity
          onPress={onSubmit}
          style={styles.button}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>Create Account</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
      <View
        style={{
          alignItems: "center"
        }}
      >
        <Text style={{ fontFamily: "MontserratRegular", fontSize: 16 }}>
          I Already Have an Account -{" "}
          <Text
            style={{
              fontFamily: "MontserratSemiBold",
              color: Colors.light.primary,
              textDecorationLine: "underline"
            }}
            onPress={() => {
              router.canGoBack() ? router.back() : router.push("/login");
            }}
          >
            Login
          </Text>
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 30
  },
  title: { fontFamily: "MontserratBold", fontSize: 42 },
  form: {
    marginVertical: 38
  },
  button: {
    backgroundColor: Colors.light.primary,
    height: 60,
    borderRadius: 6,
    justifyContent: "center",
    marginTop: 30
  },
  buttonText: {
    fontSize: 22,
    textAlign: "center",
    color: "white",
    fontFamily: "MontserratSemiBold"
  },
  error: {
    color: "red"
  },
  inputLayout: {
    height: 90
  }
});
