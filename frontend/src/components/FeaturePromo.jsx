// src/components/FeaturesBanner.jsx
import React from "react";

const TruckSVG = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden xmlns="http://www.w3.org/2000/svg">
    <path d="M1 3h13v13H1z" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M14 8h5l3 3v5h-8" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="6" cy="19" r="1.5" fill="currentColor" />
    <circle cx="18" cy="19" r="1.5" fill="currentColor" />
  </svg>
);

const AwardSVG = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.25" />
    <path d="M8 15l-3 6 7-3 7 3-3-6" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const DollarSVG = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden xmlns="http://www.w3.org/2000/svg">
    <path d="M12 1v22" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M17 5H9.5a3 3 0 000 6H14a3 3 0 010 6H6.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const RefreshSVG = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden xmlns="http://www.w3.org/2000/svg">
    <path d="M21 12a9 9 0 10-3 6.7L21 21v-9z" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M21 21v-4h-4" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function FeaturesBanner() {
  return (
    <div className="bg-black py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Feature 1 */}
          <div className="bg-zinc-800 rounded-lg p-6 flex items-start gap-4 hover:bg-zinc-700 transition-colors">
            <div className="w-10 h-10 flex items-center justify-center bg-green-900/30 rounded-md flex-shrink-0">
              <TruckSVG className="w-6 h-6 text-green-400" />
            </div>
            <div>
              <h3 className="text-white font-semibold text-lg mb-1">Free Shipping</h3>
              <p className="text-gray-400 text-sm">Above ₹ Only</p>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="bg-zinc-800 rounded-lg p-6 flex items-start gap-4 hover:bg-zinc-700 transition-colors">
            <div className="w-10 h-10 flex items-center justify-center bg-green-900/30 rounded-md flex-shrink-0">
              <AwardSVG className="w-6 h-6 text-green-400" />
            </div>
            <div>
              <h3 className="text-white font-semibold text-lg mb-1">Certified Organic</h3>
              <p className="text-gray-400 text-sm">100% Guarantee</p>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="bg-zinc-800 rounded-lg p-6 flex items-start gap-4 hover:bg-zinc-700 transition-colors">
            <div className="w-10 h-10 flex items-center justify-center bg-green-900/30 rounded-md flex-shrink-0">
              <DollarSVG className="w-6 h-6 text-green-400" />
            </div>
            <div>
              <h3 className="text-white font-semibold text-lg mb-1">Huge Savings</h3>
              <p className="text-gray-400 text-sm">At Lowest Price</p>
            </div>
          </div>

          {/* Feature 4 */}
          <div className="bg-zinc-800 rounded-lg p-6 flex items-start gap-4 hover:bg-zinc-700 transition-colors">
            <div className="w-10 h-10 flex items-center justify-center bg-green-900/30 rounded-md flex-shrink-0">
              <RefreshSVG className="w-6 h-6 text-green-400" />
            </div>
            <div>
              <h3 className="text-white font-semibold text-lg mb-1">Easy Returns</h3>
              <p className="text-gray-400 text-sm">No Questions Asked</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
