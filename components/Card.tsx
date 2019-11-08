import React, { PureComponent } from 'react';
import { StyleSheet, View, Text, PanResponder, Animated } from 'react-native';

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
  focus?: (number: number) => void;
  /** An optional function the Card will call when it has stopped moving */
  moveEnd?: (number: number, left: number, top: number) => void;
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
  animating = false;

  moveAnimation = new Animated.ValueXY();

  animationListener = null;

  constructor(props) {
    super(props);

    this.moveAnimation = new Animated.ValueXY({ x: props.left, y: props.top });
  }

  componentDidUpdate(prevProps): void {
    const { left, top } = this.props;
    if (!this.animating && (left !== prevProps.left || top !== prevProps.top)) {
      this.moveCard(left, top);
    }
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
    this.moveAnimation.extractOffset();
    if (focus) {
      focus(number);
    }
  };

  handlePanResponderMove = (event, gestureState): void => {
    Animated.event([null, { dx: this.moveAnimation.x, dy: this.moveAnimation.y }])(event, gestureState);
  };

  handlePanResponderEnd = (event, gestureState): void => {
    const { number, moveEnd } = this.props;
    this.moveAnimation.flattenOffset();
    if (moveEnd) {
      const {
        left: { _value: leftVal },
        top: { _value: topVal },
      } = this.moveAnimation.getLayout();
      moveEnd(number, leftVal, topVal);
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

  moveCard = (left, top): void => {
    this.animating = true;
    this.moveAnimation.flattenOffset();
    Animated.spring(this.moveAnimation, { toValue: { x: left, y: top } }).start(() => {
      this.animating = false;
    });
  };

  render(): JSX.Element {
    const { name, number, upsideDown = false, hue, flipped = false, marked = false } = this.props;
    return (
      <Animated.View
        style={[styles.card, getCardColors(flipped ? null : hue), this.moveAnimation.getLayout()]}
        {...this.panResponder.panHandlers}
      >
        {!flipped ? (
          <>
            <Corner text={number} position="leftTop" />
            {marked && <Corner text="*" position="rightTop" />}
            <Text style={[styles.text, upsideDown && styles.upsideDown]}>{name}</Text>
            {upsideDown && <Text style={[styles.text, styles.upsideDownText]}>{name}</Text>}
            <Corner text={number} position="rightBottom" />
          </>
        ) : (
          <Text style={styles.text}>Storyleaves</Text>
        )}
      </Animated.View>
    );
  }
}

export default Card;
