import { Text, View } from "react-native";
import { STYLES } from "@/../utils/constants";
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
    <View className={STYLES.container}>
      <Text className={STYLES.title}>{title}</Text>
      <View className={STYLES.separator} />
      <EditScreenInfo path={path} />
      {children}
    </View>
  );
};
