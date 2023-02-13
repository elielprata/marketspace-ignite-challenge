import {
  Box,
  Button,
  IImageProps,
  Image,
  Pressable,
  useTheme,
} from "native-base";
import { X } from "phosphor-react-native";
import { TouchableOpacity } from "react-native";

type Props = IImageProps & {
  size: number;
  onRemove: () => void;
};

export function ProductPhoto({ size, onRemove, ...rest }: Props) {
  const { colors, sizes } = useTheme();
  return (
    <Box mr={2}>
      <Image w={size} h={size} rounded="md" alt="Imagem do produto" {...rest} />

      <Pressable
        position="absolute"
        top={1}
        right={1}
        bg="gray.600"
        w={4}
        h={4}
        justifyContent="center"
        alignItems="center"
        rounded="full"
        _pressed={{ bg: "gray.500" }}
        onPress={onRemove}
      >
        <X color={colors.gray[100]} size={sizes[3]} />
      </Pressable>
    </Box>
  );
}
