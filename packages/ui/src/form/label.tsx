import { GetProps, Paragraph, styled } from 'tamagui'

// export type LabelProps = GetProps<typeof Label>;
export const Label = styled(Paragraph, {
  name: 'Label',
  py: '$1',
  textTransform: 'uppercase',

  fontWeight: '600',
})

export type LabelProps = GetProps<typeof Label>
