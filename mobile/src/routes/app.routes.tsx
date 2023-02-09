import { Platform } from "react-native";
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";

import { useTheme } from "native-base";
import { House, SignOut, Tag } from "phosphor-react-native";

import { HomeTabs } from "./home.routes";

import { AdvertDetails } from "@screens/AdvertDetails";

type AppRoutes = {
  home: undefined;
  advertDetails: undefined;
};

export type HomeNavigatorRoutesProps = NativeStackNavigationProp<AppRoutes>;

const { Navigator, Screen } = createNativeStackNavigator<AppRoutes>();

export function AppRoutes() {
  const { sizes, colors } = useTheme();

  const IconSize = sizes[6];

  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Screen name="home" component={HomeTabs} />

      <Screen name="advertDetails" component={AdvertDetails} />
    </Navigator>
  );
}
