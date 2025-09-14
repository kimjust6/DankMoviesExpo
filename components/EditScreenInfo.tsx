import { Text, View } from "react-native";
import { STYLES } from "@/../utils/constants";



export const EditScreenInfo = ({ path }: { path: string }) => {
  const title = "Open up the code for this screen:";
  const description =
    "Change any of the text, save the file, and your app will automatically update.";

  return (
    <View>
      <View className={STYLES.getStartedContainer}>
        <Text className={STYLES.getStartedText}>{title}</Text>
        <View
          className={STYLES.codeHighlightContainer + STYLES.homeScreenFilename}
        >
          <Text>{path}</Text>
        </View>
        <Text className={STYLES.getStartedText}>{description}</Text>
      </View>
    </View>
  );
};
