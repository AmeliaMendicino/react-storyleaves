import React, { PureComponent } from 'react';
import { StyleSheet, View, Text, PanResponder } from 'react-native';

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
  rightBottom: {
    bottom: 2,
    right: 2,
    transform: [{ rotateZ: '180deg' }],
  },
  number: {
    height: 20,
    textAlign: 'center',
  },
});

interface CardProps {
  left: number;
  top: number;
  upsideDown?: boolean;
  name: string;
  number: number;
  /** The hue of the card, can be a value from 1 to 360 */
  hue?: number;
}

interface CornerProps {
  number: number;
  position: 'leftTop' | 'rightBottom';
}

const getCardColors = (hue: number): { borderWidth: number; borderColor: string; backgroundColor: string } => {
  const borderColor = hue ? `hsl(${hue}, 50%, 35%)` : 'white';
  const backgroundColor = hue ? `hsl(${hue}, 100%, 90%)` : 'white';
  // Calculate the card color and border
  return {
    borderWidth: 2,
    borderColor,
    backgroundColor,
  };
};

const Corner = ({ number, position }: CornerProps): JSX.Element => (
  <View style={[styles.corner, styles[position]]}>
    <Text style={styles.number}>{number}</Text>
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
    const { name, number, upsideDown = false, hue } = this.props;
    return (
      <View
        ref={(card): void => {
          this.card = card;
        }}
        style={[styles.card, getCardColors(hue), upsideDown && { transform: [{ rotateZ: '180deg' }] }]}
        {...this.panResponder.panHandlers}
      >
        <Corner number={number} position="leftTop" />
        <Text style={styles.text}>{name}</Text>
        <Corner number={number} position="rightBottom" />
      </View>
    );
  }
}

export default Card;
