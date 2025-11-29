'use client'

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

// import "../../../Components/DashBoard/page"

interface SigninFormData {
  email: string;
  password: string;
}

interface ErrorResponse {
  error: string;
}

interface SuccessResponse {
  token: string;
  user: {
    _id: string;
    name: string;
    email: string;
    userName: string;
  };
}

const SigninForm: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<SigninFormData>({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setErrors('');
  };

  const validateForm = (): boolean => {
    if (!formData.email || !formData.password) {
      setErrors('Please fill in all fields');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setErrors('Please enter a valid email');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    setErrors('');

    try {
      const response = await fetch('http://localhost:5000/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        })
      });

      const data: ErrorResponse | SuccessResponse = await response.json();

      if (!response.ok) {
        setErrors((data as ErrorResponse).error || 'Something went wrong');
      } else {
        const successData = data as SuccessResponse;
        
        // Store token and user data in localStorage
        localStorage.setItem('token', successData.token);
        localStorage.setItem('user', JSON.stringify(successData.user));
        
        // Redirect to dashboard or home page
        // router.push('/Components/UIs/UI1');
        router.push('/Components/DashBoard');
      }
    } catch (err) {
      setErrors('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const goToSignup = () => {
    router.push('/Components/Auth/SignUp');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-purple-700 p-4">
      <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Sign In
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label 
              htmlFor="email" 
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 transition-colors"
            />
          </div>

          <div>
            <label 
              htmlFor="password" 
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 transition-colors"
            />
          </div>

          {errors && (
            <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded">
              <p className="text-sm">{errors}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold py-3 px-4 rounded-lg hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-4 focus:ring-indigo-300 transition-all transform hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>

          <div className="text-center mt-4">
            <p className="text-gray-600 text-sm">
              Don't have an account?{' '}
              <button
                type="button"
                onClick={goToSignup}
                className="text-indigo-600 hover:text-indigo-700 font-semibold hover:underline"
              >
                Sign Up
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SigninForm;
