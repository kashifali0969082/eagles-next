import { Users,Zap,Star,BookOpen } from "lucide-react";
export const Activity: React.FC = () => {
  return (
    <section className="pb-20 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h3 className="text-3xl font-bold text-transparent bg-gradient-to-r from-yellow-400 to-amber-400 bg-clip-text mb-8 text-center">
          Platform Recent Activity
        </h3>
        <p className="text-gray-300 text-center mb-12">
          Real-time global event of the The Eagles.io Platform
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-gradient-to-r from-gray-900/80 to-black/80 backdrop-blur-lg border border-yellow-500/20 rounded-xl p-6 hover:shadow-2xl hover:shadow-yellow-500/10 transition-all duration-300 animate-slide-in-up animation-delay-100">
            <div className="flex items-center justify-between mb-4">
              <Users className="w-8 h-8 text-yellow-400 animate-bounce-gentle" />
              <span className="text-yellow-400 font-bold animate-number-count">
                +422
              </span>
            </div>
            <h4 className="text-white font-semibold mb-2">New Members</h4>
            <p className="text-gray-400 text-sm">Joined in the last 24 hours</p>
          </div>

          <div className="bg-gradient-to-r from-gray-900/80 to-black/80 backdrop-blur-lg border border-yellow-500/20 rounded-xl p-6 hover:shadow-2xl hover:shadow-yellow-500/10 transition-all duration-300 animate-slide-in-up animation-delay-200">
            <div className="flex items-center justify-between mb-4">
              <Zap className="w-8 h-8 text-amber-400 animate-spin-slow" />
              <span className="text-amber-400 font-bold animate-number-count">
                +1,284
              </span>
            </div>
            <h4 className="text-white font-semibold mb-2">Transactions</h4>
            <p className="text-gray-400 text-sm">Smart contract executions</p>
          </div>

          <div className="bg-gradient-to-r from-gray-900/80 to-black/80 backdrop-blur-lg border border-yellow-500/20 rounded-xl p-6 hover:shadow-2xl hover:shadow-yellow-500/10 transition-all duration-300 animate-slide-in-up animation-delay-300">
            <div className="flex items-center justify-between mb-4">
              <Star className="w-8 h-8 text-yellow-500 animate-twinkle" />
              <span className="text-yellow-500 font-bold animate-number-count">
                100%
              </span>
            </div>
            <h4 className="text-white font-semibold mb-2">Success Rate</h4>
            <p className="text-gray-400 text-sm">Platform reliability</p>
          </div>

          <div className="bg-gradient-to-r from-gray-900/80 to-black/80 backdrop-blur-lg border border-yellow-500/20 rounded-xl p-6 hover:shadow-2xl hover:shadow-yellow-500/10 transition-all duration-300 animate-slide-in-up animation-delay-400">
            <div className="flex items-center justify-between mb-4">
              <BookOpen className="w-8 h-8 text-amber-500 animate-float" />
              <span className="text-amber-500 font-bold animate-number-count">
                156
              </span>
            </div>
            <h4 className="text-white font-semibold mb-2">Active Learners</h4>
            <p className="text-gray-400 text-sm">Currently in training</p>
          </div>
        </div>
      </div>
    </section>
  );
};