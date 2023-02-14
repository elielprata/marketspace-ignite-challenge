import { useEffect, useState } from "react";
import { FlatList, HStack, Select, Text, useTheme, VStack } from "native-base";
import { CaretDown, CaretUp } from "phosphor-react-native";

import { api } from "@services/api";

import { ProductDTO } from "@dtos/ProductDTO";

import { AdvertCard } from "@components/AdvertCard";
import { Header } from "@components/Header";
import { useAuth } from "@hooks/useAuth";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";

export function MyAdverts() {
  const [adverts, setAdverts] = useState<ProductDTO[]>([]);

  const { colors, sizes } = useTheme();
  const { user } = useAuth();
  const navigation = useNavigation<AppNavigatorRoutesProps>();

  async function fetchProducts() {
    try {
      const response = await api.get("/users/products");

      setAdverts(response.data);
    } catch (error) {}
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <VStack flex={1} bg="gray.200" px={6} pt={16}>
      <Header title="Meus anúncios" goBack={false} rightIcon="plus" />

      <HStack mt={8} mb={5} justifyContent="space-between" alignItems="center">
        <Text fontSize="sm">10 Anúncios</Text>

        <Select
          selectedValue="all"
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
