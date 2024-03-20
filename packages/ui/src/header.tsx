import { GetProps, H2, Header as TamaguiHeader, XStackProps } from 'tamagui'

type Props = {
  title?: string
  onClose?: () => void
  accessoryRight?: React.ReactElement | null
} & XStackProps

export const Header = (props: Props) => {
  const { title, accessoryRight, ...rest } = props
  return (
    <TamaguiHeader
      py="$5"
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
      backgroundColor="$background"
      {...rest}
    >
      {Boolean(title) && <H2 fontWeight="400">{title}</H2>}
      {accessoryRight && accessoryRight}
    </TamaguiHeader>
  )
}
// helper to get props for any TamaguiComponent
export type HeaderProps = GetProps<typeof Header>
