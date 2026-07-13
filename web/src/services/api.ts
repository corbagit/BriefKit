import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' },
});

// Attach JWT token automatically
api.interceptors.request.use(config => {
  const token = localStorage.getItem('briefkit_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle 401 responses
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      localStorage.removeItem('briefkit_token');
      localStorage.removeItem('briefkit_user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;

// ── Auth API ─────────────────────────────────────────────
export const authApi = {
  login: (email: string, password: string) =>
    api.post('/auth/login', { email, password }).then(r => r.data),

  signup: (name: string, email: string, password: string) =>
    api.post('/auth/signup', { name, email, password }).then(r => r.data),

  getProfile: () =>
    api.get('/auth/me').then(r => r.data),

  updateProfile: (name: string) =>
    api.put('/auth/profile', { name }).then(r => r.data),
};

// ── Summaries API ───────────────────────────────────────
export const summariesApi = {
  list: () =>
    api.get('/summaries').then(r => r.data),

  get: (id: string) =>
    api.get(`/summaries/${id}`).then(r => r.data),

  create: (data: { url?: string; text?: string }) =>
    api.post('/summaries/create', data).then(r => r.data),

  usage: () =>
    api.get('/summaries/usage/stats').then(r => r.data),
};

// ── Billing API ─────────────────────────────────────────
export const billingApi = {
  getPlans: () =>
    api.get('/billing/plans').then(r => r.data),

  getSubscription: () =>
    api.get('/billing/subscription').then(r => r.data),

  createCheckout: (tier: string) =>
    api.post('/billing/create-checkout-session', { tier }).then(r => r.data),
};