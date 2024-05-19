import TextInputIcon from "@/components/form/TextInputIcon";
import { Colors } from "@/constants/Colors";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  ActivityIndicator,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type FormData = {
  email: string;
};

export default function ForgotPwScreen() {
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
      email: ""
    }
  });

  // State for handling border color of username input.
  const [borderColorEmail, setBorderColorEmail] = useState<string>("gray");
  // State for handling loading state.
  const [isLoading, setIsLoading] = useState<boolean>(false);

  /**
   * Handle form submission.
   *
   * @param {FormData} data Form data.
   */
  const onSubmit = handleSubmit(
    ({ email }) => {
      Keyboard.dismiss();
      if (email) {
        setIsLoading(true);
        setTimeout(() => {
          setIsLoading(false);
          alert(email);
        }, 2000);
      }
    },
    (errors) => {
      if (errors) {
        if (errors.email) {
          setError("email", { message: "Please enter a valid email", type: "required" }, { shouldFocus: true });
          setBorderColorEmail("red");
        }
      }
    }
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Forgot {"\n"}password?</Text>
      <KeyboardAvoidingView style={styles.form}>
        <View style={styles.inputLayout}>
          <Controller
            control={control}
            // Render method for handling form data.
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInputIcon
                // Input placeholder text.
                placeholder="Enter your email address"
                // onChange event handler.
                onChange={(text) => {
                  onChange(text);
                  if (text === "") {
                    clearErrors("email");
                    setBorderColorEmail("black");
                  }
                }}
                // onBlur event handler.
                onBlur={onBlur}
                onFocus={() => {
                  clearErrors("email");
                  setBorderColorEmail("black");
                }}
                // Input value.
                value={value}
                // Border color of input.
                borderColor={borderColorEmail}
                // Set border color.
                setBorderColor={setBorderColorEmail}
                // Name of icon to be displayed on the left side of the input.
                nameIcon="mail"
              />
            )}
            // Name of the input.
            name="email"
            // Validation rules for the input.
            rules={{ required: true }}
          />
          {/* Display error message if there is an error. */}
          {errors.email && (
            <Text style={styles.error}>
              {/*{errors.email.message || "Please fill in the blank"}*/}
              {errors.email.message}
            </Text>
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
            <Text style={{ color: Colors.light.primary }}>*</Text> We will send
            you a message to set or reset your new password
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
            <Text style={styles.buttonText}>Submit</Text>
          )}
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
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
    marginTop: 48
  },
  buttonText: {
    fontSize: 22,
    textAlign: "center",
    color: "white",
    fontFamily: "MontserratSemiBold"
  },
  error: {
    color: "red",
    fontFamily: "MontserratMedium"
  },
  inputLayout: {
    height: 95
  }
});
