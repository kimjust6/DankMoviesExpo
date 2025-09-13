import "@/../global.css";
import { styles } from "@/../utils/constants";
import { Movie, searchMovieByTitle } from "@/../utils/tmdbService";
import { useEffect, useState } from "react";
import { Text, TextInput, View } from "react-native";

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
    <View className={`${styles.container2} bg-orange-200`}>
      <Text className={styles.text}>Find Movie</Text>
      <TextInput
        className={styles.input}
        placeholder="Search..."
        placeholderTextColor="#aaa"
        value={query}
        onChangeText={setQuery}
      />
      <Text className={styles.text}>{JSON.stringify(results)}</Text>
    </View>
  );
}


