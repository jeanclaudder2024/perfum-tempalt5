'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/prismicio';
import { Content } from '@prismicio/client';
import { Bounded } from '@/components/Bounded';
import { ProductCard } from '@/components/ProductCard';
import { HiMagnifyingGlass, HiXMark } from 'react-icons/hi2';

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [fragrances, setFragrances] = useState<Content.FragranceDocument[]>([]);
  const [filteredFragrances, setFilteredFragrances] = useState<Content.FragranceDocument[]>([]);
  const [selectedMood, setSelectedMood] = useState('');
  const [selectedProfile, setSelectedProfile] = useState('');
  const [priceRange, setPriceRange] = useState('');

  useEffect(() => {
    const fetchFragrances = async () => {
      const client = createClient();
      const data = await client.getAllByType('fragrance');
      setFragrances(data);
      setFilteredFragrances(data);
    };
    fetchFragrances();
  }, []);

  useEffect(() => {
    let filtered = fragrances;

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(fragrance =>
        fragrance.data.title?.some(item => 
          item.text?.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }

    // Filter by mood
    if (selectedMood) {
      filtered = filtered.filter(fragrance => 
        fragrance.data.mood === selectedMood
      );
    }

    // Filter by scent profile
    if (selectedProfile) {
      filtered = filtered.filter(fragrance => 
        fragrance.data.scent_profile === selectedProfile
      );
    }

    // Filter by price range
    if (priceRange) {
      const [min, max] = priceRange.split('-').map(Number);
      filtered = filtered.filter(fragrance => {
        const price = fragrance.data.price || 0;
        return max ? price >= min && price <= max : price >= min;
      });
    }

    setFilteredFragrances(filtered);
  }, [searchQuery, selectedMood, selectedProfile, priceRange, fragrances]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedMood('');
    setSelectedProfile('');
    setPriceRange('');
  };

  const moods = ['elegant', 'bold', 'mysterious', 'fresh'];
  const profiles = ['spicy', 'floral', 'woody', 'citrus', 'oriental'];
  const priceRanges = [
    { label: 'Under $50', value: '0-50' },
    { label: '$50 - $100', value: '50-100' },
    { label: '$100 - $150', value: '100-150' },
    { label: 'Over $150', value: '150' },
  ];

  return (
    <Bounded className="py-16">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="font-display text-5xl md:text-7xl text-white mb-6">
            Find Your Scent
          </h1>
          <p className="text-xl text-neutral-300 max-w-2xl mx-auto">
            Search and filter our collection to discover your perfect fragrance
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-neutral-800/50 border border-neutral-700 rounded-lg p-6 mb-8">
          {/* Search Bar */}
          <div className="relative mb-6">
            <HiMagnifyingGlass className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search fragrances..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-neutral-700 border border-neutral-600 rounded text-white placeholder-neutral-400 focus:border-white focus:outline-none"
            />
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-white mb-2">Mood</label>
              <select
                value={selectedMood}
                onChange={(e) => setSelectedMood(e.target.value)}
                className="w-full p-2 bg-neutral-700 border border-neutral-600 rounded text-white focus:border-white focus:outline-none"
              >
                <option value="">All Moods</option>
                {moods.map(mood => (
                  <option key={mood} value={mood} className="capitalize">
                    {mood}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">Scent Profile</label>
              <select
                value={selectedProfile}
                onChange={(e) => setSelectedProfile(e.target.value)}
                className="w-full p-2 bg-neutral-700 border border-neutral-600 rounded text-white focus:border-white focus:outline-none"
              >
                <option value="">All Profiles</option>
                {profiles.map(profile => (
                  <option key={profile} value={profile} className="capitalize">
                    {profile}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">Price Range</label>
              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="w-full p-2 bg-neutral-700 border border-neutral-600 rounded text-white focus:border-white focus:outline-none"
              >
                <option value="">All Prices</option>
                {priceRanges.map(range => (
                  <option key={range.value} value={range.value}>
                    {range.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-end">
              <button
                onClick={clearFilters}
                className="w-full p-2 bg-neutral-600 text-white rounded hover:bg-neutral-500 transition-colors flex items-center justify-center gap-2"
              >
                <HiXMark className="w-4 h-4" />
                Clear Filters
              </button>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="mb-6">
          <p className="text-neutral-300">
            {filteredFragrances.length} fragrance{filteredFragrances.length !== 1 ? 's' : ''} found
          </p>
        </div>

        {/* Products Grid */}
        {filteredFragrances.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredFragrances.map((fragrance) => (
              <ProductCard key={fragrance.id} fragrance={fragrance} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <HiMagnifyingGlass className="w-16 h-16 text-neutral-600 mx-auto mb-4" />
            <h3 className="text-xl text-white mb-2">No fragrances found</h3>
            <p className="text-neutral-400 mb-6">Try adjusting your search or filters</p>
            <button
              onClick={clearFilters}
              className="bg-white text-black px-6 py-2 font-medium uppercase hover:bg-neutral-200 transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>
    </Bounded>
  );
}