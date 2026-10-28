'use client';
import React, { useState, useEffect } from 'react';
import {
  Glasses,
  Plus,
  Edit2,
  Trash2,
  Star,
  Check,
  X,
  Search,
  Sparkles,
  RefreshCw,
} from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import { api } from '@/lib/api';

export default function AdminProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const defaultForm = {
    name: '',
    category: 'Eyeglasses',
    frameShape: 'Square',
    gender: 'Unisex',
    price: 250,
    discountPrice: 200,
    images: ['https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80'],
    specs: {
      lensWidth: 52,
      bridgeWidth: 18,
      templeLength: 145,
      frameMaterial: 'Japanese Titanium & Acetate',
      weight: '16g',
      rimType: 'Full Rim',
    },
    stock: 20,
    featured: true,
    description: 'Handcrafted titanium silhouette with diamond-beveled temple edges and Zeiss lens compatibility.',
    tags: 'Titanium, 24K Gold, Luxury',
  };

  const [formData, setFormData] = useState(defaultForm);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const res = await api.getProducts();
      if (res.success && res.data) {
        setProducts(res.data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleOpenAdd = () => {
    setEditingProduct(null);
    setFormData(defaultForm);
    setModalOpen(true);
  };

  const handleOpenEdit = (p) => {
    setEditingProduct(p);
    setFormData({
      ...p,
      tags: Array.isArray(p.tags) ? p.tags.join(', ') : p.tags || '',
      images: p.images || [defaultForm.images[0]],
      specs: p.specs || defaultForm.specs,
    });
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this frame from vault?')) return;
    const token = localStorage.getItem('eyelitz_admin_token');
    try {
      const res = await api.deleteProduct(id, token);
      if (res.success) {
        loadProducts();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleToggleFeatured = async (product) => {
    const token = localStorage.getItem('eyelitz_admin_token');
    try {
      const res = await api.updateProduct(
        product._id,
        { featured: !product.featured },
        token
      );
      if (res.success) {
        loadProducts();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('eyelitz_admin_token');
    const payload = {
      ...formData,
      tags: typeof formData.tags === 'string' ? formData.tags.split(',').map((t) => t.trim()) : formData.tags,
      price: Number(formData.price),
      discountPrice: Number(formData.discountPrice),
      stock: Number(formData.stock),
    };

    try {
      if (editingProduct) {
        await api.updateProduct(editingProduct._id, payload, token);
      } else {
        await api.createProduct(payload, token);
      }
      setModalOpen(false);
      loadProducts();
    } catch (err) {
      alert(err.message);
    }
  };

  const filteredProducts = products.filter((p) => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q);
  });

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-serif font-bold text-white tracking-wide">
              Product Vault Management
            </h1>
            <p className="text-xs text-neutral-400 mt-1">
              Add, modify, and feature handcrafted frames and optical lenses.
            </p>
          </div>

          <button
            onClick={handleOpenAdd}
            className="px-5 py-3 rounded-xl bg-gold-gradient text-obsidian-950 font-bold text-xs uppercase tracking-wider shadow-gold-sm hover:scale-105 transition-all flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Frame Model</span>
          </button>
        </div>

        {/* Search */}
        <div className="p-4 rounded-2xl bg-obsidian-900 border border-white/10 flex items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-3" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by model name or category..."
              className="w-full bg-obsidian-850 border border-white/10 rounded-xl pl-9 pr-4 py-2 text-xs text-white focus:outline-none focus:border-gold-500"
            />
          </div>

          <span className="text-xs text-neutral-400">
            Total Vault Items: <strong className="text-white">{filteredProducts.length}</strong>
          </span>
        </div>

        {/* Table */}
        <div className="bg-obsidian-900 rounded-3xl border border-white/10 overflow-hidden shadow-xl">
          {loading ? (
            <div className="py-20 text-center text-neutral-400 text-sm">Loading catalog...</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-white/10 text-neutral-400 uppercase tracking-wider text-[10px] bg-obsidian-850/50">
                    <th className="py-3.5 px-4">Frame Model</th>
                    <th className="py-3.5 px-4">Category &amp; Shape</th>
                    <th className="py-3.5 px-4">Price</th>
                    <th className="py-3.5 px-4">Specs</th>
                    <th className="py-3.5 px-4">Featured</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filteredProducts.map((p) => (
                    <tr key={p._id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 rounded-xl bg-black/40 overflow-hidden flex-shrink-0 border border-white/10">
                            <img
                              src={p.images?.[0]}
                              alt=""
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <div className="font-serif font-bold text-white text-sm truncate max-w-xs">
                              {p.name}
                            </div>
                            <div className="text-[10px] text-neutral-400">Stock: {p.stock} units</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="font-semibold text-neutral-200">{p.category}</div>
                        <div className="text-[11px] text-neutral-400">{p.frameShape} • {p.gender}</div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="font-bold text-gold-400 text-sm">
                          ${p.discountPrice > 0 ? p.discountPrice : p.price}
                        </div>
                        {p.discountPrice > 0 && (
                          <div className="text-[10px] text-neutral-500 line-through">${p.price}</div>
                        )}
                      </td>
                      <td className="py-4 px-4 text-[11px] text-neutral-400">
                        {p.specs?.lensWidth}mm / {p.specs?.bridgeWidth}mm / {p.specs?.templeLength}mm
                      </td>
                      <td className="py-4 px-4">
                        <button
                          onClick={() => handleToggleFeatured(p)}
                          className={`p-1.5 rounded-lg border text-xs transition-colors ${
                            p.featured
                              ? 'bg-gold-500/20 border-gold-500 text-gold-400'
                              : 'bg-obsidian-850 border-white/10 text-neutral-500'
                          }`}
                          title="Toggle Signature Feature"
                        >
                          <Star className={`w-4 h-4 ${p.featured ? 'fill-gold-400' : ''}`} />
                        </button>
                      </td>
                      <td className="py-4 px-4 text-right space-x-2">
                        <button
                          onClick={() => handleOpenEdit(p)}
                          className="p-1.5 rounded-lg bg-obsidian-850 hover:bg-white/10 text-neutral-300 hover:text-white"
                          title="Edit"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(p._id)}
                          className="p-1.5 rounded-lg bg-obsidian-850 hover:bg-rose-500/20 text-neutral-400 hover:text-rose-400"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Add / Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div onClick={() => setModalOpen(false)} className="fixed inset-0 bg-black/80 backdrop-blur-md" />

          <div className="relative w-full max-w-2xl bg-obsidian-900 border border-gold-500/40 rounded-3xl p-6 sm:p-8 z-10 shadow-2xl my-8">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-5 right-5 p-2 text-neutral-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-2xl font-serif font-bold text-white mb-1">
              {editingProduct ? 'Edit Frame Specifications' : 'Add New Artisan Frame to Vault'}
            </h3>
            <p className="text-xs text-neutral-400 mb-6">
              Configure luxury specifications, titanium dimensions, and high-resolution visuals.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4 max-h-[75vh] overflow-y-auto pr-2">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-neutral-300">Frame Model Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-obsidian-850 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-gold-500"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-neutral-300">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-obsidian-850 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-gold-500"
                  >
                    <option value="Eyeglasses">Eyeglasses</option>
                    <option value="Sunglasses">Sunglasses</option>
                    <option value="Contact Lenses">Contact Lenses</option>
                    <option value="Kids">Kids</option>
                    <option value="Accessories">Accessories</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-neutral-300">Frame Shape</label>
                  <select
                    value={formData.frameShape}
                    onChange={(e) => setFormData({ ...formData, frameShape: e.target.value })}
                    className="w-full bg-obsidian-850 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-gold-500"
                  >
                    <option value="Square">Square</option>
                    <option value="Round">Round</option>
                    <option value="Aviator">Aviator</option>
                    <option value="Cat-Eye">Cat-Eye</option>
                    <option value="Geometric">Geometric</option>
                    <option value="Rimless">Rimless</option>
                    <option value="Clubmaster">Clubmaster</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-neutral-300">Gender</label>
                  <select
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                    className="w-full bg-obsidian-850 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-gold-500"
                  >
                    <option value="Unisex">Unisex</option>
                    <option value="Men">Men</option>
                    <option value="Women">Women</option>
                    <option value="Kids">Kids</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-neutral-300">Price ($) *</label>
                  <input
                    type="number"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full bg-obsidian-850 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-gold-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-neutral-300">Discount Price ($)</label>
                  <input
                    type="number"
                    value={formData.discountPrice}
                    onChange={(e) => setFormData({ ...formData, discountPrice: e.target.value })}
                    className="w-full bg-obsidian-850 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-gold-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-neutral-300">Vault Stock Units</label>
                  <input
                    type="number"
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                    className="w-full bg-obsidian-850 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-gold-500"
                  />
                </div>
              </div>

              {/* Specs */}
              <div className="p-4 bg-obsidian-850 rounded-2xl border border-white/5 space-y-3">
                <span className="text-[11px] font-bold uppercase tracking-wider text-gold-400 block">
                  Dimensions (Lens, Bridge, Temple)
                </span>
                <div className="grid grid-cols-3 gap-2">
                  <input
                    type="number"
                    placeholder="Lens Width mm"
                    value={formData.specs?.lensWidth}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        specs: { ...formData.specs, lensWidth: Number(e.target.value) },
                      })
                    }
                    className="bg-obsidian-900 border border-white/10 rounded-lg p-2 text-xs text-white"
                  />
                  <input
                    type="number"
                    placeholder="Bridge Width mm"
                    value={formData.specs?.bridgeWidth}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        specs: { ...formData.specs, bridgeWidth: Number(e.target.value) },
                      })
                    }
                    className="bg-obsidian-900 border border-white/10 rounded-lg p-2 text-xs text-white"
                  />
                  <input
                    type="number"
                    placeholder="Temple Length mm"
                    value={formData.specs?.templeLength}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        specs: { ...formData.specs, templeLength: Number(e.target.value) },
                      })
                    }
                    className="bg-obsidian-900 border border-white/10 rounded-lg p-2 text-xs text-white"
                  />
                </div>
              </div>

              {/* Image URL */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-neutral-300">Primary Image URL</label>
                <input
                  type="text"
                  value={formData.images?.[0] || ''}
                  onChange={(e) => setFormData({ ...formData, images: [e.target.value] })}
                  className="w-full bg-obsidian-850 border border-white/10 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-gold-500"
                />
              </div>

              {/* Tags */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-neutral-300">Tags (comma-separated)</label>
                <input
                  type="text"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  placeholder="Titanium, Polarized, 24K Gold"
                  className="w-full bg-obsidian-850 border border-white/10 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-gold-500"
                />
              </div>

              {/* Description */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-neutral-300">Description *</label>
                <textarea
                  rows={3}
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full bg-obsidian-850 border border-white/10 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-gold-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gold-gradient text-obsidian-950 font-bold text-xs uppercase tracking-widest shadow-gold-sm hover:scale-[1.01] transition-all"
              >
                {editingProduct ? 'Save Frame Changes' : 'Commit Frame to Catalog'}
              </button>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
