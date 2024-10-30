import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import Animated, {
  Easing,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withDecay,
  withDelay,
  withRepeat,
  withSequence,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { ToggleButton } from "../../components/ToggleButton";
import { transform } from "@babel/core";

const SIZE = 100;

export default function Exercice() {
  const rotate = useSharedValue(0);
  const scale = useSharedValue(1);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const startRotation = () => {
    rotate.value = withRepeat(
      withTiming(360, {
        duration: 1000,
        easing: Easing.linear,
      }),
      -1,
      false
    );
    scale.value = withTiming(0, {
      duration: 5000,
      easing: Easing.linear,
    });
  };

  const reset = () => {
    rotate.value = withTiming(0, {
      duration: 0,
    });
    scale.value = withTiming(1, {
      duration: 0,
    });
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { rotate: `${rotate.value}deg` },
      {
        scale: scale.value,
      },
      {
        translateX: translateX.value,
      },
      {
        translateY: translateY.value,
      },
    ],
  }));

  const pan = Gesture.Pan()
    .onUpdate((event) => {
      translateX.value = event.translationX;
      translateY.value = event.translationY;
    })
    .onEnd(() => {
      translateX.value = withTiming(0);
      translateY.value = withTiming(0);
    });

  return (
    <GestureHandlerRootView style={styles.container}>
      <GestureDetector gesture={pan}>
        <Animated.View style={[styles.boxContainer, animatedStyle]}>
          <View style={[styles.box]} />
          <View style={[styles.box]} />
        </Animated.View>
      </GestureDetector>
      <TouchableOpacity style={styles.button} onPress={startRotation}>
        <Text style={styles.text}>Start rotation</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={reset}>
        <Text style={styles.text}>Reset</Text>
      </TouchableOpacity>
    </GestureHandlerRootView>
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
