import { Text, View } from "react-native";

export default function NotFound() {
  return (
    <View className="bg-red-100 justify-center items-center flex">
      <Text className="text-red-800">Page not found</Text>
    </View>
  );
}