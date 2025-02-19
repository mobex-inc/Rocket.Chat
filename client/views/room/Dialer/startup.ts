import { Meteor } from 'meteor/meteor';
import { Header } from '@rocket.chat/ui-client';

Meteor.startup(() => {
  Header.addAction('dialer', {
    id: 'dialer',
    icon: 'phone',
    title: 'Dialer',
    action: () => {
      // Your dialer open logic
    },
    order: 5
  });
});