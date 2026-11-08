import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  BusinessId,
  Product,
  CartItem,
  Order,
  OrderStatus,
  QuotationRequest,
  WholesaleEnquiry,
  UserRole,
  DeliveryZone,
  AuditLog
} from '../types';
import {
  INITIAL_PRODUCTS,
  INITIAL_ORDERS,
  INITIAL_QUOTATIONS,
  INITIAL_WHOLESALE,
  INITIAL_AUDIT_LOGS,
  INITIAL_DELIVERY_ZONES
} from '../data/mockData';

interface ToastMessage {
  id: string;
  message: string;
  type: 'success' | 'info' | 'error';
}

interface AppContextType {
  currentRoute: string;
  navigateTo: (route: string) => void;
  currentBusiness: BusinessId;
  products: Product[];
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;

  // Carts strictly segregated by business
  rivoraCart: CartItem[];
  ranDiriyaCart: CartItem[];
  addToCart: (businessId: 'rivora' | 'ran_diriya', item: Omit<CartItem, 'id'>) => void;
  updateCartQuantity: (businessId: 'rivora' | 'ran_diriya', itemId: string, quantity: number) => void;
  removeFromCart: (businessId: 'rivora' | 'ran_diriya', itemId: string) => void;
  clearCart: (businessId: 'rivora' | 'ran_diriya') => void;

  // Orders
  orders: Order[];
  placeOrder: (orderData: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>) => Promise<Order>;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;

  // Quotations & Wholesale
  quotations: QuotationRequest[];
  submitQuotation: (quoteData: Omit<QuotationRequest, 'id' | 'createdAt' | 'status'>) => Promise<QuotationRequest>;
  updateQuoteStatus: (quoteId: string, status: QuotationRequest['status'], quoteAmountLkr?: number) => void;

  wholesaleEnquiries: WholesaleEnquiry[];
  submitWholesale: (enquiryData: Omit<WholesaleEnquiry, 'id' | 'createdAt' | 'status'>) => Promise<WholesaleEnquiry>;
  updateWholesaleStatus: (enquiryId: string, status: WholesaleEnquiry['status']) => void;

  // RBAC & Administration
  currentUserRole: UserRole;
  setCurrentUserRole: (role: UserRole) => void;
  auditLogs: AuditLog[];
  addAuditLog: (action: string, details: string, businessId?: BusinessId | 'all') => void;

  // Delivery
  deliveryZones: DeliveryZone[];
  updateDeliveryZone: (id: string, updates: Partial<DeliveryZone>) => void;

  // Toasts
  toasts: ToastMessage[];
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Routing
  const [currentRoute, setCurrentRoute] = useState<string>(() => {
    return window.location.pathname || '/';
  });

  const navigateTo = (route: string) => {
    setCurrentRoute(route);
    window.history.pushState({}, '', route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handlePopState = () => {
      setCurrentRoute(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Determine current active business brand
  const currentBusiness: BusinessId = (() => {
    if (currentRoute.startsWith('/rivora')) return 'rivora';
    if (currentRoute.startsWith('/ran-diriya')) return 'ran_diriya';
    return 'hai_logistic';
  })();

  // Products
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('hai_platform_products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  useEffect(() => {
    localStorage.setItem('hai_platform_products', JSON.stringify(products));
  }, [products]);

  const addProduct = (productData: Omit<Product, 'id'>) => {
    const newProduct: Product = {
      ...productData,
      id: `${productData.businessId === 'rivora' ? 'riv' : 'rd'}-${Date.now()}`
    };
    setProducts(prev => [newProduct, ...prev]);
    addAuditLog('Product Created', `Created product "${newProduct.name}" in ${newProduct.businessId}`, newProduct.businessId);
    showToast(`Added ${newProduct.name} to catalogue`, 'success');
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
    addAuditLog('Product Updated', `Updated product details for ID ${id}`, updates.businessId);
    showToast('Product updated successfully', 'success');
  };

  const deleteProduct = (id: string) => {
    const target = products.find(p => p.id === id);
    setProducts(prev => prev.filter(p => p.id !== id));
    if (target) {
      addAuditLog('Product Deleted', `Deleted product "${target.name}" (${id})`, target.businessId);
      showToast('Product removed from catalogue', 'info');
    }
  };

  // Carts (Separated by business)
  const [rivoraCart, setRivoraCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('hai_cart_rivora');
    return saved ? JSON.parse(saved) : [];
  });

  const [ranDiriyaCart, setRanDiriyaCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('hai_cart_ran_diriya');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('hai_cart_rivora', JSON.stringify(rivoraCart));
  }, [rivoraCart]);

  useEffect(() => {
    localStorage.setItem('hai_cart_ran_diriya', JSON.stringify(ranDiriyaCart));
  }, [ranDiriyaCart]);

  const addToCart = (businessId: 'rivora' | 'ran_diriya', item: Omit<CartItem, 'id'>) => {
    const newItem: CartItem = {
      ...item,
      id: `${businessId}-${item.productId}-${item.selectedVariant?.id || 'default'}-${Date.now()}`
    };

    if (businessId === 'rivora') {
      setRivoraCart(prev => [...prev, newItem]);
      showToast(`Added "${item.name}" to Rivora basket`, 'success');
    } else {
      setRanDiriyaCart(prev => [...prev, newItem]);
      showToast(`Added "${item.name}" to Ran Diriya basket`, 'success');
    }
  };

  const updateCartQuantity = (businessId: 'rivora' | 'ran_diriya', itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(businessId, itemId);
      return;
    }
    const updateFn = (items: CartItem[]) =>
      items.map(item => item.id === itemId ? { ...item, quantity } : item);

    if (businessId === 'rivora') {
      setRivoraCart(updateFn);
    } else {
      setRanDiriyaCart(updateFn);
    }
  };

