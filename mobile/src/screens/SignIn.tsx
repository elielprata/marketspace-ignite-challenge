import { Controller, useForm } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
import { Center, Image, ScrollView, Text, useToast, VStack } from "native-base";

import { AuthNavigatorRoutesProps } from "@routes/auth.routes";

import LogoImg from "@assets/logo.png";

import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { AppError } from "@utils/AppError";
import { useState } from "react";
import { useAuth } from "@hooks/useAuth";

type FormData = {
  email: string;
  password: string;
};

export function SignIn() {
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation<AuthNavigatorRoutesProps>();

  const toast = useToast();
  const { signIn } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({});

  async function handleSignIn({ email, password }: FormData) {
    try {
      setIsLoading(true);
      await signIn(email.trim(), password);
    } catch (error) {
      const isAppError = error instanceof AppError;

      const title = isAppError
        ? error.message
        : "Não foi possível entrar. Tente novamente mais tarde.";

      toast.show({
        title,
        placement: "top",
        bgColor: "red.500",
      });
      setIsLoading(false);
    }
  }

  return (
    <ScrollView flex={1} px={10} pt={24} showsVerticalScrollIndicator={false}>
      <Center>
        <Image source={LogoImg} alt="Logotipo" />

        <Text
          fontSize={40}
          fontFamily="heading"
          fontWeight="bold"
          color="gray.700"
        >
          marketspace
        </Text>
        <Text fontSize="md" color="gray.700">
          Seu espaço de compra e venda
        </Text>
      </Center>

      <Center mt={10}>
        <Text fontSize="lg" color="gray.500" mb={4}>
          Acesse sua conta
        </Text>

        <Controller
          name="email"
          control={control}
          rules={{ required: "Informe o e-mail." }}
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
          name="password"
          control={control}
          rules={{ required: "Informe a senha." }}
          render={({ field: { value, onChange } }) => (
            <Input
              placeholder="Senha"
              isPassword
              value={value}
              onChangeText={onChange}
              onSubmitEditing={handleSubmit(handleSignIn)}
              returnKeyType="send"
              errorMessage={errors.password?.message}
            />
          )}
        />

        <Button
          title="Entrar"
          w="full"
          onPress={handleSubmit(handleSignIn)}
          isLoading={isLoading}
        />
      </Center>

      <Center mt={24}>
        <Text color="gray.600" fontSize="md" mb={4} fontFamily="body">
          Ainda não tem acesso?
        </Text>

        <Button
          title="Criar conta"
          variant="light"
          onPress={() => navigation.navigate("signUp")}
          w="full"
        />
      </Center>
    </ScrollView>
  );
}
