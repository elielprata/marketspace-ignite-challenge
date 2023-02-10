import { useNavigation } from "@react-navigation/native";
import {
  Center,
  HStack,
  Radio,
  ScrollView,
  Switch,
  Text,
  VStack,
} from "native-base";
import { Plus } from "phosphor-react-native";

import { AppNavigatorRoutesProps } from "@routes/app.routes";

import { Button } from "@components/Button";
import { CheckBox } from "@components/CheckBox";
import { Header } from "@components/Header";
import { Input } from "@components/Input";

export function EditAdvert() {
  const navigation = useNavigation<AppNavigatorRoutesProps>();

  return (
    <VStack flex={1} bg="gray.200" pt={16}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50 }}
        px={6}
      >
        <Header title="Criar anúncio" />

        <VStack mt={6} mb={8}>
          <Text fontSize="md" fontFamily="heading">
            Imagens
          </Text>
          <Text fontSize="sm">
            Escolha até 3 imagens para mostrar o quando o seu produto é
            incrível!
          </Text>

          <Center w={20} h={20} mt={4} bg="gray.300" rounded="md">
            <Plus />
          </Center>
        </VStack>

        <VStack mb={8}>
          <Text fontSize="md" fontFamily="heading" mb={4}>
            Sobre o produto
          </Text>

          <Input placeholder="Título do anúncio" />

          <Input
            placeholder="Descrição do produto"
            multiline
            numberOfLines={8}
            textAlignVertical="top"
          />

          <Radio.Group
            name="productCondition"
            accessibilityLabel="Condição do produto"
            defaultValue="new"
            _radio={{
              borderColor: "gray.400",
              bg: "transparent",
              _checked: {
                borderColor: "blue.400",
                bg: "transparent",
                _icon: {
                  color: "blue.400",
                },
              },
            }}
          >
            <HStack>
              <Radio value="new" my={1}>
                Produto novo
              </Radio>
              <Radio value="used" my={1} ml={5}>
                Produto usado
              </Radio>
            </HStack>
          </Radio.Group>
        </VStack>

        <VStack>
          <Text fontSize="md" fontFamily="heading" mb={4}>
            Sobre o produto
          </Text>

          <Input placeholder="Valor do produtor" mb={4} />

          <Text fontSize="md" fontFamily="heading">
            Aceita troca?
          </Text>

          <Switch
            size="lg"
            alignSelf="flex-start"
            onTrackColor="blue.400"
            mb={4}
          />

          <Text fontSize="md" fontFamily="heading" mb={3}>
            Meios de pagamento aceitos
          </Text>

          <CheckBox title="Boleto" value="billet" mb={3} />

          <CheckBox title="Pix" value="pix" mb={3} />

          <CheckBox title="Dinheiro" value="money" mb={3} />

          <CheckBox title="Cartão de Crédito" value="card" mb={3} />

          <CheckBox title="Depósito Bancário" value="transfer" mb={3} />
        </VStack>
      </ScrollView>

      <HStack
        bg="gray.100"
        px={6}
        py={5}
        justifyContent="space-between"
        alignItems="center"
      >
        <Button title="Cancelar" variant="light" mr={3} flex={1} />

        <Button
          title="Avançar"
          variant="dark"
          flex={1}
          onPress={() => navigation.navigate("advertPreview")}
        />
      </HStack>
    </VStack>
  );
}
