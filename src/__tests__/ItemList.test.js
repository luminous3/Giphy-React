import React from 'react';
import { shallow, mount, render } from 'enzyme';
import { ItemList } from '../components/CustomerList';

const wrapper = shallow(<ItemList data={data} />);

describe('CustomerList', () => {
  it('should render without throwing an error', () => {
    expect(wrapper.exists(<ul className="collection" />)).toBe(true);
  });
});
