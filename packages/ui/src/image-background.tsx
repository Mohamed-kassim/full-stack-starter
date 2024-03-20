import { PropsWithChildren } from "react";
import { GetProps, YStack, YStackProps } from "tamagui";

import { Image, ImageProps } from "./image";

type Props = {
  imageProps: ImageProps;
} & YStackProps;

export const ImageBackground = (props: PropsWithChildren<Props>) => {
  const { imageProps, children, ...rest } = props;
  return (
    <YStack fullscreen h="100%" w="100%">
      <Image
        style={{
          width: "100%",
          height: "100%",
          flex: 1,
          backgroundColor: "black",
          ...(imageProps.style && { style: imageProps.style }),
        }}
        transition={0}
        {...imageProps}
      />
      <YStack position="absolute" height="100%" width="100%" {...rest}>
        {children}
      </YStack>
    </YStack>
  );
};

export type ImageBackgroundProps = GetProps<typeof ImageBackground>;
