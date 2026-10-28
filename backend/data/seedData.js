const seedProducts = [
  {
    _id: "660000000000000000000001",
    name: "Aurelio Pilot",
    slug: "aurelio-pilot",
    atelier: "Noir Atelier",
    category: "Sunglasses",
    frameShape: "Aviator",
    gender: "Unisex",
    color: "24K Gold & Emerald Green",
    price: 17500,
    discountPrice: 14900,
    images: [
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?auto=format&fit=crop&w=1000&q=80"
    ],
    specs: {
      lensWidth: 58,
      bridgeWidth: 14,
      templeLength: 145,
      frameMaterial: "Japanese Pure Titanium & 24K Gold Plated",
      weight: "16g Ultra-featherweight",
      rimType: "Full Rim"
    },
    prescriptionCompatible: true,
    stock: 18,
    featured: true,
    rating: 4.9,
    reviewCount: 38,
    description: "Couture aviator silhouette handcrafted with Japanese surgical-grade titanium and 24K micron plating. Featuring polarized optical CR-39 lenses with 100% UVA/UVB protection.",
    tags: ["Polarized", "24K Gold", "Titanium", "Bestseller"]
  },
  {
    _id: "660000000000000000000002",
    name: "Marlowe Round",
    slug: "marlowe-round",
    atelier: "Heritage",
    category: "Eyeglasses",
    frameShape: "Round",
    gender: "Men",
    color: "Midnight Black & Brushed Gold",
    price: 11900,
    discountPrice: 9900,
    images: [
      "https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&w=1000&q=80"
    ],
    specs: {
      lensWidth: 49,
      bridgeWidth: 20,
      templeLength: 142,
      frameMaterial: "Mazzucchelli Italian Acetate & Beta-Titanium",
      weight: "18g",
      rimType: "Full Rim"
    },
    prescriptionCompatible: true,
    stock: 24,
    featured: true,
    rating: 4.8,
    reviewCount: 52,
    description: "The intellectual round silhouette refined. Constructed from cured Italian Mazzucchelli acetate with precision gold hinge details. Compatible with high-index and blue-light filtration.",
    tags: ["Blue Cut Compatible", "Italian Acetate", "Classic Luxury"]
  },
  {
    _id: "660000000000000000000003",
    name: "Céleste Cat-Eye",
    slug: "celeste-cat-eye",
    atelier: "Riviera",
    category: "Eyeglasses",
    frameShape: "Cat-Eye",
    gender: "Women",
    color: "Champagne Gold & Crystal",
    price: 14500,
    discountPrice: 12900,
    images: [
      "https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=80"
    ],
    specs: {
      lensWidth: 53,
      bridgeWidth: 17,
      templeLength: 140,
      frameMaterial: "Hand-polished Acetate with Gold accents",
      weight: "19g",
      rimType: "Full Rim"
    },
    prescriptionCompatible: true,
    stock: 14,
    featured: true,
    rating: 5.0,
    reviewCount: 41,
    description: "An iconic upswept cat-eye silhouette engineered to sculpt cheekbones and radiate modern sophistication. Adorned with micro-chamfered gold temple accents.",
    tags: ["High Fashion", "Face Sculpting", "Exclusive"]
  },
  {
    _id: "660000000000000000000004",
    name: "Linea Titanium",
    slug: "linea-titanium",
    atelier: "Minimal",
    category: "Eyeglasses",
    frameShape: "Rimless",
    gender: "Men",
    color: "Platinum Gold",
    price: 15500,
    discountPrice: 13500,
    images: [
      "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&w=1000&q=80"
    ],
    specs: {
      lensWidth: 53,
      bridgeWidth: 18,
      templeLength: 142,
      frameMaterial: "Aerospace Grade Beta-Titanium",
      weight: "11g (Feather Minimal)",
      rimType: "Rimless"
    },
    prescriptionCompatible: true,
    stock: 12,
    featured: true,
    rating: 4.9,
    reviewCount: 29,
    description: "Barely-there luxury. Zero pressure points, maximum clarity. Drilled rimless precision with custom silicone nose-guards and memory flexible titanium temples.",
    tags: ["Featherweight", "Executive", "Minimalist"]
  },
  {
    _id: "660000000000000000000005",
    name: "Cristal Square",
    slug: "cristal-square",
    atelier: "Atelier Clear",
    category: "Eyeglasses",
    frameShape: "Square",
    gender: "Unisex",
    color: "Champagne Crystal Acetate",
    price: 9900,
    discountPrice: 8900,
    images: [
      "https://images.unsplash.com/photo-1509695507497-903c140c43b0?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?auto=format&fit=crop&w=1000&q=80"
    ],
    specs: {
      lensWidth: 54,
      bridgeWidth: 19,
      templeLength: 145,
      frameMaterial: "Bio-Acetate & Gold Core Wire",
      weight: "22g",
      rimType: "Full Rim"
    },
    prescriptionCompatible: true,
    stock: 20,
    featured: false,
    rating: 4.7,
    reviewCount: 19,
    description: "Geometric harmony meets vintage allure. Rich hand-poured crystalline bio-acetate reinforced with an engraved gold wire core.",
    tags: ["Polarized", "Bio-Acetate", "UV400"]
  },
  {
    _id: "660000000000000000000006",
    name: "Aurelio Havana",
    slug: "aurelio-havana",
    atelier: "Noir Atelier",
    category: "Sunglasses",
    frameShape: "Clubmaster",
    gender: "Men",
    color: "Gloss Havana & Gilded Gold",
    price: 18000,
    discountPrice: 15900,
    images: [
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=1000&q=80"
    ],
    specs: {
      lensWidth: 51,
      bridgeWidth: 21,
      templeLength: 145,
      frameMaterial: "Dual-layer Acetate & Stainless Steel Brow",
      weight: "23g",
      rimType: "Half Rim"
    },
    prescriptionCompatible: true,
    stock: 15,
    featured: false,
    rating: 4.8,
    reviewCount: 31,
    description: "Mid-century Riviera charm elevated with modern optical precision. Signature gold coin-edge detailing around the rim perimeter.",
    tags: ["Polarized", "Retro Classic", "Gold Trim"]
  },
  {
    _id: "660000000000000000000007",
    name: "Junior Flex SafeVision",
    slug: "junior-flex-safevision",
    atelier: "Clinic",
    category: "Kids",
    frameShape: "Square",
    gender: "Kids",
    color: "Matte Navy & Gold Flex",
    price: 6500,
    discountPrice: 5200,
    images: [
      "https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&w=1000&q=80"
    ],
    specs: {
      lensWidth: 46,
      bridgeWidth: 15,
      templeLength: 130,
      frameMaterial: "Hypoallergenic Unbreakable TR-90 Elastomer",
      weight: "12g",
      rimType: "Full Rim"
    },
    prescriptionCompatible: true,
    stock: 30,
    featured: false,
    rating: 4.9,
    reviewCount: 22,
    description: "Pediatric ergonomics designed for active young wearers. 180-degree flexible hinge springs, medical silicone ear tips, and impact-resistant lenses.",
    tags: ["Unbreakable", "Blue Light Block", "Kids Safe"]
  },
  {
    _id: "660000000000000000000008",
    name: "Lumière Daily Moisture Lenses (30 Pack)",
    slug: "lumiere-daily-moisture-lenses",
    atelier: "Clinic",
    category: "Contact Lenses",
    frameShape: "Round",
    gender: "Unisex",
    color: "Clear Hydration Matrix",
    price: 2800,
    discountPrice: 2400,
    images: [
      "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1000&q=80"
    ],
    specs: {
      lensWidth: 14,
      bridgeWidth: 8,
      templeLength: 0,
      frameMaterial: "Silicone Hydrogel with 58% Water Retention",
      weight: "0.2g",
      rimType: "Disposable"
    },
    prescriptionCompatible: true,
    stock: 120,
    featured: false,
    rating: 4.9,
    reviewCount: 64,
    description: "Breathable silicone hydrogel contacts keeping your eyes luminous and hydrated for up to 16 continuous hours. Built-in Class 1 UV blocker.",
    tags: ["Breathable", "Hydration Matrix", "Daily Disposable"]
  },
  {
    _id: "660000000000000000000009",
    name: "Artisan Leather Case & Silk Cloth",
    slug: "artisan-leather-hard-case",
    atelier: "Heritage",
    category: "Accessories",
    frameShape: "Square",
    gender: "Unisex",
    color: "Gold Stamped Saddle Tan",
    price: 2500,
    discountPrice: 1900,
    images: [
      "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=1000&q=80"
    ],
    specs: {
      lensWidth: 160,
      bridgeWidth: 65,
      templeLength: 45,
      frameMaterial: "Full Grain Leather & Velvet Lining",
      weight: "95g",
      rimType: "Protective"
    },
    prescriptionCompatible: false,
    stock: 50,
    featured: false,
    rating: 4.8,
    reviewCount: 17,
    description: "Handcrafted magnetic closure eyewear case with soft velvet interior that shields your lenses from scratches and dust. Includes high-density microfiber lens cloth.",
    tags: ["Genuine Leather", "Handmade", "Gift Idea"]
  }
];

