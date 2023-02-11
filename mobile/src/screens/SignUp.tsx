import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native";
import {
  Box,
  Center,
  Image,
  Pressable,
  Text,
  useTheme,
  useToast,
  VStack,
} from "native-base";
import { PencilSimpleLine } from "phosphor-react-native";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";

import { api } from "@services/api";
import { AppError } from "@utils/AppError";

import LogoImg from "@assets/logo.png";
import AvatarImg from "@assets/avatar.png";

import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { UserPhoto } from "@components/UserPhoto";

type FormDataProps = {
  name: string;
  email: string;
  tel: string;
  password: string;
  password_confirm: string;
};

const signUpSchema = yup.object({
  name: yup.string().required("Informe um nome."),
  email: yup.string().email("E-mail inválido").required("Informe um e-mail"),
  tel: yup.string().required("Informe um telefone de contato."),
  password: yup
    .string()
    .required("Informe a senha.")
    .min(1, "A senha deve ter no mínimo 6 dígitos."),
  password_confirm: yup
    .string()
    .required("Informe a senha de confirmação.")
    .oneOf([yup.ref("password")], "A senha de confirmação não confere."),
});

export function SignUp() {
  const [isLoading, setIsLoading] = useState(false);
  const [avatar, setAvatar] = useState({} as any);

  const { colors, sizes } = useTheme();
  const toast = useToast();

  const navigation = useNavigation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>({
    resolver: yupResolver(signUpSchema),
    defaultValues: {
      name: "Eliel",
      email: "elieuprata@gmail.com",
      tel: "9499227767",
      password: "123456",
      password_confirm: "123456",
    },
  });

  async function handlePhotoSelect() {
    try {
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

        if (photoInfo.size && photoInfo.size / 1024 / 1024 > 3) {
          return toast.show({
            title: "Essa imagem é muito grande. Escolha uma de até 3MB",
            placement: "top",
            bgColor: "red.500",
          });
        }

        const fileExtension = photoSelected.assets[0].uri.split(".").pop();

        setAvatar({
          name: `userPhoto.${fileExtension}`.toLowerCase(),
          uri: photoSelected.assets[0].uri,
          type: `${photoSelected.assets[0].type}/${fileExtension}`,
        });
      }
    } catch (error) {
      console.log(JSON.stringify(error));
    }
  }

  async function handleSignUp({ name, email, tel, password }: FormDataProps) {
    try {
      setIsLoading(true);
      if (!avatar.uri) {
        return toast.show({
          title: "É necessário selecionar uma imagem.",
          placement: "top",
          bgColor: "red.500",
        });
      }

      const uploadForm = new FormData();
      uploadForm.append("avatar", avatar);
      uploadForm.append("name", name);
      uploadForm.append("email", email);
      uploadForm.append("tel", tel);
      uploadForm.append("password", password);

      await api.post("/users", uploadForm, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Não foi possível criar a conta. Tente novamente mais tarde.";

      toast.show({ title, placement: "top", bgColor: "red.500" });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <VStack flex={1} px={10} pt={20} bg="gray.200">
      <ScrollView
        contentContainerStyle={{ paddingBottom: 50 }}
        showsVerticalScrollIndicator={false}
      >
        <Center>
          <Image source={LogoImg} alt="Logotipo" mb={3} w={16} h={10} />

          <Text
            fontSize="lg"
            fontFamily="heading"
            fontWeight="bold"
            color="gray.700"
            mb={3}
          >
            Boas vindas!
          </Text>

          <Text fontSize="sm" color="gray.700" textAlign="center">
            Crie sua conta e use o espaço para comprar itens variados e vender
            seus produtos
          </Text>
        </Center>

        <Center>
          <Box>
            <UserPhoto
              size={24}
              alt="Imagem do usuário"
              my={4}
              source={avatar.uri ? { uri: avatar.uri } : AvatarImg}
            />

            <Pressable
              w={10}
              h={10}
              position="absolute"
              bottom={4}
              right={-10}
              rounded="full"
              bg="blue.400"
              alignItems="center"
              justifyContent="center"
              _pressed={{
                bg: "blue.700",
              }}
              onPress={handlePhotoSelect}
            >
              <PencilSimpleLine color={colors.gray[200]} size={sizes[4]} />
            </Pressable>
          </Box>

          <Controller
            name="name"
            control={control}
            render={({ field: { value, onChange } }) => (
              <Input
                placeholder="Nome"
                value={value}
                onChangeText={onChange}
                errorMessage={errors.name?.message}
              />
            )}
          />

          <Controller
            name="email"
            control={control}
            render={({ field: { value, onChange } }) => (
              <Input
                placeholder="E-mail"
                value={value}
                autoCapitalize="none"
                onChangeText={onChange}
                errorMessage={errors.email?.message}
              />
            )}
          />

          <Controller
            name="tel"
            control={control}
            render={({ field: { value, onChange } }) => (
              <Input
                placeholder="Telefone"
                value={value}
                onChangeText={onChange}
                errorMessage={errors.tel?.message}
              />
            )}
          />

          <Controller
            name="password"
            control={control}
            render={({ field: { value, onChange } }) => (
              <Input
                placeholder="Senha"
                isPassword
                value={value}
                onChangeText={onChange}
                errorMessage={errors.password?.message}
              />
            )}
          />

          <Controller
            name="password_confirm"
            control={control}
            render={({ field: { value, onChange } }) => (
              <Input
                placeholder="Confirmar senha"
                isPassword
                value={value}
                onChangeText={onChange}
                errorMessage={errors.password_confirm?.message}
              />
            )}
          />

          <Button
            title="Criar"
            variant="dark"
            mt={2}
            w="full"
            onPress={handleSubmit(handleSignUp)}
            isLoading={isLoading}
          />
        </Center>

        <Center mt={12}>
          <Text color="gray.600" fontSize="md" mb={4} fontFamily="body">
            Já tem uma conta?
          </Text>
          <Button
            title="Ir para login"
            variant="light"
            w="full"
            onPress={() => navigation.goBack()}
          />
        </Center>
      </ScrollView>
    </VStack>
  );
}
