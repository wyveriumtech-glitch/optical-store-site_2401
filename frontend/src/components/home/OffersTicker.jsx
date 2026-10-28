'use client';
import React, { useState } from 'react';
import { Tag, Sparkles, Copy, Check } from 'lucide-react';
import Link from 'next/link';

export default function OffersTicker({ offers = [] }) {
  const [copiedCode, setCopiedCode] = useState(null);

  if (!offers || offers.length === 0) return null;

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  return (
    <div className="bg-gradient-to-r from-obsidian-950 via-obsidian-850 to-obsidian-950 border-y border-gold-500/30 py-4 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <span className="p-2 rounded-lg bg-gold-500/10 border border-gold-500/30 text-gold-400">
              <Sparkles className="w-4 h-4 animate-spin-slow" />
            </span>
            <div>
              <span className="text-xs uppercase tracking-widest text-gold-400 font-bold block">
                Live VIP Privileges
              </span>
              <span className="text-sm text-neutral-200 font-medium">
                Exclusive seasonal optical benefits fetched in real-time
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {offers.slice(0, 3).map((offer) => (
              <div
                key={offer._id || offer.code}
                className="flex items-center space-x-2.5 px-3.5 py-1.5 rounded-full bg-obsidian-900 border border-gold-500/30 text-xs text-neutral-200 shadow-sm"
              >
                <Tag className="w-3.5 h-3.5 text-gold-400" />
                <span className="font-semibold text-white">{offer.title}:</span>
                <span className="text-gold-300">
                  {offer.discountPercentage > 0 ? `${offer.discountPercentage}% OFF` : `$${offer.discountAmount} OFF`}
                </span>
                <button
                  onClick={() => handleCopy(offer.code)}
                  className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-md bg-gold-500/20 hover:bg-gold-500 text-gold-300 hover:text-obsidian-950 transition-colors font-mono font-bold text-[10px]"
                  title="Copy Code"
                >
                  {copiedCode === offer.code ? (
                    <>
                      <Check className="w-3 h-3" />
                      <span>COPIED</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>{offer.code}</span>
                    </>
                  )}
                </button>
              </div>
            ))}

            <Link
              href="/offers"
              className="text-xs text-gold-400 hover:text-gold-300 font-semibold underline underline-offset-4 ml-2"
            >
              View All Offers →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
