import { IImageProps, Image } from "native-base";

type Props = IImageProps & {
  size: number;
};

export function ProductPhoto({ size, ...rest }: Props) {
  return (
    <Image
      w={size}
      h={size}
      rounded="md"
      mr={2}
      alt="Imagem do produto"
      {...rest}
    />
  );
}
