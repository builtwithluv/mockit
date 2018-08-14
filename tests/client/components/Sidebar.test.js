import React from 'react';
import { mount } from 'enzyme';

import createActiveResponses from '@server/helpers/createActiveResponses';

import { Icon } from '@blueprintjs/core';
import Sidebar from '@client/components/Sidebar';
import NodeParentLabel from '@client/components/Sidebar/components/NodeParentLabel';
import NodeItemLabel from '@client/components/Sidebar/components/NodeItemLabel';

describe('<Sidebar />', () => {
    let props;
    let wrapper;

    beforeEach(() => {
        const fixtures = [{
            default: true,
            id: 'ab1',
            description: 'Testing',
            url: '/test',
            method: 'GET',
            status: 200,
        }, {
            id: 'ab2',
            url: '/test',
            method: 'GET',
            status: 200,
        }, {
            id: 'ab3',
            url: '/test2',
            method: 'POST',
            status: 400,
        }];

        props = {
            fixtures,
            activeFixtures: createActiveResponses(fixtures),
            updateGlobalContext: jest.fn(),
        };

        wrapper = mount(<Sidebar {...props} />);
    });

    describe('Parents', () => {
        it('should render two parents', () => {
            expect(wrapper.find(NodeParentLabel)).toHaveLength(2);
        });

        it('should display url', () => {
            expect(wrapper.find(NodeParentLabel).first().text()).toBe(props.fixtures[0].url);
        });
    });

    describe('Children', () => {
        let firstNodeItem;
        let firstFixture;

        beforeEach(() => {
            firstNodeItem = wrapper.find(NodeItemLabel).first();
            firstFixture = props.fixtures[0];
        });

        it('should render three childs', () => {
            expect(wrapper.find(NodeItemLabel)).toHaveLength(3);
        });

        it('should display method', () => {
            expect(firstNodeItem.text()).toContain(firstFixture.method);
        });

        it('should display status', () => {
            expect(firstNodeItem.text()).toContain(firstFixture.status);
        });

        it('should display description', () => {
            expect(firstNodeItem.text()).toContain(firstFixture.description);
        });

        it('should have active icon on active fixtures', () => {
            expect(firstNodeItem.find(Icon)).toHaveLength(1);
        });

        it('should set the first node as active', () => {
            expect(props.updateGlobalContext).toHaveBeenCalledTimes(1);
        });

        it('should set another node as active when clicked', () => {
            const secondNodeItem = wrapper.find(NodeItemLabel).at(1);
            secondNodeItem.simulate('click');
            expect(props.updateGlobalContext).toHaveBeenCalledTimes(2);
        });
    });
});
