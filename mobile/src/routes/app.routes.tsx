import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";

import { useTheme } from "native-base";

import { HomeTabs } from "./home.routes";

import { AdvertDetails } from "@screens/AdvertDetails";
import { CreateAdvert } from "@screens/CreateAdvert";

type AppRoutes = {
  home: undefined;
  advertDetails: undefined;
  createAdvert: undefined;
};

export type AppNavigatorRoutesProps = NativeStackNavigationProp<AppRoutes>;

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

      <Screen name="createAdvert" component={CreateAdvert} />
    </Navigator>
  );
}
