import { Colors } from "@/constants/Colors";
import { StyleSheet, TextInput, View } from "react-native";
import InputIcon from "./InputIcon";
import { ComponentProps, useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";

type Props = {
  placeholder: string;
  onChange: (text: string) => void;
  onBlur: () => void;
  onFocus: () => void;
  value: string | null;
  borderColor: string;
  setBorderColor: (color: string) => void;
  nameIcon: ComponentProps<typeof Ionicons>["name"];
  hasEye?: boolean;
  isSecureTextEntry?: boolean;
};

// Refactored TextInputIcon component with bug fixes

/**
 * TextInputIcon component with icon and text input
 * @param props - Component props
 * @returns JSX.Element
 */
export default function TextInputIcon(props: Props): JSX.Element {
  const {
    placeholder, // Placeholder text for the input
    onChange, // Function called when input text changes
    onBlur, // Function called when input loses focus
    onFocus,
    value, // Value of the input
    borderColor, // Border color of the input
    setBorderColor, // Function to set border color
    nameIcon, // Name of the icon to display
    hasEye, // Flag to show eye icon
    isSecureTextEntry, // Flag for secure text entry
  } = props;

  const [isVisible, setVisible] = useState(isSecureTextEntry); // State for text visibility

  /**
   * Handle input blur event
   */
  const handleBlur = () => {
    if (onBlur) {
      onBlur();
    }
    if (setBorderColor) {
      setBorderColor("gray");
    }
  };

  return (
    <View style={[styles.inputDiv, { borderColor: borderColor }]}>
      <InputIcon
        name={nameIcon}
        color={Colors.light.icon}
        style={{ marginRight: 10 }}
      />
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={"gray"}
        onBlur={handleBlur}
        onFocus={onFocus}
        onChangeText={onChange}
        secureTextEntry={isVisible}
        value={value ?? ""}
        style={styles.input}
        autoCapitalize="none"
        autoComplete="off"
      />
      {hasEye && (
        <InputIcon
          onPress={() => setVisible(!isVisible)}
          name={isVisible ? "eye" : "eye-off"}
          color={Colors.light.icon}
          style={{ marginLeft: 10 }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    fontSize: 16,
    fontFamily: "MontserratMedium",
    flex: 1,
  },
  inputDiv: {
    borderWidth: 1.5,
    borderRadius: 8,
    paddingVertical: 5,
    paddingHorizontal: 16,
    height: 60,
    backgroundColor: Colors.light.backgroundInput,
    borderColor: Colors.light.borderInput,
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
  },
});
