import "@/../global.css";

import { Movie, searchMovieByTitle } from "@/../utils/tmdbService";
import Constants from 'expo-constants';
import { useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

const EXPO_PUBLIC_TMDB_API_KEY = process.env?.EXPO_PUBLIC_TMDB_API_KEY;

export default function Index() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Movie[]>([]);
useEffect(() => {

async function performSearch(query: string) {
  const result = await searchMovieByTitle(query);
  setResults(result);
}
  
if (query.length > 2) {
  // add debounce 
  const debounceTimeout = setTimeout(() => {
    performSearch(query);
  }, 1000);

  return () => clearTimeout(debounceTimeout);
}
  
}, [query]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Find Movie</Text>

      <TextInput
        style={styles.input}
        placeholder="Search..."
        placeholderTextColor="#aaa"
        value={query}
        onChangeText={setQuery}
      />
      <Text style={styles.text}>{JSON.stringify(results)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  text: {
    color: "#fff",
    marginBottom: 12,
    fontSize: 20,
  },
  input: {
    width: "80%",
    height: 40,
    borderColor: "#555",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    color: "#fff",
    backgroundColor: "#333",
  },
});
