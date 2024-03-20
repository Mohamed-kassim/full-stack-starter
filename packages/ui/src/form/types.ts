import { ReactElement } from 'react'

import { LabelProps } from './label'

export type FromElementLabel =
  | { label?: never; labelProps?: never }
  | {
      label?: string | ReactElement
      labelProps?: LabelProps
    }
