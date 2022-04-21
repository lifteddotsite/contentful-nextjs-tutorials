import { FaYoutube, FaTwitter, FaGithub, FaLinkedin } from 'react-icons/fa';
const navigation = {
  social: [
    {
      name: 'Twitter',
      href: 'https://twitter.com/LiftedWp',
      icon: (props) => <FaTwitter />,
    },
    {
      name: 'GitHub',
      href: 'https://github.com/liftedwp/',
      icon: (props) => <FaGithub />,
    },
    {
      name: 'Youtube',
      href: 'https://www.youtube.com/channel/UCZSFuQ0eoDxe8WXbt_th9zA',
      icon: (props) => <FaYoutube />,
    },
    {
      name: 'LinkedIn',
      href: 'https://linkedin.com/company/liftedwp',
      icon: (props) => <FaLinkedin />,
    },
  ],
};

const footerData = {
  message:
    "I hope you find this demo project helpful. If you're working a similar project, I'd love to help.",
  callToActionURL: 'https://liftedwp.com/contact',
  callToActionMessage: 'Click here to book a call with me.',
};

export default function Footer() {
  return (
    <footer className='bg-white'>
      <div className='max-w-7xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8'>
        <div className='mt-8 flex justify-center space-x-6'>
          {navigation.social.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className='text-gray-400 hover:text-gray-500'
            >
              <span className='sr-only'>{item.name}</span>
              <item.icon className='h-6 w-6' aria-hidden='true' />
            </a>
          ))}
        </div>
        <p className='mt-8 text-center text-base text-gray-400'>
          {footerData.message} <br />
          <a
            href={footerData.callToActionURL}
            className='text-indigo-600 hover:text-indigo-800'
          >
            {footerData.callToActionMessage}
          </a>
        </p>
      </div>
    </footer>
  );
}
