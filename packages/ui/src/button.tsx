// // import analytics from "@react-native-firebase/analytics";
// // import { useRoute } from "@react-navigation/native";
// import { forwardRef, useCallback } from "react";
// import {
//   ButtonFrame,
//   ButtonProps as TamaguiButtonProps,
//   ButtonText,
//   GetProps,
//   styled,
//   TamaguiElement,
//   themeable,
//   useButton,
// } from "tamagui";

// import { Spinner } from "./spinner";

// const CustomButtonFrame = styled(ButtonFrame, {
//   name: "CustomButtonFrame",
//   size: "$5",

//   borderRadius: "$8",

//   variants: {
//     variant: {
//       primary: {
//         backgroundColor: "#1B444F",
//       },
//       secondary: {
//         chromeless: true,
//       },
//       text: {
//         chromeless: true,
//         size: "$2",
//         px: "$2",
//       },
//       danger: {
//         backgroundColor: "#D4504A",
//       },
//     },
//   } as const,
// });

// const CustomButtonText = styled(ButtonText, {
//   name: "CustomButtonText",
//   textTransform: "capitalize",
//   fontWeight: "700",
//   size: "$4",
//   letterSpacing: 1.75,

//   variants: {
//     variant: {
//       primary: {
//         true: {
//           primary: true,
//         },
//         color: "white",
//       },
//       secondary: {
//         color: "#1B444F",
//       },
//       text: {
//         fontWeight: "500",
//       },
//       danger: {
//         color: "white",
//       },
//     },
//   } as const,
// });

// type CustomButtonProps = GetProps<typeof CustomButtonFrame>;
// type CustomButtonTextProps = GetProps<typeof CustomButtonText>;

// export type ButtonProps = TamaguiButtonProps &
//   CustomButtonProps &
//   CustomButtonTextProps & {
//     isLoading?: boolean;
//     isDisabled?: boolean;
//   };

// export const BaseButton = themeable(
//   forwardRef<TamaguiElement, ButtonProps>((propsIn, ref) => {
//     const { variant, isLoading } = propsIn;
//     const LocalButtonText = useCallback(
//       (buttonTextProps) => (
//         <CustomButtonText variant={variant} {...buttonTextProps} />
//       ),
//       [variant]
//     );

//     const { props } = useButton(propsIn, { Text: LocalButtonText });

//     return (
//       //@ts-ignore
//       <CustomButtonFrame {...props} ref={ref} />
//     );
//   })
// );

// export type ButtonAnalytics = {
//   routeName: string;
//   button: string;
// };

// export const Button = (props: ButtonProps) => {
//   const { isLoading, onClick, onPress, isDisabled, ...rest } = props;
//   // const { name: routeName } = useRoute();

//   const submitAnalytics = async (data: ButtonAnalytics) => {
//     // await analytics().logEvent("buttonPressed", {
//     //   ...data,
//     // });
//   };

//   const handleOnClick = (event) => {
//     // submitAnalytics({
//     //   routeName,
//     //   button: props.children,
//     // });
//     if (onClick) {
//       onClick(event);
//     }
//   };
//   const handleOnPress = (event) => {
//     // submitAnalytics({
//     //   routeName,
//     //   button: props.children,
//     // });
//     if (onPress) {
//       onPress(event);
//     }
//   };
//   return (
//     <BaseButton
//       onClick={handleOnClick}
//       onPress={handleOnPress}
//       animation="quick"
//       pressStyle={{
//         scale: 0.97,
//       }}
//       {...rest}
//       theme={props.variant}
//       {...(isDisabled && {
//         disabled: true,
//         color: "$gray10Light",
//       })}
//       {...(isLoading && {
//         icon: <Spinner />,
//         disabled: true,
//         color: "$gray10Light",
//       })}
//     />
//   );
// };

import { Button as TamaguiButton, ButtonProps as TamaguiButtonProps } from 'tamagui'
import { Spinner } from './spinner'

type ButtonProps = TamaguiButtonProps & {
  isLoading?: boolean
  primary?: boolean
}

const Button = (props: ButtonProps) => {
  const { isLoading, primary, ...rest } = props
  return (
    <TamaguiButton
      animation="quick"
      textProps={{ color: 'white' }}
      {...(primary && {
        backgroundColor: '#F26F21',
      })}
      pressStyle={{
        scale: 0.97,
      }}
      {...rest}
      {...(isLoading && {
        icon: <Spinner color="white" />,
        disabled: true,
      })}
    />
  )
}
export { Button, ButtonProps }
