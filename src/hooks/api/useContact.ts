import { useMutation } from '@tanstack/react-query';
import { contactService } from '@/services/contact/emailApi';
import { ContactFormData } from '@/types/api/contact';

export const useContactForm = () => {
  return useMutation({
    mutationFn: (data: ContactFormData) => contactService.sendEmail(data),
  });
};