import { AnimatePresence, Text, YStack } from 'tamagui'

import { Fader } from '../fader'

export const FormError = ({ error }: { error?: string }) => (
  <YStack h="$1.5" justifyContent="center" my="$1">
    <AnimatePresence>
      {Boolean(error) && (
        <Fader key="INPUT_ERROR">
          <Text color="$red10Light" fontWeight="700" fontSize="$3" textTransform="uppercase">
            {error}
          </Text>
        </Fader>
      )}
    </AnimatePresence>
  </YStack>
)
