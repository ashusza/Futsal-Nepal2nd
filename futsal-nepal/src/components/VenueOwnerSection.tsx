"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { CheckCircle2 } from "lucide-react";

export default function VenueOwnerSection() {
  const { ref, inView } = useInView(0.3);
  
  const [form, setForm] = useState({
    venueName: '',
    location: '',
    primaryPhone: '',
    whatsappNumber: '',
    email: ''
  });

  const [errors, setErrors] = useState({
    venueName: '',
    location: '',
    primaryPhone: '',
    whatsappNumber: '',
    email: ''
  });

  const [touched, setTouched] = useState({
    venueName: false,
    location: false,
    primaryPhone: false,
    whatsappNumber: false,
    email: false
  });

  const [submitState, setSubmitState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const validateField = (name: string, value: string) => {
    switch(name) {
      case 'venueName':
        if (!value.trim()) return 'Venue name is required';
        if (value.trim().length < 3) 
          return 'Venue name must be at least 3 characters';
        if (value.trim().length > 80) 
          return 'Venue name is too long';
        return '';
      
      case 'location':
        if (!value.trim()) return 'Location is required';
        if (value.trim().length < 3) 
          return 'Please enter a valid location';
        return '';
      
      case 'primaryPhone':
      case 'whatsappNumber':
        if (!value.trim()) return ''; // Optional field
        const cleanedWA = value.replace(/[\s\-\+]/g, '');
        const nepaliPhoneWA = cleanedWA.replace(/^977/, '');
        if (!/^(98|97)\d{8}$/.test(nepaliPhoneWA))
          return 'Enter a valid Nepal phone number (e.g. 98XXXXXXXX)';
        return '';
      
      case 'email':
        if (!value.trim()) return 'Email is required';
        if (value.includes(' ')) 
          return 'Email cannot contain spaces';
        if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value))
          return 'Enter a valid email address';
        return '';
      
      default:
        return '';
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (touched[name as keyof typeof touched]) {
      setErrors(prev => ({ ...prev, [name]: validateField(name, value) }));
    }
    if (submitState === 'error') {
      setSubmitState('idle');
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    setErrors(prev => ({ ...prev, [name]: validateField(name, value) }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    let hasErrors = false;
    const newErrors = { ...errors };
    const newTouched = { ...touched };
    
    Object.keys(form).forEach(key => {
      newTouched[key as keyof typeof touched] = true;
      const error = validateField(key, form[key as keyof typeof form]);
      newErrors[key as keyof typeof errors] = error;
      if (error) hasErrors = true;
    });
    
    setTouched(newTouched);
    setErrors(newErrors);
    
    if (hasErrors) {
       const btn = document.getElementById('venue-submit-btn');
       if (btn) {
         btn.style.animation = 'none';
         void btn.offsetWidth;
         btn.style.animation = 'shake 0.4s ease';
       }
       return;
    }
    
    setSubmitState('loading');
    
    try {
      const res = await fetch('/api/venue/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      if (res.ok) {
        setSubmitState('success');
        setForm({
          venueName: '', location: '',
          primaryPhone: '', whatsappNumber: '', email: ''
        });
        setTouched({
          venueName: false, location: false,
          primaryPhone: false, whatsappNumber: false, email: false
        });
      } else {
        setSubmitState('error');
      }
    } catch {
      setSubmitState('error');
    }
  };

  const renderField = (name: keyof typeof form, label: string, type: string = "text", placeholder: string = "") => {
    const isTouched = touched[name];
    const error = errors[name];
    const isValid = isTouched && !error;
    const hasError = isTouched && !!error;

    let borderColorClass = "border-white/15";
    if (hasError) borderColorClass = "border-[#EF4444]";
    else if (isValid) borderColorClass = "border-[#10B981]/50";

    let labelColorClass = "text-white/40";
    if (hasError) labelColorClass = "text-[#EF4444]";

    return (
      <div className="flex flex-col justify-end gap-[6px] mb-6 relative group w-full h-full">
        <label className={`font-mono text-[10px] tracking-[0.2em] uppercase transition-colors duration-200 group-focus-within:text-[#10B981] ${labelColorClass}`}>
          {label}
        </label>
        
        <div className="relative">
          <input
            type={type}
            name={name}
            value={form[name]}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder={placeholder}
            className={`w-full bg-transparent border-b ${borderColorClass} py-3 font-body text-base text-white outline-none transition-colors duration-200 focus:border-[#10B981] rounded-none`}
          />
          {isValid && (
            <div className="absolute right-0 top-1/2 -translate-y-1/2 text-[#10B981] font-mono text-sm pointer-events-none">
              ✓
            </div>
          )}
          {hasError && (
            <div className="absolute right-0 top-1/2 -translate-y-1/2 text-[#EF4444] font-mono text-sm pointer-events-none">
              ×
            </div>
          )}
        </div>

        <AnimatePresence>
          {hasError && (
            <motion.div
              initial={{ opacity: 0, y: -4, height: 0 }}
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              exit={{ opacity: 0, y: -4, height: 0 }}
              transition={{ duration: 0.2 }}
              className="font-mono text-[10px] text-[#EF4444] tracking-[0.1em] mt-1"
            >
              {error}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  const getButtonProps = () => {
    switch(submitState) {
      case 'loading':
        return {
          text: 'SUBMITTING...',
          className: 'bg-primary text-white font-heading text-xl opacity-80 pointer-events-none'
        };
      case 'success':
        return {
          text: 'REQUEST RECEIVED ✓',
          className: 'bg-[#10B981]/20 border border-[#10B981] text-[#10B981] font-heading text-xl pointer-events-none'
        };
      case 'error':
        return {
          text: 'TRY AGAIN',
          className: 'bg-[#EF4444]/20 border border-[#EF4444] text-[#EF4444] font-heading text-xl hover:scale-[1.02] transition-transform'
        };
      case 'idle':
      default:
        return {
          text: 'REGISTER MY VENUE',
          className: 'bg-primary border border-transparent text-white font-heading text-xl hover:scale-[1.02] transition-transform duration-300'
        };
    }
  };

  const btnProps = getButtonProps();

  return (
    <section 
      id="venues"
      ref={ref} 
      className="relative w-full min-h-[60vh] bg-[#0A0A0C] flex items-center justify-center py-24 overflow-hidden border-t border-[#2A2A2D]/30"
    >
      {/* Atmospheric Background Layers */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Layer 1 — Topographic lines SVG */}
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          {[100, 200, 300, 400, 500, 600].map((r, i) => (
            <ellipse 
              key={i}
              cx="50%" 
              cy="50%" 
              rx={r} 
              ry={r / 2} 
              fill="none" 
              stroke="rgba(16,185,129,0.04)" 
              strokeWidth="1" 
              strokeDasharray="8 16"
            />
          ))}
        </svg>

        {/* Layer 2 — Green top glow */}
        <div 
          className="absolute -top-[100px] left-1/2 -translate-x-1/2"
          style={{
            width: '800px', height: '400px',
            background: 'radial-gradient(ellipse, rgba(16,185,129,0.1), transparent 65%)',
            filter: 'blur(80px)'
          }}
        />

        {/* Layer 3 — Dark vignette edges */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse 100% 100% at 50% 50%, transparent 50%, #0A0A0C 100%)'
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Left Side: Content */}
        <motion.div
          initial={{ x: -30, opacity: 0 }}
          animate={inView ? { x: 0, opacity: 1 } : { x: -30, opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="font-mono text-[11px] text-primary tracking-[0.2em] mb-4">
            FOR PARTNERS
          </div>
          <h2 className="font-heading text-5xl md:text-7xl text-white mb-6 leading-none">
            OWN A PITCH?<br />
            <span className="text-primary drop-shadow-glow-red-sm">GET LISTED FIRST.</span>
          </h2>
          <p className="text-muted text-lg md:text-xl max-w-md leading-relaxed">
            Be among the first venues on Nepal&apos;s booking platform. 
            Priority placement, zero commission for 3 months.
          </p>
          
          <div className="mt-10 flex flex-col gap-4">
             <div className="flex items-center gap-3 text-white/60 font-mono text-[11px] tracking-widest uppercase">
                <CheckCircle2 className="w-4 h-4 text-primary" />
                DASHBOARD ACCESS
             </div>
             <div className="flex items-center gap-3 text-white/60 font-mono text-[11px] tracking-widest uppercase">
                <CheckCircle2 className="w-4 h-4 text-primary" />
                AUTO-BOOKING SYSTEM
             </div>
             <div className="flex items-center gap-3 text-white/60 font-mono text-[11px] tracking-widest uppercase">
                <CheckCircle2 className="w-4 h-4 text-primary" />
                ANALYTICS & REPORTS
             </div>
          </div>
        </motion.div>

        {/* Right Side: Form */}
        <motion.div
          initial={{ x: 30, opacity: 0 }}
          animate={inView ? { x: 0, opacity: 1 } : { x: 30, opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          <div className="bg-surface border border-[#2A2A2D] p-8 md:p-10 shadow-2xl relative overflow-hidden group">
            
            <form onSubmit={handleSubmit} className="flex flex-col">
              {renderField('venueName', 'VENUE NAME', 'text', 'Enter venue name')}
              {renderField('location', 'LOCATION / AREA', 'text', 'Enter location')}
              
              <div className="grid grid-cols-1 md:grid-cols-2 md:gap-4">
                {renderField('primaryPhone', 'PRIMARY PHONE NUMBER', 'tel', 'e.g. 98XXXXXXXX')}
                {renderField('whatsappNumber', 'WHATSAPP / SECONDARY (OPTIONAL)', 'tel', 'e.g. 98XXXXXXXX')}
              </div>
              
              {renderField('email', 'EMAIL ADDRESS', 'email', 'your@email.com')}

              <button
                id="venue-submit-btn"
                type="submit"
                disabled={submitState === "loading" || submitState === "success"}
                className={`w-full mt-4 relative overflow-hidden tracking-[0.1em] py-5 [clip-path:polygon(0_0,calc(100%-16px)_0,100%_100%,0_100%)] ${btnProps.className} disabled:opacity-50`}
              >
                <span className="relative z-10">{btnProps.text}</span>
                {submitState === 'idle' && <div className="absolute inset-0 bg-white/10 opacity-0 hover:opacity-100 transition-opacity pointer-events-none" />}
                {submitState === 'loading' && <div className="absolute inset-0 bg-white/10 animate-pulse" />}
              </button>
            </form>

            {/* Corner Accent */}
            <div className="absolute top-0 right-0 w-16 h-16 bg-primary/5 [clip-path:polygon(100%_0,0_0,100%_100%)] pointer-events-none" />
          </div>
        </motion.div>

      </div>
    </section>
  );
}
