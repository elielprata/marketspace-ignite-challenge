import { api } from "@services/api";
import { Box, HStack, Image } from "native-base";
import { useState } from "react";
import { Dimensions } from "react-native";
import Carousel from "react-native-reanimated-carousel";

type Props = {
  images: {
    id?: string | null;
    path: string;
  }[];
  preview?: boolean;
};

export function CarouselProducts({ images, preview = false }: Props) {
  const [imageIndex, setImageIndex] = useState(0);
  const width = Dimensions.get("window").width;

  return (
    <Box>
      <Carousel
        loop
        width={width}
        height={220}
        data={images}
        pagingEnabled
        scrollAnimationDuration={1000}
        onSnapToItem={(index: number) => setImageIndex(index)}
        renderItem={({ item }) => (
          <Image
            style={{
              flex: 1,
              borderWidth: 1,
              justifyContent: "center",
            }}
            alt="Imagens do produto"
            source={
              preview
                ? item.id
                  ? { uri: `${api.defaults.baseURL}/images/${item.path}` }
                  : { uri: item.path }
                : { uri: `${api.defaults.baseURL}/images/${item.path}` }
            }
          />
        )}
      />
      <HStack
        position="absolute"
        bottom={1}
        w="full"
        h={3}
        justifyContent="space-between"
        alignItems="center"
        padding={0.5}
      >
        {images.map((item, index) => {
          if (images.length > 1) {
            return (
              <Box
                key={index}
                w="1/2"
                h={1}
                bgColor="gray.100:alpha.50"
                rounded="full"
                flexShrink={1}
                mx={0.5}
              >
                {imageIndex === index && (
                  <Box h={1} rounded="full" bg="gray.100:alpha.75" />
                )}
              </Box>
            );
          }
        })}
      </HStack>
    </Box>
  );
}
