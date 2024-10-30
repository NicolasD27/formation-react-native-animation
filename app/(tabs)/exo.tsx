import { StyleSheet, View } from "react-native";

export default function Exercice() {
  return (
    <View style={styles.container}>
      <View style={styles.boxContainer}>
        <View style={[styles.box]} />
        <View style={[styles.box]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2B3A67",
  },
  boxContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 50,
    // backgroundColor: "#FF9B71",
  },
  box: {
    width: 100,
    height: 100,
    backgroundColor: "#9B2915",
    borderRadius: 50,
  },
  buttonsContainer: {
    flexDirection: "column",
    gap: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    padding: 10,
    margin: 10,
    backgroundColor: "#3A86FF",
  },
  text: {
    color: "white",
  },
});

const buttonStyles = (isActivated: boolean) =>
  StyleSheet.create({
    button: {
      padding: 10,
      margin: 10,
      backgroundColor: "#3A86FF",
      opacity: isActivated ? 1 : 0.5,
    },
  });
