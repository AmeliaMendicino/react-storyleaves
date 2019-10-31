import React, { PureComponent } from 'react';
import { StyleSheet, View, Text, PanResponder } from 'react-native';

import { CardType } from '../modules/cards';

const styles = StyleSheet.create({
  card: {
    width: 100,
    height: 142,
    backgroundColor: 'white',
    borderRadius: 12,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    textAlign: 'center',
  },
  corner: {
    width: 20,
    height: 40,
    flexDirection: 'column',
    position: 'absolute',
    backgroundColor: 'transparent',
  },
  leftTop: {
    top: 2,
    left: 2,
  },
  rightTop: {
    top: 2,
    right: 2,
  },
  rightBottom: {
    bottom: 2,
    right: 2,
    transform: [{ rotateZ: '180deg' }],
  },
  cornerText: {
    height: 20,
    textAlign: 'center',
  },
  upsideDown: { transform: [{ rotateZ: '180deg' }] },
  upsideDownText: {
    fontStyle: 'italic',
    color: 'grey',
  },
});

interface CardProps extends CardType {
  /** An optional function the Card will call when it receives focus */
  focus?: (number: number, left: number, top: number) => void;
}

interface CornerProps {
  text: number | string;
  position: 'leftTop' | 'rightBottom' | 'rightTop';
}

const getCardColors = (hue: number): { borderWidth: number; borderColor: string; backgroundColor: string } => {
  const borderColor = hue ? `hsl(${hue}, 50%, 35%)` : 'black';
  const backgroundColor = hue ? `hsl(${hue}, 100%, 90%)` : 'white';
  // Calculate the card color and border
  return {
    borderWidth: 2,
    borderColor,
    backgroundColor,
  };
};

const Corner = ({ text, position }: CornerProps): JSX.Element => (
  <View style={[styles.corner, styles[position]]}>
    <Text style={styles.cornerText}>{text}</Text>
  </View>
);

class Card extends PureComponent<CardProps> {
  cardStyles = {
    style: {
      left: 0,
      top: 0,
    },
  };

  card: View = null;

  previousLeft = 0;

  previousTop = 0;

  constructor(props) {
    super(props);
    this.previousLeft = props.left;
    this.previousTop = props.top;
    this.cardStyles = {
      style: {
        left: this.previousLeft,
        top: this.previousTop,
      },
    };
  }

  componentDidMount(): void {
    this.updateNativeStyles();
  }

  handleStartShouldSetPanResponder = (event, gestureState): boolean => {
    // Should we become active when the user presses down on the card?
    return true;
  };

  handleMoveShouldSetPanResponder = (event, gestureState): boolean => {
    // Should we become active when the user moves a touch over the card?
    return true;
  };

  handlePanResponderGrant = (event, gestureState): void => {
    const { number, focus } = this.props;
    if (focus) {
      focus(number, this.cardStyles.style.left, this.cardStyles.style.top);
    }

    this.highlight();
  };

  handlePanResponderMove = (event, gestureState): void => {
    this.cardStyles.style.left = this.previousLeft + gestureState.dx;
    this.cardStyles.style.top = this.previousTop + gestureState.dy;
    this.updateNativeStyles();
  };

  handlePanResponderEnd = (event, gestureState): void => {
    this.unHighlight();
    this.previousLeft += gestureState.dx;
    this.previousTop += gestureState.dy;
  };

  highlight = (): void => {
    this.updateNativeStyles();
  };

  unHighlight = (): void => {
    // We can change the color or opacity here for when the card is un-selected...
    this.updateNativeStyles();
  };

  updateNativeStyles = (): void => {
    if (this.card) {
      this.card.setNativeProps(this.cardStyles);
    }
  };

  /* eslint react/sort-comp: 0 */
  panResponder = PanResponder.create({
    onStartShouldSetPanResponder: this.handleStartShouldSetPanResponder,
    onMoveShouldSetPanResponder: this.handleMoveShouldSetPanResponder,
    onPanResponderGrant: this.handlePanResponderGrant,
    onPanResponderMove: this.handlePanResponderMove,
    onPanResponderRelease: this.handlePanResponderEnd,
    onPanResponderTerminate: this.handlePanResponderEnd,
  });

  render(): JSX.Element {
    const { name, number, upsideDown = false, hue, flipped = false, marked = false } = this.props;
    return (
      <View
        ref={(card): void => {
          this.card = card;
        }}
        style={[styles.card, getCardColors(flipped ? null : hue)]}
        {...this.panResponder.panHandlers}
      >
        {!flipped && (
          <>
            <Corner text={number} position="leftTop" />
            {marked && <Corner text="*" position="rightTop" />}
            <Text style={[styles.text, upsideDown && styles.upsideDown]}>{name}</Text>
            {upsideDown && <Text style={[styles.text, styles.upsideDownText]}>{name}</Text>}
            <Corner text={number} position="rightBottom" />
          </>
        )}
      </View>
    );
  }
}

export default Card;