const seedAppointments = [
  {
    _id: "661000000000000000000001",
    referenceCode: "EY-892410",
    customerName: "Eleanor Vance",
    phone: "+1 (555) 349-2810",
    email: "eleanor.vance@example.com",
    serviceType: "In-Store Eye Test",
    date: "2026-10-14",
    timeSlot: "11:00 AM - 11:45 AM",
    address: "Downtown Boutique Branch",
    notes: "Requires new progressive lens check. Frequent headache with current prescription.",
    status: "Confirmed"
  },
  {
    _id: "661000000000000000000002",
    referenceCode: "EY-741932",
    customerName: "David Sterling",
    phone: "+1 (555) 782-9901",
    email: "david.sterling@example.com",
    serviceType: "Home Eye Test",
    date: "2026-10-15",
    timeSlot: "03:30 PM - 04:30 PM",
    address: "Penthouse 4B, 742 Evergreen Terrace, Metro City",
    notes: "Please bring 24K gold aviators and titanium optical frames for home trial.",
    status: "Pending"
  },
  {
    _id: "661000000000000000000003",
    referenceCode: "EY-520184",
    customerName: "Sophia Chen",
    phone: "+1 (555) 219-4833",
    email: "sophia.chen@example.com",
    serviceType: "Prescription Check & Frame Fitting",
    date: "2026-10-12",
    timeSlot: "01:00 PM - 01:45 PM",
    address: "Downtown Boutique Branch",
    notes: "Frame alignment needed for Celeste Cat-Eye glasses.",
    status: "Completed"
  }
];

