import type {StoryFn} from '@storybook/react';
import {SideBar} from '../SideBar';

export default {
  title: 'components/SideBar',
  component: SideBar,
};

export const Default: StoryFn = () => <SideBar />;
