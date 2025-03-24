
import React from "react";
import { Link } from "react-router-dom";
import { Package, ArrowLeft } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="glass rounded-xl p-8 md:p-12 text-center max-w-md animate-fade-in">
        <div className="mb-6 flex justify-center">
          <div className="p-4 rounded-full bg-muted">
            <Package className="w-8 h-8 text-muted-foreground" />
          </div>
        </div>
        <h1 className="text-3xl font-bold mb-2">Page Not Found</h1>
        <p className="text-muted-foreground mb-6">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="btn-primary inline-flex items-center justify-center"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Return to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
