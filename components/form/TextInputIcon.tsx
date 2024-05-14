import { Colors } from "@/constants/Colors";
import { StyleSheet, TextInput, View } from "react-native";
import InputIcon from "./InputIcon";
import { ComponentProps, useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";

type Props = {
  placeholder: string;
  onChange: (text: string) => void;
  onBlur: () => void;
  value: string | null;
  borderColor: string;
  setBorderColor: (color: string) => void;
  nameIcon: ComponentProps<typeof Ionicons>["name"];
  hasEye?: boolean;
  isSecureTextEntry?: boolean;
};

/**
 * Strongly typed TextInputIcon component.
 * @param onChange The function to call when the text is changed.
 * @param onBlur The function to call when the input is blurred.
 * @param value The current value of the input.
 * @param borderColorUsername The current border color of the input.
 * @param setBorderColorUsername The function to call to set the border color.
 * @param nameIcon The name of the icon to display.
 * @returns The TextInputIcon component.
 */
export default function TextInputIcon(props: Props): JSX.Element {
  const {
    placeholder,
    onChange,
    onBlur,
    value,
    borderColor,
    setBorderColor,
    nameIcon,
    hasEye,
    isSecureTextEntry,
  } = props;

  const [isVisible, setVisible] = useState(isSecureTextEntry);
  const handleBlur = () => {
    onBlur();
    setBorderColor("gray");
  };

  const handleFocus = () => setBorderColor("black");

  const handleChangeText = (text: string) => {
    if (onChange) {
      onChange(text);
    }
  };

  return (
    <View style={styles.inputDiv}>
      <InputIcon
        name={nameIcon}
        color={Colors.light.icon}
        style={{ marginRight: 10 }}
      />
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={"gray"}
        onBlur={handleBlur}
        onChangeText={handleChangeText}
        onFocus={handleFocus}
        secureTextEntry={isVisible}
        value={value ?? ""}
        style={[styles.input, { borderColor: borderColor }]}
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
    fontSize: 18,
    fontFamily: "MontserratMedium",
    flex: 1,
  },
  inputDiv: {
    borderWidth: 1,
    borderRadius: 10,
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
