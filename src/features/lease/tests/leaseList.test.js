import React, {useEffect} from "react";
import { Provider } from "react-redux";
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import configureMockStore from "redux-mock-store";
import Lease from "../leaseList";

Enzyme.configure({ adapter: new Adapter() })

const mockStore = configureMockStore();
const store = mockStore({
    loading: false,
    leaseData: []
});
let wrapper;

describe("page LeastList", () => {
    beforeAll(() => {
        wrapper = shallow(
            <Provider store={store}>
                <Lease />
            </Provider>
        ).dive();
        jest.spyOn(React, 'useEffect').mockImplementation(f => f());
    });

    it("matches to snapshot", () => {
        expect(wrapper).toMatchSnapshot();
    });
});