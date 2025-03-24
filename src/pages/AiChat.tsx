import React from 'react';
import { AiChatBot } from '@/components/AiChatBot';
import Layout from '@/components/Layout';

const AiChat: React.FC = () => {
  return (
    <Layout>
      <AiChatBot />
    </Layout>
  );
};

export default AiChat;