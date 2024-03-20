import { config } from '@core/config'

export type Conf = typeof config

declare module '@core/ui' {
  interface TamaguiCustomConfig extends Conf {}
}
