import { ScreenContent } from "components/ScreenContent";
import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import "../global.css";

export default function Index() {
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.text}>Index Screen</Text>
        <Link href="/about" className="bg-orange-900 text-slate-50">
          Go to About
        </Link>
      </View>
      <ScreenContent title="Home" path="App.tsx"></ScreenContent>
      <StatusBar style="auto" />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#fff",
  },
});
