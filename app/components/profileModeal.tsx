import { useState } from "react";
import { Save,Upload,User,X } from "lucide-react";
// Profile Modal Component
export const ProfileModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  userProfile: any;
  onSave: (profile: any) => void;
}> = ({ isOpen, onClose, userProfile, onSave }) => {
  const [formData, setFormData] = useState({
    id: userProfile?.id || "",
    name: userProfile?.name || "",
    email: userProfile?.email || "",
    description: userProfile?.description || "",
    walletAddress: userProfile?.walletAddress || "",
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

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setImagePreview(result);
        setFormData((prev) => ({ ...prev, profileImage: result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className=" h-[73%] lg:h-[80%] bg-gradient-to-br from-gray-900/95 to-black/95 backdrop-blur-lg border border-yellow-500/20 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-gradient-to-r from-gray-900/95 to-black/95 backdrop-blur-lg border-b border-gray-700 p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">
            {userProfile ? "Update Profile" : "Create Profile"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
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
                />
              </label>
            </div>
            <p className="text-gray-400 text-sm">
              Click the upload icon to change profile picture
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
              />
            </div>

            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">
                Wallet Address *
              </label>
              <input
                type="text"
                name="walletAddress"
                value={formData.walletAddress}
                onChange={handleInputChange}
                required
                className="w-full bg-gray-800/50 border border-gray-600 text-white rounded-lg px-4 py-3 focus:border-yellow-500 focus:outline-none transition-colors font-mono text-sm"
                placeholder="0x..."
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
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 text-black font-bold rounded-lg transition-all duration-300 flex items-center space-x-2"
            >
              <Save className="w-4 h-4" />
              <span>{userProfile ? "Update Profile" : "Create Profile"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};