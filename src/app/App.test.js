import React from 'react';
import Enzyme, { mount } from 'enzyme';
import { MemoryRouter } from "react-router";
import Adapter from 'enzyme-adapter-react-16';
import Lease from '../features/lease/leaseList';
import App from './App';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Store from './store';

const mockStore = configureStore([]);

Enzyme.configure({ adapter: new Adapter() })

describe('App:', () => {
    let store;

    beforeEach(() => {
        store = mockStore(Store);
    });

    it('should redirect to home page', () => {
        // const wrapper = mount(
        //     <Provider store={store}>
        //         <MemoryRouter initialEntries={[ '/' ]}>
        //             <App/>
        //         </MemoryRouter>
        //     </Provider>
        // );
        // expect(wrapper.find(Lease)).toHaveLength(1);
    });
});
