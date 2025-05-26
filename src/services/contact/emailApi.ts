import { ContactFormData, ContactFormResponse } from '@/types/api/contact';
import { env } from '@/config/environment';

// Using EmailJS for client-side email sending
export const contactService = {
  async sendEmail(data: ContactFormData): Promise<ContactFormResponse> {
    try {
      // Dynamic import to avoid loading EmailJS until needed
      const emailjs = await import('@emailjs/browser');
      
      await emailjs.init(env.email.publicKey);
      
      const result = await emailjs.send(
        env.email.serviceId,
        env.email.templateId,
        {
          from_name: data.name,
          from_email: data.email,
          subject: data.subject,
          message: data.message,
        }
      );

      if (result.status === 200) {
        return {
          success: true,
          message: 'Email sent successfully!',
        };
      } else {
        throw new Error('Failed to send email');
      }
    } catch (error) {
      console.error('Email error:', error);
      return {
        success: false,
        message: 'Failed to send email. Please try again later.',
      };
    }
  },
};
