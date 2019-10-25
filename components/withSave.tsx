import React, { Component, ComponentClass, ComponentType } from 'react';
import { AsyncStorage, AppState, Alert } from 'react-native';
import { Subtract } from 'utility-types';

export interface InjectedSaveProps {
  data: string;
  handleChange: (data: string) => void;
  setSaveData?: (data: string) => void;
}

interface WithSaveProps {
  id: string; // Unique identifier for saving and retrieving data from the device
}

type WithSaveType<P extends InjectedSaveProps> = P & WithSaveProps;

type RequiredProps<P extends InjectedSaveProps> = Subtract<P, InjectedSaveProps> & WithSaveProps;

/**
 * A Higher Order Component that handles saving component
 * state to the AsyncStorage on the app
 */
function withSave(): <P extends InjectedSaveProps>(
  WrappedComponent: ComponentType<P>,
) => ComponentClass<RequiredProps<P>> {
  return <P extends InjectedSaveProps>(WrappedComponent: ComponentType<P>): ComponentClass<RequiredProps<P>> =>
    class WithSaveComponent extends Component<WithSaveType<P>, { data: string; dataLoaded: boolean }> {
      saveData: string = null;

      constructor(props) {
        super(props);
        this.state = {
          data: null,
          dataLoaded: false,
        };
      }

      componentDidMount(): void {
        AppState.addEventListener('change', this.handleAppStateChange);
        this.recoverData();
      }

      componentWillUnmount(): void {
        AppState.removeEventListener('change', this.handleAppStateChange);
        this.storeData();
      }

      handleAppStateChange = (nextAppState): void => {
        if (nextAppState === 'background' || nextAppState === 'inactive') {
          this.storeData();
        }
      };

      recoverData = async (): Promise<void> => {
        const { id } = this.props;
        try {
          const data = await AsyncStorage.getItem(id);
          if (data !== null) {
            this.setState({ data });
          }
          this.setState({ dataLoaded: true });
        } catch (error) {
          Alert.alert('Error loading story data');
        }
      };

      storeData = (): void => {
        const { id } = this.props;
        const { data } = this.state;
        if (this.saveData) {
          AsyncStorage.setItem(id, this.saveData);
        } else {
          AsyncStorage.setItem(id, data);
        }
      };

      handleChange = (data: string): void => {
        this.setState({ data });
      };

      setSaveData = (data: string): void => {
        this.saveData = data;
      };

      render(): JSX.Element {
        const { data, dataLoaded } = this.state;
        return dataLoaded ? (
          <WrappedComponent
            data={data}
            handleChange={this.handleChange}
            setSaveData={this.setSaveData}
            {...this.props}
          />
        ) : null;
      }
    };
}

export default withSave;
