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
  Bell,
  Check,
  Info,
  AlertCircle,
} from "lucide-react";
import { useState } from "react";
import React from "react";
import {
  useProfileStore,
  useUplinerStore,
  useUserId,
} from "@/store/userCounterStore";
import { useEntriesStore } from "@/store/notification";

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

interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface UserProfileProps {
  profileExpanded: boolean;
  setProfileExpanded: (expanded: boolean) => void;
  onEditProfile: () => void;
}

// Sample notifications data


// Notification Modal Component


interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
}



interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Notification Modal Component
const NotificationModal: React.FC<NotificationModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { entries } = useEntriesStore();

  if (!isOpen) return null;

  console.log("entries data:", entries);

  // Helper function to format amount (assuming it's in wei or similar)
  const formatAmount = (amount: number) => {
    return (amount / 1000000).toFixed(2); // Convert to readable format
  };

  // Helper function to format address
  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  // Helper function to format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes} minutes ago`;
    } else if (diffInMinutes < 1440) { // 24 hours
      return `${Math.floor(diffInMinutes / 60)} hours ago`;
    } else {
      return `${Math.floor(diffInMinutes / 1440)} days ago`;
    }
  };

  // Transform entries data to notifications
  const transformEntriesToNotifications = (entries: any[]) => {
    if (!entries || !Array.isArray(entries)) return [];
    
    return entries.map((entry) => {
      const isRegistration = entry.level === 1 && (entry.matrix === 1 || entry.matrix === 2);
      const matrixDisplay = entry.matrix || "X3";
      
      let title, message, type;
      
      if (isRegistration) {
        title = "New Registration";
        message = `${formatAddress(entry.from)} registered in Matrix ${matrixDisplay} - Amount: ${formatAmount(entry.amount)} BUSD`;
        type = "success";
      } else {
        title = "Level Upgrade";
        message = `${formatAddress(entry.to)} received ${formatAmount(entry.amount)} BUSD from ${formatAddress(entry.from)} by level upgrade (Level ${entry.level}, Matrix ${matrixDisplay})`;
        type = "info";
      }

      return {
        id: entry._id,
        type,
        title,
        message,
        timestamp: formatDate(entry.createdAt),
        read: entry.seen,
        originalData: entry
      };
    });
  };

  const notifications = transformEntriesToNotifications(entries);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "success":
        return <Check className="w-5 h-5 text-emerald-400" />;
      case "warning":
        return <AlertCircle className="w-5 h-5 text-amber-400" />;
      case "info":
      default:
        return <Info className="w-5 h-5 text-cyan-400" />;
    }
  };

  const markAsRead = (id: string) => {
    // You can implement API call here to mark as read
    console.log(`Marking notification ${id} as read`);
  };

  const markAllAsRead = () => {
    // You can implement API call here to mark all as read
    console.log("Marking all notifications as read");
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-slate-900/95 via-gray-900/95 to-zinc-900/95 backdrop-blur-lg border border-indigo-500/30 rounded-2xl max-w-md w-full max-h-[80vh] overflow-hidden shadow-2xl shadow-indigo-500/20">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-700/50 bg-gradient-to-r from-indigo-900/20 to-purple-900/20">
          <div className="flex items-center space-x-2">
            <Bell className="w-5 h-5 text-indigo-400" />
            <h2 className="text-xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">Notifications</h2>
            {unreadCount > 0 && (
              <span className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs px-2 py-1 rounded-full shadow-lg">
                {unreadCount}
              </span>
            )}
          </div>
          <div className="flex items-center space-x-2">
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="text-indigo-400 hover:text-indigo-300 text-sm transition-all duration-200 hover:bg-indigo-500/10 px-2 py-1 rounded"
              >
                Mark all read
              </button>
            )}
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white transition-colors p-1 hover:bg-slate-800/50 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Notifications List */}
        <div className="max-h-[60vh] overflow-y-auto">
          {!notifications || notifications.length === 0 ? (
            <div className="p-8 text-center">
              <Bell className="w-12 h-12 text-slate-500 mx-auto mb-3" />
              <p className="text-slate-400">No notifications yet</p>
            </div>
          ) : (
            <div className="p-2">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 m-2 rounded-xl border transition-all duration-300 cursor-pointer hover:scale-[1.02] ${
                    notification.read
                      ? "bg-slate-800/30 border-slate-600/40 hover:bg-slate-800/40"
                      : notification.type === "success"
                      ? "bg-gradient-to-r from-emerald-900/20 to-green-900/20 border-emerald-500/40 hover:from-emerald-900/30 hover:to-green-900/30"
                      : "bg-gradient-to-r from-indigo-900/20 to-cyan-900/20 border-indigo-500/40 hover:from-indigo-900/30 hover:to-cyan-900/30"
                  }`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 mt-1 p-2 rounded-full bg-slate-800/50">
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="text-white font-semibold text-sm truncate">
                          {notification.title}
                        </h3>
                        {!notification.read && (
                          <div className="w-2 h-2 bg-gradient-to-r from-orange-400 to-red-400 rounded-full flex-shrink-0 ml-2 animate-pulse" />
                        )}
                      </div>
                      <p className="text-slate-300 text-sm mb-2 leading-relaxed">
                        {notification.message}
                      </p>
                      <div className="flex items-center justify-between">
                        <p className="text-slate-500 text-xs">
                          {notification.timestamp}
                        </p>
                        {notification.originalData?.matrix && (
                          <span className="text-xs text-purple-300 bg-gradient-to-r from-purple-500/20 to-violet-500/20 border border-purple-500/30 px-2 py-1 rounded-full">
                            Matrix {notification.originalData.matrix}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {notifications && notifications.length > 0 && (
          <div className="p-4 border-t border-slate-700/50 bg-gradient-to-r from-slate-800/30 to-gray-800/30 text-center">
            <button className="text-indigo-400 hover:text-indigo-300 text-sm transition-all duration-200 hover:bg-indigo-500/10 px-3 py-1 rounded-lg">
              View All Notifications
            </button>
          </div>
        )}
      </div>
    </div>
  );
};



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
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);
  const userId = useUserId((state) => state.userIDper);

  const handleNameClick = () => {
    setIsModalOpen(true);
  };
  
  const handleNotificationClick = () => {
    setIsNotificationModalOpen(true);
  };
  
  const userProfile = useProfileStore.getState().profile;

  const handleCopyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("Successfully copied!");
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
              onClick={handleNotificationClick}
              className="bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400 p-2 rounded-lg transition-all duration-300 relative"
            >
              <Bell className="w-4 h-4" />
              {/* Animated notification indicator dot */}
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center animate-pulse">
                <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
                {/* Ripple animation */}
                <span className="absolute inset-0 rounded-full bg-red-500 animate-ping opacity-75"></span>
              </span>
            </button>
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
                    handleCopyToClipboard(
                      `theeagles.io/IdSearch?id=${userId || "0"}`
                    )
                  }
                  className="text-gray-400 hover:text-yellow-400 transition-colors"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Profile Modal */}
      <ProfileModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      
      {/* Notification Modal */}
      <NotificationModal
        isOpen={isNotificationModalOpen}
        onClose={() => setIsNotificationModalOpen(false)}
      />
    </>
  );
};