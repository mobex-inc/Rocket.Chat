import { HeaderToolbox } from '../../app/ui-utils/client';
import { DialerHeaderItem } from '../views/room/Header/DialerHeaderItem';

// ... existing code ...

HeaderToolbox.addItem('webrtc-dialer', {
  template: DialerHeaderItem,
  order: 5
}); 