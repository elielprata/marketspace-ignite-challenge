import { useState } from "react";
import { ScrollView } from "react-native";
import { FlatList, Heading, HStack, Text, useTheme, VStack } from "native-base";
import { ArrowRight, Tag } from "phosphor-react-native";

import { HomeHeader } from "@components/HomeHeader";
import { SearchInput } from "@components/SearchInput";
import { AdvertCard } from "@components/AdvertCard";

export function Home() {
  const { colors, sizes } = useTheme();
  const [adverts, setAdverts] = useState([1, 2, 3, 4, 5, 6, 7]);

  return (
    <VStack flex={1} bg="gray.200" px={6} pt={16}>
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

      <FlatList
        data={adverts}
        keyExtractor={(item: number) => `${item}`}
        renderItem={() => <AdvertCard condition="new" />}
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
