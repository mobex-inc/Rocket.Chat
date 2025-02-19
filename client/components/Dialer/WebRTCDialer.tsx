import React, { useState, useEffect } from 'react';
import { Box, Button, TextInput, Icon } from '@rocket.chat/fuselage';
import { Web } from 'sip.js';

interface WebRTCDialerProps {
  sipUri: string;  // e.g., 'sip:example.com'
  wsServer: string;  // e.g., 'wss://example.com:8089/ws'
}

export const WebRTCDialer = ({ sipUri, wsServer }: WebRTCDialerProps) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [userAgent, setUserAgent] = useState<Web.SimpleUser | null>(null);
  const [isInCall, setIsInCall] = useState(false);

  useEffect(() => {
    const initializeSIP = async () => {
      const simpleUser = new Web.SimpleUser(wsServer, {
        uri: sipUri,
        media: {
          constraints: { audio: true, video: false }
        }
      });
      
      await simpleUser.connect();
      setUserAgent(simpleUser);
    };

    initializeSIP();
    
    return () => {
      if (userAgent) {
        userAgent.disconnect();
      }
    };
  }, []);

  const handleCall = async () => {
    if (!userAgent || !phoneNumber) return;
    
    try {
      await userAgent.call(`sip:${phoneNumber}@${sipUri}`);
      setIsInCall(true);
    } catch (error) {
      console.error('Call failed:', error);
    }
  };

  const handleHangup = async () => {
    if (!userAgent) return;
    
    try {
      await userAgent.hangup();
      setIsInCall(false);
    } catch (error) {
      console.error('Hangup failed:', error);
    }
  };

  return (
    <Box display="flex" flexDirection="column" padding={16}>
      <Box marginBottom={16}>
        <TextInput
          placeholder="Enter phone number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
      </Box>
      
      {!isInCall ? (
        <Button primary onClick={handleCall} disabled={!phoneNumber}>
          <Icon name="phone" size={20} /> Call
        </Button>
      ) : (
        <Button danger onClick={handleHangup}>
          <Icon name="phone-off" size={20} /> Hang up
        </Button>
      )}
    </Box>
  );
}; 