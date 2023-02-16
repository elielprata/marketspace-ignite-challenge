import { useCallback, useEffect, useState } from "react";
import {
  FlatList,
  Heading,
  HStack,
  Pressable,
  Text,
  useTheme,
  useToast,
  VStack,
} from "native-base";
import { ArrowRight, Tag } from "phosphor-react-native";

import { api } from "@services/api";
import { AppError } from "@utils/AppError";

import { ProductDTO } from "@dtos/ProductDTO";

import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";

import { HomeHeader } from "@components/HomeHeader";
import { SearchInput } from "@components/SearchInput";
import { AdvertCard } from "@components/AdvertCard";
import { Loading } from "@components/Loading";
import { HomeNavigatorRoutesProps } from "@routes/home.routes";

export function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeAdvertsLength, setActiveAdvertsLength] = useState(0);
  const [products, setProducts] = useState<ProductDTO[]>([]);

  const toast = useToast();

  const { colors, sizes } = useTheme();
  const navigation = useNavigation<AppNavigatorRoutesProps>();
  const homeNavigation = useNavigation<HomeNavigatorRoutesProps>();

  function handleOpenAdvertDetails(productId: string) {
    navigation.navigate("advertDetails", { productId });
  }

  async function fetchProducts() {
    try {
      setIsLoading(true);
      const response = await api.get("/products");
      const myProducts = await api.get("/users/products");

      const activeAdverts = myProducts.data.reduce(
        (acc: number, product: ProductDTO) => {
          if (product.is_active) {
            acc++;
          }
          return acc;
        },
        0
      );

      setActiveAdvertsLength(activeAdverts);
      setProducts(response.data);
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
    } finally {
      setIsLoading(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchProducts();
    }, [])
  );

  if (isLoading) {
    return <Loading />;
  }

  return (
    <VStack flex={1} bg="gray.200" px={6} pt={16}>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
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
                  <Heading>{activeAdvertsLength}</Heading>
                  <Text>anúncios ativos</Text>
                </VStack>

                <Pressable onPress={() => homeNavigation.navigate("myAdverts")}>
                  <HStack>
                    <Text
                      color="blue.700"
                      fontSize="sm"
                      fontWeight="bold"
                      mr={2}
                    >
                      Meus anúncios
                    </Text>
                    <ArrowRight color={colors.blue["700"]} size={sizes["5"]} />
                  </HStack>
                </Pressable>
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
