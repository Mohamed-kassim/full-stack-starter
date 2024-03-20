import { GetProps, Spinner as TamaguiSpinner, styled } from "tamagui";

export const Spinner = styled(TamaguiSpinner, {
  name: "Spinner",
});

// helper to get props for any TamaguiComponent
export type SpinnerProps = GetProps<typeof Spinner>;
