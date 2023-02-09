import { Platform } from "react-native";
import {
  BottomTabNavigationProp,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import { House, SignOut, Tag } from "phosphor-react-native";
import { useTheme } from "native-base";

import { HomeStack } from "./home.routes";

import { MyAdverts } from "@screens/MyAdverts";
import { LogOut } from "@screens/LogOut";

type AppRoutes = {
  home: undefined;
  myAdverts: undefined;
  logout: undefined;
};

export type AppNavigatorRoutesProps = BottomTabNavigationProp<AppRoutes>;

const { Navigator, Screen } = createBottomTabNavigator<AppRoutes>();

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
          height: Platform.OS === "android" ? "auto" : 60,
          paddingBottom: sizes[8],
          paddingTop: sizes[6],
        },
      }}
    >
      <Screen
        name="home"
        component={HomeStack}
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
        name="myAdverts"
        component={MyAdverts}
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
        component={LogOut}
        options={{
          tabBarIcon: () => <SignOut color={colors.red[400]} size={IconSize} />,
        }}
      />
    </Navigator>
  );
}
