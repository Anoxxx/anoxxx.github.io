import { faGithub } from '@fortawesome/free-brands-svg-icons/faGithub';
import { faGoogleScholar } from '@fortawesome/free-brands-svg-icons/faGoogleScholar';
// import { faFacebookF } from '@fortawesome/free-brands-svg-icons/faFacebookF';
// import { faInstagram } from '@fortawesome/free-brands-svg-icons/faInstagram';
import { faLinkedinIn } from '@fortawesome/free-brands-svg-icons/faLinkedinIn';
// import { faAngellist } from '@fortawesome/free-brands-svg-icons/faAngellist';
import { faTwitter } from '@fortawesome/free-brands-svg-icons/faTwitter';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons/faEnvelope';

// See https://fontawesome.com/icons?d=gallery&s=brands,regular&m=free
// to add other icons.

const data = [
  {
    link: 'https://scholar.google.com/citations?user=XibJqasAAAAJ&hl=en&authuser=1',
    label: 'Google Scholar',
    icon: faGoogleScholar,
  },
  {
    link: 'https://www.linkedin.com/in/zhengfei111/',
    label: 'LinkedIn',
    icon: faLinkedinIn,
  },
  {
    link: 'mailto:trorooro@gmail.com',
    label: 'Email',
    icon: faEnvelope,
  },
  {
    link: 'https://x.com/trorooro',
    label: 'Twitter',
    icon: faTwitter,
  },
  {
    link: 'https://github.com/Anoxxx',
    label: 'Github',
    icon: faGithub,
  },
  /*
  {
    link: 'https://www.instagram.com/dangelosaurus/',
    label: 'Instagram',
    icon: faInstagram,
  },
  {
    link: 'https://facebook.com/d',
    label: 'Facebook',
    icon: faFacebookF,
  },
  {
    link: 'https://angel.co/michael-d-angelo',
    label: 'Angel List',
    icon: faAngellist,
  },
  */
];

export default data;
