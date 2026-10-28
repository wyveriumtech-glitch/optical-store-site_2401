const {
  seedProducts,
  seedAppointments,
  seedOffers,
  seedReviews,
  seedBlogs,
  seedAdmin,
} = require('../data/seedData');
const bcrypt = require('bcryptjs');

class InMemoryStore {
  constructor() {
    this.products = JSON.parse(JSON.stringify(seedProducts));
    this.appointments = JSON.parse(JSON.stringify(seedAppointments));
    this.offers = JSON.parse(JSON.stringify(seedOffers));
    this.reviews = JSON.parse(JSON.stringify(seedReviews));
    this.blogs = JSON.parse(JSON.stringify(seedBlogs));
    this.admin = {
      username: seedAdmin.username,
      email: seedAdmin.email,
      passwordHash: bcrypt.hashSync(seedAdmin.password, 10),
      role: seedAdmin.role,
    };
  }

  // Products
  getProducts(filter = {}) {
    let list = [...this.products];
    if (filter.category && filter.category !== 'All') {
      list = list.filter((p) => p.category.toLowerCase() === filter.category.toLowerCase());
    }
    if (filter.frameShape && filter.frameShape !== 'All') {
      list = list.filter((p) => p.frameShape.toLowerCase() === filter.frameShape.toLowerCase());
    }
    if (filter.gender && filter.gender !== 'All') {
      list = list.filter(
        (p) => p.gender.toLowerCase() === filter.gender.toLowerCase() || p.gender === 'Unisex'
      );
    }
    if (filter.featured !== undefined) {
      list = list.filter((p) => p.featured === (filter.featured === 'true' || filter.featured === true));
    }
    if (filter.search) {
      const q = filter.search.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          (p.tags && p.tags.some((t) => t.toLowerCase().includes(q)))
      );
    }
    if (filter.minPrice) {
      list = list.filter((p) => (p.discountPrice || p.price) >= Number(filter.minPrice));
    }
    if (filter.maxPrice) {
      list = list.filter((p) => (p.discountPrice || p.price) <= Number(filter.maxPrice));
    }
    return list;
  }

  getProductById(id) {
    return this.products.find((p) => p._id === id || p.slug === id);
  }

  addProduct(data) {
    const newProduct = {
      ...data,
      _id: 'prod_' + Date.now(),
      slug: data.slug || data.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.products.unshift(newProduct);
    return newProduct;
  }

  updateProduct(id, data) {
    const idx = this.products.findIndex((p) => p._id === id || p.slug === id);
    if (idx === -1) return null;
    this.products[idx] = { ...this.products[idx], ...data, updatedAt: new Date().toISOString() };
    return this.products[idx];
  }

  deleteProduct(id) {
    const idx = this.products.findIndex((p) => p._id === id || p.slug === id);
    if (idx === -1) return false;
    this.products.splice(idx, 1);
    return true;
  }

  // Appointments
  getAppointments(statusFilter) {
    if (!statusFilter || statusFilter === 'All') return this.appointments;
    return this.appointments.filter((a) => a.status.toLowerCase() === statusFilter.toLowerCase());
  }

  getAppointmentById(id) {
    return this.appointments.find((a) => a._id === id || a.referenceCode === id);
  }

  addAppointment(data) {
    const ref = 'EY-' + Math.floor(100000 + Math.random() * 900000);
    const newApt = {
      ...data,
      _id: 'apt_' + Date.now(),
      referenceCode: ref,
      status: data.status || 'Pending',
      createdAt: new Date().toISOString(),
    };
    this.appointments.unshift(newApt);
    return newApt;
  }

  updateAppointmentStatus(id, status) {
    const idx = this.appointments.findIndex((a) => a._id === id || a.referenceCode === id);
    if (idx === -1) return null;
    this.appointments[idx].status = status;
    return this.appointments[idx];
  }

  deleteAppointment(id) {
    const idx = this.appointments.findIndex((a) => a._id === id || a.referenceCode === id);
    if (idx === -1) return false;
    this.appointments.splice(idx, 1);
    return true;
  }

  // Offers
  getOffers(onlyActive = false) {
    if (onlyActive) return this.offers.filter((o) => o.active);
    return this.offers;
  }

  addOffer(data) {
    const newOffer = {
      ...data,
      _id: 'off_' + Date.now(),
      active: data.active !== undefined ? data.active : true,
      createdAt: new Date().toISOString(),
    };
    this.offers.unshift(newOffer);
    return newOffer;
  }

  updateOffer(id, data) {
    const idx = this.offers.findIndex((o) => o._id === id);
    if (idx === -1) return null;
    this.offers[idx] = { ...this.offers[idx], ...data };
    return this.offers[idx];
  }

  deleteOffer(id) {
    const idx = this.offers.findIndex((o) => o._id === id);
    if (idx === -1) return false;
    this.offers.splice(idx, 1);
    return true;
  }

  // Reviews
  getReviews(verifiedOnly = true) {
    if (verifiedOnly) return this.reviews.filter((r) => r.verified);
    return this.reviews;
  }

  addReview(data) {
    const newRev = {
      ...data,
      _id: 'rev_' + Date.now(),
      verified: data.verified || false,
      createdAt: new Date().toISOString(),
    };
    this.reviews.unshift(newRev);
    return newRev;
  }

  toggleVerifyReview(id) {
    const rev = this.reviews.find((r) => r._id === id);
    if (!rev) return null;
    rev.verified = !rev.verified;
    return rev;
  }

  // Blogs
  getBlogs() {
    return this.blogs;
  }

  getBlogBySlug(slug) {
    return this.blogs.find((b) => b.slug === slug || b._id === slug);
  }

  addBlog(data) {
    const newBlog = {
      ...data,
      _id: 'blog_' + Date.now(),
      slug: data.slug || data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      createdAt: new Date().toISOString(),
    };
    this.blogs.unshift(newBlog);
    return newBlog;
  }

  deleteBlog(id) {
    const idx = this.blogs.findIndex((b) => b._id === id || b.slug === id);
    if (idx === -1) return false;
    this.blogs.splice(idx, 1);
    return true;
  }

  // Stats
  getStats() {
    const totalAppointments = this.appointments.length;
    const pendingAppointments = this.appointments.filter((a) => a.status === 'Pending').length;
    const confirmedAppointments = this.appointments.filter((a) => a.status === 'Confirmed').length;
    const totalProducts = this.products.length;
    const activeOffers = this.offers.filter((o) => o.active).length;
    const totalReviews = this.reviews.length;

    return {
      totalAppointments,
      pendingAppointments,
      confirmedAppointments,
      totalProducts,
      activeOffers,
      totalReviews,
      recentAppointments: this.appointments.slice(0, 5),
    };
  }
}

const memoryStore = new InMemoryStore();
module.exports = memoryStore;
