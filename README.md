# React Native Storyleaves #

A React Native implementation of Jamie Fristrom's [Storyleaves](https://docs.google.com/document/d/1FlhnuyFP1qzsh6PFyhXffmEo4bk5j7EySOssviQkpQE/edit?usp=sharing).

### Features

[BETA] Currently, the only implemented feature is digital cards. The locations and states of the cards will be saved on the device, so you can close the game without losing your spot.
Play at your convenience!

There are two hard-coded decks to play with. To select a different deck, start a new game by long-pressing the last line of text in the middle of the screen.

* Drag a card from the deck to flip it face forward.
* Double-tap a card to mark it with a `*` so it won't be reshuffled into the deck when the `Start Game` or `Reshuffle` button is pressed.
* Reshuffle cards will be added automatically into the deck when `Start Game` is pressed (2 for every 18 cards).

## Installation

Use the package manager [yarn](https://yarnpkg.com/en/docs/install) to install all dependencies for the project.

```
yarn install
```

Expo also recommends installing Expo CLI globally.

```
npm install -g expo-cli
```

If you are running macOS, you may also need to install Watchman.
Please refer to the [Expo Installation page](https://docs.expo.io/versions/v35.0.0/get-started/installation/) for more details.

## Usage

Navigate to the project folder in your terminal and type `yarn start` to start the local development server of Expo CLI.

Installing the [Expo client](https://docs.expo.io/versions/v35.0.0/get-started/installation/#2-mobile-app-expo-client-for-ios) on your Android or Apple device will allow you to scan the QR code and preview the app.

To play in your web browser, run `yarn start --web`.

## License
[MIT](https://choosealicense.com/licenses/mit/)

Please note that the Storyleaves game text is licensed under [Creative Commons Attribution Non-Commercial Share Alike 3.0](http://creativecommons.org/licenses/by-nc-sa/3.0/us/).