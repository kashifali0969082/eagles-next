import { Github,Twitter ,Facebook,Youtube} from "lucide-react";
export const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-r from-black to-gray-900 border-t border-yellow-500/20 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h4 className="text-transparent bg-gradient-to-r from-yellow-400 to-amber-400 bg-clip-text font-bold mb-4">
              The Eagles.io
            </h4>
            <p className="text-gray-400">
              Decentralized networking platform for the future of finance
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">Official Channels</h4>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-400 hover:text-yellow-400 transition-colors"
              >
                <Github className="w-6 h-6 hover:animate-bounce" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-yellow-400 transition-colors"
              >
                <Twitter className="w-6 h-6 hover:animate-bounce" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-yellow-400 transition-colors"
              >
                <Facebook className="w-6 h-6 hover:animate-bounce" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-yellow-400 transition-colors"
              >
                <Youtube className="w-6 h-6 hover:animate-bounce" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">Support</h4>
            <p className="text-gray-400">The Eagles.io Support</p>
          </div>
        </div>

        <div className="border-t border-yellow-500/20 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            &copy; 2025 All Rights Reserved - The Eagles.io
          </p>
        </div>
      </div>
    </footer>
  );
};