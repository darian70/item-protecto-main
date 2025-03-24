import React, { useState } from 'react';
import { Bot } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { ScrollArea } from './ui/scroll-area';

interface Message {
  type: 'user' | 'bot';
  content: string;
}

export const AiChatBot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');

  const analyzeProduct = async (productDescription: string) => {
    // Simulate AI response - In a real app, this would call an AI service
    const mockAnalysis = `Based on the product description "${productDescription}", here's what I found:

1. Standard Warranty: Typically comes with a 1-year limited manufacturer warranty
2. Extended Warranty Options: Available for up to 3 years
3. Key Coverage Points:
   - Manufacturing defects
   - Hardware malfunctions
   - Parts and labor
4. Warranty Exclusions:
   - Accidental damage
   - Water damage
   - Unauthorized modifications

Recommendation: Consider getting an extended warranty if this is a high-value item you plan to use frequently.`;

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
    const analysis = await analyzeProduct(input);
    const botMessage: Message = {
      type: 'bot',
      content: analysis,
    };
    setMessages(prev => [...prev, botMessage]);

    // Clear input
    setInput('');
  };

  return (
    <Card className="flex flex-col h-[calc(100vh-2rem)] m-4">
      <div className="flex items-center gap-2 p-4 border-b">
        <Bot className="w-5 h-5" />
        <h2 className="text-lg font-semibold">Warranty AI Assistant</h2>
      </div>

      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.length === 0 ? (
            <div className="text-center text-muted-foreground py-8">
              Enter a product description to get warranty information and recommendations
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
            placeholder="Describe the product you're interested in..."
            className="flex-1"
          />
          <Button type="submit">Analyze</Button>
        </div>
      </form>
    </Card>
  );
};