import { URLS } from "@/../utils/constants";
import { Movie } from "@/../utils/tmdb-types";
import { Image, Text, TouchableOpacity, View } from "react-native";

export default function MovieCard({
  movie,
  onPress = () => {},
}: {
  movie: Movie;
  onPress?: () => void;
}) {
  const poster = movie.poster_path
    ? `${URLS.TMDB_POSTER_BASE_500}${movie.poster_path}`
    : null;
  const releaseYear = movie.release_date
    ? new Date(movie.release_date).getFullYear()
    : "";
  const shortOverview =
    movie.overview?.length > 120
      ? movie.overview.slice(0, 117) + "..."
      : movie.overview;

  // vote_average is out of 10 — convert to 5-star scale
  const stars = Math.round((movie.vote_average / 10) * 5);
  const starString = "★".repeat(stars) + "☆".repeat(5 - stars);

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      className="m-3 flex-row overflow-hidden rounded-2xl bg-white shadow-md dark:bg-gray-900"
    >
      {/* Poster */}
      <View className="h-52 w-36">
        {poster ? (
          <Image
            source={{ uri: poster }}
            className="h-full w-full"
            resizeMode="cover"
          />
        ) : (
          <View className="h-full w-full items-center justify-center bg-gray-200 dark:bg-gray-700">
            <Text className="text-gray-500">No Image</Text>
          </View>
        )}
      </View>

      {/* Content */}
      <View className="flex-1 justify-between p-4">
        <View>
          <Text className="text-lg font-semibold text-gray-900 dark:text-white">
            {movie.title}
          </Text>
          <Text className="mt-1 text-sm text-gray-500 dark:text-gray-300">
            {movie.original_language?.toUpperCase()} • {releaseYear}
          </Text>

          <View className="mt-2 flex-row items-center">
            <Text className="mr-2 text-sm font-medium text-yellow-500">
              {starString}
            </Text>
            <Text className="text-sm text-gray-600 dark:text-gray-300">
              {movie.vote_average.toFixed(1)} / 10 ·{" "}
              {movie.vote_count.toLocaleString()} votes
            </Text>
          </View>

          <View className="mt-3 flex-row flex-wrap gap-2">
            {/* Simple genre badges from genre_ids (you might map ids to names elsewhere) */}
            {movie.genre_ids?.slice(0, 3).map((g) => (
              <View
                key={g}
                className="mr-2 rounded-full bg-gray-100 px-2 py-1 dark:bg-gray-800"
              >
                <Text className="text-xs text-gray-700 dark:text-gray-200">
                  #{g}
                </Text>
              </View>
            ))}
          </View>

          <Text className="mt-3 text-sm text-gray-700 dark:text-gray-300">
            {shortOverview}
          </Text>
        </View>
        <View className="mt-3 flex-row items-center justify-between">
          {/* <Text className="text-xs text-gray-500">
            Popularity: {Math.round(movie.popularity)}
          </Text> */}
          <Text className="text-xs text-blue-600 dark:text-blue-400">
            Released: {movie.release_date}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
