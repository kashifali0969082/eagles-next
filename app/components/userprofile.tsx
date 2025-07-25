import { User,Edit,Share2,Copy,ChevronDown,Plus } from "lucide-react";
// User Profile Component
export const UserProfile: React.FC<{
  profileExpanded: boolean;
  setProfileExpanded: (expanded: boolean) => void;
  onEditProfile: () => void;
  userProfile: any;
}> = ({ profileExpanded, setProfileExpanded, onEditProfile, userProfile }) => (
  <div className="bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-lg border border-yellow-500/20 rounded-2xl p-6 mb-8">
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center space-x-4">
        <div className="relative">
          {userProfile?.profileImage ? (
            <img
              src={userProfile.profileImage}
              alt="Profile"
              className="w-16 h-16 rounded-full object-cover"
            />
          ) : (
            <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-black" />
            </div>
          )}
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">
            {userProfile?.name || "Tester Dev"}
          </h2>
          <p className="text-yellow-400 font-semibold">
            ID: {userProfile?.id || "4679"}
          </p>
          <p className="text-gray-400 text-sm">Joined by ID: 1</p>
          {userProfile?.description && (
            <p className="text-gray-300 text-sm mt-1 max-w-md">
              {userProfile.description}
            </p>
          )}
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <button
          onClick={onEditProfile}
          className="bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400 p-2 rounded-lg transition-all duration-300"
        >
          {userProfile ? (
            <Edit className="w-4 h-4" />
          ) : (
            <Plus className="w-4 h-4" />
          )}
        </button>
        <button
          onClick={() => setProfileExpanded(!profileExpanded)}
          className="text-gray-400 hover:text-yellow-400 transition-colors"
        >
          <ChevronDown
            className={`w-5 h-5 transition-transform ${
              profileExpanded ? "" : "rotate-180"
            }`}
          />
        </button>
      </div>
    </div>

    {profileExpanded && (
      <div className="border-t border-gray-700 pt-6">
        <div className="mb-4">
          <p className="text-gray-300 text-sm mb-2">Personal Referral Link</p>
          <div className="flex items-center space-x-2 bg-gray-800/50 rounded-lg p-3">
            <span className="text-yellow-400 font-mono text-sm flex-1">
              theeagles.io/{userProfile?.id || "4679"}
            </span>
            <button className="text-gray-400 hover:text-yellow-400 transition-colors">
              <Copy className="w-4 h-4" />
            </button>
            <button className="text-gray-400 hover:text-yellow-400 transition-colors">
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {userProfile?.socialLinks && (
          <div className="mt-4">
            <p className="text-gray-300 text-sm mb-3">Social Links</p>
            <div className="flex flex-wrap gap-2">
              {Object.entries(userProfile?.socialLinks ?? {})
                .map(([platform, url]) => {
                  if (typeof url !== "string") return null;
                  return (
                    <a
                      key={platform}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-gray-800/50 hover:bg-gray-700/50 px-3 py-1 rounded-lg text-sm text-gray-300 hover:text-white transition-colors capitalize"
                    >
                      {platform}
                    </a>
                  );
                })
                .filter(Boolean)}
            </div>
          </div>
        )}
      </div>
    )}
  </div>
);



// Mobile User Profile Component
export const MobileUserProfile: React.FC<{
  profileExpanded: boolean;
  setProfileExpanded: (expanded: boolean) => void;
  onEditProfile: () => void;
  userProfile: any;
}> = ({ profileExpanded, setProfileExpanded, onEditProfile, userProfile }) => (
  <div className="bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-lg border border-yellow-500/20 rounded-xl p-4 mb-4">
    <div className="flex items-center space-x-3">
      <div className="relative">
        {userProfile?.profileImage ? (
          <img
            src={userProfile.profileImage}
            alt="Profile"
            className="w-12 h-12 rounded-full object-cover"
          />
        ) : (
          <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full flex items-center justify-center">
            <User className="w-6 h-6 text-black" />
          </div>
        )}
      </div>
      <div className="flex-1">
        <h2 className="text-lg font-bold text-white">
          {userProfile?.name || "Tester Dev"}
        </h2>
        <p className="text-yellow-400 font-semibold text-sm">
          ID: {userProfile?.id || "4679"}
        </p>
      </div>
      <button
        onClick={onEditProfile}
        className="bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400 p-1 rounded-lg transition-all duration-300"
      >
        {userProfile ? (
          <Edit className="w-3 h-3" />
        ) : (
          <Plus className="w-3 h-3" />
        )}
      </button>
      <button
        onClick={() => setProfileExpanded(!profileExpanded)}
        className="text-gray-400 hover:text-yellow-400 transition-colors p-1"
      >
        <ChevronDown
          className={`w-4 h-4 transition-transform ${
            profileExpanded ? "" : "rotate-180"
          }`}
        />
      </button>
    </div>

    {profileExpanded && (
      <div className="border-t border-gray-700 pt-3 mt-3">
        <div className="flex items-center space-x-2 bg-gray-800/50 rounded-lg p-2">
          <span className="text-yellow-400 font-mono text-xs flex-1">
            theeagles.io/{userProfile?.id || "4679"}
          </span>
          <button className="text-gray-400 hover:text-yellow-400 transition-colors p-1">
            <Copy className="w-3 h-3" />
          </button>
          <button className="text-gray-400 hover:text-yellow-400 transition-colors p-1">
            <Share2 className="w-3 h-3" />
          </button>
        </div>
      </div>
    )}
  </div>
);