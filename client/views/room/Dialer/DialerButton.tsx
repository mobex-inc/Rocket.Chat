import React, { useState } from 'react';
import { HeaderButton } from '../components/Header';
import { useTranslation } from '../../../contexts/TranslationContext';
import { Modal } from '@rocket.chat/fuselage';
import { WebRTCDialer } from './WebRTCDialer';

export const DialerButton = () => {
  const t = useTranslation();
  const [isModalOpen, setModalOpen] = useState(false);

  const handleClick = () => {
    setModalOpen(true);
  };

  return (
    <>
      <HeaderButton
        id="dialer"
        icon="phone"
        onClick={handleClick}
        title={t('Dialer')}
      />
      
      {isModalOpen && (
        <Modal
          title={t('WebRTC Dialer')}
          onClose={() => setModalOpen(false)}
        >
          <WebRTCDialer 
            sipUri="51.161.127.92"
            wsServer="wss://51.161.127.92:7443/ws"
          />
        </Modal>
      )}
    </>
  );
}; 