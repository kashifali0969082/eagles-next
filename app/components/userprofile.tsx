import {
  User,
  Edit,
  Share2,
  Copy,
  ChevronDown,
  Plus,
  X,
  Mail,
  Wallet,
  ExternalLink,
} from "lucide-react";
import { useState } from "react";
import React from "react";
import {
  useProfileStore,
  useUplinerStore,
  useUserId,
} from "@/store/userCounterStore";
// Type definitions
interface UserProfile {
  id?: string;
  name?: string;
  email?: string;
  description?: string;
  profileImage?: string;
  walletAddress?: string;
  SocialLinks?: {
    [key: string]: string;
  };
}

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  userProfile?: UserProfile;
}

interface UserProfileProps {
  profileExpanded: boolean;
  setProfileExpanded: (expanded: boolean) => void;
  onEditProfile: () => void;
}

// Modal Component
const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  const userProfile = useProfileStore.getState().profile;
  const handleCopyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };
  const UplinerId = useUplinerStore((state) => state.uplinerId);
  const userId = useUserId((state) => state.userIDper);
  console.log("upliner ,user  id  ", UplinerId, userId);

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-gray-900/95 to-black/95 backdrop-blur-lg border border-yellow-500/30 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <h2 className="text-2xl font-bold text-white">Profile Details</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-gray-800/50 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Profile Image and Basic Info */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
            <div className="relative flex-shrink-0">
              {userProfile?.profileImage ? (
                <img
                  src={userProfile.profileImage}
                  alt="Profile"
                  className="w-24 h-24 rounded-full object-cover ring-2 ring-yellow-500/30"
                />
              ) : (
                <div className="w-24 h-24 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full flex items-center justify-center ring-2 ring-yellow-500/30">
                  <User className="w-12 h-12 text-black" />
                </div>
              )}
            </div>

            <div className="flex-1 text-center sm:text-left">
              <h3 className="text-3xl font-bold text-white mb-2">
                {userProfile?.name || "Name"}
              </h3>
              <p className="text-yellow-400 font-semibold text-lg mb-1">
                ID: {userId || "0"}
              </p>
              <p className="text-gray-400">Joined by ID: {UplinerId}</p>
            </div>
          </div>

          {/* Description */}
          {userProfile?.description && (
            <div className="bg-gray-800/30 rounded-xl p-4">
              <h4 className="text-yellow-400 font-semibold mb-2">About</h4>
              <p className="text-gray-300 leading-relaxed">
                {userProfile.description}
              </p>
            </div>
          )}

          {/* Email */}
          {userProfile?.email && (
            <div className="bg-gray-800/30 rounded-xl p-4">
              <h4 className="text-yellow-400 font-semibold mb-3">
                Contact Information
              </h4>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-gray-400" />
                <span className="text-gray-300">{userProfile.email}</span>
                <button
                  onClick={() => handleCopyToClipboard(userProfile.email)}
                  className="text-gray-400 hover:text-yellow-400 transition-colors"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Wallet Address */}
          {userProfile?.walletAddress && (
            <div className="bg-gray-800/30 rounded-xl p-4">
              <h4 className="text-yellow-400 font-semibold mb-3">
                Wallet Information
              </h4>
              <div className="flex items-center space-x-3">
                <Wallet className="w-5 h-5 text-gray-400" />
                <span className="text-gray-300 font-mono text-sm break-all">
                  {userProfile.walletAddress}
                </span>
                <button
                  onClick={() =>
                    handleCopyToClipboard(userProfile.walletAddress)
                  }
                  className="text-gray-400 hover:text-yellow-400 transition-colors flex-shrink-0"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Referral Link */}
          <div className="bg-gray-800/30 rounded-xl p-4">
            <h4 className="text-yellow-400 font-semibold mb-3">
              Personal Referral Link
            </h4>
            <div className="flex items-center space-x-2 bg-gray-800/50 rounded-lg p-3">
              <span className="text-yellow-400 font-mono text-sm flex-1 break-all">
                theeagles.io/IdSearch?id={userId || "0"}
              </span>
              <button
                onClick={() =>
                  handleCopyToClipboard(
                    `theeagles.io/IdSearch?id=${userProfile?.id || "0"}`
                  )
                }
                className="text-gray-400 hover:text-yellow-400 transition-colors flex-shrink-0"
              >
                <Copy className="w-4 h-4" />
              </button>
              <button className="text-gray-400 hover:text-yellow-400 transition-colors flex-shrink-0">
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Social Links */}
          {userProfile?.socialLinks &&
            Object.keys(userProfile.socialLinks).length > 0 && (
              <div className="bg-gray-800/30 rounded-xl p-4">
                <h4 className="text-yellow-400 font-semibold mb-3">
                  Social Links
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {Object.entries(userProfile.socialLinks)
                    .filter(
                      ([platform, url]) =>
                        typeof url === "string" && url.trim() !== ""
                    )
                    .map(([platform, url]) => (
                      <a
                        key={platform}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-gray-800/50 hover:bg-gray-700/50 px-4 py-3 rounded-lg text-gray-300 hover:text-white transition-colors flex items-center justify-between group"
                      >
                        <span className="capitalize font-medium">
                          {platform}
                        </span>
                        <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </a>
                    ))}
                </div>
              </div>
            )}
        </div>
      </div>
    </div>
  );
};

// User Profile Component
export const UserProfile: React.FC<UserProfileProps> = ({
  profileExpanded,
  setProfileExpanded,
  onEditProfile,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const userId = useUserId((state) => state.userIDper);

  const handleNameClick = () => {
    setIsModalOpen(true);
  };
  const userProfile = useProfileStore.getState().profile;

  const handleCopyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("sucessfully cpoied!")
  };
  return (
    <>
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
              <h2
                className="text-2xl font-bold text-white cursor-pointer hover:text-yellow-400 transition-colors"
                onClick={handleNameClick}
              >
                {userProfile?.name || "Name"}
              </h2>
              <p className="text-yellow-400 font-semibold">
                ID: {userId || "0"}
              </p>
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
              <p className="text-gray-300 text-sm mb-2">
                Personal Referral Link
              </p>
              <div className="flex items-center space-x-2 bg-gray-800/50 rounded-lg p-3">
                <span className="text-yellow-400 font-mono text-sm flex-1">
                  theeagles.io/IdSearch?id={userId || "0"}
                </span>
                <button
                  onClick={() =>
                    handleCopyToClipboard(`theeagles.io/IdSearch?id=${userId || "0"}`)
                  }
                  className="text-gray-400 hover:text-yellow-400 transition-colors"
                >
                  <Copy className="w-4 h-4" />
                </button>
                {/* <button className="text-gray-400 hover:text-yellow-400 transition-colors">
                  <Share2 className="w-4 h-4" />
                </button> */}
              </div>
            </div>

            {/* {userProfile?.socialLinks && (
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
            )} */}
          </div>
        )}
      </div>

      {/* Modal */}
      <ProfileModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};
