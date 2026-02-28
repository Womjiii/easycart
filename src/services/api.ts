import { 
  User, 
  Product, 
  Category, 
  CartItem, 
  Order, 
  OrderItem, 
  LoginCredentials, 
  RegisterData,
  DashboardStats,
  ApiResponse 
} from '../types';

const API_BASE = ''; // Empty string means same origin - uses PHP backend

async function fetchApi<T>(
  endpoint: string, 
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(`${API_BASE}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });
    
    const data = await response.json();
    return data;
  } catch (error) {
    return { 
      success: false, 
      message: error instanceof Error ? error.message : 'An error occurred' 
    };
  }
}

// Auth API
export const authApi = {
  login: async (credentials: LoginCredentials) => {
    const formData = new FormData();
    formData.append('email', credentials.email);
    formData.append('password', credentials.password);
    if (credentials.remember) {
      formData.append('remember', 'on');
    }
    
    try {
      const response = await fetch('login.php', {
        method: 'POST',
        body: formData,
      });
      
      // Check if redirected (successful login)
      if (response.ok || response.redirected) {
        return { success: true };
      }
      
      const text = await response.text();
      // Try to extract error message
      const match = text.match(/class="error"[^>]*>([^<]+)/);
      return { 
        success: false, 
        message: match ? match[1] : 'Login failed' 
      };
    } catch (error) {
      return { 
        success: false, 
        message: error instanceof Error ? error.message : 'An error occurred' 
      };
    }
  },
  
  register: async (data: RegisterData) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('email', data.email);
    formData.append('password', data.password);
    if (data.phone) formData.append('phone', data.phone);
    if (data.address) formData.append('address', data.address);
    
    try {
      const response = await fetch('register.php', {
        method: 'POST',
        body: formData,
      });
      
      if (response.ok || response.redirected) {
        return { success: true };
      }
      
      const text = await response.text();
      const match = text.match(/class="error"[^>]*>([^<]+)/);
      return { 
        success: false, 
        message: match ? match[1] : 'Registration failed' 
      };
    } catch (error) {
      return { 
        success: false, 
        message: error instanceof Error ? error.message : 'An error occurred' 
      };
    }
  },
  
  logout: async () => {
    try {
      await fetch('logout.php', { method: 'POST' });
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        message: error instanceof Error ? error.message : 'An error occurred' 
      };
    }
  },
  
  checkAuth: async (): Promise<User | null> => {
    try {
      const response = await fetch('config.php'); // Session check endpoint
      // This is simplified - in real app you'd have a dedicated auth check endpoint
      return null;
    } catch {
      return null;
    }
  }
};

// Products API
export const productsApi = {
  getAll: async (category?: string, search?: string): Promise<Product[]> => {
    const params = new URLSearchParams();
    if (category) params.append('category', category);
    if (search) params.append('search', search);
    
    const result = await fetchApi<{ products: Product[] }>(
      `index.php?${params.toString()}`
    );
    return result.data?.products || [];
  },
  
  getById: async (id: number): Promise<Product | null> => {
    const result = await fetchApi<{ product: Product }>(
      `product.php?id=${id}`
    );
    return result.data?.product || null;
  },
  
  getByCategory: async (category: string): Promise<Product[]> => {
    const result = await fetchApi<{ products: Product[] }>(
      `index.php?category=${encodeURIComponent(category)}`
    );
    return result.data?.products || [];
  },
  
  getFeatured: async (): Promise<Product[]> => {
    const result = await fetchApi<{ products: Product[] }>(
      'index.php?featured=true'
    );
    return result.data?.products || [];
  }
};

// Cart API
export const cartApi = {
  getItems: async (userId: number): Promise<CartItem[]> => {
    const result = await fetchApi<{ items: CartItem[] }>(
      `cart.php?action=get&user_id=${userId}`
    );
    return result.data?.items || [];
  },
  
  addItem: async (userId: number, productId: number, quantity: number) => {
    const formData = new FormData();
    formData.append('product_id', productId.toString());
    formData.append('quantity', quantity.toString());
    
    try {
      await fetch('cart.php?action=add', {
        method: 'POST',
        body: formData,
      });
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        message: error instanceof Error ? error.message : 'An error occurred' 
      };
    }
  },
  
  updateQuantity: async (cartId: number, quantity: number) => {
    const formData = new FormData();
    formData.append('cart_id', cartId.toString());
    formData.append('quantity', quantity.toString());
    
    try {
      await fetch('cart.php?action=update', {
        method: 'POST',
        body: formData,
      });
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        message: error instanceof Error ? error.message : 'An error occurred' 
      };
    }
  },
  
  removeItem: async (cartId: number) => {
    try {
      await fetch(`cart.php?action=remove&id=${cartId}`, {
        method: 'POST',
      });
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        message: error instanceof Error ? error.message : 'An error occurred' 
      };
    }
  }
};

// Orders API
export const ordersApi = {
  create: async (
    userId: number, 
    shippingAddress: string, 
    paymentMethod: string,
    items: { productId: number; quantity: number; price: number }[]
  ) => {
    const result = await fetchApi<{ orderId: number }>('checkout.php', {
      method: 'POST',
      body: JSON.stringify({
        user_id: userId,
        shipping_address: shippingAddress,
        payment_method: paymentMethod,
        items
      }),
    });
    return result;
  },
  
  getByUser: async (userId: number): Promise<Order[]> => {
    const result = await fetchApi<{ orders: Order[] }>(
      `order_details.php?user_id=${userId}`
    );
    return result.data?.orders || [];
  },
  
  getById: async (id: number): Promise<Order | null> => {
    const result = await fetchApi<{ order: Order }>(
      `order_details.php?id=${id}`
    );
    return result.data?.order || null;
  }
};

// Admin API
export const adminApi = {
  getDashboardStats: async (): Promise<DashboardStats> => {
    const result = await fetchApi<{ stats: DashboardStats }>(
      'admin/dashboard.php'
    );
    return result.data?.stats || {
      totalUsers: 0,
      totalProducts: 0,
      totalOrders: 0,
      totalRevenue: 0,
      pendingOrders: 0,
      processingOrders: 0,
      shippedOrders: 0,
      deliveredOrders: 0,
      cancelledOrders: 0
    };
  },
  
  getAllOrders: async (): Promise<Order[]> => {
    const result = await fetchApi<{ orders: Order[] }>(
      'admin/orders.php'
    );
    return result.data?.orders || [];
  },
  
  updateOrderStatus: async (orderId: number, status: string) => {
    try {
      const formData = new FormData();
      formData.append('order_id', orderId.toString());
      formData.append('status', status);
      
      await fetch('admin/order_details.php', {
        method: 'POST',
        body: formData,
      });
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        message: error instanceof Error ? error.message : 'An error occurred' 
      };
    }
  },
  
  getAllUsers: async (): Promise<User[]> => {
    const result = await fetchApi<{ users: User[] }>(
      'admin/users.php'
    );
    return result.data?.users || [];
  },
  
  getAllProducts: async (): Promise<Product[]> => {
    const result = await fetchApi<{ products: Product[] }>(
      'admin/products.php'
    );
    return result.data?.products || [];
  },
  
  createProduct: async (product: Omit<Product, 'id' | 'created_at'>) => {
    try {
      const formData = new FormData();
      formData.append('name', product.name);
      formData.append('description', product.description || '');
      formData.append('price', product.price.toString());
      formData.append('category', product.category);
      formData.append('stock', product.stock.toString());
      if (product.image) formData.append('image', product.image);
      
      await fetch('admin/products.php?action=add', {
        method: 'POST',
        body: formData,
      });
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        message: error instanceof Error ? error.message : 'An error occurred' 
      };
    }
  },
  
  updateProduct: async (product: Product) => {
    try {
      const formData = new FormData();
      formData.append('id', product.id.toString());
      formData.append('name', product.name);
      formData.append('description', product.description || '');
      formData.append('price', product.price.toString());
      formData.append('category', product.category);
      formData.append('stock', product.stock.toString());
      if (product.image) formData.append('image', product.image);
      
      await fetch('admin/edit_product.php', {
        method: 'POST',
        body: formData,
      });
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        message: error instanceof Error ? error.message : 'An error occurred' 
      };
    }
  },
  
  deleteProduct: async (productId: number) => {
    try {
      await fetch(`admin/products.php?action=delete&id=${productId}`, {
        method: 'POST',
      });
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        message: error instanceof Error ? error.message : 'An error occurred' 
      };
    }
  }
};
