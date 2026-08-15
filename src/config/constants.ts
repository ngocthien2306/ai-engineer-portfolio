/**
 * Where the "Download CV" / "Download Resume" buttons point. Single source of truth.
 *
 * Currently the shared 104.com.tw profile (temporary). To go back to serving the
 * PDF from /public, swap in CV_PDF_URL below — the file is still in the repo.
 */
export const CV_URL = 'https://pda.104.com.tw/profile/share/dkZPfzYMBnCG68u2p4iAFW2vQZjoasjr';

/** Self-hosted PDF fallback, kept in /public. */
export const CV_PDF_URL = `${import.meta.env.BASE_URL || './'}${encodeURIComponent(
  'Nguyen Ngoc Thien CV - AI Engineer-2.pdf'
)}`;

export const CONSTANTS = {
  CACHE_TIME: 5 * 60 * 1000, // 5 minutes
  STALE_TIME: 60 * 1000, // 1 minute
  RETRY_COUNT: 3,
  RETRY_DELAY: 1000,
  PAGE_SIZE: 10,
  DEBOUNCE_DELAY: 300,
};

export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
};

/** Real contact details. Used by Hero, Contact and Footer so they can't drift apart. */
export const CONTACT = {
  email: 'ngocthien.dev23@gmail.com',
  phone: '+886 916 399 690',
  phoneHref: 'tel:+886916399690',
  location: 'Taoyuan City, Taiwan',
  github: 'https://github.com/ngocthien2306',
  linkedin: 'https://www.linkedin.com/in/nguyen-ngoc-thien-331ab425b/',
};

/** Shown wherever a recruiter would ask "can I hire him, where, and when". */
export const AVAILABILITY = {
  status: 'Open to AI engineering roles',
  detail:
    'M.S. thesis defended and passed in July 2026, diploma pending. Eligible for a job-seeking ARC in Taiwan with unrestricted work rights, and open to relocation.',
};