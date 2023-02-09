import { Platform } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useTheme } from "native-base";

import { Home } from "@screens/Home";
import { House, SignOut, Tag } from "phosphor-react-native";

type AuthRoutes = {
  home: undefined;
  adverts: undefined;
  logout: undefined;
};

const { Navigator, Screen } = createBottomTabNavigator<AuthRoutes>();

export function AppRoutes() {
  const { sizes, colors } = useTheme();

  const IconSize = sizes[6];

  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: colors.gray[600],
        tabBarInactiveTintColor: colors.gray[400],

        tabBarStyle: {
          backgroundColor: colors.gray[100],
          borderTopWidth: 0,
          paddingBottom: sizes[8],
          paddingTop: sizes[6],
        },
      }}
    >
      <Screen
        name="home"
        component={Home}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <House
              color={color}
              size={IconSize}
              weight={focused ? "bold" : "regular"}
            />
          ),
        }}
      />

      <Screen
        name="adverts"
        component={Home}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Tag
              color={color}
              size={IconSize}
              weight={focused ? "bold" : "regular"}
            />
          ),
        }}
      />

      <Screen
        name="logout"
        component={Home}
        options={{
          tabBarIcon: () => <SignOut color={colors.red[400]} size={IconSize} />,
        }}
      />
    </Navigator>
  );
}
