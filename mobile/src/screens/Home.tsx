import { useCallback, useMemo, useRef, useState } from "react";
import {
  Checkbox as CheckBoxNB,
  FlatList,
  Heading,
  HStack,
  Pressable,
  Switch,
  Text,
  useTheme,
  useToast,
  VStack,
} from "native-base";
import { ArrowRight, Tag, X, XCircle } from "phosphor-react-native";

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
import BottomSheet from "@gorhom/bottom-sheet";
import { CheckBox } from "@components/CheckBox";
import { Button } from "@components/Button";

type Condition = "all" | "new" | "used";

export function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeAdvertsLength, setActiveAdvertsLength] = useState(0);
  const [products, setProducts] = useState<ProductDTO[]>([]);

  //Filter States
  const [conditionFilter, setConditionFilter] = useState<Condition>("all");
  const [acceptTradeFilter, setAcceptTradeFilter] = useState(false);
  const [paymentMethodsFilter, setPaymentMethodsFilter] = useState([]);
  const [queryFilter, setQueryFilter] = useState("");

  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["5%", "75%"], []);
  const handleSheetChanges = useCallback((index: number) => {
    //console.log("handleSheetChanges", index);
  }, []);
  const handleClosePress = useCallback(() => {
    bottomSheetRef.current?.close();
  }, []);
  const handleSnapPress = useCallback((index: number) => {
    bottomSheetRef.current?.snapToIndex(index);
  }, []);

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

  async function fetchProductsWithFilter() {
    try {
      setIsLoading(true);
      let filters = [];

      if (conditionFilter !== "all") {
        filters.push("is_new", conditionFilter === "new" ? true : false);
      }

      if (acceptTradeFilter) {
        filters.push("accept_trade", acceptTradeFilter);
      }

      if (paymentMethodsFilter.length > 0) {
        filters.push("payment_methods", paymentMethodsFilter);
      }

      if (queryFilter.trim().length > 0) {
        filters.push("query", queryFilter);
      }

      if (filters.length > 0) {
        let mountQuery = "?";
        for (let i = 0; i < filters.length; i++) {
          if (i % 2 === 0) {
            mountQuery += filters[i] + "=";
          } else {
            if (i === filters.length - 1) {
              mountQuery += filters[i];
            } else {
              mountQuery += filters[i] + "&";
            }
          }
        }

        const response = await api.get(`/products${mountQuery}`);
        setProducts(response.data);
        handleClosePress();
      }
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

  function handleFilterRemove() {
    setAcceptTradeFilter(false);
    setPaymentMethodsFilter([]);
    setQueryFilter("");
    setConditionFilter("all");
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
    <>
      <VStack flex={1} bg="gray.200" px={6} pt={16}>
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
                <Text color="blue.700" fontSize="sm" fontWeight="bold" mr={2}>
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

          <SearchInput
            onSearch={fetchProductsWithFilter}
            openModalFilter={() => handleSnapPress(1)}
          />
        </VStack>

        <FlatList
          data={products}
          keyExtractor={(item) => item.id}
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
      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        handleIndicatorStyle={{
          backgroundColor: colors.gray[400],
          width: sizes[12],
          height: sizes[0.5],
        }}
      >
        <VStack flex={1} p={4}>
          <HStack justifyContent="space-between" alignItems="center" mb={6}>
            <Text fontSize="lg" fontFamily="heading">
              Filtrar anúncios
            </Text>

            <Pressable onPress={handleClosePress}>
              <X color={colors.gray[400]} size={sizes[5]} />
            </Pressable>
          </HStack>

          <Text fontFamily="heading" mb={1}>
            Condição
          </Text>
          <HStack mb={3}>
            <Pressable onPress={() => setConditionFilter("new")}>
              <HStack
                bg={conditionFilter === "new" ? "blue.400" : "gray.300"}
                py={2}
                px={1}
                mr={2}
                rounded="full"
                alignItems="center"
                justifyContent="center"
                minW={20}
              >
                <Text
                  color={conditionFilter === "new" ? "white" : "gray.500"}
                  fontFamily="heading"
                  mr={1}
                >
                  NOVO
                </Text>
                {conditionFilter === "new" && (
                  <Pressable onPress={() => setConditionFilter("all")}>
                    <XCircle
                      color={colors.white}
                      size={sizes[5]}
                      weight="fill"
                    />
                  </Pressable>
                )}
              </HStack>
            </Pressable>

            <Pressable onPress={() => setConditionFilter("used")}>
              <HStack
                bg={conditionFilter === "used" ? "blue.400" : "gray.300"}
                py={2}
                px={1}
                mr={2}
                rounded="full"
                alignItems="center"
                justifyContent="center"
                minW={20}
              >
                <Text
                  color={conditionFilter === "used" ? "white" : "gray.500"}
                  fontFamily="heading"
                  mr={1}
                >
                  USADO
                </Text>
                {conditionFilter === "used" && (
                  <Pressable onPress={() => setConditionFilter("all")}>
                    <XCircle
                      color={colors.white}
                      size={sizes[5]}
                      weight="fill"
                    />
                  </Pressable>
                )}
              </HStack>
            </Pressable>
          </HStack>

          <Text fontFamily="heading">Aceita troca?</Text>
          <Switch
            size="lg"
            alignSelf="flex-start"
            onTrackColor="blue.400"
            mb={4}
            isChecked={acceptTradeFilter}
            onToggle={setAcceptTradeFilter}
          />

          <Text fontFamily="heading" mb={3}>
            Meios de pagamento aceitos?
          </Text>
          <CheckBoxNB.Group
            onChange={(values) => setPaymentMethodsFilter(values)}
            value={paymentMethodsFilter}
            accessibilityLabel="Meios de pagamento"
          >
            <CheckBox title="Boleto" value="boleto" mb={3} />

            <CheckBox title="Pix" value="pix" mb={3} />

            <CheckBox title="Dinheiro" value="cash" mb={3} />

            <CheckBox title="Cartão de Crédito" value="card" mb={3} />

            <CheckBox title="Depósito Bancário" value="deposit" mb={3} />
          </CheckBoxNB.Group>
        </VStack>

        <HStack
          bg="gray.100"
          px={6}
          py={5}
          justifyContent="space-between"
          alignItems="center"
        >
          <Button
            title="Resetar filtro"
            variant="light"
            mr={3}
            flex={1}
            onPress={handleFilterRemove}
          />

          <Button
            title="Aplicar filtros"
            variant="dark"
            flex={1}
            onPress={fetchProductsWithFilter}
          />
        </HStack>
      </BottomSheet>
    </>
  );
}
