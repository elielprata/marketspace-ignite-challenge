import { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import { Controller, useForm } from "react-hook-form";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  Center,
  Checkbox as CheckBoxNB,
  FlatList,
  FormControl,
  HStack,
  Radio,
  ScrollView,
  Switch,
  Text,
  useTheme,
  useToast,
  VStack,
} from "native-base";
import { Plus } from "phosphor-react-native";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";

import { ProductDTO } from "@dtos/ProductDTO";

import { AppNavigatorRoutesProps } from "@routes/app.routes";

import { Currency } from "@utils/FormatText";

import { Button } from "@components/Button";
import { CheckBox } from "@components/CheckBox";
import { Header } from "@components/Header";
import { Input } from "@components/Input";
import { ProductPhoto } from "@components/ProductPhoto";

import { api } from "@services/api";
import { AppError } from "@utils/AppError";

type RouteParamsProps = {
  productData: ProductDTO;
};

type ProductImages = {
  id?: string | null;
  name?: string;
  path: string;
  uri?: string;
  type?: string | null;
};

export type FormDataProps = {
  id: string;
  name: string;
  description: string;
  is_new: string;
  price: number;
  accept_trade: boolean;
  payment_methods: string[];
  product_images: ProductImages[];
};

export function EditAdvert() {
  const [productPhotos, setProductPhotos] = useState<ProductImages[]>([]);
  const navigation = useNavigation<AppNavigatorRoutesProps>();

  const { colors, sizes } = useTheme();
  const toast = useToast();
  const route = useRoute();
  const { productData } = route.params as RouteParamsProps;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>({
    defaultValues: {
      id: productData.id,
      name: productData.name,
      description: productData.description,
      is_new: productData.is_new ? "new" : "used",
      price: productData.price,
      accept_trade: productData.accept_trade,
      payment_methods: productData.payment_methods.reduce((acc, cur) => {
        acc.push(cur.key);
        return acc;
      }, [] as string[]),
    },
  });

  async function handlePhotoSelect() {
    try {
      if (productPhotos.length === 3) {
        return toast.show({
          title: "Você já atingiu o limite de imagens por produto",
          placement: "top",
          bgColor: "red.500",
        });
      }

      const photoSelected = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 4],
        quality: 1,
      });

      if (photoSelected.canceled) {
        return;
      }

      if (photoSelected.assets[0].uri) {
        const photoInfo = await FileSystem.getInfoAsync(
          photoSelected.assets[0].uri
        );

        if (photoInfo.size && photoInfo.size / 1024 / 1024 > 5) {
          return toast.show({
            title: "Essa imagem é muito grande. Escolha uma de até 5MB",
            placement: "top",
            bgColor: "red.500",
          });
        }

        const fileExtension = photoSelected.assets[0].uri.split(".").pop();

        setProductPhotos((prevState) => [
          ...prevState,
          {
            id: "",
            path: photoSelected.assets[0].uri,
            name: `${productData.user_id}_productPhoto.${fileExtension}`.toLowerCase(),
            uri: photoSelected.assets[0].uri,
            type: `${photoSelected.assets[0].type}/${fileExtension}`,
          },
        ]);
      }
    } catch (error) {
      console.log(JSON.stringify(error));
    }
  }

  async function handleProductPhotoRemove(photoPath: string) {
    setProductPhotos((prevState) =>
      prevState.filter(async (photo) => {
        try {
          console.log(photo.id);
          if (photo.id) {
            await api.delete("/products/images", {
              data: { images: [photo.id] },
            });
          }
        } catch (error) {
          const isAppError = error instanceof AppError;
          const title = isAppError
            ? error.message
            : "Não foi possível criar a conta. Tente novamente mais tarde.";

          toast.show({ title, placement: "top", bgColor: "red.500" });
        }
        photo.path !== photoPath;
      })
    );
  }

  async function handlePreviewProducts(data: FormDataProps) {
    if (productPhotos.length === 0) {
      return toast.show({
        title: "Adicione uma foto para o produto",
        placement: "top",
        bgColor: "red.500",
      });
    }

    navigation.navigate("advertPreview", {
      productData: {
        ...data,
        is_new: data.is_new === "new" ? true : false,
      },
      images: productPhotos,
    });
  }

  useEffect(() => {
    setProductPhotos(productData.product_images);
  }, []);

  return (
    <VStack flex={1} bg="gray.200" pt={16}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50 }}
        px={6}
      >
        <Header title="Editar anúncio" />

        <VStack mt={6} mb={8}>
          <Text fontSize="md" fontFamily="heading">
            Imagens
          </Text>
          <Text fontSize="sm">
            Escolha até 3 imagens para mostrar o quando o seu produto é
            incrível!
          </Text>

          <FlatList
            horizontal
            _contentContainerStyle={{
              pt: 4,
            }}
            showsHorizontalScrollIndicator={false}
            data={productPhotos}
            keyExtractor={(item, index) => `${item.name}+${index}`}
            renderItem={({ item }) => (
              <ProductPhoto
                size={20}
                source={
                  item.id
                    ? { uri: `${api.defaults.baseURL}/images/${item.path}` }
                    : { uri: item.path }
                }
                onRemove={() => handleProductPhotoRemove(item.path)}
              />
            )}
            ListFooterComponent={() => (
              <TouchableOpacity onPress={handlePhotoSelect}>
                <Center w={20} h={20} bg="gray.300" rounded="md">
                  <Plus color={colors.gray[400]} size={sizes[5]} />
                </Center>
              </TouchableOpacity>
            )}
          />
        </VStack>

        <VStack mb={8}>
          <Text fontSize="md" fontFamily="heading" mb={4}>
            Sobre o produto
          </Text>

          <Controller
            name="name"
            control={control}
            rules={{ required: "Informe o nome do produto." }}
            render={({ field: { value, onChange } }) => (
              <Input
                placeholder="Título do anúncio"
                value={value}
                onChangeText={onChange}
                errorMessage={errors.name?.message}
              />
            )}
          />

          <Controller
            name="description"
            control={control}
            rules={{ required: "Informe a descrição do produto." }}
            render={({ field: { value, onChange } }) => (
              <Input
                placeholder="Descrição do produto"
                multiline
                numberOfLines={8}
                textAlignVertical="top"
                value={value}
                onChangeText={onChange}
                errorMessage={errors.description?.message}
              />
            )}
          />

          <FormControl isRequired isInvalid={"is_new" in errors}>
            <Controller
              name="is_new"
              control={control}
              rules={{ required: "Informe a condição do produto" }}
              render={({ field: { value, onChange } }) => (
                <Radio.Group
                  name="is_new"
                  value={value}
                  accessibilityLabel="Condição do produto"
                  onChange={(val) => onChange(val)}
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
              )}
            />

            <FormControl.ErrorMessage>
              {errors.is_new?.message}
            </FormControl.ErrorMessage>
          </FormControl>
        </VStack>

        <VStack>
          <Text fontSize="md" fontFamily="heading" mb={4}>
            Sobre o produto
          </Text>

          <Controller
            name="price"
            control={control}
            rules={{ required: "Informe o valor do produto." }}
            render={({ field: { value, onChange } }) => (
              <Input
                placeholder="Valor do produto"
                value={Currency(value)}
                onChangeText={(value) => onChange(parseInt(value) * 100)}
                errorMessage={errors.price?.message}
              />
            )}
          />

          <Text fontSize="md" fontFamily="heading">
            Aceita troca?
          </Text>

          <Controller
            name="accept_trade"
            control={control}
            render={({ field: { value, onChange } }) => (
              <Switch
                size="lg"
                alignSelf="flex-start"
                onTrackColor="blue.400"
                mb={4}
                isChecked={value}
                onToggle={onChange}
              />
            )}
          />

          <Text fontSize="md" fontFamily="heading" mb={3}>
            Meios de pagamento aceitos
          </Text>
          <FormControl isInvalid={"payment_methods" in errors}>
            <Controller
              name="payment_methods"
              control={control}
              rules={{ required: "Informe pelo menos um meio de pagamento." }}
              render={({ field: { value, onChange } }) => (
                <CheckBoxNB.Group
                  value={value}
                  onChange={(values) => {
                    onChange(values);
                  }}
                >
                  <CheckBox title="Boleto" value="boleto" mb={3} />

                  <CheckBox title="Pix" value="pix" mb={3} />

                  <CheckBox title="Dinheiro" value="cash" mb={3} />

                  <CheckBox title="Cartão de Crédito" value="card" mb={3} />

                  <CheckBox title="Depósito Bancário" value="deposit" mb={3} />
                </CheckBoxNB.Group>
              )}
            />

            <FormControl.ErrorMessage>
              {errors.payment_methods?.message}
            </FormControl.ErrorMessage>
          </FormControl>
        </VStack>
      </ScrollView>

      <HStack
        bg="gray.100"
        px={6}
        py={5}
        justifyContent="space-between"
        alignItems="center"
      >
        <Button
          title="Cancelar"
          variant="light"
          mr={3}
          flex={1}
          onPress={() => navigation.goBack()}
        />

        <Button
          title="Avançar"
          variant="dark"
          flex={1}
          onPress={handleSubmit(handlePreviewProducts)}
        />
      </HStack>
    </VStack>
  );
}
