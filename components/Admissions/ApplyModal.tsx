import React, { useState } from 'react';
import { X, Loader2, CheckCircle2, AlertCircle, User, BookOpen, MapPin } from 'lucide-react';
import Button from '../UI/Button';
import { api } from '../../services/api';
import { ApplicationData } from '../../types';

interface ApplyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ApplyModal: React.FC<ApplyModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState<ApplicationData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dob: '',
    program: 'undergraduate',
    course: '',
    city: '',
    state: ''
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [appId, setAppId] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>('');

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    try {
      const res = await api.submitApplication(formData);
      setAppId(res.applicationId);
      setStatus('success');
    } catch (err: any) {
      setStatus('error');
      setErrorMsg(err.message || "Failed to submit application. Please try again.");
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 z-[100] overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
      onClick={handleBackdropClick}
    >
      <div className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-dsu-blue text-white px-6 py-4 flex justify-between items-center shrink-0">
          <div>
            <h2 className="text-xl font-bold tracking-wide">APPLICATION FORM 2026-27</h2>
            <p className="text-dsu-gold text-xs font-medium tracking-wider uppercase">Online Admission Portal</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Body */}
        <div className="overflow-y-auto p-6 lg:p-8 bg-gray-50 flex-grow">
          
          {status === 'success' ? (
             <div className="flex flex-col items-center justify-center py-12 text-center">
               <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6">
                 <CheckCircle2 className="text-green-600 w-12 h-12" />
               </div>
               <h3 className="text-2xl font-bold text-dsu-blue mb-2">Application Submitted!</h3>
               <p className="text-gray-600 mb-6">
                 Thank you for choosing Dayananda Sagar University. <br/>
                 Your application reference ID is <span className="font-mono font-bold text-black bg-gray-200 px-2 py-1 rounded">{appId}</span>
               </p>
               <p className="text-sm text-gray-500 max-w-md mb-8">
                 Our admissions team will review your application and contact you via email within 48 hours with the next steps.
               </p>
               <Button onClick={onClose} variant="primary">Return to Home</Button>
             </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              
              {/* Personal Details Section */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                 <div className="flex items-center mb-6 text-dsu-blue border-b border-gray-100 pb-2">
                    <User className="mr-2" size={20} />
                    <h3 className="font-bold text-lg">Personal Details</h3>
                 </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">First Name *</label>
                      <input 
                        required
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-dsu-lightBlue focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                        placeholder="Enter your first name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Last Name *</label>
                      <input 
                        required
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-dsu-lightBlue focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                        placeholder="Enter your last name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Date of Birth *</label>
                      <input 
                        required
                        type="date"
                        name="dob"
                        value={formData.dob}
                        onChange={handleChange}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-dsu-lightBlue focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Mobile Number *</label>
                      <input 
                        required
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-dsu-lightBlue focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                        placeholder="+91 XXXXX XXXXX"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address *</label>
                      <input 
                        required
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-dsu-lightBlue focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                        placeholder="you@example.com"
                      />
                    </div>
                 </div>
              </div>

              {/* Academic Section */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                 <div className="flex items-center mb-6 text-dsu-blue border-b border-gray-100 pb-2">
                    <BookOpen className="mr-2" size={20} />
                    <h3 className="font-bold text-lg">Program Selection</h3>
                 </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                       <label className="block text-sm font-semibold text-gray-700 mb-2">Program Level *</label>
                       <select 
                         name="program"
                         value={formData.program}
                         onChange={handleChange}
                         className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-dsu-lightBlue focus:ring-2 focus:ring-blue-100 outline-none transition-all bg-white"
                       >
                         <option value="undergraduate">Undergraduate (UG)</option>
                         <option value="postgraduate">Postgraduate (PG)</option>
                         <option value="phd">Ph.D / Research</option>
                       </select>
                    </div>
                    <div>
                       <label className="block text-sm font-semibold text-gray-700 mb-2">Course Preference *</label>
                       <select 
                         required
                         name="course"
                         value={formData.course}
                         onChange={handleChange}
                         className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-dsu-lightBlue focus:ring-2 focus:ring-blue-100 outline-none transition-all bg-white"
                       >
                         <option value="">Select a Course</option>
                         <optgroup label="Engineering">
                           <option value="cse">B.Tech - Computer Science & Engg</option>
                           <option value="ai">B.Tech - AI & Robotics</option>
                           <option value="ece">B.Tech - ECE</option>
                           <option value="mech">B.Tech - Mechanical</option>
                         </optgroup>
                         <optgroup label="Management">
                           <option value="bba">BBA</option>
                           <option value="mba">MBA</option>
                         </optgroup>
                         <optgroup label="Health Sciences">
                            <option value="pharm">B.Pharm</option>
                            <option value="nursing">B.Sc Nursing</option>
                         </optgroup>
                       </select>
                    </div>
                 </div>
              </div>

              {/* Address Section */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                 <div className="flex items-center mb-6 text-dsu-blue border-b border-gray-100 pb-2">
                    <MapPin className="mr-2" size={20} />
                    <h3 className="font-bold text-lg">Location</h3>
                 </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">City *</label>
                      <input 
                        required
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-dsu-lightBlue focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">State *</label>
                      <input 
                        required
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-dsu-lightBlue focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                      />
                    </div>
                 </div>
              </div>

              {/* Error Message */}
              {status === 'error' && (
                <div className="bg-red-50 border border-red-100 text-red-600 p-4 rounded-lg flex items-center">
                   <AlertCircle className="mr-2 shrink-0" size={20} />
                   {errorMsg}
                </div>
              )}
              
              <div className="pt-4 border-t border-gray-200 flex items-center justify-end gap-4">
                 <Button type="button" variant="ghost" onClick={onClose}>Cancel</Button>
                 <Button type="submit" variant="primary" disabled={status === 'submitting'} className="min-w-[150px]">
                    {status === 'submitting' ? <span className="flex items-center"><Loader2 className="animate-spin mr-2" /> Processing...</span> : 'Submit Application'}
                 </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ApplyModal;