import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import { MessageCircleIcon, UsersIcon, SearchIcon } from "lucide-react";
import { useState } from "react";

import { getUserFriends } from "../lib/api";
import FriendCard, { getLanguageFlag } from "../components/FriendCard";
import NoFriendsFound from "../components/NoFriendsFound";

const FriendsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const { data: friends = [], isLoading: loadingFriends } = useQuery({
    queryKey: ["friends"],
    queryFn: getUserFriends,
  });

  // Filter friends based on search term
  const filteredFriends = friends.filter((friend) =>
    friend.fullName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="container mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight flex items-center gap-3">
              <UsersIcon className="size-8 text-primary" />
              My Friends
            </h1>
            <p className="text-base-content opacity-70 mt-2">
              Connect and chat with your language learning partners
            </p>
          </div>
          <Link to="/" className="btn btn-outline btn-sm">
            <UsersIcon className="mr-2 size-4" />
            Find New Friends
          </Link>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <SearchIcon className="h-5 w-5 text-base-content opacity-50" />
          </div>
          <input
            type="text"
            placeholder="Search friends..."
            className="input input-bordered w-full pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Friends Count */}
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">
            {filteredFriends.length} {filteredFriends.length === 1 ? 'friend' : 'friends'}
          </span>
          {searchTerm && (
            <span className="text-xs text-base-content opacity-60">
              (filtered from {friends.length} total)
            </span>
          )}
        </div>

        {/* Friends Grid */}
        {loadingFriends ? (
          <div className="flex justify-center py-12">
            <span className="loading loading-spinner loading-lg" />
          </div>
        ) : filteredFriends.length === 0 ? (
          <div className="text-center py-12">
            {searchTerm ? (
              <div className="space-y-4">
                <div className="text-6xl opacity-30">🔍</div>
                <h3 className="text-xl font-semibold">No friends found</h3>
                <p className="text-base-content opacity-70">
                  No friends match your search for "{searchTerm}"
                </p>
                <button
                  onClick={() => setSearchTerm("")}
                  className="btn btn-outline btn-sm"
                >
                  Clear search
                </button>
              </div>
            ) : (
              <NoFriendsFound />
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredFriends.map((friend) => (
              <div key={friend._id} className="group">
                <div className="card bg-base-200 hover:shadow-lg transition-all duration-300 hover:scale-105">
                  <div className="card-body p-5">
                    {/* User Info */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className="avatar size-14">
                        <img 
                          src={friend.profilePic} 
                          alt={friend.fullName}
                          className="rounded-full"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg truncate">{friend.fullName}</h3>
                        <div className="flex items-center gap-1 text-xs text-success">
                          <span className="size-2 rounded-full bg-success inline-block" />
                          Online
                        </div>
                      </div>
                    </div>

                    {/* Languages */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      <span className="badge badge-secondary text-xs">
                        {getLanguageFlag(friend.nativeLanguage)}
                        Native: {friend.nativeLanguage}
                      </span>
                      <span className="badge badge-outline text-xs">
                        {getLanguageFlag(friend.learningLanguage)}
                        Learning: {friend.learningLanguage}
                      </span>
                    </div>

                    {/* Bio if available */}
                    {friend.bio && (
                      <p className="text-sm opacity-70 mb-4 line-clamp-2">
                        {friend.bio}
                      </p>
                    )}

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <Link 
                        to={`/chat/${friend._id}`} 
                        className="btn btn-primary flex-1 btn-sm"
                      >
                        <MessageCircleIcon className="size-4 mr-2" />
                        Message
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Quick Stats */}
        {friends.length > 0 && (
          <div className="stats shadow bg-base-200">
            <div className="stat">
              <div className="stat-figure text-primary">
                <UsersIcon className="size-8" />
              </div>
              <div className="stat-title">Total Friends</div>
              <div className="stat-value text-primary">{friends.length}</div>
              <div className="stat-desc">Language learning partners</div>
            </div>
            <div className="stat">
              <div className="stat-figure text-secondary">
                <MessageCircleIcon className="size-8" />
              </div>
              <div className="stat-title">Active Chats</div>
              <div className="stat-value text-secondary">{friends.length}</div>
              <div className="stat-desc">Ready to practice languages</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FriendsPage;
