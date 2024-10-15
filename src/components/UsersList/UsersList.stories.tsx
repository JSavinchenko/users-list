import type {StoryFn} from '@storybook/react';
import {UsersList} from './UsersList';

export default {
  title: 'components/UsersList',
  component: UsersList,
};

export const Default: StoryFn = () => <UsersList />;
