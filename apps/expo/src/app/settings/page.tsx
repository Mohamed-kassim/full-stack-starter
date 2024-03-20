import React from 'react'
import { Button, ListItem, Screen } from '@core/ui'
import { languagesOptions } from '../../localization'
export default function Page() {
  return (
    <Screen preset="fixed">
      {Object.keys(languagesOptions).map((language) => {
        return <ListItem>{languagesOptions[language].nativeName}</ListItem>
      })}
    </Screen>
  )
}
