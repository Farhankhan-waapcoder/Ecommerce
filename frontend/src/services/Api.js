import axios from 'axios';
// Create axios instance for Admin Ecommerce API using proxy
const adminApi = axios.create({
  baseURL: 'http://localhost:5000/api', // Use local backend API directly
  headers: {
    'Content-Type': 'application/json',
  },
});



// Create a separate axios instance for FakeStoreAPI (since it doesn't need auth)
const fakeStoreApi = axios.create({
  baseURL: import.meta.env.VITE_FAKE_STORE_API_URL || 'https://fakestoreapi.com',
  headers: {
    'Content-Type': 'application/json',
  },
});
// Add an interceptor to handle authentication
adminApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for better error handling
adminApi.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('token');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

// PRODUCTS API CALLS

export const productAPI = {
  // Get all products
  getAllProducts: async () => {
    try {
      const response = await fakeStoreApi.get('/products');
      return {
        success: true,
        data: response.data,
        message: 'Products fetched successfully'
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data || error.message,
        message: 'Failed to fetch products'
      };
    }
  },

  // Get products with limit
  getProductsWithLimit: async (limit = 5) => {
    try {
      const response = await fakeStoreApi.get(`/products?limit=${limit}`);
      return {
        success: true,
        data: response.data,
        message: `Top ${limit} products fetched successfully`
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data || error.message,
        message: 'Failed to fetch limited products'
      };
    }
  },

  // Get products sorted
  getProductsSorted: async (sort = 'desc') => {
    try {
      const response = await fakeStoreApi.get(`/products?sort=${sort}`);
      return {
        success: true,
        data: response.data,
        message: `Products sorted ${sort} fetched successfully`
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data || error.message,
        message: 'Failed to fetch sorted products'
      };
    }
  },

  // Get single product
  getProductById: async (id) => {
    try {
      const response = await fakeStoreApi.get(`/products/${id}`);
      return {
        success: true,
        data: response.data,
        message: 'Product fetched successfully'
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data || error.message,
        message: 'Failed to fetch product'
      };
    }
  },
};

// CATEGORIES API CALLS

export const categoryAPI = {
  // Get all categories
  getAllCategories: async () => {
    try {
      const response = await fakeStoreApi.get('/products/categories');
      return {
        success: true,
        data: response.data,
        message: 'Categories fetched successfully'
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data || error.message,
        message: 'Failed to fetch categories'
      };
    }
  },

  // Get products by category
  getProductsByCategory: async (category) => {
    try {
      const response = await fakeStoreApi.get(`/products/category/${category}`);
      return {
        success: true,
        data: response.data,
        message: `Products from ${category} category fetched successfully`
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data || error.message,
        message: 'Failed to fetch products by category'
      };
    }
  }
};

// CART API CALLS

export const cartAPI = {
  // Get all carts
  getAllCarts: async () => {
    try {
      const response = await fakeStoreApi.get('/carts');
      return {
        success: true,
        data: response.data,
        message: 'Carts fetched successfully'
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data || error.message,
        message: 'Failed to fetch carts'
      };
    }
  },

  // Get carts with limit
  getCartsWithLimit: async (limit = 5) => {
    try {
      const response = await fakeStoreApi.get(`/carts?limit=${limit}`);
      return {
        success: true,
        data: response.data,
        message: `Top ${limit} carts fetched successfully`
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data || error.message,
        message: 'Failed to fetch limited carts'
      };
    }
  },

  // Get carts sorted
  getCartsSorted: async (sort = 'desc') => {
    try {
      const response = await fakeStoreApi.get(`/carts?sort=${sort}`);
      return {
        success: true,
        data: response.data,
        message: `Carts sorted ${sort} fetched successfully`
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data || error.message,
        message: 'Failed to fetch sorted carts'
      };
    }
  },

  // Get carts by date range
  getCartsByDateRange: async (startDate, endDate) => {
    try {
      const response = await fakeStoreApi.get(`/carts?startdate=${startDate}&enddate=${endDate}`);
      return {
        success: true,
        data: response.data,
        message: 'Carts by date range fetched successfully'
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data || error.message,
        message: 'Failed to fetch carts by date range'
      };
    }
  },

  // Get single cart
  getCartById: async (id) => {
    try {
      const response = await fakeStoreApi.get(`/carts/${id}`);
      return {
        success: true,
        data: response.data,
        message: 'Cart fetched successfully'
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data || error.message,
        message: 'Failed to fetch cart'
      };
    }
  },

  // Get user carts
  getUserCarts: async (userId) => {
    try {
      const response = await fakeStoreApi.get(`/carts/user/${userId}`);
      return {
        success: true,
        data: response.data,
        message: 'User carts fetched successfully'
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data || error.message,
        message: 'Failed to fetch user carts'
      };
    }
  },

  // Add new cart
  addCart: async (cartData) => {
    try {
      const response = await fakeStoreApi.post('/carts', cartData);
      return {
        success: true,
        data: response.data,
        message: 'Cart added successfully'
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data || error.message,
        message: 'Failed to add cart'
      };
    }
  },

  // Update cart
  updateCart: async (id, cartData) => {
    try {
      const response = await fakeStoreApi.put(`/carts/${id}`, cartData);
      return {
        success: true,
        data: response.data,
        message: 'Cart updated successfully'
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data || error.message,
        message: 'Failed to update cart'
      };
    }
  },

  // Delete cart
  deleteCart: async (id) => {
    try {
      const response = await fakeStoreApi.delete(`/carts/${id}`);
      return {
        success: true,
        data: response.data,
        message: 'Cart deleted successfully'
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data || error.message,
        message: 'Failed to delete cart'
      };
    }
  }
};

// AUTH API CALLS (using your original API)

export const authAPI = {
  // User login
  login: async (credentials) => {
    try {
      const response = await fakeStoreApi.post('/auth/login', credentials);
      
      // Store token if login successful
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
      
      return {
        success: true,
        data: response.data,
        message: 'Login successful'
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data || error.message,
        message: 'Login failed'
      };
    }
  },

  // User logout (remove token)
  logout: () => {
    localStorage.removeItem('token');
    return {
      success: true,
      message: 'Logged out successfully'
    };
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    const token = localStorage.getItem('token');
    return !!token;
  },

  // Get current user token
  getToken: () => {
    return localStorage.getItem('token');
  }
};

// ======================
// UTILITY FUNCTIONS
// ======================

export const utilityAPI = {
  // Generic API call function
  makeApiCall: async (method, endpoint, data = null) => {
    try {
      const config = {
        method,
        url: endpoint,
      };

      if (data && (method === 'POST' || method === 'PUT' || method === 'PATCH')) {
        config.data = data;
      }

      const response = await fakeStoreApi(config);
      return {
        success: true,
        data: response.data,
        message: `${method} request successful`
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data || error.message,
        message: `${method} request failed`
      };
    }
  },

  // Test API connection
  testConnection: async () => {
    try {
      const response = await fakeStoreApi.get('/products?limit=1');
      return {
        success: true,
        data: response.status,
        message: 'API connection successful'
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data || error.message,
        message: 'API connection failed'
      };
    }
  }
};

// Export everything as default
export default {
  productAPI,
  categoryAPI,
  cartAPI,
  authAPI,
  utilityAPI,
};

// Export both API instances
export { fakeStoreApi, adminApi };