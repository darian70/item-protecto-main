
import React from 'react';
import { Plus, Upload, Link2 } from 'lucide-react';
import AiProductDetection from '../AiProductDetection';

interface AddMethodSelectorProps {
  onManualAdd: () => void;
  onUrlUpload: (url: string) => void;
  onProductDetected: (productData: any) => void;
}

const AddMethodSelector: React.FC<AddMethodSelectorProps> = ({
  onManualAdd,
  onUrlUpload,
  onProductDetected
}) => {
  const handleUrlSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const url = formData.get('url') as string;
    if (url) {
      onUrlUpload(url);
    }
  };

  return (
    <div className="p-6">
      <div className="text-center mb-6">
        <p className="text-muted-foreground">Choose how you want to add your product</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <button
          className="flex flex-col items-center p-6 border rounded-lg hover:border-primary/50 hover:bg-primary/5 transition-all"
          onClick={onManualAdd}
        >
          <div className="p-3 rounded-full bg-primary/10 mb-3">
            <Plus className="w-5 h-5 text-primary" />
          </div>
          <span className="font-medium">Manual Entry</span>
          <span className="text-xs text-muted-foreground mt-1">Add details yourself</span>
        </button>
        
        <div className="flex flex-col items-center p-6 border rounded-lg hover:border-primary/50 hover:bg-primary/5 transition-all">
          <div className="p-3 rounded-full bg-primary/10 mb-3">
            <Link2 className="w-5 h-5 text-primary" />
          </div>
          <span className="font-medium">URL Upload</span>
          <form onSubmit={handleUrlSubmit} className="mt-2 w-full">
            <input
              type="url"
              name="url"
              placeholder="Enter product URL"
              className="w-full px-3 py-1 text-sm border rounded"
              required
            />
          </form>
        </div>

        <div className="flex flex-col items-center p-6 border rounded-lg hover:border-primary/50 hover:bg-primary/5 transition-all">
          <div className="p-3 rounded-full bg-primary/10 mb-3">
            <Upload className="w-5 h-5 text-primary" />
          </div>
          <span className="font-medium">AI Chat</span>
          <span className="text-xs text-muted-foreground mt-1">Get warranty info via AI</span>
        </div>
      </div>
    </div>
  );
};

export default AddMethodSelector;
