import React, { PureComponent } from 'react';
import { StyleSheet, View, Text, PanResponder, Animated } from 'react-native';

import { CardType } from '../modules/cards';

const styles = StyleSheet.create({
  card: {
    width: 110,
    height: 100,
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

/**
 * A helper component for displaying text in corners of cards
 */
const Corner = ({ text, position }: CornerProps): JSX.Element => (
  <View style={[styles.corner, styles[position]]}>
    <Text style={styles.cornerText}>{text}</Text>
  </View>
);

/**
 * A helper function that takes a hue number and will return
 * a set of styles for the card's background and border, where the
 * background is a light version of the hue and the border is a dark version of it.
 *
 * @param hue A value between 1 and 360, e.g., 1 = red, 30 = orange, 60 = yellow, etc.
 *        If 0 or null is passed in, it will default to a white background and black border.
 */
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

/**
 * A Card Component that will render at the specified position and
 * can be dragged around. Will animate to new coordinates if the position props change.
 *
 * @todo We're currently using left = x and top = y. If we're in a View that doesn't
 * take up the whole screen, is it going to do weird relative stuff?
 * Should we change it to take x and y instead of top and left?
 */
class Card extends PureComponent<CardProps> {
  /** The 2D Value that drives the animations, such as pan gestures */
  moveAnimation = new Animated.ValueXY();

  constructor(props) {
    super(props);

    this.moveAnimation = new Animated.ValueXY({ x: props.left, y: props.top });
  }

  componentDidUpdate(prevProps): void {
    const { left, top } = this.props;
    // Check if the passed in coordinates have changed and animate to the new position
    if (left !== prevProps.left || top !== prevProps.top) {
      this.moveCard(left, top);
    }
  }

  handleStartShouldSetPanResponder = (event, gestureState): boolean => {
    // Become active when the user presses down on the card
    return true;
  };

  handleMoveShouldSetPanResponder = (event, gestureState): boolean => {
    // Become active when the user moves a touch over the card
    return true;
  };

  handlePanResponderGrant = (event, gestureState): void => {
    // The gesture has has started and the gestureState.d{x,y} will be set to zero now
    const { number, focus } = this.props;
    // Set the animation offset to the base value {x,y} and the base value to zero so we can directly map to the gestureState
    this.moveAnimation.extractOffset();
    // If a focus function has been specified, call it, usually so we can render this card on top of others
    if (focus) {
      focus(number);
    }
  };

  handlePanResponderMove = (event, gestureState): void => {
    // Map the gestureState's accumulated distance since becoming responder to the animation's x and y
    Animated.event([null, { dx: this.moveAnimation.x, dy: this.moveAnimation.y }])(event, gestureState);
  };

  handlePanResponderEnd = (event, gestureState): void => {
    const { number, moveEnd } = this.props;
    // Merge the animation offset value into the base value and reset the offset to zero to mark the end of the animation
    this.moveAnimation.flattenOffset();
    if (moveEnd) {
      // Capture the final location of the card and pass it to the moveEnd function
      const {
        // It feels super hacky to be grabbing the raw _value numbers,
        // but if we use the Animated.Value objects it causes an infinite render loop and crashes the application since
        // the React shallow prop compare sees them as different objects when they're passed back into the Card props by the parent
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

  /**
   * Animates the card to the specified position
   */
  moveCard = (left, top): void => {
    Animated.spring(this.moveAnimation, { toValue: { x: left, y: top } }).start();
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
