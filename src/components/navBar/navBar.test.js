import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import Typography from '@material-ui/core/Typography';

import NavBar from './navBar';

Enzyme.configure({ adapter: new Adapter() })

describe('component NavBar', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<NavBar />);
    });
  
  
  it("should render NavBar component with title", () => {
    expect(wrapper.find(Typography).text()).toBe('Leases');
  });
});