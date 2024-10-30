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

const SIZE = 100;

export default function Home() {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const scale = useSharedValue(1);
  const scaleX = useSharedValue(1);
  const rotation = useSharedValue(0);

  const width = useSharedValue(100); //*

  const [isWithDelay, setIsWithDelay] = useState(false);
  const [isWithRepeat, setIsWithRepeat] = useState(false);
  const [isWithDecay, setIsWithDecay] = useState(false);
  const [isWithSpring, setIsWithSpring] = useState(false);

  const opacity = useDerivedValue(() => {
    return 1 / scale.value;
  });

  const toggleEnlarge = () => {
    const newSize = scaleX.value === 1 ? 2 : 1;
    // const newWidth = width.value === 100 ? 200 : 100; //*
    const animation = withTiming(newSize, {
      duration: 500,
      easing: Easing.inOut(Easing.quad),
    });
    if (isWithDelay) {
      scaleX.value = withDelay(1000, animation);
    } else if (isWithRepeat) {
      scaleX.value = withRepeat(animation, 4, true);
    } else {
      scaleX.value = animation;
    }
  };

  const handleSequence = () => {
    translateX.value = withSequence(
      withTiming(100, {
        duration: 500,
        easing: Easing.inOut(Easing.quad),
      }),
      withDelay(
        500,
        withTiming(-100, { duration: 500, easing: Easing.inOut(Easing.quad) })
      ),
      withDelay(
        500,
        withTiming(0, {
          duration: 500,
          easing: Easing.inOut(Easing.quad),
        })
      )
    );
    translateY.value = withSequence(
      withDelay(
        500,
        withTiming(100, {
          duration: 500,
          easing: Easing.inOut(Easing.quad),
        })
      ),
      withDelay(
        500,
        withTiming(-100, { duration: 500, easing: Easing.inOut(Easing.quad) })
      ),
      withDelay(
        500,
        withTiming(0, {
          duration: 500,
          easing: Easing.inOut(Easing.quad),
        })
      )
    );
  };

  const panGesture = Gesture.Pan()
    .onUpdate((e) => {
      translateX.value = e.translationX;
      translateY.value = e.translationY;
    })
    .onEnd((event) => {
      if (isWithDecay) {
        translateX.value = withDecay({
          velocity: event.velocityX,
          rubberBandEffect: true,
          clamp: [-(width.value / 2) + SIZE / 2, width.value / 2 - SIZE / 2],
        });
        translateY.value = withDecay({
          velocity: event.velocityY,
          rubberBandEffect: true,
          clamp: [-(width.value / 2) + SIZE / 2, width.value / 2 - SIZE / 2],
        });
      } else if (isWithSpring) {
        translateX.value = withSpring(0, {
          velocity: event.velocityX,
          damping: 2,
          stiffness: 50,
        });
        translateY.value = withSpring(0, {
          velocity: event.velocityY,
          damping: 2,
          stiffness: 50,
        });
      } else {
        translateX.value = withTiming(0, {
          duration: 500,
          easing: Easing.inOut(Easing.quad),
        });
        translateY.value = withTiming(0, {
          duration: 500,
          easing: Easing.inOut(Easing.quad),
        });
      }
    });

  const scaleGesture = Gesture.Pinch()
    .onUpdate((e) => {
      scale.value = e.scale;
    })
    .onEnd(() => {
      scale.value = withSpring(1);
    });

  const rotationGesture = Gesture.Rotation()
    .onUpdate((e) => {
      console.log(e.rotation);

      rotation.value = e.rotation;
    })
    .onEnd(() => {
      rotation.value = withSpring(0);
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      {
        translateY: translateY.value,
      },
      { scale: scale.value },
      { scaleX: scaleX.value },
      { rotate: `${rotation.value}rad` },
    ],
    opacity: opacity.value,
    // width: width.value, //*
  }));

  const composed = Gesture.Simultaneous(
    panGesture,
    scaleGesture,
    rotationGesture
  );

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.boxContainer}>
        <GestureDetector gesture={composed}>
          <Animated.View style={[styles.box, animatedStyle]} />
        </GestureDetector>
      </View>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity onPress={toggleEnlarge} style={styles.button}>
          <Text style={styles.text}>Toggle Enlarge</Text>
        </TouchableOpacity>
        <ToggleButton
          value={isWithDelay}
          setValue={setIsWithDelay}
          label={"Enable With Delay"}
        />
        <ToggleButton
          value={isWithRepeat}
          setValue={setIsWithRepeat}
          label={"Enable With Repeat"}
        />
        <ToggleButton
          value={isWithDecay}
          setValue={setIsWithDecay}
          label={"Enable With Decay"}
        />
        <ToggleButton
          value={isWithSpring}
          setValue={setIsWithSpring}
          label={"Enable With Spring"}
        />
        <TouchableOpacity onPress={handleSequence} style={styles.button}>
          <Text style={styles.text}>Trigger Sequence</Text>
        </TouchableOpacity>
      </View>
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
    // backgroundColor: "#FF9B71",
  },
  box: {
    width: 100,
    height: 100,
    backgroundColor: "#9B2915",
    borderRadius: 10,
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
