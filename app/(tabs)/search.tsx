import "@/../global.css";
import { STYLES } from "@/../utils/constants";
import { searchMovieByTitle } from "@/../utils/tmdbService";
import { useEffect, useState } from "react";
import { ScrollView, Text, TextInput, View } from "react-native";
import { Movie } from "@/../utils/tmdb-types";
import MovieCard from "components/MovieCard";

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
    <View className={`${STYLES.container2} bg-slate-800`}>
      <Text className={`${STYLES.text} mt-24 text-white`}>Find Movie</Text>
      <TextInput
        className={STYLES.input}
        placeholder="Search..."
        placeholderTextColor="#aaa"
        value={query}
        onChangeText={setQuery}
      />
      <ScrollView className="w-screen">
        {results.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </ScrollView>
    </View>
  );
}
