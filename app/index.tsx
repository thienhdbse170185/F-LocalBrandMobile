import { useState } from "react";
import {
  Button,
  KeyboardAvoidingView,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Controller, useForm } from "react-hook-form";

type FormData = {
  username: string;
  password: string;
};

export default function Index() {
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
      }
    }
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome back!</Text>
      <KeyboardAvoidingView style={styles.form}>
        <View style={styles.inputLayout}>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder="Username"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value ?? ""}
                style={styles.input}
                autoCapitalize="none"
                autoComplete="off"
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
              <TextInput
                placeholder="Password"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value ?? ""}
                secureTextEntry
                style={styles.input}
                autoCapitalize="none"
                autoComplete="off"
              />
            )}
            name="password"
            rules={{ maxLength: 100 }}
          />
          {errors.password && (
            <Text style={styles.error}>Password is required.</Text>
          )}
        </View>
        <TouchableOpacity
          onPress={onSubmit}
          style={styles.button}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 80,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
  },
  form: {
    width: "70%",
    marginVertical: 48,
  },
  input: {
    fontSize: 16,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 16,
    height: 48,
  },
  button: {
    backgroundColor: "black",
    height: 48,
    borderRadius: 10,
    justifyContent: "center",
    marginVertical: 10,
  },
  buttonText: {
    fontSize: 17,
    textAlign: "center",
    color: "white",
  },
  error: {
    color: "red",
    marginVertical: 10,
  },
  inputLayout: {
    height: 72,
  },
});
