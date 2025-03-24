import React, { useState } from 'react';
import { Bot, Upload } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Input } from '../ui/input';
import { ScrollArea } from '../ui/scroll-area';
import { Warranty } from '@/lib/types';

interface Message {
  type: 'user' | 'bot';
  content: string;
}

interface WarrantyChatBoxProps {
  onWarrantyDataDetected: (warrantyData: Partial<Warranty>) => void;
}

export const WarrantyChatBox: React.FC<WarrantyChatBoxProps> = ({ onWarrantyDataDetected }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');

  const analyzeWarranty = async (description: string) => {
    // Simulate AI response - In a real app, this would call an AI service
    const mockAnalysis = `Based on your description, I've analyzed the warranty information:

1. Type: Manufacturer warranty
2. Coverage Period: 1 year from purchase date
3. Key Coverage:
   - Manufacturing defects
   - Hardware malfunctions
   - Parts and labor included
4. Contact Information:
   - Support: 1-800-123-4567
   - Email: support@company.com
   - Website: https://support.company.com

Would you like me to fill out the warranty form with this information?`;

    // Simulate extracting structured warranty data
    const warrantyData: Partial<Warranty> = {
      type: 'manufacturer',
      provider: 'Company Name',
      startDate: new Date(),
      endDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year from now
      coverageDetails: 'Manufacturing defects, hardware malfunctions, parts and labor included',
      contactInfo: {
        phone: '1-800-123-4567',
        email: 'support@company.com',
        website: 'https://support.company.com'
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
    <Card className="mt-4">
      <div className="flex items-center gap-2 p-4 border-b">
        <Bot className="w-5 h-5" />
        <h2 className="text-lg font-semibold">Warranty AI Assistant</h2>
      </div>

      <ScrollArea className="h-[300px] p-4">
        <div className="space-y-4">
          {messages.length === 0 ? (
            <div className="text-center text-muted-foreground py-8">
              Describe your warranty needs or upload a warranty document for analysis
            </div>
          ) : (
            messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.type === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.type === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted'
                  }`}
                >
                  <pre className="whitespace-pre-wrap font-sans">
                    {message.content}
                  </pre>
                </div>
              </div>
            ))
          )}
        </div>
      </ScrollArea>

      <form onSubmit={handleSubmit} className="p-4 border-t">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Describe your warranty needs or ask a question..."
            className="flex-1"
          />
          <Button type="button" variant="outline" className="gap-2">
            <Upload className="w-4 h-4" />
            Upload
          </Button>
          <Button type="submit">Send</Button>
        </div>
      </form>
    </Card>
  );
};

export default WarrantyChatBox;