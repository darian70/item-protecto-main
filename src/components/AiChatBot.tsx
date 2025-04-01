import React, { useState } from 'react';
import { Bot, Search, Shield, Calculator, FileText, Scale, Book } from 'lucide-react';
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
      <div className="flex flex-col border-b">
        <div className="flex items-center gap-2 p-4">
          <Bot className="w-5 h-5" />
          <h2 className="text-lg font-semibold">Warranty AI Assistant</h2>
        </div>
        <div className="px-6 py-6 bg-muted/30">
          <h3 className="font-semibold mb-6 text-center text-lg">What can I help you with?</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-start gap-3 p-4 bg-background hover:bg-muted/30 rounded-lg shadow-sm transition-all duration-200 hover:shadow-md cursor-pointer group">
              <Search className="w-5 h-5 text-primary mt-0.5 group-hover:scale-110 transition-transform duration-200" />
              <div>
                <p className="font-medium text-sm">Find Hidden Warranties</p>
                <p className="text-xs text-muted-foreground/80">Discover coverage details for your products</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 bg-background hover:bg-muted/30 rounded-lg shadow-sm transition-all duration-200 hover:shadow-md cursor-pointer group">
              <Shield className="w-5 h-5 text-primary mt-0.5 group-hover:scale-110 transition-transform duration-200" />
              <div>
                <p className="font-medium text-sm">Extended Coverage</p>
                <p className="text-xs text-muted-foreground/80">Check qualification for warranty programs</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 bg-background hover:bg-muted/30 rounded-lg shadow-sm transition-all duration-200 hover:shadow-md cursor-pointer group">
              <Calculator className="w-5 h-5 text-primary mt-0.5 group-hover:scale-110 transition-transform duration-200" />
              <div>
                <p className="font-medium text-sm">Smart Recommendations</p>
                <p className="text-xs text-muted-foreground/80">Get advice based on product value and usage</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 bg-background hover:bg-muted/30 rounded-lg shadow-sm transition-all duration-200 hover:shadow-md cursor-pointer group">
              <FileText className="w-5 h-5 text-primary mt-0.5 group-hover:scale-110 transition-transform duration-200" />
              <div>
                <p className="font-medium text-sm">Terms & Conditions</p>
                <p className="text-xs text-muted-foreground/80">Understand warranty details and exclusions</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 bg-background hover:bg-muted/30 rounded-lg shadow-sm transition-all duration-200 hover:shadow-md cursor-pointer group">
              <Scale className="w-5 h-5 text-primary mt-0.5 group-hover:scale-110 transition-transform duration-200" />
              <div>
                <p className="font-medium text-sm">Compare Options</p>
                <p className="text-xs text-muted-foreground/80">Evaluate different warranty benefits</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 bg-background hover:bg-muted/30 rounded-lg shadow-sm transition-all duration-200 hover:shadow-md cursor-pointer group">
              <Book className="w-5 h-5 text-primary mt-0.5 group-hover:scale-110 transition-transform duration-200" />
              <div>
                <p className="font-medium text-sm">Coverage Types</p>
                <p className="text-xs text-muted-foreground/80">Learn about manufacturer vs extended warranties</p>
              </div>
            </div>
          </div>
        </div>
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