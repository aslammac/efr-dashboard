const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "";
export const endpoints = {
  auth: {
    login: `${BASE_URL}/auth/login`,
    register: `${BASE_URL}/user/signup`,
    refresh: `${BASE_URL}/auth/refresh`,
    resetPassword: `${BASE_URL}/user/reset-password/`,
    resetPasswordLink: `${BASE_URL}/user/forgot-password`,
    verify: `${BASE_URL}/user/verify/`,
    updateUsername: `${BASE_URL}/user/change-username`,
    // New authentication endpoints
    signup: `${BASE_URL}/auth/signup`,
    sendOtp: `${BASE_URL}/user/login`,
    verifyOtp: `${BASE_URL}/user/verify`,
  },
  user: {
    // New user endpoints
    profile: `${BASE_URL}/user/profile`,
    updateProfile: `${BASE_URL}/admin/user/approve`,
    getUsers: (query?: string) =>
      `${BASE_URL}/admin/user/list?user_role=${query ? `${query}` : "user"}`,
    createUser: `${BASE_URL}/admin/user/create`,
  },
  category: {
    getCategories: `${BASE_URL}/product/category/list`,
  },
  project: {
    getProject: (projectId: string) => `${BASE_URL}/project/${projectId}`,
  },
};