const seedOffers = [
  {
    _id: "662000000000000000000001",
    title: "AI 24K Gold Titanium Special",
    subtitle: "Complimentary Zeiss Blue-Cut Lens Upgrade on Any Designer Frame",
    bannerImage: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=1200&q=80",
    code: "FESTIVEGOLD",
    discountPercentage: 25,
    discountAmount: 0,
    minPurchase: 5000,
    validTill: "Nov 15, 2026",
    active: true
  },
  {
    _id: "662000000000000000000002",
    title: "AI Cyber-Editorial Duo Sale",
    subtitle: "Buy any luxury sunglasses and get a second frame at 50% off",
    bannerImage: "https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=1200&q=80",
    code: "TWINGOLD",
    discountPercentage: 50,
    discountAmount: 0,
    minPurchase: 8000,
    validTill: "Oct 31, 2026",
    active: true
  },
  {
    _id: "662000000000000000000003",
    title: "AI Wavefront Digital Eye Scan",
    subtitle: "Zero fee 20-point comprehensive optical scan when you book online",
    bannerImage: "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&w=1200&q=80",
    code: "FREECHECKUP",
    discountPercentage: 100,
    discountAmount: 1500,
    minPurchase: 0,
    validTill: "Ongoing Offer",
    active: true
  }
];

const seedReviews = [
  {
    _id: "663000000000000000000001",
    customerName: "Julian Montgomery",
    rating: 5,
    comment: "The precision in digital eye testing here is on another level. The optometrist tuned my progressive lenses down to 0.1mm centering. The gold aviator frame feels lighter than air.",
    location: "Architect & Partner",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    framePurchased: "Aurelius Imperial Aviator",
    beforeAfterImages: [
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80"
    ],
    verified: true
  },
  {
    _id: "663000000000000000000002",
    customerName: "Camilla Rossi",
    rating: 5,
    comment: "I booked the Home Eye Test and it was the most seamless luxury service imaginable. The optometrist arrived with a portable diagnostic kit and 40 frames to sample. Truly exceptional.",
    location: "Fashion Director",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    framePurchased: "Celeste Diamond Cat-Eye",
    beforeAfterImages: [
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80"
    ],
    verified: true
  },
  {
    _id: "663000000000000000000003",
    customerName: "Vikram Malhotra",
    rating: 5,
    comment: "Blue-cut lenses from Eyelitz eliminated my end-of-day screen fatigue. The gold and black aesthetic of their flagship boutique is breathtaking. 10/10 recommendation.",
    location: "Senior Software Architect",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    framePurchased: "Vanguard Obsidian Round",
    beforeAfterImages: [],
    verified: true
  }
];

