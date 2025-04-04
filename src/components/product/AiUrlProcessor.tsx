import React, { useState } from 'react';
import { Bot, Loader2, AlertCircle } from 'lucide-react';
import { extractWarrantyInfo } from '@/lib/services/warrantyExtractor';

interface AiUrlProcessorProps {
  onUrlProcessed: (data: {
    productName: string;
    warrantyLength: string;
    purchaseDate: string;
    warrantyDetails: string;
    brand?: string;
    model?: string;
  }) => void;
}

const AiUrlProcessor: React.FC<AiUrlProcessorProps> = ({ onUrlProcessed }) => {
  const [url, setUrl] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [error, setError] = useState<string | null>(null);

  const processUrl = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsProcessing(true);
    setFeedback('AI is analyzing the warranty information...');
    setError(null);

    try {
      const extractedData = await extractWarrantyInfo(url);
      setFeedback('Successfully extracted warranty information!');
      onUrlProcessed(extractedData);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to process URL';
      setError(errorMessage);
      setFeedback('');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="w-full">
      <form onSubmit={processUrl} className="space-y-3">
        <div className="relative">
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter product URL"
            className={`w-full px-3 py-2 text-sm border rounded-lg pr-10 focus:outline-none focus:ring-2 ${
              error ? 'border-red-500 focus:ring-red-200' : 'focus:ring-primary/20'
            }`}
            required
            disabled={isProcessing}
          />
          <Bot className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/60" />
        </div>
        
        <button
          type="submit"
          disabled={isProcessing}
          className={`w-full font-medium py-2 rounded-lg transition-all flex items-center justify-center space-x-2 ${
            error
              ? 'bg-red-50 hover:bg-red-100 text-red-600'
              : 'bg-primary/10 hover:bg-primary/20 text-primary'
          }`}
        >
          {isProcessing ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Processing...</span>
            </>
          ) : (
            <>
              <Bot className="w-4 h-4" />
              <span>Extract Warranty Info</span>
            </>
          )}
        </button>
      </form>

      {feedback && !error && (
        <div className="mt-3 text-sm text-center text-green-600 flex items-center justify-center">
          <Bot className="w-4 h-4 mr-1.5" />
          {feedback}
        </div>
      )}

      {error && (
        <div className="mt-3 text-sm text-center text-red-600 flex items-center justify-center">
          <AlertCircle className="w-4 h-4 mr-1.5" />
          {error}
        </div>
      )}
    </div>
  );
};

export default AiUrlProcessor;