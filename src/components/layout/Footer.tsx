import React from 'react';
import { Github, Linkedin, Mail, Heart } from 'lucide-react';

import { Button } from '../ui/Button';
import { CONTACT } from '@/config/constants';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 py-12">
      <div className="container-max section-padding">
        <div className="flex flex-col items-center space-y-6">
          <div className="flex space-x-4">
            <Button
              onClick={() => window.open(CONTACT.github, '_blank', 'noopener,noreferrer')}
              aria-label="GitHub"
              variant="ghost"
              size="sm"
              className="!p-2"
            >
              <Github className="w-5 h-5" />
            </Button>
            <Button
              onClick={() => window.open(CONTACT.linkedin, '_blank', 'noopener,noreferrer')}
              aria-label="LinkedIn"
              variant="ghost"
              size="sm"
              className="!p-2"
            >
              <Linkedin className="w-5 h-5" />
            </Button>
            <Button
              onClick={() => { window.location.href = `mailto:${CONTACT.email}`; }}
              aria-label="Email"
              variant="ghost"
              size="sm"
              className="!p-2"
            >
              <Mail className="w-5 h-5" />
            </Button>
          </div>
          
          <div className="text-center text-sm text-gray-600 dark:text-gray-400">
            <p>
              Made with <Heart className="inline-block w-4 h-4 text-red-500" /> by Nguyen Ngoc Thien
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