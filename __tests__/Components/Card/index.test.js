import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import configureStore from 'redux-mock-store'; // Smart components

// Component to be tested
import Card from '../../../src/Components/Card/index.js';


const mockStore = configureStore();
const initialState = {};
const store = mockStore(initialState);

describe('<Card />', () => {
  describe('render()', () => {
    test('renders the component', () => {
      const wrapper = shallow(<Card store={store} />);
      const component = wrapper.dive();

      expect(toJson(component)).toMatchSnapshot();
    });
  });
});