import React, { useState } from 'react';
import { Bot, Upload } from 'lucide-react';
import { Button } from '../ui/button';
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
    <div className="overflow-hidden">
      <div className="flex items-center gap-3 p-4 border-b">
        <div className="bg-primary/10 p-2 rounded-lg">
          <Bot className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h2 className="text-lg font-semibold">Warranty AI Assistant</h2>
          <p className="text-sm text-muted-foreground">Let me help you discover and manage your warranties</p>
        </div>
      </div>

      <ScrollArea className="h-[400px] px-4">
        <div className="space-y-6 py-6">
          {messages.length === 0 ? (
            <div className="text-center space-y-4 py-12">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                <Bot className="w-8 h-8 text-primary" />
              </div>
              <div>
                <p className="text-lg font-medium mb-1">Welcome to Warranty Assistant</p>
                <p className="text-muted-foreground">
                  Describe your warranty needs or upload a document for analysis. I'll help you:
                </p>
                <ul className="text-sm text-muted-foreground mt-2 space-y-1">
                  <li>• Find hidden warranties in your documents</li>
                  <li>• Extract key warranty information</li>
                  <li>• Get reminders before warranties expire</li>
                </ul>
              </div>
            </div>
          ) : (
            messages.map((message, index) => (
              <div
                key={index}
                className={`flex items-end gap-3 ${
                  message.type === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {message.type === 'bot' && (
                  <div className="bg-primary/10 p-1.5 rounded-lg h-fit">
                    <Bot className="w-4 h-4 text-primary" />
                  </div>
                )}
                <div
                  className={`max-w-[80%] rounded-2xl p-4 ${
                    message.type === 'user'
                      ? 'bg-primary text-primary-foreground rounded-br-none'
                      : 'bg-muted rounded-bl-none'
                  }`}
                >
                  <pre className="whitespace-pre-wrap font-sans text-sm">
                    {message.content}
                  </pre>
                </div>
              </div>
            ))
          )}
        </div>
      </ScrollArea>

      <div className="border-t bg-card/50 backdrop-blur-sm">
        <form onSubmit={handleSubmit} className="p-4">
          <div className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Describe your warranty needs or ask a question..."
              className="flex-1"
            />
            <Button type="button" variant="outline" size="icon">
              <Upload className="w-4 h-4" />
            </Button>
            <Button type="submit">Send</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WarrantyChatBox;