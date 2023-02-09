import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import { AdvertDetails } from "@screens/AdvertDetails";
import { Home } from "@screens/Home";

type HomeRoutes = {
  home: undefined;
  advertDetails: undefined;
};

export type HomeNavigatorRoutesProps = NativeStackNavigationProp<HomeRoutes>;

const { Navigator, Screen } = createNativeStackNavigator<HomeRoutes>();

export function HomeStack() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="home" component={Home} />
      <Screen name="advertDetails" component={AdvertDetails} />
    </Navigator>
  );
}
