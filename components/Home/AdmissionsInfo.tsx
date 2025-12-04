import React, { useState } from 'react';
import Button from '../UI/Button';
import { Trophy, CheckCircle, Send, Loader2, AlertCircle, CheckCircle2 } from 'lucide-react';
import { api } from '../../services/api';
import { DetailsPageData } from '../../types';

interface AdmissionsInfoProps {
  onLearnMore: (data: DetailsPageData) => void;
}

const AdmissionsInfo: React.FC<AdmissionsInfoProps> = ({ onLearnMore }) => {
  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    course: ''
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    
    try {
      const response = await api.submitEnquiry(formData);
      setStatus('success');
      setMessage(response.message);
      setFormData({ name: '', email: '', phone: '', course: '' });
    } catch (error: any) {
      setStatus('error');
      setMessage(error.message || "Something went wrong. Please try again.");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleScholarshipDetails = () => {
    onLearnMore({
      title: "Merit Scholarships & Financial Aid",
      category: "Admissions",
      image: "https://images.unsplash.com/photo-1606761568499-6d2451b23c66?q=80&w=1920&auto=format&fit=crop",
      content: `Dayananda Sagar University (DSU) is committed to recognizing and rewarding academic excellence. We believe that financial constraints should not hinder a deserving student's pursuit of quality education.\n\nOur prestigious Merit Scholarship program offers tuition fee waivers based on performance in competitive exams like IIT-JEE, KCET, and COMED-K. \n\nCategories of Scholarship:\n1. High Performers in JEE Mains/Advanced: Up to 100% tuition fee waiver.\n2. Sports Quota: For state and national level representatives.\n3. Need-based Financial Aid: Support for economically weaker sections.\n\nTo avail these scholarships, students must submit valid scorecards during the counseling process. Terms and conditions apply regarding the maintenance of CGPA in subsequent years.`
    });
  };

  const exams = [
    { name: "IIT JEE", color: "text-red-600", border: "border-red-200" },
    { name: "COMED-K", color: "text-blue-600", border: "border-blue-200" },
    { name: "UNI-GAUGE", color: "text-purple-600", border: "border-purple-200" },
    { name: "KCET", color: "text-green-600", border: "border-green-200" },
  ];

  return (
    <section id="admissions" className="py-16 lg:py-24 bg-white relative">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* Left: Interactive Admission Enquiry Form */}
          <div className="bg-blue-50 rounded-3xl p-8 lg:p-10 border border-blue-100 shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-dsu-gold/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
            
            <h2 className="text-3xl font-bold text-dsu-blue mb-2">
              Admissions Open <span className="text-dsu-lightBlue">2026-27</span>
            </h2>
            <p className="text-gray-600 mb-6 text-sm">
              Fill out the form below to enquire about eligibility and scholarship opportunities.
            </p>

            {status === 'success' ? (
              <div className="bg-white rounded-xl p-8 text-center shadow-sm border border-green-100 py-12">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="text-green-600" size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Enquiry Sent!</h3>
                <p className="text-gray-600 text-sm mb-6">{message}</p>
                <Button variant="outline" onClick={() => setStatus('idle')}>Send Another</Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
                <div>
                  <input 
                    required
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Full Name" 
                    className="w-full px-4 py-3 rounded-lg bg-slate-400 text-white placeholder-gray-100 border border-transparent focus:border-dsu-gold focus:ring-2 focus:ring-dsu-gold/20 outline-none transition-all"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input 
                    required
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email Address" 
                    className="w-full px-4 py-3 rounded-lg bg-slate-400 text-white placeholder-gray-100 border border-transparent focus:border-dsu-gold focus:ring-2 focus:ring-dsu-gold/20 outline-none transition-all"
                  />
                  <input 
                    required
                    type="tel" 
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Phone Number" 
                    className="w-full px-4 py-3 rounded-lg bg-slate-400 text-white placeholder-gray-100 border border-transparent focus:border-dsu-gold focus:ring-2 focus:ring-dsu-gold/20 outline-none transition-all"
                  />
                </div>
                <div>
                  <select 
                    required
                    name="course"
                    value={formData.course}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-slate-400 text-white border border-transparent focus:border-dsu-gold focus:ring-2 focus:ring-dsu-gold/20 outline-none transition-all bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23FFFFFF%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')] bg-[length:12px_12px] bg-no-repeat bg-[right_1rem_center] appearance-none"
                  >
                    <option value="" disabled className="text-gray-300">Select Program of Interest</option>
                    <option value="btech_cse" className="text-gray-900">B.Tech - Computer Science</option>
                    <option value="btech_ai" className="text-gray-900">B.Tech - AI & Robotics</option>
                    <option value="bba" className="text-gray-900">BBA - Business Analytics</option>
                    <option value="mba" className="text-gray-900">MBA</option>
                    <option value="mtech" className="text-gray-900">M.Tech</option>
                  </select>
                </div>

                {status === 'error' && (
                  <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm flex items-center">
                    <AlertCircle size={16} className="mr-2" />
                    {message}
                  </div>
                )}

                <Button 
                  type="submit" 
                  variant="primary" 
                  fullWidth 
                  disabled={status === 'submitting'}
                  className="mt-2"
                >
                  {status === 'submitting' ? (
                    <span className="flex items-center">
                      <Loader2 className="animate-spin mr-2" size={18} /> Sending...
                    </span>
                  ) : (
                    <span className="flex items-center">
                      Submit Enquiry <Send className="ml-2" size={16} />
                    </span>
                  )}
                </Button>
                <p className="text-center text-xs text-gray-400 mt-3">
                  By clicking submit, you agree to our privacy policy.
                </p>
              </form>
            )}
          </div>

          {/* Right: Scholarship Callout */}
          <div className="lg:pl-8 pt-8">
             <div className="inline-flex items-center gap-2 px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium mb-6">
                <Trophy size={16} />
                Scholarship Opportunity
             </div>
             <h2 className="text-3xl lg:text-4xl font-bold text-dsu-blue mb-6 leading-tight">
                Prestigious Merit Scholarship Based on <span className="bg-gradient-to-r from-dsu-gold to-yellow-500 bg-clip-text text-transparent">JEE Scores</span>
             </h2>
             <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                DSU rewards academic excellence. High achievers in JEE Mains/Advanced are eligible for substantial tuition fee waivers and exclusive mentorship programs.
             </p>
             
             <div className="grid grid-cols-2 gap-4 mb-8">
                {exams.map((exam) => (
                  <div key={exam.name} className={`bg-white p-3 rounded-lg shadow-sm border ${exam.border} flex items-center justify-center flex-col text-center`}>
                    <span className={`font-bold text-lg ${exam.color}`}>{exam.name}</span>
                  </div>
                ))}
             </div>

             <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                   <CheckCircle className="text-dsu-gold mt-1 mr-3 shrink-0" size={20} />
                   <span className="text-gray-700">Up to 100% Scholarship on Tuition Fees</span>
                </li>
                <li className="flex items-start">
                   <CheckCircle className="text-dsu-gold mt-1 mr-3 shrink-0" size={20} />
                   <span className="text-gray-700">Access to Advanced Research Labs</span>
                </li>
             </ul>

             <Button variant="outline" onClick={handleScholarshipDetails}>View Scholarship Details</Button>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AdmissionsInfo;