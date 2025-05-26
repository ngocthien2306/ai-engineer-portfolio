export const validationRules = {
  email: {
    required: 'Email is required',
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: 'Invalid email address',
    },
  },
  name: {
    required: 'Name is required',
    minLength: {
      value: 2,
      message: 'Name must be at least 2 characters',
    },
    maxLength: {
      value: 50,
      message: 'Name must not exceed 50 characters',
    },
  },
  subject: {
    required: 'Subject is required',
    minLength: {
      value: 5,
      message: 'Subject must be at least 5 characters',
    },
    maxLength: {
      value: 100,
      message: 'Subject must not exceed 100 characters',
    },
  },
  message: {
    required: 'Message is required',
    minLength: {
      value: 10,
      message: 'Message must be at least 10 characters',
    },
    maxLength: {
      value: 1000,
      message: 'Message must not exceed 1000 characters',
    },
  },
};