import React, { useState, useRef, useCallback } from 'react';
import { UploadCloud, Camera, X } from 'lucide-react';
import { Button } from './ui/button';

interface ImageUploaderProps {
  onImageUpload: (file: File) => void;
  previewUrl?: string;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload, previewUrl }) => {
  const [preview, setPreview] = useState<string | undefined>(previewUrl);
  const [isDragging, setIsDragging] = useState(false);
  const [isCapturing, setIsCapturing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setIsCapturing(false);
  }, []);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        setIsCapturing(true);
      }
    } catch (err) {
      console.error('Error accessing camera:', err);
      alert('Unable to access camera. Please make sure you have granted camera permissions.');
    }
  };

  const capturePhoto = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext('2d');
      
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0);
        canvas.toBlob((blob) => {
          if (blob) {
            const file = new File([blob], 'camera-capture.jpg', { type: 'image/jpeg' });
            setPreview(URL.createObjectURL(blob));
            onImageUpload(file);
            stopCamera();
          }
        }, 'image/jpeg');
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const processFile = (file: File) => {
    if (file.type.match('image.*')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
      onImageUpload(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleClick = () => {
    if (!isCapturing) {
      fileInputRef.current?.click();
    }
  };

  const handleRemoveImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPreview(undefined);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div
      className={`
        relative border-2 border-dashed rounded-lg transition-colors duration-300 ease-in-out
        ${isDragging ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}
        ${preview || isCapturing ? 'p-0 border-0' : 'p-6'}
      `}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={handleClick}
    >
      <input
        type="file"
        className="hidden"
        accept="image/*"
        onChange={handleFileChange}
        ref={fileInputRef}
      />
      
      {!preview && !isCapturing ? (
        <div className="flex flex-col items-center justify-center py-4">
          <div className="flex gap-4 mb-4">
            <div 
              className="p-3 rounded-full bg-primary/10 cursor-pointer hover:bg-primary/20 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                startCamera();
              }}
            >
              <Camera className="h-6 w-6 text-primary" />
            </div>
            <div className="p-3 rounded-full bg-primary/10">
              <UploadCloud className="h-6 w-6 text-primary" />
            </div>
          </div>
          <p className="text-sm font-medium">Take a photo or upload an image</p>
          <p className="text-xs text-muted-foreground mt-1">PNG, JPG or WEBP (max 5MB)</p>
        </div>
      ) : isCapturing ? (
        <div className="relative aspect-video rounded-lg overflow-hidden">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            <Button
              size="sm"
              variant="outline"
              className="bg-background/80 backdrop-blur-sm"
              onClick={(e) => {
                e.stopPropagation();
                stopCamera();
              }}
            >
              Cancel
            </Button>
            <Button
              size="sm"
              className="bg-primary/90 hover:bg-primary"
              onClick={(e) => {
                e.stopPropagation();
                capturePhoto();
              }}
            >
              Capture
            </Button>
          </div>
        </div>
      ) : (
        <div className="relative w-full aspect-video overflow-hidden rounded-lg">
          <img
            src={preview}
            alt="Preview"
            className="object-cover w-full h-full"
          />
          <button
            type="button"
            className="absolute top-2 right-2 p-1 rounded-full bg-white/80 hover:bg-white transition-colors shadow-sm"
            onClick={handleRemoveImage}
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
