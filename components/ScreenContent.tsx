import { Text, View } from "react-native";
import { styles } from "@/../utils/constants";
import { EditScreenInfo } from "@/../components/EditScreenInfo";

type ScreenContentProps = {
  title: string;
  path: string;
  children?: React.ReactNode;
};

export const ScreenContent = ({
  title,
  path,
  children,
}: ScreenContentProps) => {
  return (
    <View className={styles.container}>
      <Text className={styles.title}>{title}</Text>
      <View className={styles.separator} />
      <EditScreenInfo path={path} />
      {children}
    </View>
  );
};
