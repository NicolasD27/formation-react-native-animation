import { Dispatch, SetStateAction } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

export const ToggleButton = ({
  value,
  setValue,
}: {
  value: boolean;
  setValue: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <TouchableOpacity
      onPress={() => {
        setValue((value) => !value);
      }}
      style={buttonStyles(value).button}
    >
      <Text
        style={{
          color: "white",
        }}
      >
        Enable With Spring
      </Text>
    </TouchableOpacity>
  );
};

const buttonStyles = (isActivated: boolean) =>
  StyleSheet.create({
    button: {
      padding: 10,
      margin: 10,
      backgroundColor: "#3A86FF",
      opacity: isActivated ? 1 : 0.5,
    },
  });
