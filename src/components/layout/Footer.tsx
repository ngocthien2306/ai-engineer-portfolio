import React from 'react';
import { Github, Linkedin, Twitter, Mail, Heart } from 'lucide-react';

import { Button } from '../ui/Button';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 py-12">
      <div className="container-max section-padding">
        <div className="flex flex-col items-center space-y-6">
          <div className="flex space-x-4">
            <Button
              rel="noopener noreferrer"
              variant="ghost"
              size="sm"
              className="!p-2"
            >
              <Github className="w-5 h-5" />
            </Button>
            <Button
              rel="noopener noreferrer"
              variant="ghost"
              size="sm"
              className="!p-2"
            >
              <Linkedin className="w-5 h-5" />
            </Button>
            <Button
              rel="noopener noreferrer"
              variant="ghost"
              size="sm"
              className="!p-2"
            >
              <Twitter className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="!p-2"
            >
              <Mail className="w-5 h-5" />
            </Button>
          </div>
          
          <div className="text-center text-sm text-gray-600 dark:text-gray-400">
            <p>
              Made with <Heart className="inline-block w-4 h-4 text-red-500" /> by Your Name
            </p>
            <p className="mt-2">
              © {currentYear} All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};