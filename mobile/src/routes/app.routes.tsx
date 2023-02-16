import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";

import { HomeTabs } from "./home.routes";

import { ProductDTO } from "@dtos/ProductDTO";

import { AdvertDetails } from "@screens/AdvertDetails";
import { CreateAdvert } from "@screens/CreateAdvert";
import { AdvertPreview } from "@screens/AdvertPreview";
import { EditAdvert } from "@screens/EditAdvert";

type AppRoutes = {
  home: undefined;
  advertDetails: {
    productId: string;
  };
  createAdvert: undefined;
  editAdvert: {
    productData: ProductDTO;
  };
  advertPreview: {
    productData: {
      name: string;
      description: string;
      is_new: boolean;
      price: number;
      accept_trade: boolean;
      payment_methods: string[];
    };
    images: {
      id?: string | null;
      name?: string;
      path: string;
      uri?: string;
      type?: string | null;
    }[];
  };
};

export type AppNavigatorRoutesProps = NativeStackNavigationProp<AppRoutes>;

const { Navigator, Screen } = createNativeStackNavigator<AppRoutes>();

export function AppRoutes() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Screen name="home" component={HomeTabs} />

      <Screen name="advertDetails" component={AdvertDetails} />

      <Screen name="createAdvert" component={CreateAdvert} />

      <Screen name="editAdvert" component={EditAdvert} />

      <Screen name="advertPreview" component={AdvertPreview} />
    </Navigator>
  );
}
