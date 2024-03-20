import { SolitoImage } from 'solito/image'
import { GetProps, SizeTokens, getVariableValue, styled } from 'tamagui'
import { getSize } from '@tamagui/get-token'
const getImageSize = (val: SizeTokens) => Math.round(getVariableValue(getSize(val)))

export const Image = styled(SolitoImage, {
  name: 'Image',
  variants: {
    size: {
      '...size': (val) => {
        const height = getImageSize(val)
        const width = getImageSize(val)
        return {
          height,

          width,
        }
      },
    },
  } as const,
})

// helper to get props for any TamaguiComponent
export type ImageProps = GetProps<typeof Image>
