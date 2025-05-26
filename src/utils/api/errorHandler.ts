import { ApiError } from '@/types';

export class ErrorHandler {
  static handle(error: unknown): string {
    if (error instanceof Error) {
      return error.message;
    }
    
    if (typeof error === 'object' && error !== null) {
      const apiError = error as ApiError;
      return apiError.message || 'An unexpected error occurred';
    }
    
    return 'An unexpected error occurred';
  }
  
  static getStatusCode(error: unknown): number {
    if (typeof error === 'object' && error !== null) {
      const apiError = error as ApiError;
      return apiError.status || 500;
    }
    return 500;
  }
}