const seedBlogs = [
  {
    _id: "664000000000000000000001",
    title: "The Ultimate Guide: How to Match Frames to Your Exact Face Shape",
    slug: "match-frames-to-face-shape",
    excerpt: "Discover the geometry of eyewear styling. Whether Oval, Square, Round, or Heart, find the frame proportions that accentuate your natural symmetry.",
    thumbnail: "https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&w=1000&q=80",
    category: "Style & Aesthetics",
    readTime: "5 min read",
    author: {
      name: "Dr. Sarah Mitchell",
      role: "Chief Optometrist & Frame Stylist",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80"
    },
    tags: ["Face Shape", "Style Guide", "Frame Proportions"],
    content: `
Eyewear is not merely corrective optics—it is the central focal point of human expression. When someone looks at you, your glasses frame your gaze.

### 1. Identifying Your Face Silhouette
Pull your hair back, stand before a well-lit mirror, and observe your jawline, cheekbones, and forehead breadth:
- **Oval**: Balanced proportions, chin gently rounded, slightly narrower forehead.
- **Round**: Equal width and length, gentle curves without sharp angular angles.
- **Square**: Strong, chiseled jawline with broad forehead.
- **Heart**: Broad temple and cheekbones tapering to a delicate chin.
- **Diamond**: High sculpted cheekbones with narrow forehead and chin.

### 2. The Golden Rule of Contrast
The key principle of optical styling is *complementary opposition*:
- If your features are soft and curved, select geometric, angular frames (Square, Hexagon, Wayfarer) to bring architectural definition.
- If your features are sharp and chiseled, choose curved or rounded frames (Aviator, Oval, Round) to soften facial edges.

### 3. Bridge Width and Nose Proportions
Never neglect the bridge width (the central number in your frame specification, e.g. 52-**18**-145). A keyhole bridge elongates the nose line, while a low saddle bridge creates visual compactness.
    `
  },
  {
    _id: "664000000000000000000002",
    title: "5 Clear Warning Signs You Need Blue-Cut Lenses Immediately",
    slug: "warning-signs-you-need-blue-cut-lenses",
    excerpt: "Digital eye strain affects over 78% of office professionals. Learn the biological mechanisms of high-energy visible blue light and how optical shields protect your circadian rhythm.",
    thumbnail: "https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=1000&q=80",
    category: "Vision Health",
    readTime: "4 min read",
    author: {
      name: "Dr. Marcus Vance",
      role: "Senior Clinical Refractionist",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
    },
    tags: ["Blue Cut", "Computer Vision Syndrome", "Sleep Health"],
    content: `
In 2026, the average adult spends 10.4 hours interacting with pixel screens. Light in the 415nm to 455nm spectrum—known as High-Energy Visible (HEV) blue light—penetrates past the cornea directly into the retina.

### Warning Sign 1: The '3 PM Brow Ache'
A persistent, dull tension behind the forehead or between eyebrows when reading monitors is classic ciliary muscle spasm from micro-fluctuations in screen contrast.

### Warning Sign 2: Nocturnal Sleep Latency
Blue light suppresses melatonin production in the pineal gland. Wearing Blue-Cut Optical Lenses 3 hours prior to sleep restores natural melatonin spikes.

### Warning Sign 3: Dry & Gritty Cornea Syndrome
We blink 66% less frequently when looking at digital monitors. Eyelitz Blue-Shield lenses feature hydrophobic nano-coatings that reduce glare scatter, decreasing visual strain.
    `
  },
  {
    _id: "664000000000000000000003",
    title: "Progressive vs. Bifocal Lenses: The 2026 Modern Optical Breakthrough",
    slug: "progressive-vs-bifocal-breakthrough",
    excerpt: "Say goodbye to unsightly split lines. Explore the latest freeform digital surfacing technology that offers seamless multi-distance vision.",
    thumbnail: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=1000&q=80",
    category: "Lens Engineering",
    readTime: "6 min read",
    author: {
      name: "Dr. Sarah Mitchell",
      role: "Chief Optometrist",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80"
    },
    tags: ["Progressives", "Presbyopia", "Freeform Lenses"],
    content: `
Traditional bifocals have an obvious horizontal line separating distance and reading powers. Progressive lenses eliminate this barrier, offering a smooth corridor of continuous focus from infinity down to your smartphone screen.
    `
  }
];

const seedAdmin = {
  username: "admin",
  email: "admin@eyelitz.com",
  password: "admin123", // Will be hashed or matched
  role: "admin"
};

module.exports = {
  seedProducts,
  seedAppointments,
  seedOffers,
  seedReviews,
  seedBlogs,
  seedAdmin
};
