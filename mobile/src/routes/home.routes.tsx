import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AdvertDetails } from "@screens/AdvertDetails";
import { Home } from "@screens/Home";

const { Navigator, Screen } = createNativeStackNavigator();

export function HomeStack() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="home" component={Home} />
      <Screen name="advertDetails" component={AdvertDetails} />
    </Navigator>
  );
}
