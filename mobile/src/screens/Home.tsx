import { useEffect, useState } from "react";
import {
  FlatList,
  Heading,
  HStack,
  Text,
  useTheme,
  useToast,
  VStack,
} from "native-base";
import { ArrowRight, Tag } from "phosphor-react-native";

import { api } from "@services/api";
import { AppError } from "@utils/AppError";

import { useNavigation } from "@react-navigation/native";
import { HomeNavigatorRoutesProps } from "@routes/home.routes";

import { HomeHeader } from "@components/HomeHeader";
import { SearchInput } from "@components/SearchInput";
import { AdvertCard } from "@components/AdvertCard";
import { ProductDTO } from "@dtos/ProductDTO";

export function Home() {
  const [products, setProducts] = useState<{}[]>([]);

  const toast = useToast();

  const { colors, sizes } = useTheme();
  const navigation = useNavigation<HomeNavigatorRoutesProps>();

  function handleOpenAdvertDetails(productId: string) {
    navigation.navigate("advertDetails", { productId });
  }

  async function fetchProducts() {
    try {
      const response = await api.get("/products");

      setProducts(response.data as ProductDTO[]);
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

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <VStack flex={1} bg="gray.200" px={6} pt={16}>
      <FlatList
        data={products}
        keyExtractor={(item: number) => `${item}`}
        ListHeaderComponent={() => (
          <>
            <HomeHeader />

            <VStack my={8}>
              <Text fontSize="sm" mb={3}>
                Seus produtos anunciados para venda
              </Text>

              <HStack px={4} py={3} bg="blue.700:alpha.10" alignItems="center">
                <Tag color={colors.blue["700"]} size={sizes["6"]} />

                <VStack flex={1} ml={3}>
                  <Heading>0</Heading>
                  <Text>anúncios ativos</Text>
                </VStack>

                <HStack>
                  <Text color="blue.700" fontSize="sm" fontWeight="bold" mr={2}>
                    Meus anúncios
                  </Text>
                  <ArrowRight color={colors.blue["700"]} size={sizes["5"]} />
                </HStack>
              </HStack>
            </VStack>

            <VStack mb={6}>
              <Text fontSize="sm" mb={3}>
                Compre produtos variados
              </Text>

              <SearchInput />
            </VStack>
          </>
        )}
        renderItem={({ item }) => (
          <AdvertCard
            userPhoto={item.user.avatar}
            data={item}
            onPress={() => handleOpenAdvertDetails(item.id)}
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
