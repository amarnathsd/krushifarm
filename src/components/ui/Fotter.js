const Footer = () => {
  return (
    <footer className="bg-primary/30 text-white py-10">
      <div className="w-10/12 mx-auto px-6 text-black">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold">Farm-to-Market</h3>
            <p className="mt-3  ">
              Connecting farmers directly with businesses for a fair and efficient supply chain.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold ">Quick Links</h3>
            <ul className="mt-3 space-y-2">
              <li><a href="#" className="  hover:text-white transition">Home</a></li>
              <li><a href="#" className="  hover:text-white transition">About</a></li>
              <li><a href="#" className="  hover:text-white transition">Features</a></li>
              <li><a href="#" className="  hover:text-white transition">Contact</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold">Contact</h3>
            <ul className="mt-3 space-y-2">
              <li className=" ">Email: support@farmtomarket.com</li>
              <li className=" ">Phone: +1 234 567 890</li>
              <li className=" ">Location: Rural Innovation Hub</li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-semibold">Follow Us</h3>
            <div className="flex space-x-4 mt-3">
              <a href="#" className="  hover:text-white transition">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.5-4.5-10-10-10S2 6.5 2 12c0 5 3.6 9.1 8.3 9.9v-7H7.4v-2.9h2.9v-2.2c0-2.9 1.7-4.5 4.3-4.5 1.2 0 2.5.2 2.5.2v2.7h-1.4c-1.4 0-1.8.9-1.8 1.8v2h3l-.5 2.9h-2.5v7c4.7-.8 8.3-4.9 8.3-9.9z"/>
                </svg>
              </a>
              <a href="#" className="  hover:text-white transition">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 5.6c-.8.4-1.6.6-2.5.8 1-.6 1.7-1.5 2-2.7-.9.5-1.9.9-3 .9a4.6 4.6 0 0 0-7.8 4.2c-3.8-.2-7.2-2-9.5-4.7a4.6 4.6 0 0 0 1.4 6.1c-.7 0-1.3-.2-1.8-.5v.1a4.6 4.6 0 0 0 3.7 4.5c-.5.1-1 .2-1.5.2-.4 0-.7 0-1-.1a4.6 4.6 0 0 0 4.3 3.2 9.2 9.2 0 0 1-6.8 1.9c2.1 1.3 4.6 2 7.3 2 8.7 0 13.6-7.2 13.6-13.6v-.6c1-.7 1.7-1.5 2.3-2.5z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-black text-sm">
          © {new Date().getFullYear()} Farm-to-Market. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
