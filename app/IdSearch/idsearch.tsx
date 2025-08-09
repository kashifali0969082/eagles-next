"use client";
import React, { useEffect, useState } from "react";
import { ProfileModal } from "../components/profileModeal";
import { StatsGrid } from "../components/StatsGrid";
import { PlatformStatistics } from "../components/staticcomponent";
import { ContractInformation } from "../components/contactInfor";
import { TransactionHistory } from "../components/Transaction-Info";
import { useAccount } from "wagmi";
import { useRouter } from "next/navigation";
import { useAdressStore, useStatsStore } from "@/store/userCounterStore";
import { useProfileStore } from "@/store/userCounterStore";
import { useSearchParams } from 'next/navigation';
import { UserProfilesear } from "../components/searchId/searchuserprofile";
import { LevelProgressser } from "../components/searchId/searchlevelprogress";

const Idsearch: React.FC = () => {
     const searchParams = useSearchParams();
  const addres = searchParams.get('addres');
 const [profileExpanded, setProfileExpanded] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const currentAddress = useAdressStore.getState().address;
  const { address, isConnected, isDisconnected } = useAccount();
    const { totalUsers} = useStatsStore();

  const router = useRouter();
const formData= {
        id: "",
        name: "",
        email: "",
        description: "",
        walletAddress: "",
        profileImage: "",
        socialLinks: {
          facebook:  "",
          youtube:  "",
          instagram: "",
          twitter:  "",
          whatsapp: "",
        },
      };


  const handleSaveProfile = (profileData: any) => {
    setUserProfile(profileData);
    // Here you would typically save to your backend/database
    console.log("Saving profile:", profileData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-96 h-96 bg-gradient-to-r from-yellow-400/10 to-amber-400/10 rounded-full blur-3xl animate-pulse top-20 left-20"></div>
        <div className="absolute w-64 h-64 bg-gradient-to-r from-yellow-500/15 to-amber-500/15 rounded-full blur-2xl animate-pulse bottom-20 right-20"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        {/* User Profile - Responsive */}
        <UserProfilesear
          profileExpanded={profileExpanded}
          setProfileExpanded={setProfileExpanded}
          onEditProfile={() => setIsProfileModalOpen(true)}
        />

        {/* Stats Grid - Responsive */}
        <StatsGrid />
        {/* Mobile Platform Stats - Only on mobile */}
        <div className="bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-lg border border-yellow-500/20 rounded-lg p-3 mb-4 lg:hidden">
          <h4 className="text-sm font-bold text-white mb-2 text-center">
            Platform Stats
          </h4>
          <div className="grid grid-cols-2 gap-3 text-center">
            <div>
              <p className="text-yellow-400 font-bold text-sm">{totalUsers}</p>
              <p className="text-gray-400 text-xs">Members</p>
            </div>
            <div>
              <p className="text-green-400 font-bold text-sm">$7,332</p>
              <p className="text-gray-400 text-xs">Distributed</p>
            </div>
          </div>
        </div>

        {/* Shared Components - All Responsive */}
        <LevelProgressser />
        <PlatformStatistics />
        <ContractInformation />
        <TransactionHistory />

        {/* Profile Modal */}
        <ProfileModal
          isOpen={isProfileModalOpen}
          onClose={() => setIsProfileModalOpen(false)}
          userProfile={userProfile}
          onSave={handleSaveProfile}
        />
      </div>
    </div>
    
  );
};



export default Idsearch;
