import { Github, Mail, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
   <footer className="relative mt-32 text-sm text-gray-400 bg-[#1e1c2b]">

    <div className="w-full border-t border-white/10 mb-12" />

      <div className="max-w-screen-xl mx-auto px-6 py-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 relative z-10">
        
        <div>
          <h2 className="text-2xl font-extrabold bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text">
  InsightHub
</h2>


          <p className="text-gray-400 text-sm leading-relaxed">
            AI-powered insights from your spreadsheet.
          </p>
        </div>

        
        <div>
          <h3 className="text-white font-semibold text-lg mb-3">Navigation</h3>
          <ul className="space-y-2 text-base">
            <li><Link to="/" className="hover:text-white transition">Home</Link></li>
            <li><Link to="/upload" className="hover:text-white transition">Upload</Link></li>
            <li><Link to="/dashboard" className="hover:text-white transition">Dashboard</Link></li>
            <li><Link to="/docs" className="hover:text-white transition">Docs</Link></li>
          </ul>
        </div>

        
        <div>
          <h3 className="text-white font-semibold text-lg mb-3">Contact</h3>
          <ul className="space-y-2 text-base">
            <li>
              <a href="mailto:itszaidkhan01@gmail.com" className="hover:text-white transition">
                Email Us
              </a>
            </li>
            <li>
              <a href="https://github.com/Ahmadrazakhan-786" target="_blank" rel="noreferrer" className="hover:text-white transition">
                GitHub
              </a>
            </li>
          </ul>
        </div>

        
        <div>
          <h3 className="text-white font-semibold text-lg mb-3">Connect</h3>
          <div className="flex gap-5 mt-2">
            <a
              href="mailto:itszaidkhan01@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition transform hover:scale-110"
            >
              <Mail size={22} />
            </a>
            <a
              href="https://github.com/Ahmadrazakhan-786"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition transform hover:scale-110"
            >
              <Github size={22} />
            </a>
            <a
              href="https://www.linkedin.com/in/zaid-khan-1123abc/" 
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition transform hover:scale-110"
            >
              <Linkedin size={22} />
            </a>
          </div>
        </div>
      </div>

      
      <div className="text-center text-gray-500 text-sm pb-8 mt-4">
        &copy; {new Date().getFullYear()} InsightHub. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
