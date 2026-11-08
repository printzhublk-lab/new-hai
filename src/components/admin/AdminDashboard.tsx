import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { UserRole, OrderStatus, Product, ProductVariant } from '../../types';
import { 
  ShieldCheck, 
  BarChart3, 
  Package, 
  ShoppingBag, 
  FileText, 
  Truck, 
  History, 
  Download, 
  Plus, 
  Edit3, 
  Trash2, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  DollarSign, 
  Users, 
  Layers,
  ArrowRight,
  Filter
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const {
    currentUserRole,
    setCurrentUserRole,
    orders,
    updateOrderStatus,
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    quotations,
    updateQuoteStatus,
    wholesaleEnquiries,
    updateWholesaleStatus,
    auditLogs,
    addAuditLog,
    deliveryZones,
    updateDeliveryZone,
    showToast,
    navigateTo
  } = useApp();

  // Active Tab
  const [activeTab, setActiveTab] = useState<'overview' | 'hai' | 'rivora' | 'ran_diriya' | 'orders' | 'delivery' | 'audit'>('overview');

  // Product Edit Modal
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isNewProduct, setIsNewProduct] = useState(false);
  const [productForm, setProductForm] = useState({
    businessId: 'rivora' as 'rivora' | 'ran_diriya',
    name: '',
    category: 'Flower Bouquets',
    description: '',
    basePrice: 10000,
    stock: 20,
    sku: 'SKU-001'
  });

  // Calculate Metrics
  const totalSalesLkr = orders
    .filter(o => o.paymentStatus === 'paid')
    .reduce((sum, o) => sum + o.totalAmount, 0);

  const rivoraSales = orders
    .filter(o => o.businessId === 'rivora' && o.paymentStatus === 'paid')
    .reduce((sum, o) => sum + o.totalAmount, 0);

  const ranDiriyaSales = orders
    .filter(o => o.businessId === 'ran_diriya' && o.paymentStatus === 'paid')
    .reduce((sum, o) => sum + o.totalAmount, 0);

  const pendingOrders = orders.filter(o => o.status === 'Pending' || o.status === 'Processing').length;
  const readyOrders = orders.filter(o => o.status === 'Ready for Dispatch').length;

  const lowStockProducts = products.filter(p => p.stock <= 15);

  // RBAC Access Control Check
  const canAccessOverview = currentUserRole === 'super_admin';
  const canAccessHai = currentUserRole === 'super_admin' || currentUserRole === 'logistics_manager';
  const canAccessRivora = currentUserRole === 'super_admin' || currentUserRole === 'rivora_manager';
  const canAccessRanDiriya = currentUserRole === 'super_admin' || currentUserRole === 'ran_diriya_manager';
  const canAccessOrders = true; // All roles including order_staff
  const canAccessDelivery = currentUserRole === 'super_admin';
  const canAccessAudit = currentUserRole === 'super_admin';

  // Export CSV Helper
  const exportOrdersCsv = () => {
    const headers = ['Order ID', 'Business', 'Date', 'Customer', 'Phone', 'Address', 'Status', 'Total (LKR)', 'Payment Method', 'Payment Status'];
    const rows = orders.map(o => [
      o.id,
      o.businessId,
      new Date(o.createdAt).toLocaleDateString(),
      `"${o.deliveryDetails.customerName}"`,
      o.deliveryDetails.customerPhone,
      `"${o.deliveryDetails.addressLine1}, ${o.deliveryDetails.city}"`,
      o.status,
      o.totalAmount,
      o.paymentMethod,
      o.paymentStatus
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `hai_group_orders_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Orders exported to CSV', 'success');
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (isNewProduct) {
      addProduct({
        businessId: productForm.businessId,
        name: productForm.name,
        category: productForm.category,
        description: productForm.description,
        images: [productForm.businessId === 'rivora' ? '/src/assets/images/rivora_floral_hero_1794122586337.jpg' : '/src/assets/images/ran_diriya_ceylon_tea_1794122586212.jpg'],
        basePrice: Number(productForm.basePrice),
        sku: productForm.sku,
        stock: Number(productForm.stock),
        isAvailable: true,
        variants: [
          { id: `v-${Date.now()}`, name: 'Standard Unit', price: Number(productForm.basePrice), sku: productForm.sku, stock: Number(productForm.stock) }
        ]
      });
    } else if (editingProduct) {
      updateProduct(editingProduct.id, {
        name: productForm.name,
        category: productForm.category,
        description: productForm.description,
        basePrice: Number(productForm.basePrice),
        stock: Number(productForm.stock),
        sku: productForm.sku
      });
    }
    setEditingProduct(null);
    setIsNewProduct(false);
  };

  return (
    <div className="bg-slate-100 text-slate-900 min-h-screen pb-20">
      {/* Top Admin Control Bar */}
      <section className="bg-slate-950 text-white border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-600 rounded flex items-center justify-center font-bold">
              <ShieldCheck className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold tracking-tight text-white">
                  HAI Group Central Administration
                </h1>
                <span className="text-[10px] bg-slate-800 text-orange-400 border border-orange-500/30 px-2 py-0.5 rounded font-mono uppercase">
                  RBAC Secure
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Multi-brand management console with strict business-level isolation.
              </p>
            </div>
          </div>

          {/* Role Switcher */}
          <div className="flex items-center gap-2 bg-slate-900 p-1.5 rounded border border-slate-800 text-xs">
            <span className="text-slate-400 pl-2">Current Role:</span>
            <select
              value={currentUserRole}
              onChange={(e) => {
                const role = e.target.value as UserRole;
                setCurrentUserRole(role);
                addAuditLog('Role Switched', `Active role changed to ${role}`);
                showToast(`Switched active view to ${role.replace('_', ' ').toUpperCase()}`, 'info');
              }}
              className="bg-slate-800 text-white font-semibold rounded px-2.5 py-1 text-xs focus:outline-none border border-slate-700"
            >
              <option value="super_admin">Super Admin (All Access)</option>
              <option value="logistics_manager">Logistics Manager (HAI Corporate)</option>
              <option value="rivora_manager">Rivora Manager (Florals & Café)</option>
              <option value="ran_diriya_manager">Ran Diriya Manager (Spices & Tea)</option>
              <option value="order_staff">Order Staff (Processing Tasks)</option>
            </select>
          </div>
        </div>

        {/* Workspace Tabs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2 overflow-x-auto border-t border-slate-900 text-xs py-2 scrollbar-none">
          {canAccessOverview && (
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-3.5 py-2 rounded font-medium transition-colors whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === 'overview' ? 'bg-orange-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span>Group Overview</span>
            </button>
          )}

          {canAccessHai && (
            <button
              onClick={() => setActiveTab('hai')}
              className={`px-3.5 py-2 rounded font-medium transition-colors whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === 'hai' ? 'bg-blue-800 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>HAI Corporate & Quotes ({quotations.length})</span>
            </button>
          )}

          {canAccessRivora && (
            <button
              onClick={() => setActiveTab('rivora')}
              className={`px-3.5 py-2 rounded font-medium transition-colors whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === 'rivora' ? 'bg-emerald-900 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Package className="w-3.5 h-3.5" />
              <span>Rivora Storefront</span>
            </button>
          )}

          {canAccessRanDiriya && (
            <button
              onClick={() => setActiveTab('ran_diriya')}
              className={`px-3.5 py-2 rounded font-medium transition-colors whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === 'ran_diriya' ? 'bg-amber-950 text-amber-200 border border-amber-800' : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Layers className="w-3.5 h-3.5 text-amber-400" />
              <span>Ran Diriya & Wholesale ({wholesaleEnquiries.length})</span>
            </button>
          )}

          {canAccessOrders && (
            <button
              onClick={() => setActiveTab('orders')}
              className={`px-3.5 py-2 rounded font-medium transition-colors whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === 'orders' ? 'bg-slate-800 text-white border border-slate-700' : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Truck className="w-3.5 h-3.5" />
              <span>Order Processing ({orders.length})</span>
            </button>
          )}

          {canAccessDelivery && (
            <button
              onClick={() => setActiveTab('delivery')}
              className={`px-3.5 py-2 rounded font-medium transition-colors whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === 'delivery' ? 'bg-slate-800 text-white border border-slate-700' : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Truck className="w-3.5 h-3.5" />
              <span>Delivery Zones</span>
            </button>
          )}

          {canAccessAudit && (
            <button
              onClick={() => setActiveTab('audit')}
              className={`px-3.5 py-2 rounded font-medium transition-colors whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === 'audit' ? 'bg-slate-800 text-white border border-slate-700' : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <History className="w-3.5 h-3.5" />
              <span>Audit Log ({auditLogs.length})</span>
            </button>
          )}
        </div>
      </section>

      {/* Main Workspace Body */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* TAB 1: GROUP OVERVIEW */}
        {activeTab === 'overview' && canAccessOverview && (
          <div className="space-y-8">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="bg-white p-5 rounded border border-slate-200 shadow-sm">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                  Total Platform Sales
                </span>
                <div className="text-2xl font-bold font-mono text-slate-900 mt-1">
                  LKR {totalSalesLkr.toLocaleString()}
                </div>
                <div className="text-xs text-emerald-600 mt-1 flex items-center gap-1">
                  <span>Rivora: LKR {rivoraSales.toLocaleString()}</span>
                  <span>·</span>
                  <span>Ran Diriya: LKR {ranDiriyaSales.toLocaleString()}</span>
                </div>
              </div>

              <div className="bg-white p-5 rounded border border-slate-200 shadow-sm">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                  Confirmed Orders
                </span>
                <div className="text-2xl font-bold font-mono text-slate-900 mt-1">
                  {orders.length} Orders
                </div>
                <div className="text-xs text-orange-600 mt-1">
                  {pendingOrders} awaiting processing / dispatch
                </div>
              </div>

              <div className="bg-white p-5 rounded border border-slate-200 shadow-sm">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                  Corporate Freight Quotes
                </span>
                <div className="text-2xl font-bold font-mono text-blue-900 mt-1">
                  {quotations.length} Requests
                </div>
                <div className="text-xs text-slate-500 mt-1">
                  {quotations.filter(q => q.status === 'New').length} new unquoted submissions
                </div>
              </div>

              <div className="bg-white p-5 rounded border border-slate-200 shadow-sm">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                  Export Wholesale Inquiries
                </span>
                <div className="text-2xl font-bold font-mono text-amber-900 mt-1">
                  {wholesaleEnquiries.length} B2B Leads
                </div>
                <div className="text-xs text-emerald-700 mt-1">
                  Germany, UAE, European importers
                </div>
              </div>
            </div>

            {/* Inventory Alerts & CSV Export Row */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left 8 Cols: Recent Orders */}
              <div className="lg:col-span-8 bg-white p-6 rounded border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <h3 className="text-base font-bold text-slate-900">
                    Recent Customer Orders Across Brands
                  </h3>
                  <button
                    onClick={exportOrdersCsv}
                    className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded flex items-center gap-1.5 transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Export CSV</span>
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-slate-50 text-slate-600 uppercase border-b border-slate-200 font-semibold">
                      <tr>
                        <th className="py-2.5 px-3">Order ID</th>
                        <th className="py-2.5 px-3">Business</th>
                        <th className="py-2.5 px-3">Customer</th>
                        <th className="py-2.5 px-3">Total (LKR)</th>
                        <th className="py-2.5 px-3">Status</th>
                        <th className="py-2.5 px-3">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-medium">
                      {orders.slice(0, 6).map((ord) => (
                        <tr key={ord.id} className="hover:bg-slate-50">
                          <td className="py-2.5 px-3 font-mono font-bold text-slate-900">{ord.id}</td>
                          <td className="py-2.5 px-3">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase ${
                              ord.businessId === 'rivora' ? 'bg-emerald-50 text-emerald-800' : 'bg-amber-50 text-amber-800'
                            }`}>
                              {ord.businessId}
                            </span>
                          </td>
                          <td className="py-2.5 px-3 text-slate-700">{ord.deliveryDetails.customerName}</td>
                          <td className="py-2.5 px-3 font-mono text-slate-900">LKR {ord.totalAmount.toLocaleString()}</td>
                          <td className="py-2.5 px-3">
                            <span className="font-semibold text-slate-800">{ord.status}</span>
                          </td>
                          <td className="py-2.5 px-3">
                            <select
                              value={ord.status}
                              onChange={(e) => updateOrderStatus(ord.id, e.target.value as OrderStatus)}
                              className="text-[11px] p-1 border border-slate-300 rounded bg-white text-slate-900 focus:outline-none"
                            >
                              <option value="Pending">Pending</option>
                              <option value="Payment Confirmed">Payment Confirmed</option>
                              <option value="Processing">Processing</option>
                              <option value="Ready for Dispatch">Ready for Dispatch</option>
                              <option value="Dispatched">Dispatched</option>
                              <option value="Delivered">Delivered</option>
                              <option value="Cancelled">Cancelled</option>
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Right 4 Cols: Low Stock Alerts */}
              <div className="lg:col-span-4 bg-white p-6 rounded border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                  <AlertCircle className="w-4 h-4 text-orange-600" />
                  <h3 className="text-base font-bold text-slate-900">
                    Inventory & Stock Alerts
                  </h3>
                </div>

                {lowStockProducts.length === 0 ? (
                  <p className="text-xs text-slate-500">All product inventories are well stocked.</p>
                ) : (
                  <div className="space-y-3">
                    {lowStockProducts.map(p => (
                      <div key={p.id} className="p-3 bg-amber-50 rounded border border-amber-200 flex items-center justify-between text-xs">
                        <div>
                          <div className="font-semibold text-slate-900 line-clamp-1">{p.name}</div>
                          <span className="text-[10px] text-slate-500 uppercase">{p.businessId} · SKU: {p.sku}</span>
                        </div>
                        <div className="text-right shrink-0">
                          <span className="font-mono font-bold text-orange-700 bg-white px-2 py-0.5 rounded border border-orange-200">
                            {p.stock} left
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: HAI CORPORATE & QUOTES */}
        {activeTab === 'hai' && canAccessHai && (
          <div className="bg-white p-6 rounded border border-slate-200 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 pb-4 border-b border-slate-200">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-orange-600">
                  Corporate Freight Desk
                </span>
                <h2 className="text-xl font-bold text-slate-900">
                  Logistics Quotation Requests & Corporate Inquiries
                </h2>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-50 text-slate-600 uppercase border-b border-slate-200 font-semibold">
                  <tr>
                    <th className="py-3 px-3">Quote Ref</th>
                    <th className="py-3 px-3">Company & Contact</th>
                    <th className="py-3 px-3">Service</th>
                    <th className="py-3 px-3">Route (Origin → POD)</th>
                    <th className="py-3 px-3">Cargo Spec</th>
                    <th className="py-3 px-3">Status</th>
                    <th className="py-3 px-3">Quote Amount (LKR)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {quotations.map((q) => (
                    <tr key={q.id} className="hover:bg-slate-50">
                      <td className="py-3 px-3 font-mono font-bold text-[#0f2744]">{q.id}</td>
                      <td className="py-3 px-3">
                        <div className="font-bold text-slate-900">{q.companyName}</div>
                        <div className="text-[11px] text-slate-500">{q.contactPerson} · {q.email}</div>
                      </td>
                      <td className="py-3 px-3">
                        <span className="px-2 py-0.5 bg-blue-50 text-blue-800 rounded font-semibold text-[10px]">
                          {q.serviceType}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-slate-700">
                        <div>{q.originPort}</div>
                        <div className="text-[10px] text-slate-400">→ {q.destinationPort}</div>
                      </td>
                      <td className="py-3 px-3 text-slate-600">
                        <div>{q.cargoType}</div>
                        <div className="text-[10px] text-slate-400 font-mono">{q.estimatedWeightKg} kg / {q.estimatedVolumeCbm} CBM</div>
                      </td>
                      <td className="py-3 px-3">
                        <select
                          value={q.status}
                          onChange={(e) => updateQuoteStatus(q.id, e.target.value as any, q.quoteAmountLkr)}
                          className="text-[11px] p-1 border border-slate-300 rounded bg-white text-slate-900 focus:outline-none"
                        >
                          <option value="New">New</option>
                          <option value="Under Review">Under Review</option>
                          <option value="Quoted">Quoted</option>
                          <option value="Accepted">Accepted</option>
                          <option value="Declined">Declined</option>
                        </select>
                      </td>
                      <td className="py-3 px-3">
                        <input
                          type="number"
                          placeholder="Set quote LKR"
                          defaultValue={q.quoteAmountLkr}
                          onBlur={(e) => {
                            const val = Number(e.target.value);
                            if (val > 0) updateQuoteStatus(q.id, 'Quoted', val);
                          }}
                          className="w-28 px-2 py-1 text-xs border border-slate-300 rounded font-mono"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: RIVORA CATALOG & PRODUCTS */}
        {activeTab === 'rivora' && canAccessRivora && (
          <div className="bg-white p-6 rounded border border-slate-200 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 pb-4 border-b border-slate-200">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-emerald-700">
                  Rivora Storefront Workspace
                </span>
                <h2 className="text-xl font-serif-luxury font-bold text-[#244233]">
                  Bouquet, Gift & Café Catalogue Management
                </h2>
              </div>
              <button
                onClick={() => {
                  setProductForm({
                    businessId: 'rivora',
                    name: '',
                    category: 'Flower Bouquets',
                    description: '',
                    basePrice: 12000,
                    stock: 20,
                    sku: `RIV-${Date.now().toString().slice(-4)}`
                  });
                  setIsNewProduct(true);
                  setEditingProduct({} as any);
                }}
                className="px-4 py-2 bg-[#244233] hover:bg-[#1a3226] text-white text-xs uppercase tracking-wider font-semibold rounded flex items-center gap-1.5 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Rivora Product</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.filter(p => p.businessId === 'rivora').map(prod => (
                <div key={prod.id} className="p-4 rounded border border-slate-200 bg-slate-50 space-y-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={prod.images[0]}
                      alt={prod.name}
                      className="w-16 h-16 object-cover rounded border border-slate-200"
                      referrerPolicy="no-referrer"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="text-[10px] text-emerald-800 font-semibold uppercase">{prod.category}</div>
                      <h4 className="text-sm font-bold text-slate-900 truncate">{prod.name}</h4>
                      <div className="text-xs font-mono font-bold text-slate-800 mt-0.5">
                        LKR {prod.basePrice.toLocaleString()}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-200">
                    <span className="text-slate-600">Stock: <strong className="font-mono">{prod.stock}</strong> units</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setProductForm({
                            businessId: prod.businessId,
                            name: prod.name,
                            category: prod.category,
                            description: prod.description,
                            basePrice: prod.basePrice,
                            stock: prod.stock,
                            sku: prod.sku
                          });
                          setIsNewProduct(false);
                          setEditingProduct(prod);
                        }}
                        className="p-1 text-slate-600 hover:text-slate-900"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deleteProduct(prod.id)}
                        className="p-1 text-slate-400 hover:text-rose-600"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: RAN DIRIYA STORE & WHOLESALE */}
        {activeTab === 'ran_diriya' && canAccessRanDiriya && (
          <div className="bg-white p-6 rounded border border-slate-200 shadow-sm space-y-8">
            {/* Products management */}
            <div>
              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 pb-4 border-b border-slate-200">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-amber-800 font-brand-cinzel">
                    Ran Diriya Harvest Catalogue
                  </span>
                  <h2 className="text-xl font-bold font-brand-cinzel text-slate-900">
                    Ceylon Spices & Tea Products
                  </h2>
                </div>
                <button
                  onClick={() => {
                    setProductForm({
                      businessId: 'ran_diriya',
                      name: '',
                      category: 'Cinnamon',
                      description: '',
                      basePrice: 3500,
                      stock: 50,
                      sku: `RD-${Date.now().toString().slice(-4)}`
                    });
                    setIsNewProduct(true);
                    setEditingProduct({} as any);
                  }}
                  className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs uppercase tracking-wider font-bold rounded flex items-center gap-1.5 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Ceylon Spice / Tea</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-6">
                {products.filter(p => p.businessId === 'ran_diriya').map(prod => (
                  <div key={prod.id} className="p-4 rounded border border-slate-200 bg-slate-50 space-y-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={prod.images[0]}
                        alt={prod.name}
                        className="w-16 h-16 object-cover rounded border border-slate-200"
                        referrerPolicy="no-referrer"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="text-[10px] text-amber-800 font-semibold uppercase font-brand-cinzel">{prod.category}</div>
                        <h4 className="text-sm font-bold text-slate-900 truncate font-brand-cinzel">{prod.name}</h4>
                        <div className="text-xs font-mono font-bold text-slate-800 mt-0.5">
                          LKR {prod.basePrice.toLocaleString()}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-200">
                      <span className="text-slate-600">Stock: <strong className="font-mono">{prod.stock}</strong> units</span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            setProductForm({
                              businessId: prod.businessId,
                              name: prod.name,
                              category: prod.category,
                              description: prod.description,
                              basePrice: prod.basePrice,
                              stock: prod.stock,
                              sku: prod.sku
                            });
                            setIsNewProduct(false);
                            setEditingProduct(prod);
                          }}
                          className="p-1 text-slate-600 hover:text-slate-900"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deleteProduct(prod.id)}
                          className="p-1 text-slate-400 hover:text-rose-600"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Wholesale B2B Inquiries */}
            <div className="pt-8 border-t border-slate-200">
              <h3 className="text-base font-bold font-brand-cinzel text-slate-900 mb-4">
                Wholesale & Bulk Export Inquiries ({wholesaleEnquiries.length})
              </h3>

              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="bg-slate-50 text-slate-600 uppercase border-b border-slate-200 font-semibold">
                    <tr>
                      <th className="py-2.5 px-3">Lead ID</th>
                      <th className="py-2.5 px-3">Buyer & Entity</th>
                      <th className="py-2.5 px-3">Country / Port</th>
                      <th className="py-2.5 px-3">Volume & Packaging</th>
                      <th className="py-2.5 px-3">Products</th>
                      <th className="py-2.5 px-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium">
                    {wholesaleEnquiries.map(whl => (
                      <tr key={whl.id} className="hover:bg-slate-50">
                        <td className="py-2.5 px-3 font-mono font-bold text-amber-900">{whl.id}</td>
                        <td className="py-2.5 px-3">
                          <div className="font-bold text-slate-900">{whl.companyName}</div>
                          <div className="text-[10px] text-slate-500">{whl.buyerName} · {whl.email}</div>
                        </td>
                        <td className="py-2.5 px-3 text-slate-700">
                          <div>{whl.country}</div>
                          <div className="text-[10px] text-slate-400">POD: {whl.portOfDischarge}</div>
                        </td>
                        <td className="py-2.5 px-3 text-slate-700">
                          <div>{whl.estimatedVolume}</div>
                          <div className="text-[10px] text-slate-400">{whl.packagingPreference}</div>
                        </td>
                        <td className="py-2.5 px-3 text-slate-600 max-w-xs truncate">
                          {whl.productInterests.join(', ')}
                        </td>
                        <td className="py-2.5 px-3">
                          <select
                            value={whl.status}
                            onChange={(e) => updateWholesaleStatus(whl.id, e.target.value as any)}
                            className="text-[11px] p-1 border border-slate-300 rounded bg-white text-slate-900 focus:outline-none"
                          >
                            <option value="New">New</option>
                            <option value="Sample Sent">Sample Sent</option>
                            <option value="Negotiating">Negotiating</option>
                            <option value="Contract Signed">Contract Signed</option>
                            <option value="Closed">Closed</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: ORDERS MANAGER */}
        {activeTab === 'orders' && canAccessOrders && (
          <div className="bg-white p-6 rounded border border-slate-200 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 pb-4 border-b border-slate-200">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Fulfillment & Dispatch
                </span>
                <h2 className="text-xl font-bold text-slate-900">
                  Order Management Across Stores ({orders.length})
                </h2>
              </div>
              <button
                onClick={exportOrdersCsv}
                className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded flex items-center gap-1.5 transition-colors self-start sm:self-auto"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Orders CSV</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-50 text-slate-600 uppercase border-b border-slate-200 font-semibold">
                  <tr>
                    <th className="py-3 px-3">Order ID</th>
                    <th className="py-3 px-3">Brand</th>
                    <th className="py-3 px-3">Customer / Delivery</th>
                    <th className="py-3 px-3">Items Summary</th>
                    <th className="py-3 px-3">Payable Amount</th>
                    <th className="py-3 px-3">Status Pipeline</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {orders.map(ord => (
                    <tr key={ord.id} className="hover:bg-slate-50">
                      <td className="py-3 px-3 font-mono font-bold text-slate-900">
                        {ord.id}
                        <div className="text-[10px] text-slate-400 font-normal">{new Date(ord.createdAt).toLocaleDateString()}</div>
                      </td>
                      <td className="py-3 px-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase ${
                          ord.businessId === 'rivora' ? 'bg-emerald-50 text-emerald-800' : 'bg-amber-50 text-amber-800'
                        }`}>
                          {ord.businessId}
                        </span>
                      </td>
                      <td className="py-3 px-3">
                        <div className="font-bold text-slate-900">{ord.deliveryDetails.customerName}</div>
                        <div className="text-[11px] text-slate-500">{ord.deliveryDetails.city}, {ord.deliveryDetails.country}</div>
                      </td>
                      <td className="py-3 px-3 text-slate-600 max-w-xs truncate">
                        {ord.items.map(i => `${i.quantity}x ${i.name}`).join(', ')}
                      </td>
                      <td className="py-3 px-3 font-mono text-slate-900 font-bold">
                        LKR {ord.totalAmount.toLocaleString()}
                        <div className="text-[10px] text-slate-400 font-normal uppercase">{ord.paymentMethod}</div>
                      </td>
                      <td className="py-3 px-3">
                        <select
                          value={ord.status}
                          onChange={(e) => updateOrderStatus(ord.id, e.target.value as OrderStatus)}
                          className="text-[11px] p-1.5 border border-slate-300 rounded bg-white text-slate-900 font-semibold focus:outline-none"
                        >
                          <option value="Pending">Pending</option>
                          <option value="Payment Confirmed">Payment Confirmed</option>
                          <option value="Processing">Processing</option>
                          <option value="Ready for Dispatch">Ready for Dispatch</option>
                          <option value="Dispatched">Dispatched</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                          <option value="Refunded">Refunded</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 6: DELIVERY ZONES */}
        {activeTab === 'delivery' && canAccessDelivery && (
          <div className="bg-white p-6 rounded border border-slate-200 shadow-sm space-y-6">
            <h2 className="text-xl font-bold text-slate-900 pb-4 border-b border-slate-200">
              Delivery Zones & Fee Threshold Configuration
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {deliveryZones.map(zone => (
                <div key={zone.id} className="p-5 bg-slate-50 rounded border border-slate-200 space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-500">{zone.businessId}</span>
                      <h4 className="text-base font-bold text-slate-900">{zone.name}</h4>
                    </div>
                  </div>

                  <div className="text-xs text-slate-600">
                    <span className="font-semibold block">Coverage:</span>
                    {zone.coverageAreas.join(', ')}
                  </div>

                  <div className="grid grid-cols-3 gap-3 pt-2 text-xs">
                    <div>
                      <label className="block text-[10px] font-semibold text-slate-500 uppercase">Std Fee (LKR)</label>
                      <input
                        type="number"
                        value={zone.standardFeeLkr}
                        onChange={(e) => updateDeliveryZone(zone.id, { standardFeeLkr: Number(e.target.value) })}
                        className="w-full px-2 py-1 bg-white border border-slate-300 rounded font-mono text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-semibold text-slate-500 uppercase">Express Fee</label>
                      <input
                        type="number"
                        value={zone.expressFeeLkr}
                        onChange={(e) => updateDeliveryZone(zone.id, { expressFeeLkr: Number(e.target.value) })}
                        className="w-full px-2 py-1 bg-white border border-slate-300 rounded font-mono text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-semibold text-slate-500 uppercase">Free Over (LKR)</label>
                      <input
                        type="number"
                        value={zone.freeDeliveryThresholdLkr}
                        onChange={(e) => updateDeliveryZone(zone.id, { freeDeliveryThresholdLkr: Number(e.target.value) })}
                        className="w-full px-2 py-1 bg-white border border-slate-300 rounded font-mono text-xs"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 7: AUDIT LOGS */}
        {activeTab === 'audit' && canAccessAudit && (
          <div className="bg-white p-6 rounded border border-slate-200 shadow-sm space-y-6">
            <h2 className="text-xl font-bold text-slate-900 pb-4 border-b border-slate-200">
              System & Administrative Audit Logs ({auditLogs.length})
            </h2>

            <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
              {auditLogs.map(log => (
                <div key={log.id} className="p-3 bg-slate-50 rounded border border-slate-200 text-xs flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900">{log.action}</span>
                      <span className="text-[10px] bg-slate-200 text-slate-700 px-1.5 py-0.2 rounded font-mono">{log.actor} ({log.role})</span>
                      {log.businessId && (
                        <span className="text-[10px] uppercase font-semibold text-slate-500">[{log.businessId}]</span>
                      )}
                    </div>
                    <div className="text-slate-600">{log.details}</div>
                  </div>
                  <div className="text-slate-400 font-mono text-[10px] shrink-0">
                    {new Date(log.timestamp).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Product Edit / Create Modal */}
      {editingProduct && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-2xl max-w-lg w-full p-6 space-y-4">
            <div className="flex justify-between items-center pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">
                {isNewProduct ? 'Add New Product to Store' : 'Edit Product Catalogue Entry'}
              </h3>
              <button
                onClick={() => setEditingProduct(null)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 uppercase mb-1">Store / Business</label>
                <select
                  disabled={!isNewProduct}
                  value={productForm.businessId}
                  onChange={(e) => setProductForm({ ...productForm, businessId: e.target.value as any })}
                  className="w-full px-3 py-2 border border-slate-300 rounded bg-white text-slate-900 font-semibold"
                >
                  <option value="rivora">Rivora Boutique</option>
                  <option value="ran_diriya">Ran Diriya Ceylon Spices</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 uppercase mb-1">Product Name</label>
                <input
                  type="text"
                  required
                  value={productForm.name}
                  onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 uppercase mb-1">Category</label>
                  <input
                    type="text"
                    required
                    value={productForm.category}
                    onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 uppercase mb-1">SKU</label>
                  <input
                    type="text"
                    required
                    value={productForm.sku}
                    onChange={(e) => setProductForm({ ...productForm, sku: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 uppercase mb-1">Base Price (LKR)</label>
                  <input
                    type="number"
                    required
                    value={productForm.basePrice}
                    onChange={(e) => setProductForm({ ...productForm, basePrice: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-slate-300 rounded font-mono"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 uppercase mb-1">Available Stock</label>
                  <input
                    type="number"
                    required
                    value={productForm.stock}
                    onChange={(e) => setProductForm({ ...productForm, stock: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-slate-300 rounded font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 uppercase mb-1">Description</label>
                <textarea
                  rows={3}
                  required
                  value={productForm.description}
                  onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  className="px-4 py-2 border border-slate-300 rounded text-slate-700 hover:bg-slate-50 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded font-semibold"
                >
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
