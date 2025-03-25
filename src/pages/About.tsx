import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Heart, MessageSquare, Github, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b">
        <div className="container mx-auto px-4 h-16 flex items-center">
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-primary text-primary-foreground rounded-md p-1.5">
              <Shield className="w-5 h-5" />
            </div>
            <span className="font-semibold text-lg">WarrantyKeeper</span>
          </Link>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">About WarrantyKeeper</h1>
            <p className="text-xl text-muted-foreground">
              A passion project to help people manage their warranties more effectively
            </p>
          </div>

          {/* Story Section */}
          <div className="glass rounded-xl p-8 mb-8">
            <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
            <p className="text-muted-foreground mb-6">
              Hello! I'm the creator of WarrantyKeeper, and I'm excited to share this project with you. 
              This application was born from a personal frustration with managing warranties for various products 
              and a desire to create something that could help others facing the same challenge.
            </p>
            <p className="text-muted-foreground mb-6">
              As someone who loves technology and organization, I found myself constantly struggling to keep track 
              of warranty information for my devices and home appliances. That's when the idea for WarrantyKeeper 
              was born - a simple yet powerful tool to help people protect their investments.
            </p>
            <p className="text-muted-foreground">
              Currently, WarrantyKeeper is a work in progress, being developed by a single person with a vision 
              to make warranty management accessible and effortless for everyone. While the journey is ongoing, 
              I'm committed to continuously improving and expanding the platform based on user feedback and needs.
            </p>
          </div>

          {/* Current Status */}
          <div className="glass rounded-xl p-8 mb-8">
            <h2 className="text-2xl font-semibold mb-4">Current Status</h2>
            <p className="text-muted-foreground mb-6">
              WarrantyKeeper is actively being developed with new features and improvements being added regularly. 
              As a solo developer, I'm focused on creating a robust and user-friendly experience while maintaining 
              high standards of quality and security.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <div className="flex items-start space-x-3">
                <div className="p-2 bg-primary/10 rounded-full">
                  <Heart className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium mb-1">Built with Care</h3>
                  <p className="text-sm text-muted-foreground">
                    Every feature is thoughtfully designed and implemented with attention to detail
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="p-2 bg-primary/10 rounded-full">
                  <MessageSquare className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium mb-1">Open to Feedback</h3>
                  <p className="text-sm text-muted-foreground">
                    Your suggestions and feedback are valuable in shaping the future of WarrantyKeeper
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Get Involved */}
          <div className="glass rounded-xl p-8 mb-8">
            <h2 className="text-2xl font-semibold mb-4">Get Involved</h2>
            <p className="text-muted-foreground mb-6">
              Your feedback and suggestions are incredibly valuable in making WarrantyKeeper better. 
              Whether you've found a bug, have a feature request, or just want to share your thoughts, 
              I'd love to hear from you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="mailto:feedback@warrantykeeper.com" className="flex-1">
                <Button variant="outline" className="w-full">
                  <Mail className="w-4 h-4 mr-2" />
                  Send Feedback
                </Button>
              </a>
              <a href="https://github.com/warrantykeeper" target="_blank" rel="noopener noreferrer" className="flex-1">
                <Button variant="outline" className="w-full">
                  <Github className="w-4 h-4 mr-2" />
                  View on GitHub
                </Button>
              </a>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-12">
            <h2 className="text-2xl font-semibold mb-4">Join the Journey</h2>
            <p className="text-muted-foreground mb-6">
              Be part of the WarrantyKeeper story and help shape its future.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/signup">
                <Button size="lg">
                  Create Free Account
                </Button>
              </Link>
              <Link to="/signin">
                <Button size="lg" variant="outline">
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t mt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-center">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} WarrantyKeeper. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default About;