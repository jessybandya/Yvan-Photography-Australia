'use client'

import React, { useState } from 'react';
import './styles.css';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import SmsIcon from '@mui/icons-material/Sms';
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
import AddIcon from '@mui/icons-material/Add';
import EmailIcon from '@mui/icons-material/Email';
import InstagramIcon from '@mui/icons-material/Instagram';

const ChatBox = ({ phoneNumber }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleWhatsAppClick = () => {
    window.open(`https://wa.me/${phoneNumber}`, '_blank');
  };

  const handleSMSClick = () => {
    window.open(`mailto:jessy.bandya5@gmail.com`, '_blank');
  };

  const handleCallClick = () => {
    window.open(`https://www.instagram.com/lens_y_studio?igshid=YzVkODRmOTdmMw%3D%3D&utm_source=qr`, '_blank');
  };

  return (
    <div className={`floating-button${isOpen ? ' active' : ''}`} onClick={handleToggle}>
      <div className="chat-icon">
        <AddIcon />
      </div>
      {isOpen && (
        <div className="chat-box">
          <div className="chat-options">
          <button className="sms" onClick={handleSMSClick}>
          <EmailIcon/>
        </button>
            <button className="whatsapp" onClick={handleWhatsAppClick}>
              <WhatsAppIcon />
            </button>
            <button className="call" onClick={handleCallClick}>
              <InstagramIcon />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBox;
