import React, { PureComponent } from 'react';
import { PanResponder, StyleSheet, View } from 'react-native';
import withSave, { InjectedSaveProps } from './withSave';

const CIRCLE_SIZE = 80;

const styles = StyleSheet.create({
  circle: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    backgroundColor: 'black',
    borderRadius: CIRCLE_SIZE / 2,
    position: 'absolute',
    left: 0,
    top: 0,
  },
});

interface PanResponderExampleProps extends InjectedSaveProps {
  left: number;
  top: number;
  color: string;
}

export class PanResponderExample extends PureComponent<PanResponderExampleProps> {
  circleStyles = {
    style: {
      backgroundColor: '',
      left: 0,
      top: 0,
    },
  };

  circle: View = null;

  previousLeft = 0;

  previousTop = 0;

  constructor(props) {
    super(props);

    if (props.data) {
      const [savedLeft, savedTop] = props.data.split(':');
      this.previousLeft = parseFloat(savedLeft);
      this.previousTop = parseFloat(savedTop);
    } else {
      this.previousLeft = props.left;
      this.previousTop = props.top;
    }
    this.circleStyles = {
      style: {
        backgroundColor: props.color,
        left: this.previousLeft,
        top: this.previousTop,
      },
    };
  }

  componentDidMount(): void {
    this.updateNativeStyles();
  }

  handleStartShouldSetPanResponder = (event, gestureState): boolean => {
    // Should we become active when the user presses down on the circle?
    return true;
  };

  handleMoveShouldSetPanResponder = (event, gestureState): boolean => {
    // Should we become active when the user moves a touch over the circle?
    return true;
  };

  handlePanResponderGrant = (event, gestureState): void => {
    this.highlight();
  };

  handlePanResponderMove = (event, gestureState): void => {
    this.circleStyles.style.left = this.previousLeft + gestureState.dx;
    this.circleStyles.style.top = this.previousTop + gestureState.dy;
    this.updateNativeStyles();
  };

  handlePanResponderEnd = (event, gestureState): void => {
    this.unHighlight();
    this.previousLeft += gestureState.dx;
    this.previousTop += gestureState.dy;
  };

  highlight = (): void => {
    this.circleStyles.style.backgroundColor = 'grey';
    this.updateNativeStyles();
  };

  unHighlight = (): void => {
    const { color } = this.props;
    this.circleStyles.style.backgroundColor = color;
    this.updateNativeStyles();
  };

  updateNativeStyles = (): void => {
    if (this.circle) {
      this.circle.setNativeProps(this.circleStyles);

      const { setSaveData } = this.props;
      setSaveData(`${this.circleStyles.style.left}:${this.circleStyles.style.top}`);
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
    return (
      <View
        ref={(circle): void => {
          this.circle = circle;
        }}
        style={styles.circle}
        {...this.panResponder.panHandlers}
      />
    );
  }
}

export default withSave()(PanResponderExample);