  const removeFromCart = (businessId: 'rivora' | 'ran_diriya', itemId: string) => {
    if (businessId === 'rivora') {
      setRivoraCart(prev => prev.filter(item => item.id !== itemId));
    } else {
      setRanDiriyaCart(prev => prev.filter(item => item.id !== itemId));
    }
    showToast('Item removed from cart', 'info');
  };

  const clearCart = (businessId: 'rivora' | 'ran_diriya') => {
    if (businessId === 'rivora') setRivoraCart([]);
    else setRanDiriyaCart([]);
  };

  // Orders
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('hai_platform_orders');
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });

  useEffect(() => {
    localStorage.setItem('hai_platform_orders', JSON.stringify(orders));
  }, [orders]);

  const placeOrder = async (orderData: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>): Promise<Order> => {
    const prefix = orderData.businessId === 'rivora' ? 'RIV' : 'RD';
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const newOrder: Order = {
      ...orderData,
      id: `${prefix}-2026-${randomNum}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      trackingNumber: `${prefix}-TRK-${Math.floor(100000 + Math.random() * 900000)}`
    };

    setOrders(prev => [newOrder, ...prev]);
    clearCart(orderData.businessId);

    // Deduct stock
    setProducts(prev => prev.map(p => {
      const orderedItem = orderData.items.find(i => i.productId === p.id);
      if (orderedItem) {
        return {
          ...p,
          stock: Math.max(0, p.stock - orderedItem.quantity)
        };
      }
      return p;
    }));

    addAuditLog('New Order Placed', `Order ${newOrder.id} placed for LKR ${newOrder.totalAmount.toLocaleString()} (${orderData.businessId})`, orderData.businessId);
    showToast(`Order ${newOrder.id} confirmed successfully!`, 'success');
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders(prev => prev.map(order => {
      if (order.id === orderId) {
        return {
          ...order,
          status,
          updatedAt: new Date().toISOString()
        };
      }
      return order;
    }));
    addAuditLog('Order Status Update', `Updated order ${orderId} status to "${status}"`);
    showToast(`Order status updated to ${status}`, 'success');
  };

  // Quotations
  const [quotations, setQuotations] = useState<QuotationRequest[]>(() => {
    const saved = localStorage.getItem('hai_platform_quotes');
    return saved ? JSON.parse(saved) : INITIAL_QUOTATIONS;
  });

  useEffect(() => {
    localStorage.setItem('hai_platform_quotes', JSON.stringify(quotations));
  }, [quotations]);

  const submitQuotation = async (quoteData: Omit<QuotationRequest, 'id' | 'createdAt' | 'status'>) => {
    const newQuote: QuotationRequest = {
      ...quoteData,
      id: `QUOTE-2026-${Math.floor(200 + Math.random() * 800)}`,
      createdAt: new Date().toISOString(),
      status: 'New'
    };
    setQuotations(prev => [newQuote, ...prev]);
    addAuditLog('Quotation Submitted', `Received quote request ${newQuote.id} from ${newQuote.companyName} (${newQuote.serviceType})`, 'hai_logistic');
    showToast('Logistics quotation request received. Reference: ' + newQuote.id, 'success');
    return newQuote;
  };

  const updateQuoteStatus = (quoteId: string, status: QuotationRequest['status'], quoteAmountLkr?: number) => {
    setQuotations(prev => prev.map(q => {
      if (q.id === quoteId) {
        return {
          ...q,
          status,
          ...(quoteAmountLkr !== undefined ? { quoteAmountLkr } : {})
        };
      }
      return q;
    }));
    addAuditLog('Quote Updated', `Quote ${quoteId} status set to ${status}${quoteAmountLkr ? ` with amount LKR ${quoteAmountLkr.toLocaleString()}` : ''}`, 'hai_logistic');
    showToast('Quote updated', 'success');
  };

  // Wholesale Enquiries
  const [wholesaleEnquiries, setWholesaleEnquiries] = useState<WholesaleEnquiry[]>(() => {
    const saved = localStorage.getItem('hai_platform_wholesale');
    return saved ? JSON.parse(saved) : INITIAL_WHOLESALE;
  });

  useEffect(() => {
    localStorage.setItem('hai_platform_wholesale', JSON.stringify(wholesaleEnquiries));
  }, [wholesaleEnquiries]);

  const submitWholesale = async (enquiryData: Omit<WholesaleEnquiry, 'id' | 'createdAt' | 'status'>) => {
    const newEnquiry: WholesaleEnquiry = {
      ...enquiryData,
      id: `WHL-2026-${Math.floor(100 + Math.random() * 900)}`,
      createdAt: new Date().toISOString(),
      status: 'New'
    };
    setWholesaleEnquiries(prev => [newEnquiry, ...prev]);
    addAuditLog('Wholesale Enquiry', `New export enquiry ${newEnquiry.id} from ${newEnquiry.companyName} (${newEnquiry.country})`, 'ran_diriya');
    showToast('Export wholesale enquiry submitted. Ref: ' + newEnquiry.id, 'success');
    return newEnquiry;
  };

  const updateWholesaleStatus = (enquiryId: string, status: WholesaleEnquiry['status']) => {
    setWholesaleEnquiries(prev => prev.map(w => w.id === enquiryId ? { ...w, status } : w));
    addAuditLog('Wholesale Updated', `Wholesale request ${enquiryId} updated to ${status}`, 'ran_diriya');
    showToast('Wholesale lead status updated', 'success');
  };

  // RBAC & Roles
  const [currentUserRole, setCurrentUserRole] = useState<UserRole>('super_admin');

  // Audit Logs
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(() => {
    const saved = localStorage.getItem('hai_platform_audit');
    return saved ? JSON.parse(saved) : INITIAL_AUDIT_LOGS;
  });

  const addAuditLog = (action: string, details: string, businessId?: BusinessId | 'all') => {
    const log: AuditLog = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toISOString(),
      actor: currentUserRole === 'super_admin' ? 'Super Admin' :
             currentUserRole === 'logistics_manager' ? 'Logistics Manager' :
             currentUserRole === 'rivora_manager' ? 'Rivora Manager' :
             currentUserRole === 'ran_diriya_manager' ? 'Ran Diriya Manager' : 'Order Staff',
      role: currentUserRole,
      action,
      details,
      businessId: businessId || 'all'
    };
    setAuditLogs(prev => [log, ...prev].slice(0, 100));
  };

  useEffect(() => {
    localStorage.setItem('hai_platform_audit', JSON.stringify(auditLogs));
  }, [auditLogs]);

  // Delivery Zones
  const [deliveryZones, setDeliveryZones] = useState<DeliveryZone[]>(() => {
    const saved = localStorage.getItem('hai_delivery_zones');
    return saved ? JSON.parse(saved) : INITIAL_DELIVERY_ZONES;
  });

  const updateDeliveryZone = (id: string, updates: Partial<DeliveryZone>) => {
    setDeliveryZones(prev => prev.map(z => z.id === id ? { ...z, ...updates } : z));
    addAuditLog('Delivery Settings Changed', `Updated delivery zone configuration for ${id}`);
    showToast('Delivery zone rates updated', 'success');
  };

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'info') => {
    const id = `${Date.now()}-${Math.random()}`;
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  return (
    <AppContext.Provider
      value={{
        currentRoute,
        navigateTo,
        currentBusiness,
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        rivoraCart,
        ranDiriyaCart,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        orders,
        placeOrder,
        updateOrderStatus,
        quotations,
        submitQuotation,
        updateQuoteStatus,
        wholesaleEnquiries,
        submitWholesale,
        updateWholesaleStatus,
        currentUserRole,
        setCurrentUserRole,
        auditLogs,
        addAuditLog,
        deliveryZones,
        updateDeliveryZone,
        toasts,
        showToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
