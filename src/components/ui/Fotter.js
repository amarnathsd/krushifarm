const Footer = () => {
  return (
    <footer className="bg-primary text-white py-16">
      <div className="w-10/12 mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold text-secondary mb-2">Farm-to-Market</h3>
            <div className="w-12 h-1 bg-secondary mb-4" aria-hidden="true"></div>
            <p className="mt-3 text-gray-200">
              Connecting farmers directly with businesses for a fair and efficient supply chain.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-secondary mb-4">Quick Links</h3>
            <ul className="mt-3 space-y-3">
              <li>
                <a href="#" className="text-gray-200 hover:text-secondary transition flex items-center">
                  <svg className="w-3 h-3 mr-2 text-secondary" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-200 hover:text-secondary transition flex items-center">
                  <svg className="w-3 h-3 mr-2 text-secondary" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                  About
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-200 hover:text-secondary transition flex items-center">
                  <svg className="w-3 h-3 mr-2 text-secondary" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                  Features
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-200 hover:text-secondary transition flex items-center">
                  <svg className="w-3 h-3 mr-2 text-secondary" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold text-secondary mb-4">Contact</h3>
            <ul className="mt-3 space-y-3">
              <li className="text-gray-200 flex items-start">
                <svg className="w-5 h-5 mr-3 text-secondary mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>support@farmtomarket.com</span>
              </li>
              <li className="text-gray-200 flex items-start">
                <svg className="w-5 h-5 mr-3 text-secondary mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>+1 234 567 890</span>
              </li>
              <li className="text-gray-200 flex items-start">
                <svg className="w-5 h-5 mr-3 text-secondary mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Rural Innovation Hub</span>
              </li>
            </ul>
          </div>

          {/* Social Media & Newsletter */}
          <div>
            <h3 className="text-lg font-semibold text-secondary mb-4">Stay Connected</h3>
            <p className="text-gray-200 mb-4">Join our newsletter for updates</p>
            
            <div className="flex mt-2 mb-4">
              <input 
                type="email" 
                placeholder="Your email" 
                className="bg-primary/50 border border-gray-600 rounded-l-md py-2 px-3 text-sm focus:outline-none focus:border-secondary"
              />
              <button className="bg-secondary hover:bg-secondary/90 text-white px-3 rounded-r-md transition">
                Subscribe
              </button>
            </div>
            
            <h4 className="text-md font-semibold text-gray-200 mt-4 mb-2">Follow Us</h4>
            <div className="flex space-x-4 mt-2">
              <a href="#" className="text-gray-300 hover:text-secondary transition bg-primary/50 p-2 rounded-full">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.5-4.5-10-10-10S2 6.5 2 12c0 5 3.6 9.1 8.3 9.9v-7H7.4v-2.9h2.9v-2.2c0-2.9 1.7-4.5 4.3-4.5 1.2 0 2.5.2 2.5.2v2.7h-1.4c-1.4 0-1.8.9-1.8 1.8v2h3l-.5 2.9h-2.5v7c4.7-.8 8.3-4.9 8.3-9.9z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-300 hover:text-secondary transition bg-primary/50 p-2 rounded-full">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 5.6c-.8.4-1.6.6-2.5.8 1-.6 1.7-1.5 2-2.7-.9.5-1.9.9-3 .9a4.6 4.6 0 0 0-7.8 4.2c-3.8-.2-7.2-2-9.5-4.7a4.6 4.6 0 0 0 1.4 6.1c-.7 0-1.3-.2-1.8-.5v.1a4.6 4.6 0 0 0 3.7 4.5c-.5.1-1 .2-1.5.2-.4 0-.7 0-1-.1a4.6 4.6 0 0 0 4.3 3.2 9.2 9.2 0 0 1-6.8 1.9c2.1 1.3 4.6 2 7.3 2 8.7 0 13.6-7.2 13.6-13.6v-.6c1-.7 1.7-1.5 2.3-2.5z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-300 hover:text-secondary transition bg-primary/50 p-2 rounded-full">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2c5.5 0 10 4.5 10 10s-4.5 10-10 10S2 17.5 2 12 6.5 2 12 2zm0 3.5c-1.8 0-2 0-2.7.1-.7 0-1.2.1-1.6.3-.4.2-.8.4-1.1.7-.3.3-.5.7-.7 1.1-.2.4-.3.9-.3 1.6 0 .7-.1.9-.1 2.7s0 2 .1 2.7c0 .7.1 1.2.3 1.6.2.4.4.8.7 1.1.3.3.7.5 1.1.7.4.2.9.3 1.6.3.7 0 .9.1 2.7.1s2 0 2.7-.1c.7 0 1.2-.1 1.6-.3.4-.2.8-.4 1.1-.7.3-.3.5-.7.7-1.1.2-.4.3-.9.3-1.6 0-.7.1-.9.1-2.7s0-2-.1-2.7c0-.7-.1-1.2-.3-1.6-.2-.4-.4-.8-.7-1.1-.3-.3-.7-.5-1.1-.7-.4-.2-.9-.3-1.6-.3-.7 0-.9-.1-2.7-.1zm0 1.8c1.7 0 1.9 0 2.6.1.6 0 1 .1 1.2.2.3.1.5.3.7.5.2.2.4.4.5.7.1.2.2.6.2 1.2.1.7.1.9.1 2.6s0 1.9-.1 2.6c0 .6-.1 1-.2 1.2-.1.3-.3.5-.5.7-.2.2-.4.4-.7.5-.2.1-.6.2-1.2.2-.7.1-.9.1-2.6.1s-1.9 0-2.6-.1c-.6 0-1-.1-1.2-.2-.3-.1-.5-.3-.7-.5-.2-.2-.4-.4-.5-.7-.1-.2-.2-.6-.2-1.2-.1-.7-.1-.9-.1-2.6s0-1.9.1-2.6c0-.6.1-1 .2-1.2.1-.3.3-.5.5-.7.2-.2.4-.4.7-.5.2-.1.6-.2 1.2-.2.7-.1.9-.1 2.6-.1zm0 3c-1.8 0-3.3 1.5-3.3 3.3s1.5 3.3 3.3 3.3 3.3-1.5 3.3-3.3-1.5-3.3-3.3-3.3zm0 5.4c-1.2 0-2.1-1-2.1-2.1 0-1.2 1-2.1 2.1-2.1 1.2 0 2.1 1 2.1 2.1 0 1.2-.9 2.1-2.1 2.1zm4.1-5.5c0 .4-.4.8-.8.8s-.8-.4-.8-.8.4-.8.8-.8.8.3.8.8z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-300 hover:text-secondary transition bg-primary/50 p-2 rounded-full">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2zm-4.3 14.7h-3V13h-1.5v-2.5h1.5V9c0-2.1 1.2-3 3-3h2.5v2.5h-1.3c-.9 0-1.2.6-1.2 1.2v.8h2.5l-.5 2.5h-2v5.4z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-primary/40 mt-12 pt-8 text-center">
          <p className="text-gray-300 text-sm">
            © {new Date().getFullYear()} Farm-to-Market. All rights reserved.
          </p>
          <div className="mt-4 flex justify-center space-x-6 text-xs text-gray-400">
            <a href="#" className="hover:text-secondary transition">Privacy Policy</a>
            <a href="#" className="hover:text-secondary transition">Terms of Service</a>
            <a href="#" className="hover:text-secondary transition">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;