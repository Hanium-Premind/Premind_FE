// src/axios.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://52.78.218.243:8080",
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ 요청 인터셉터 → 토큰 자동 삽입
api.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("token"); // 로그인 시 저장한 토큰 불러오기
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
