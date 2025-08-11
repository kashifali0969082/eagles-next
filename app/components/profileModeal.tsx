import React, { useState, useEffect } from "react";
import { Save, Upload, User, X } from "lucide-react";
import imageCompression from "browser-image-compression";
import axios from "axios";
import { useAccount } from "wagmi";
import { ApiUrl } from "@/config/exports";
import { useProfileStore } from "@/store/userCounterStore";
import { useRouter, usePathname } from "next/navigation";

import { isUserExists } from "@/config/Method";
import { toast, ToastContainer } from "react-toastify";

// Profile Modal Component
export const ProfileModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  userProfile: any;
  onSave: (profile: any) => void;
}> = ({ isOpen, onClose, onSave }) => {
  const { address, isConnected } = useAccount();
  const router = useRouter();
  const userProfile = useProfileStore.getState().profile;
  const pathname = usePathname();

  const [formData, setFormData] = useState({
    id: userProfile?.id || "",
    name: userProfile?.name || "",
    email: userProfile?.email || "",
    description: userProfile?.description || "",
    walletAddress: address || "",
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

  // Check if user profile exists (not just blockchain check)
  const checkUserProfile = async (address: string) => {
    try {
      // Check if user exists in blockchain
      let boo = await isUserExists(address);
      setExtUser(boo as boolean);
      
      if (!boo && !pathname.startsWith("/IdSearch")) {
        router.push("/register");
      }
    } catch (error) {
      console.error("Error checking user:", error);
    }
  };

  useEffect(() => {
    if (address && isConnected) {
      checkUserProfile(address);
      setFormData((prev) => ({ ...prev, walletAddress: address }));
    }
  }, [isConnected, address]);

  useEffect(() => {
    if (userProfile && address) {
      setFormData({
        id: userProfile.id || "",
        name: userProfile.name || "",
        email: userProfile.email || "",
        description: userProfile.description || "",
        walletAddress: address, // Always use connected wallet address
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

  // Improved base64 conversion with better error handling
  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        // Ensure we have a proper base64 string
        if (result && result.startsWith('data:')) {
          resolve(result);
        } else {
          reject(new Error('Failed to convert image to base64'));
        }
      };
      reader.onerror = () => reject(new Error('FileReader error'));
      reader.readAsDataURL(file);
    });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast.error("Please select a valid image file");
        return;
      }

      // Check file size (1MB limit)
      if (file.size > 1024 * 1024) {
        toast.error("Image too large. Please select a file under 1MB.");
        return;
      }

      setIsLoading(true);
      toast.info("Processing image...");

      // Compress the image
      const compressedFile = await imageCompression(file, {
        maxSizeMB: 0.8, // Slightly lower to ensure we stay under 1MB
        maxWidthOrHeight: 800, // Reasonable size for profile images
        useWebWorker: true,
        fileType: 'image/jpeg', // Convert to JPEG for better compression
        initialQuality: 0.8
      });

      console.log('Original file size:', file.size);
      console.log('Compressed file size:', compressedFile.size);

      // Convert compressed image to Base64
      const base64 = await convertToBase64(compressedFile);
      
      // Verify base64 string is valid
      if (base64 && base64.length > 0) {
        setImagePreview(base64);
        setFormData((prev) => ({ ...prev, profileImage: base64 }));
        toast.success("Image processed successfully");
      } else {
        throw new Error('Failed to process image');
      }
    } catch (error) {
      console.error("Image processing failed:", error);
      toast.error("Failed to process image. Please try a different image.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!address || !isConnected) {
      toast.error("Please connect your wallet first.");
      setIsLoading(false);
      return;
    }

    // Basic validation
    if (!formData.name.trim()) {
      toast.error("Name is required");
      setIsLoading(false);
      return;
    }

    // Format social links - only include non-empty URLs
    const formattedSocialLinks = Object.entries(formData.socialLinks).reduce(
      (acc, [platform, url]) => {
        if (url && url.trim()) {
          acc[platform.toLowerCase()] = url.trim();
        }
        return acc;
      },
      {} as Record<string, string>
    );

    const userData = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      description: formData.description.trim(),
      walletAddress: address, // Always use connected wallet
      profileImage: formData.profileImage,
      socialLinks: formattedSocialLinks,
    };

    try {
      let response;
      
      console.log('Current userProfile:', userProfile);
      console.log('Sending userData:', userData);
      
      // First, try to check if profile exists on backend using the correct route
      let profileExists = false;
      try {
        const checkResponse = await axios.get(`${ApiUrl}/user/profile/${address}`);
        profileExists = checkResponse.status === 200;
        console.log('Profile exists on backend:', profileExists);
      } catch (checkError) {
        // Profile doesn't exist (404 is expected)
        profileExists = false;
        console.log('Profile does not exist on backend');
      }

      if (profileExists) {
        // Update existing profile
        console.log('Updating existing profile...');
        response = await axios.post(`${ApiUrl}/profile-upgradation`, userData);
        toast.success("Profile updated successfully!");
      } else {
        // Create new profile - wallet address goes in URL, other data in body
        console.log('Creating new profile...');
        const { walletAddress, ...profileDataWithoutWallet } = userData;
        response = await axios.post(`${ApiUrl}/api/profile/${address}`, profileDataWithoutWallet);
        toast.success("Profile created successfully!");
      }

      if (response.status === 200 || response.status === 201) {
        // Update the form data with response data if available
        const updatedProfile = response.data?.data || userData;
        onSave(updatedProfile);
        useProfileStore.getState().setProfile(updatedProfile);
        onClose();
      } else {
        throw new Error('Unexpected response status');
      }
    } catch (error: any) {
      console.error("Error saving profile:", error);
      
      // Handle specific error messages
      if (error.response?.status === 413) {
        toast.error("Image file is too large. Please use a smaller image.");
      } else if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else if (error.message?.includes('Network Error')) {
        toast.error("Network error. Please check your connection and try again.");
      } else {
        toast.error("Failed to save profile. Please try again.");
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
          <h2 className="text-2xl font-bold text-white mb-4">
            Wallet Required
          </h2>
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
            {userProfile?.id ? "Update Profile" : "Create Profile"}
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
            <p className="text-gray-400 text-sm text-center">
              Click the upload icon to change profile picture<br />
              <span className="text-xs">(Max 1MB, JPG/PNG recommended)</span>
            </p>
          </div>

          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">
                Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full bg-gray-800/50 border border-gray-600 text-white rounded-lg px-4 py-3 focus:border-yellow-500 focus:outline-none transition-colors"
                placeholder="Enter your name"
                disabled={isLoading}
                required
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
                  : userProfile?.id
                  ? "Update Profile"
                  : "Create Profile"}
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