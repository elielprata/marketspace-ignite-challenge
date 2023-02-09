import { Platform } from "react-native";
import {
  BottomTabNavigationProp,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import { useTheme } from "native-base";
import { House, SignOut, Tag } from "phosphor-react-native";

import { Home } from "@screens/Home";
import { MyAdverts } from "@screens/MyAdverts";
import { LogOut } from "@screens/LogOut";

type HomeRoutes = {
  mainHome: undefined;
  myAdverts: undefined;
  advertDetails: undefined;
  logout: undefined;
};

export type HomeNavigatorRoutesProps = BottomTabNavigationProp<HomeRoutes>;

const { Navigator, Screen } = createBottomTabNavigator<HomeRoutes>();

export function HomeTabs() {
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
        name="mainHome"
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
