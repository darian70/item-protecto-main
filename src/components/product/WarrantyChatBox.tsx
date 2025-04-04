import React, { useState } from 'react';
import { Bot, Upload } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { ScrollArea } from '../ui/scroll-area';
import { Warranty, Product } from '@/lib/types';

interface Message {
  type: 'user' | 'bot';
  content: string;
}

interface WarrantyChatBoxProps {
  product: Product;
  onWarrantyDataDetected: (warrantyData: Partial<Warranty>) => void;
}

export const WarrantyChatBox: React.FC<WarrantyChatBoxProps> = ({ product, onWarrantyDataDetected }) => {
  const [messages, setMessages] = useState<Message[]>([{
    type: 'bot',
    content: `Hi! I'm your Warranty Assistant for your ${product.name}. I can help you understand your warranty coverage and discover any hidden warranties. What would you like to know?`
  }]);
  const [input, setInput] = useState('');

  const analyzeWarranty = async (description: string) => {
    // Simulate AI response - In a real app, this would call an AI service
    const mockAnalysis = `Based on your ${product.name}, I've analyzed the warranty information:

1. Type: Manufacturer warranty
2. Coverage Period: 1 year from purchase date (${product.purchaseDate.toLocaleDateString()})
3. Key Coverage:
   - Manufacturing defects
   - Hardware malfunctions
   - Parts and labor included
4. Contact Information:
   - Support: 1-800-123-4567
   - Email: support@${product.brand.toLowerCase()}.com
   - Website: https://support.${product.brand.toLowerCase()}.com

Would you like me to fill out the warranty form with this information?`;

    // Simulate extracting structured warranty data
    const warrantyData: Partial<Warranty> = {
      type: 'manufacturer',
      provider: product.brand,
      startDate: product.purchaseDate,
      endDate: new Date(product.purchaseDate.getTime() + 365 * 24 * 60 * 60 * 1000), // 1 year from purchase
      coverageDetails: 'Manufacturing defects, hardware malfunctions, parts and labor included',
      contactInfo: {
        phone: '1-800-123-4567',
        email: `support@${product.brand.toLowerCase()}.com`,
        website: `https://support.${product.brand.toLowerCase()}.com`
      }
    };

    // Pass the extracted data to parent component
    onWarrantyDataDetected(warrantyData);

    return mockAnalysis;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = {
      type: 'user',
      content: input,
    };
    setMessages(prev => [...prev, userMessage]);

    // Get AI response
    const analysis = await analyzeWarranty(input);
    const botMessage: Message = {
      type: 'bot',
      content: analysis,
    };
    setMessages(prev => [...prev, botMessage]);

    // Clear input
    setInput('');
  };

  return (
    <div className="overflow-hidden flex flex-col h-[500px] bg-background/50 backdrop-blur-sm rounded-lg">
      <div className="flex items-center gap-3 p-4 border-b">
        <div className="bg-primary/10 p-2 rounded-lg">
          <Bot className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h2 className="text-sm font-medium">Warranty AI Assistant</h2>
          <p className="text-xs text-muted-foreground">Ask me anything about your {product.name}</p>
        </div>
      </div>

      <ScrollArea className="flex-1 px-4">
        <div className="space-y-4 py-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {message.type === 'bot' && (
                <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center mr-2">
                  <Bot className="h-4 w-4 text-primary" />
                </div>
              )}
              <div
                className={`
                  max-w-[80%] rounded-lg p-3
                  ${message.type === 'user'
                    ? 'bg-primary text-primary-foreground ml-12'
                    : 'bg-muted/50 backdrop-blur-sm'
                  }
                `}
              >
                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      <form onSubmit={handleSubmit} className="p-4 border-t bg-background/50 backdrop-blur-sm">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about warranty coverage..."
            className="flex-1"
          />
          <Button type="submit" size="sm">Send</Button>
        </div>
      </form>
    </div>
  );
};

export default WarrantyChatBox;