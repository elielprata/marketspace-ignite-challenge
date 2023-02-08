import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { SignOut } from "@screens/SignOut";
import { SignIn } from "@screens/SignIn";

type AuthRoutes = {
  signIn: undefined;
  signOut: undefined;
};

const { Navigator, Screen } = createNativeStackNavigator<AuthRoutes>();

export function AuthRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="signOut" component={SignOut} />
      <Screen name="signIn" component={SignIn} />
    </Navigator>
  );
}
