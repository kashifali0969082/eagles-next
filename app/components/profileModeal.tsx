import React, { useState, useEffect } from "react";
import { Save, Upload, User, X } from "lucide-react";
import imageCompression from "browser-image-compression";
import axios from "axios";
import { useAccount } from "wagmi";
import { ApiUrl } from "@/config/exports";
import { useRouter } from "next/navigation";
import { useProfileStore } from "@/store/userCounterStore";

import { isUserExists } from "@/config/Method";
import { toast,ToastContainer } from "react-toastify";
// Profile Modal Component
export const ProfileModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  userProfile: any;
  onSave: (profile: any) => void;
}> = ({ isOpen, onClose,  onSave }) => {
  const { address, isConnected } = useAccount();
    const router = useRouter();
const userProfile=useProfileStore.getState().profile
    
  const [formData, setFormData] = useState({
    id: userProfile?.id || "",
    name: userProfile?.name || "",
    email: userProfile?.email || "",
    description: userProfile?.description || "",
    walletAddress: userProfile?.walletAddress || address || "",
    profileImage: userProfile?.profileImage || "",
    socialLinks: {
      facebook: userProfile?.socialLinks?.facebook || "",
      youtube: userProfile?.socialLinks?.youtube || "",
      instagram: userProfile?.socialLinks?.instagram || "",
      twitter: userProfile?.socialLinks?.twitter || "",
      whatsapp: userProfile?.socialLinks?.whatsapp || "",
    },
  });

  const [imagePreview, setImagePreview] = useState(
    userProfile?.profileImage || ""
  );
  const [extUser, setExtUser] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Check if user exists in blockchain
  const CheckForUser = async (address: string) => {
    try {
      let boo = await isUserExists(address);
      setExtUser(boo as boolean);
      if (boo === true) {
        // User exists in blockchain, can proceed
      } else {
        router.push('/register');
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (address && isConnected) {
      CheckForUser(address);
      setFormData(prev => ({ ...prev, walletAddress: address }));
    }
  }, [isConnected, address]);

  useEffect(() => {
    if (userProfile) {
      setFormData({
        id: userProfile.id || "",
        name: userProfile.name || "",
        email: userProfile.email || "",
        description: userProfile.description || "",
        walletAddress: userProfile.walletAddress || address || "",
        profileImage: userProfile.profileImage || "",
        socialLinks: {
          facebook: userProfile.socialLinks?.facebook || "",
          youtube: userProfile.socialLinks?.youtube || "",
          instagram: userProfile.socialLinks?.instagram || "",
          twitter: userProfile.socialLinks?.twitter || "",
          whatsapp: userProfile.socialLinks?.whatsapp || "",
        },
      });
      setImagePreview(userProfile.profileImage || "");
    }
  }, [userProfile, address]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name.includes("socialLinks.")) {
      const platform = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        socialLinks: {
          ...prev.socialLinks,
          [platform]: value,
        },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Convert file to base64
  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (err) => reject(err);
    });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      // Check file size
      if (file.size > 1024 * 1024 * 1) {
        alert("Image too large. Select a file under 1MB.");
        return;
      }

      // Compress the image
      const compressedFile = await imageCompression(file, {
        maxSizeMB: 1,
        maxWidthOrHeight: 1024,
        useWebWorker: true,
      });

      // Convert compressed image to Base64
      const base64 = await convertToBase64(compressedFile);
      setImagePreview(base64);
      setFormData((prev) => ({ ...prev, profileImage: base64 }));
    } catch (error) {
      console.error("Image processing failed:", error);
      alert("Failed to process image. Please try again.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!address) {
      alert("Please connect your wallet first.");
      setIsLoading(false);
      return;
    }

    // Format social links for API (convert from object to nested object)
    const formattedSocialLinks = Object.entries(formData.socialLinks).reduce((acc, [platform, url]) => {
      if (url) { // Only include non-empty URLs
        acc[platform.toLowerCase()] = url;
      }
      return acc;
    }, {} as Record<string, string>);

    const userData = {
      name: formData.name,
      profileImage: formData.profileImage,
      email: formData.email,
      description: formData.description,
      walletAddress: address,
      socialLinks: formattedSocialLinks,
    };
console.log();

 try {
  let response;
  if (
    userProfile?.id ||
    userProfile.description ||
    userProfile.name ||
    userProfile.profileImage ||
    userProfile.socialLinks
  ) {
    response = await axios.post(`${ApiUrl}/profile-upgradation`, userData);
    toast.success("Profile upgraded successfully");
  } else {
    response = await axios.post(`${ApiUrl}/api/profile`, userData);
    toast.success("Profile created successfully");
  }

  if (response.status === 200 || response.status === 201) {
    onSave(formData);
    useProfileStore.getState().setProfile(formData);
    onClose();
  } else {
    toast.error("File size is too large");
  }
} catch (error: unknown) {
  toast.error("Failed to save profile. Please try again.");
  if (error instanceof Error) {
    console.error("Error saving profile:", (error as any).response?.data || error.message);
  } else {
    console.error("An unexpected error occurred:", error);
  }
} finally {
  setIsLoading(false);
}

  };

  if (!isOpen) return null;

  // Show wallet connection message if not connected
  if (!isConnected) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-gradient-to-br from-gray-900/95 to-black/95 backdrop-blur-lg border border-yellow-500/20 rounded-2xl p-8 max-w-md w-full text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Wallet Required</h2>
          <p className="text-gray-300 mb-6">
            Please connect your wallet to create or update your profile.
          </p>
          <button
            onClick={onClose}
            className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="h-[73%] lg:h-[80%] overflow-scroll no-scrollbar bg-gradient-to-br from-gray-900/95 to-black/95 backdrop-blur-lg border border-yellow-500/20 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-gradient-to-r from-gray-900/95 to-black/95 backdrop-blur-lg border-b border-gray-700 p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">
            {userProfile ? "Update Profile" : "Create Profile"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
            disabled={isLoading}
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Profile Image */}
          <div className="flex flex-col items-center space-y-4">
            <div className="relative">
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Profile Preview"
                  className="w-24 h-24 rounded-full object-cover border-4 border-yellow-500/20"
                />
              ) : (
                <div className="w-24 h-24 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full flex items-center justify-center">
                  <User className="w-12 h-12 text-black" />
                </div>
              )}
              <label className="absolute bottom-0 right-0 bg-yellow-500 hover:bg-yellow-600 text-black p-2 rounded-full cursor-pointer transition-colors">
                <Upload className="w-4 h-4" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  disabled={isLoading}
                />
              </label>
            </div>
            <p className="text-gray-400 text-sm">
              Click the upload icon to change profile picture (Max 1MB)
            </p>
          </div>

          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full bg-gray-800/50 border border-gray-600 text-white rounded-lg px-4 py-3 focus:border-yellow-500 focus:outline-none transition-colors"
                placeholder="Enter your name"
                disabled={isLoading}
              />
            </div>

            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full bg-gray-800/50 border border-gray-600 text-white rounded-lg px-4 py-3 focus:border-yellow-500 focus:outline-none transition-colors"
                placeholder="Enter your email"
                disabled={isLoading}
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-gray-300 text-sm font-medium mb-2">
                Wallet Address *
              </label>
              <input
                type="text"
                name="walletAddress"
                value={formData.walletAddress}
                readOnly
                className="w-full bg-gray-700/50 border border-gray-600 text-gray-300 rounded-lg px-4 py-3 font-mono text-sm cursor-not-allowed"
                placeholder="Connect wallet to see address"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={3}
              className="w-full bg-gray-800/50 border border-gray-600 text-white rounded-lg px-4 py-3 focus:border-yellow-500 focus:outline-none transition-colors resize-none"
              placeholder="Tell us about yourself..."
              disabled={isLoading}
            />
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Social Links
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.keys(formData.socialLinks).map((platform) => (
                <div key={platform}>
                  <label className="block text-gray-300 text-sm font-medium mb-2 capitalize">
                    {platform}
                  </label>
                  <input
                    type="url"
                    name={`socialLinks.${platform}`}
                    value={
                      formData.socialLinks[
                        platform as keyof typeof formData.socialLinks
                      ]
                    }
                    onChange={handleInputChange}
                    className="w-full bg-gray-800/50 border border-gray-600 text-white rounded-lg px-4 py-3 focus:border-yellow-500 focus:outline-none transition-colors"
                    placeholder={`Your ${platform} URL`}
                    disabled={isLoading}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end space-x-4 pt-6 border-t border-gray-700">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 text-black font-bold rounded-lg transition-all duration-300 flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              <Save className="w-4 h-4" />
              <span>
                {isLoading 
                  ? "Saving..." 
                  : userProfile 
                    ? "Update Profile" 
                    : "Create Profile"
                }
              </span>
            </button>
          </div>
        </form>
      </div>
         <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        toastStyle={{
          background: "rgba(24, 24, 27, 0.8)",
          border: "1px solid rgba(250, 204, 21, 0.3)",
          color: "#FACC15",
          backdropFilter: "blur(10px)",
          borderRadius: "0.75rem",
        }}
      />
    </div>
  );
};