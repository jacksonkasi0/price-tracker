import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="mt-6 border-t border-surface pt-4 text-center text-sm text-secondary">
      <p>
        Built with ❤️ by{' '}
        <a
          href="https://github.com/jacksonkasi0"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:underline"
        >
          Jackson Kasi
        </a>
      </p>
    </footer>
  );
};

export default Footer;
