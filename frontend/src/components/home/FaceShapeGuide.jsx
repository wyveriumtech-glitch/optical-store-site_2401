'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, CheckCircle2, Glasses, Compass } from 'lucide-react';

const faceShapes = [
  {
    id: 'oval',
    name: 'Oval Face',
    description: 'Balanced proportions with high cheekbones and a softly curved jawline.',
    bestFrames: ['Square', 'Geometric', 'Aviator', 'Cat-Eye'],
    avoidFrames: ['Oversized frames that overwhelm facial harmony'],
    rule: 'Virtually any frame style complements your balanced symmetry.',
    icon: '👤',
    recommendedShapeQuery: 'Square',
  },
  {
    id: 'round',
    name: 'Round Face',
    description: 'Equal cheekbone and facial length with soft, curved contours and subtle jaw angle.',
    bestFrames: ['Square', 'Geometric', 'Wayfarer'],
    avoidFrames: ['Small round wire frames'],
    rule: 'Angular and rectangular frames add structure, definition, and lengthen the silhouette.',
    icon: '⚪',
    recommendedShapeQuery: 'Square',
  },
  {
    id: 'square',
    name: 'Square Face',
    description: 'Prominent, defined jawline and broad forehead with strong architectural lines.',
    bestFrames: ['Round', 'Aviator', 'Rimless'],
    avoidFrames: ['Sharp boxy rectangular frames'],
    rule: 'Curved and round silhouettes soften strong facial angles and bring equilibrium.',
    icon: '🔲',
    recommendedShapeQuery: 'Round',
  },
  {
    id: 'heart',
    name: 'Heart Face',
    description: 'Broad forehead and high cheekbones tapering gracefully to a pointed chin.',
    bestFrames: ['Cat-Eye', 'Clubmaster', 'Rimless', 'Round'],
    avoidFrames: ['Heavy browline frames that exaggerate forehead width'],
    rule: 'Upswept styles and delicate rimless frames draw attention downward to balance the jaw.',
    icon: '🖤',
    recommendedShapeQuery: 'Cat-Eye',
  },
  {
    id: 'diamond',
    name: 'Diamond Face',
    description: 'Rare facial silhouette with dramatic wide cheekbones and narrow forehead and chin.',
    bestFrames: ['Cat-Eye', 'Oval', 'Rimless'],
    avoidFrames: ['Narrow geometric frames'],
    rule: 'Curving frames with detailed browlines accentuate cheekbones while softening eye breadth.',
    icon: '💎',
    recommendedShapeQuery: 'Cat-Eye',
  },
];

export default function FaceShapeGuide() {
  const [selectedShape, setSelectedShape] = useState(faceShapes[0]);

  return (
    <section className="py-24 bg-obsidian-900 border-b border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 text-gold-400 text-xs uppercase tracking-widest font-semibold mb-3 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/20">
            <Compass className="w-3.5 h-3.5" />
            <span>Interactive Optical Stylist</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight">
            Find Your <span className="gold-text-gradient">Frame Architecture</span>
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base mt-3">
            Select your facial silhouette below. Our Master Opticians have mapped optimal lens proportions
            to elevate your distinctive natural geometry.
          </p>
        </div>

        {/* Shape Selector Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {faceShapes.map((shape) => {
            const isSelected = selectedShape.id === shape.id;
            return (
              <button
                key={shape.id}
                onClick={() => setSelectedShape(shape)}
                className={`px-5 py-3 rounded-2xl text-xs sm:text-sm font-medium transition-all flex items-center space-x-2 border ${
                  isSelected
                    ? 'bg-gold-500 text-obsidian-950 font-bold border-gold-400 shadow-gold-sm scale-105'
                    : 'bg-obsidian-850 text-neutral-300 border-white/10 hover:border-gold-500/40 hover:text-white'
                }`}
              >
                <span>{shape.icon}</span>
                <span>{shape.name}</span>
              </button>
            );
          })}
        </div>

        {/* Interactive Result Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedShape.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35 }}
            className="glass-gold-panel rounded-3xl p-8 sm:p-12 border border-gold-500/30 shadow-2xl max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-center"
          >
            {/* Left overview */}
            <div className="md:col-span-7 space-y-5">
              <div className="flex items-center space-x-3">
                <span className="text-3xl">{selectedShape.icon}</span>
                <div>
                  <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white">
                    Styling The {selectedShape.name}
                  </h3>
                  <p className="text-xs text-gold-400 font-medium">Bespoke Proportional Mapping</p>
                </div>
              </div>

              <p className="text-sm text-neutral-300 leading-relaxed font-light">
                {selectedShape.description}
              </p>

              <div className="p-4 rounded-2xl bg-black/40 border border-white/5 space-y-2">
                <div className="text-xs font-semibold text-gold-300 flex items-center space-x-1.5 uppercase tracking-wider">
                  <Glasses className="w-4 h-4 text-gold-400" />
                  <span>The Optical Law:</span>
                </div>
                <p className="text-xs text-neutral-300 italic">{selectedShape.rule}</p>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <Link
                  href={`/shop?frameShape=${encodeURIComponent(selectedShape.recommendedShapeQuery)}`}
                  className="px-6 py-3.5 rounded-full bg-gold-gradient text-obsidian-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 shadow-gold-sm hover:scale-105 transition-all"
                >
                  <span>Shop Ideal {selectedShape.name} Frames</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href="/book-appointment"
                  className="px-6 py-3.5 rounded-full bg-white/5 hover:bg-white/10 text-white border border-white/10 text-xs font-semibold uppercase tracking-wider flex items-center justify-center space-x-2 transition-colors"
                >
                  <span>Free Face-Scan In Boutique</span>
                </Link>
              </div>
            </div>

            {/* Right recommendations */}
            <div className="md:col-span-5 bg-obsidian-900/90 rounded-2xl p-6 border border-white/10 space-y-5">
              <div>
                <h4 className="text-xs uppercase tracking-widest text-emerald-400 font-bold mb-3 flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Recommended Silhouettes</span>
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedShape.bestFrames.map((frame) => (
                    <span
                      key={frame}
                      className="px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 font-medium text-xs"
                    >
                      ✓ {frame}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-white/10">
                <h4 className="text-xs uppercase tracking-widest text-neutral-400 font-bold mb-2">
                  Avoid or Wear with Discretion:
                </h4>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  {selectedShape.avoidFrames[0]}
                </p>
              </div>

              <div className="pt-3 border-t border-white/10 text-center">
                <p className="text-[11px] text-neutral-500">
                  Need clinical sizing? Lens Width 48mm – 54mm standard fits.
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
