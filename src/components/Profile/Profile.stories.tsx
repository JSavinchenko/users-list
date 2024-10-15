import type {StoryFn} from '@storybook/react';
import {Profile} from './Profile';

export default {
  title: 'components/Profile',
  component: Profile,
};

export const Default: StoryFn = () => <Profile />;
