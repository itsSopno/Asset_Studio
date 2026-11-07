import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';

const sections = [
  { id: 'intro', title: '1. Introduction', content: 'Welcome to AssetVerse. These terms govern your use of our B2B asset management platform. By accessing our services, you agree to protect corporate property and maintain data integrity.' },
  { id: 'data', title: '2. Data Privacy', content: 'We collect employee names, IDs, and hardware assignments. This data is used strictly for internal inventory tracking and is never sold to third parties.' },
  { id: 'assets', title: '3. Asset Responsibility', content: 'Users are responsible for the physical care of assigned hardware (laptops, peripherals). Loss or damage must be reported through the AssetVerse portal within 24 hours.' },
  { id: 'security', title: '4. Security', content: 'AssetVerse employs AES-256 encryption for data at rest. Corporate admins are responsible for managing access levels and offboarding employees promptly.' },
];

const AssetVerseLegal = () => {
  const [activeSection, setActiveSection] = useState('intro');
  const [accepted, setAccepted] = useState(false);

  // Scroll Progress Logic
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="min-h-screen bg-gray-50 text-slate-900 font-sans pb-20">
      {/* 1. Animated Reading Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1.5 bg-blue-600 z-50 origin-left"
        style={{ scaleX }}
      />

      {/* 2. Header */}
      <header className="py-10 px-6 text-center bg-white border-b">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-extrabold tracking-tight text-blue-900"
        >
          Asset<span className="text-blue-600">Verse</span> Legal Center
        </motion.h1>
        <p className="mt-2 text-slate-500">Last Updated: October 2023</p>
      </header>

      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-12 p-6 mt-10">
        
        {/* 3. Sticky Sidebar Navigation */}
        <aside className="md:w-1/4">
          <nav className="sticky top-10 space-y-2">
            <p className="text-xs font-bold uppercase text-slate-400 mb-4 px-3">Table of Contents</p>
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' })}
                className={`w-full text-left px-4 py-2 rounded-lg transition-all ${
                  activeSection === section.id 
                  ? 'bg-blue-50 text-blue-700 font-semibold border-l-4 border-blue-600' 
                  : 'text-slate-500 hover:bg-gray-100'
                }`}
              >
                {section.title}
              </button>
            ))}
          </nav>
        </aside>

        {/* 4. Content Area */}
        <main className="md:w-3/4 space-y-24">
          {sections.map((section) => (
            <motion.section
              key={section.id}
              id={section.id}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-20%" }}
              onViewportEnter={() => setActiveSection(section.id)}
              transition={{ duration: 0.5 }}
              className="scroll-mt-24"
            >
              <h2 className="text-2xl font-bold text-slate-800 mb-4">{section.title}</h2>
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 leading-relaxed text-slate-600">
                {section.content}
                <div className="mt-4 h-2 w-12 bg-blue-100 rounded" />
              </div>
            </motion.section>
          ))}

          {/* 5. Interactive Footer / Acceptance */}
          <motion.div 
            className="p-10 bg-blue-900 rounded-3xl text-white text-center shadow-xl"
            whileHover={{ y: -5 }}
          >
            <h3 className="text-xl font-bold mb-4">Ready to manage your assets?</h3>
            <p className="text-blue-100 mb-8">By clicking accept, you acknowledge the terms for AssetVerse.</p>
            
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setAccepted(true)}
              className={`px-8 py-4 rounded-full font-bold transition-all ${
                accepted ? 'bg-green-500' : 'bg-white text-blue-900 hover:bg-blue-50'
              }`}
            >
              <AnimatePresence mode="wait">
                {accepted ? (
                  <motion.span
                    key="confirmed"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    ✓ Terms Accepted
                  </motion.span>
                ) : (
                  <span key="default">Accept Terms & Conditions</span>
                )}
              </AnimatePresence>
            </motion.button>
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default AssetVerseLegal;