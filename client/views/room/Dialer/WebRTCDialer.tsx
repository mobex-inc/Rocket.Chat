import React, { useState, useEffect } from 'react';
import { Box, Button, TextInput, Icon } from '@rocket.chat/fuselage';
import { UserAgent, Web, RegistererState } from 'sip.js';

interface WebRTCDialerProps {
  sipUri: string;
  wsServer: string;
}

export const WebRTCDialer = ({ sipUri, wsServer }: WebRTCDialerProps) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [userAgent, setUserAgent] = useState<Web.SimpleUser | null>(null);
  const [isInCall, setIsInCall] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);

  useEffect(() => {
    const initializeSIP = async () => {
      try {
        const simpleUser = new Web.SimpleUser(wsServer, {
          aor: `sip:webrtc@${sipUri}`,
          media: {
            constraints: { audio: true, video: false }
          },
          userAgentOptions: {
            authorizationUsername: '1000',
            authorizationPassword: 'RocketChat123',
            displayName: 'Test WebRTC User',
          }
        });

        // Listen for registration state changes
        simpleUser.registerUser.stateChange.addListener((newState: RegistererState) => {
          setIsRegistered(newState === RegistererState.Registered);
        });

        await simpleUser.connect();
        await simpleUser.register();
        setUserAgent(simpleUser);

        // Log registration success
        console.log('SIP Registration successful');
      } catch (error) {
        console.error('SIP Registration failed:', error);
      }
    };

    initializeSIP();

    return () => {
      if (userAgent) {
        userAgent.disconnect();
      }
    };
  }, []);

  // ... rest of the component remains the same ...
}; 