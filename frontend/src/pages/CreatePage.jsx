import React, { useState, useEffect } from 'react';
import { EyeClosedIcon, EyeIcon, RefreshCw } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import api from '../lib/axios';
import toast from 'react-hot-toast';
import zxcvbn from 'zxcvbn';

// ✅ Reusable Input Component
const FormInput = ({ label, type = 'text', value, onChange, placeholder, ...props }) => (
  <div className="flex flex-col w-full">
    <label className="text-gray-300 text-sm mb-1">{label}</label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full border border-gray-700 rounded-md py-2 px-4 bg-transparent text-white hover:border-lime-500 focus:border-lime-500 focus:scale-105 transition-all duration-150"
      {...props}
    />
  </div>
);

const Manager = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [websiteURL, setWebsiteURL] = useState('');
  const [email, setEmail] = useState('');
  const [title, setTitle] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [lastActionTime, setLastActionTime] = useState(0);

  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  // ✅ Password Strength (zxcvbn)
  const passwordStrength = zxcvbn(password);
  const strengthScore = passwordStrength.score; // 0 to 4
  const strengthColors = ['bg-red-500', 'bg-orange-500', 'bg-yellow-400', 'bg-lime-500', 'bg-green-500'];
  const strengthText = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'];

  // ❌ Simple Rules-based Alternative (commented out)
  /*
  const getSimpleStrength = (pwd) => {
    let score = 0;
    if (pwd.length > 8) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;
    return score;
  };
  const simpleStrengthScore = getSimpleStrength(password); // 0-4
  */

  // ✅ Toggle password visibility
  const toggleShowPassword = () => setShowPassword((prev) => !prev);

  // ✅ Generate secure password
  const generatePassword = () => {
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';
    const allChars = lowercase + uppercase + numbers + symbols;
    const length = 16;

    let pwd = '';
    pwd += lowercase[Math.floor(Math.random() * lowercase.length)];
    pwd += uppercase[Math.floor(Math.random() * uppercase.length)];
    pwd += numbers[Math.floor(Math.random() * numbers.length)];
    pwd += symbols[Math.floor(Math.random() * symbols.length)];

    for (let i = 4; i < length; i++) {
      pwd += allChars[Math.floor(Math.random() * allChars.length)];
    }

    pwd = pwd.split('').sort(() => Math.random() - 0.5).join('');
    setPassword(pwd);
    toast.success('Password generated successfully!');
  };

  // ✅ Reset form fields
  const resetForm = () => {
    setWebsiteURL('');
    setEmail('');
    setTitle('');
    setPassword('');
    setShowPassword(false);
  };

  // ✅ Load existing credential for editing or reset if create mode
  useEffect(() => {
    const fetchCredential = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/credentials/${id}`);
        if (res.data) {
          setIsEditMode(true);
          setWebsiteURL(res.data.websiteURL || '');
          setEmail(res.data.email || '');
          setTitle(res.data.title || '');
          setPassword(res.data.password || '');
        }
      } catch (error) {
        console.error('Error fetching credential:', error);
        toast.error('Failed to load credential for editing');
        navigate('/');
      } finally {
        setLoading(false);
      }
    };

    if (location.state?.editMode && location.state?.credentialData) {
      const { credentialData } = location.state;
      setIsEditMode(true);
      setWebsiteURL(credentialData.websiteURL || '');
      setEmail(credentialData.email || '');
      setTitle(credentialData.title || '');
      setPassword(credentialData.password || '');
    } else if (id) {
      fetchCredential();
    } else {
      // If no ID and no edit mode → reset form (handles logo click, create click, refresh)
      setIsEditMode(false);
      resetForm();
    }
  }, [id, location.state, navigate, location.pathname]);

  // ✅ Handle create/update
  const handleSubmitCredential = async (e) => {
    e.preventDefault();

    if (Date.now() - lastActionTime < 5000) {
      toast.error('Too many requests! Please wait a moment.');
      return;
    }
    setLastActionTime(Date.now());

    if (!websiteURL.trim() || !email.trim() || !password.trim()) {
      toast.error('Please fill all the fields');
      return;
    }

    setLoading(true);
    try {
      if (isEditMode && id) {
        await api.put(`/credentials/${id}`, { websiteURL, email, title, password });
        toast.success('Credential updated successfully');
        navigate('/');
      } else {
        await api.post('/credentials', { websiteURL, email, title, password });
        toast.success('Credential created successfully');
        resetForm();
      }
    } catch (error) {
      console.log(isEditMode ? 'Error updating credential' : 'Error creating credential', error);
      if (error.response?.status === 429) {
        toast.error('Too many requests! Please wait for a while.');
      } else {
        toast.error(isEditMode ? 'Failed to update credential' : 'Failed to create credential');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1">
        <div className="container mx-auto flex flex-col text-white lg:max-w-3xl w-full px-4">
          <h1 className="text-center text-3xl font-black border-b-4 border-lime-400 pb-2 mt-6 md:text-4xl">
            {isEditMode ? 'Edit Credential' : 'Centralized Credential Management'}
          </h1>

          {/* Main Card */}
          <form
            onSubmit={handleSubmitCredential}
            className="bg-gray-800/50 px-8 py-6 flex flex-col gap-5 mt-10 mx-auto w-full max-w-md rounded-2xl shadow-lg"
          >
            <FormInput label="Title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter title" />
            <FormInput label="Website" value={websiteURL} onChange={(e) => setWebsiteURL(e.target.value)} placeholder="https://" />
            <FormInput label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter email" />

            {/* Password */}
            <div className="flex flex-col w-full">
              <label className="text-gray-300 text-sm mb-1">Password</label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <input
                    className="w-full border border-gray-700 rounded-md py-2 px-4 pr-10 bg-transparent text-white hover:border-lime-500 focus:border-lime-500 focus:scale-105 transition-all duration-150"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    autoComplete="new-password"
                  />
                  <span
                    className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-white/60 hover:text-lime-300"
                    onClick={toggleShowPassword}
                    title="Show/Hide Password"
                  >
                    {showPassword ? <EyeClosedIcon size={18} /> : <EyeIcon size={18} />}
                  </span>
                </div>
                <button
                  type="button"
                  title="Generate Password"
                  onClick={generatePassword}
                  className="flex items-center justify-center px-3 rounded-md bg-lime-600 text-black hover:bg-lime-500 hover:scale-105 transition-all duration-200"
                >
                  <RefreshCw className="w-5 h-5" />
                </button>
              </div>

              {/* Strength Bar */}
              {password && (
                <div className="mt-2">
                  <div className="h-2 w-full bg-gray-700 rounded">
                    <div
                      className={`h-2 rounded transition-all duration-300 ${strengthColors[strengthScore]}`}
                      style={{ width: `${(strengthScore + 1) * 20}%` }}
                    ></div>
                  </div>
                  <p className="text-xs mt-1 text-gray-400">{strengthText[strengthScore]}</p>
                </div>
              )}
            </div>

            {/* Submit */}
            <div className="flex justify-center w-full">
              <button
                type="submit"
                disabled={loading}
                className="bg-lime-600 text-black font-semibold py-2 px-6 rounded-full hover:scale-105 hover:bg-lime-500 transition-all duration-200"
              >
                {loading ? 'Processing...' : isEditMode ? 'Update Credential' : 'Add Credentials'}
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Manager;
