import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Home } from "@screens/Home";

type AuthRoutes = {
  home: undefined;
  adverts: undefined;
};

const { Navigator, Screen } = createBottomTabNavigator<AuthRoutes>();

export function AppRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="home" component={Home} />
    </Navigator>
  );
}
