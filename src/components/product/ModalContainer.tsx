
import React from 'react';
import { X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ModalContainerProps {
  title: string;
  children: React.ReactNode;
  onClose?: () => void;
}

const ModalContainer: React.FC<ModalContainerProps> = ({ 
  title, 
  children, 
  onClose 
}) => {
  const navigate = useNavigate();
  
  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      navigate('/app/products');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="w-full max-w-xl bg-background rounded-xl shadow-lg overflow-hidden animate-scale-in">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button 
            className="p-2 rounded-full hover:bg-muted transition-colors"
            onClick={handleClose}
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default ModalContainer;
