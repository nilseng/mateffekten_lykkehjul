# Mateffekten - lykkehjul

React project with wheels of fortune generating a random word.

## Project configuration

### Changing text and images

Images are located at `src/images` and imported in `src/appConfig/wheelContent.ts` where both text and images can be changed.

### Changing wheel behaviour

To change the time until a random word is generated, change `spinDurMs` in `src/appConfig/wheelSettings.ts`.

To change the number of times the wheels rotate each time a new word is generated, change `spins` in `src/appConfig/wheelSettings.ts`.
