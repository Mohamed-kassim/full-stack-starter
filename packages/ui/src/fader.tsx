import { GetProps, styled, YStack } from "tamagui";

export const Fader = styled(YStack, {
  name: "Fader",
  opacity: 1,
  enterStyle: {
    opacity: 0,
  },
  exitStyle: {
    opacity: 0,
  },
  animation: "quick",
});

// helper to get props for any TamaguiComponent
export type FaderProps = GetProps<typeof Fader>;
