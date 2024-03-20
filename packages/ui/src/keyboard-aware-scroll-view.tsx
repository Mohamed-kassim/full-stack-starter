import { PropsWithChildren, useCallback, useEffect } from "react";
import {
  Dimensions,
  GestureResponderEvent,
  ScrollViewProps,
} from "react-native";
import {
  KeyboardEvents,
  useResizeMode,
} from "react-native-keyboard-controller";
import Reanimated, {
  useAnimatedRef,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { GetProps, ScrollView, YStack, YStackProps } from "tamagui";

// const AnimatedScrollView = Reanimated.ScrollView;
const AnimatedScrollView = Reanimated.createAnimatedComponent(ScrollView);
interface Props extends YStackProps {
  scrollViewProps?: ScrollViewProps;
  extraHeight?: number;
  scrollViewRef?: React.RefObject<Reanimated.ScrollView>;
}

const screenHeight = Dimensions.get("window").height;

export const KeyboardAwareScrollView = (props: PropsWithChildren<Props>) => {
  const { scrollViewProps, extraHeight = 0, scrollViewRef, ...rest } = props;
  const animatedRef = useAnimatedRef<Reanimated.ScrollView>();
  const aref = scrollViewRef ?? animatedRef;
  const scrollPosition = useSharedValue(0);
  const click = useSharedValue(0);
  const position = useSharedValue(0);
  const fakeViewHeight = useSharedValue(0);

  useResizeMode();

  const onScroll = useAnimatedScrollHandler({
    onScroll: (e) => {
      position.value = e.contentOffset.y;
    },
  });

  useEffect(() => {
    const show = KeyboardEvents.addListener("keyboardWillShow", (e) => {
      fakeViewHeight.value = e.height + extraHeight;
    });
    const hide = KeyboardEvents.addListener("keyboardWillHide", () => {
      fakeViewHeight.value = 0;
    });

    return () => {
      show.remove();
      hide.remove();
    };
  }, [extraHeight]);

  const view = useAnimatedStyle(() => ({
    height: fakeViewHeight.value,
    width: "100%",
  }));
  const onTouchStart = useCallback((e: GestureResponderEvent) => {
    click.value = e.nativeEvent.pageY;

    scrollPosition.value = position.value;
  }, []);

  return (
    <YStack flex={1} {...rest} onTouchStart={onTouchStart}>
      <AnimatedScrollView
        //@ts-ignore
        ref={aref}
        onScroll={onScroll}
        scrollEventThrottle={16}
        style={{ flex: 1 }}
        {...scrollViewProps}
      >
        {props.children}
        <Reanimated.View
          onLayout={(e) => {
            if (e.nativeEvent.layout.height !== 0) {
              const visibleRect = screenHeight - fakeViewHeight.value;

              if (click.value > visibleRect) {
                const target = click.value - visibleRect;

                aref.current?.scrollTo({
                  x: 0,
                  y: target + scrollPosition.value + 50,
                  animated: true,
                });
              }
            }
          }}
          style={view}
        />
      </AnimatedScrollView>
    </YStack>
  );
};

export type KeyboardAwareScrollViewProps = GetProps<
  typeof KeyboardAwareScrollView
>;
