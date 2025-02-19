import React, { useState } from 'react';
import { Button, Icon } from '@rocket.chat/fuselage';
import { Modal, ModalHeader, ModalContent } from '@rocket.chat/fuselage';
import { WebRTCDialer } from './WebRTCDialer';

export const DialerButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button small onClick={() => setIsOpen(true)}>
        <Icon name="phone" size={20} />
      </Button>

      {isOpen && (
        <Modal>
          <ModalHeader>
            <Icon name="phone" size={20} /> WebRTC Dialer
          </ModalHeader>
          <ModalContent>
            <WebRTCDialer 
              sipUri="51.161.127.92"
              wsServer="wss://51.161.127.92:7443/ws"
            />
          </ModalContent>
        </Modal>
      )}
    </>
  );
}; 