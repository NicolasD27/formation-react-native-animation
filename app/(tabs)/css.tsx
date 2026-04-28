import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated from "react-native-reanimated";

const pulseKeyframes = {
  from: { transform: [{ scale: 1 }] },
  to: { transform: [{ scale: 1.4 }] },
};

const spinKeyframes = {
  from: { transform: [{ rotate: "0deg" }] },
  to: { transform: [{ rotate: "360deg" }] },
};

const colorCycleKeyframes = {
  "0%": { backgroundColor: "#9B2915" },
  "33%": { backgroundColor: "#3A86FF" },
  "66%": { backgroundColor: "#FF9B71" },
  "100%": { backgroundColor: "#9B2915" },
};

export default function CSSScreen() {
  const [expanded, setExpanded] = useState(false);
  const [animating, setAnimating] = useState(false);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.pageTitle}>CSS Animations</Text>

      {/* ── CSS Transitions ── */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>CSS Transitions</Text>
        <Text style={styles.description}>
          Ajouter <Text style={styles.code}>transitionProperty</Text> et{" "}
          <Text style={styles.code}>transitionDuration</Text> à un{" "}
          <Text style={styles.code}>Animated.View</Text> pour animer
          automatiquement les changements de style.
        </Text>

        <View style={styles.demoBox}>
          <Animated.View
            style={
              {
                width: expanded ? 180 : 80,
                height: expanded ? 180 : 80,
                backgroundColor: expanded ? "#3A86FF" : "#9B2915",
                borderRadius: expanded ? 90 : 12,
                transitionProperty: [
                  "width",
                  "height",
                  "backgroundColor",
                  "borderRadius",
                ],
                transitionDuration: 600,
                transitionTimingFunction: "ease-in-out",
              } as any
            }
          />
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => setExpanded((v) => !v)}
        >
          <Text style={styles.buttonText}>
            {expanded ? "Réduire" : "Agrandir"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* ── CSS Animations ── */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>CSS Animations (keyframes)</Text>
        <Text style={styles.description}>
          Définir des keyframes dans{" "}
          <Text style={styles.code}>animationName</Text> pour créer des
          animations continues déclaratives.
        </Text>

        <View style={styles.demoRow}>
          <View style={styles.animItem}>
            <Animated.View
              style={[
                styles.box,
                animating &&
                  ({
                    animationName: pulseKeyframes,
                    animationDuration: "800ms",
                    animationIterationCount: "infinite",
                    animationDirection: "alternate",
                    animationTimingFunction: "ease-in-out",
                  } as any),
              ]}
            />
            <Text style={styles.label}>Pulse</Text>
          </View>

          <View style={styles.animItem}>
            <Animated.View
              style={[
                styles.box,
                animating &&
                  ({
                    animationName: colorCycleKeyframes,
                    animationDuration: "3s",
                    animationIterationCount: "infinite",
                    animationTimingFunction: "linear",
                  } as any),
              ]}
            />
            <Text style={styles.label}>Color cycle</Text>
          </View>

          <View style={styles.animItem}>
            <Animated.View
              style={[
                styles.box,
                animating &&
                  ({
                    animationName: spinKeyframes,
                    animationDuration: "1.5s",
                    animationIterationCount: "infinite",
                    animationTimingFunction: "linear",
                  } as any),
              ]}
            />
            <Text style={styles.label}>Spin</Text>
          </View>
        </View>

        <TouchableOpacity
          style={[styles.button, animating && styles.buttonStop]}
          onPress={() => setAnimating((v) => !v)}
        >
          <Text style={styles.buttonText}>
            {animating ? "Arrêter" : "Démarrer"}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2B3A67",
  },
  content: {
    paddingVertical: 48,
    paddingHorizontal: 20,
    gap: 24,
  },
  pageTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
  section: {
    gap: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "white",
  },
  description: {
    color: "#c0c8e0",
    lineHeight: 22,
  },
  code: {
    color: "#FF9B71",
    fontFamily: "monospace",
  },
  demoBox: {
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1e2d50",
    borderRadius: 12,
  },
  demoRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#1e2d50",
    borderRadius: 12,
    paddingVertical: 24,
  },
  animItem: {
    alignItems: "center",
    gap: 8,
  },
  box: {
    width: 70,
    height: 70,
    backgroundColor: "#9B2915",
    borderRadius: 10,
  },
  label: {
    color: "#c0c8e0",
    fontSize: 12,
  },
  button: {
    backgroundColor: "#3A86FF",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    alignSelf: "center",
  },
  buttonStop: {
    backgroundColor: "#9B2915",
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 15,
  },
});
