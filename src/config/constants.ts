/**
 * Where the "Download CV" / "Download Resume" buttons point. Single source of truth.
 *
 * Currently the shared 104.com.tw profile. The PDF is deliberately not published
 * from /public, so this is the only public route to the CV.
 */
export const CV_URL = 'https://pda.104.com.tw/profile/share/dkZPfzYMBnCG68u2p4iAFW2vQZjoasjr';


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
  phone: '+886 917 806 205',
  phoneHref: 'tel:+886917806205',
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