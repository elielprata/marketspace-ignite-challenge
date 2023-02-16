import { StatusBar } from "react-native";
import { NativeBaseProvider } from "native-base";

import {
  Karla_400Regular,
  Karla_700Bold,
  useFonts,
} from "@expo-google-fonts/karla";

import { Routes } from "./src/routes";

import { Loading } from "@components/Loading";

import { THEME } from "./src/theme";

import { AuthContextProvider } from "@contexts/AuthContext";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function App() {
  const [fontsLoaded] = useFonts({ Karla_400Regular, Karla_700Bold });

  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
      <GestureHandlerRootView style={{ flex: 1 }}>
        <AuthContextProvider>
          {fontsLoaded ? <Routes /> : <Loading />}
        </AuthContextProvider>
      </GestureHandlerRootView>
    </NativeBaseProvider>
  );
}
