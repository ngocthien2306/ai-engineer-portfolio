export const env = {
  github: {
    token: import.meta.env.VITE_GITHUB_TOKEN || '',
    username: import.meta.env.VITE_GITHUB_USERNAME || '',
    apiUrl: import.meta.env.VITE_GITHUB_API_URL || 'https://api.github.com',
  },
  blog: {
    apiKey: import.meta.env.VITE_DEVTO_API_KEY || '',
    username: import.meta.env.VITE_DEVTO_USERNAME || '',
    apiUrl: import.meta.env.VITE_DEVTO_API_URL || 'https://dev.to/api',
  },
  email: {
    serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID || '',
    templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '',
    publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '',
  },
  external: {
    weatherApiKey: import.meta.env.VITE_WEATHER_API_KEY || '',
    newsApiKey: import.meta.env.VITE_NEWS_API_KEY || '',
  },
  analytics: {
    gaId: import.meta.env.VITE_GA_MEASUREMENT_ID || '',
  },
  api: {
    baseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
  },
  isDev: import.meta.env.DEV,
  isProd: import.meta.env.PROD,
};