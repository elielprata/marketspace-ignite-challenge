import { useCallback, useState } from "react";
import {
  FlatList,
  HStack,
  Select,
  Text,
  useTheme,
  useToast,
  VStack,
} from "native-base";
import { CaretDown, CaretUp } from "phosphor-react-native";

import { api } from "@services/api";

import { ProductDTO } from "@dtos/ProductDTO";

import { AdvertCard } from "@components/AdvertCard";
import { Header } from "@components/Header";
import { useAuth } from "@hooks/useAuth";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";
import { AppError } from "@utils/AppError";

export function MyAdverts() {
  const [isNewSelect, setIsNewSelect] = useState("all");
  const [adverts, setAdverts] = useState<ProductDTO[]>([]);

  const toast = useToast();
  const { colors, sizes } = useTheme();
  const { user } = useAuth();
  const navigation = useNavigation<AppNavigatorRoutesProps>();

  async function fetchProducts() {
    try {
      const response = await api.get("/users/products");

      if (isNewSelect !== "all") {
        if (isNewSelect === "new") {
          const filterNewAdverts = response.data.reduce(
            (acc: ProductDTO[], product: ProductDTO) => {
              if (product.is_new === true) {
                acc.push(product);
              }
              return acc;
            },
            []
          );
          return setAdverts(filterNewAdverts);
        } else {
          const filterNewAdverts = response.data.reduce(
            (acc: ProductDTO[], product: ProductDTO) => {
              if (product.is_new === false) {
                acc.push(product);
              }
              return acc;
            },
            []
          );
          return setAdverts(filterNewAdverts);
        }
      }

      setAdverts(response.data);
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Não foi possível carregar os produtos";

      toast.show({
        title,
        placement: "top",
        bgColor: "red.500",
      });
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchProducts();
    }, [isNewSelect])
  );

  return (
    <VStack flex={1} bg="gray.200" px={6} pt={16}>
      <Header title="Meus anúncios" goBack={false} rightIcon="plus" />

      <HStack mt={8} mb={5} justifyContent="space-between" alignItems="center">
        <Text fontSize="sm">{adverts.length} Anúncios</Text>

        <Select
          placeholder="Choose Service"
          minWidth={110}
          rounded="lg"
          _selectedItem={{
            _text: {
              fontWeight: "bold",
            },
          }}
          fontSize="sm"
          color="gray.500"
          dropdownIcon={
            <CaretDown
              color={colors.gray[500]}
              size={sizes[4]}
              style={{ marginRight: 8 }}
            />
          }
          dropdownOpenIcon={
            <CaretUp
              color={colors.gray[500]}
              size={sizes[4]}
              style={{ marginRight: 8 }}
            />
          }
          onValueChange={setIsNewSelect}
          selectedValue={isNewSelect}
        >
          <Select.Item label="Todos" value="all" />
          <Select.Item label="Novo" value="new" />
          <Select.Item label="Usado" value="used" />
        </Select>
      </HStack>

      <FlatList
        data={adverts}
        keyExtractor={(item, index) => `${index}`}
        renderItem={({ item }) => (
          <AdvertCard
            data={item}
            active={item.is_active}
            userPhoto={user.avatar}
            onPress={() =>
              navigation.navigate("advertDetails", { productId: item.id })
            }
          />
        )}
        flex={1}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        _contentContainerStyle={{
          paddingBottom: 60,
        }}
      />
    </VStack>
  );
}
