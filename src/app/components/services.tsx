// src/app/components/Services.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Code, Monitor, Database, Rocket } from 'lucide-react';

const services = [
  {
    title: 'Web Development',
    description: 'Building responsive, fast-loading websites using modern frameworks like Next.js, React, and Tailwind CSS.',
    icon: <Code className="w-8 h-8 text-blue-500" />,
  },
  {
    title: 'UI/UX Design',
    description: 'Designing sleek, user-friendly interfaces that look great on all screen sizes.',
    icon: <Monitor className="w-8 h-8 text-green-500" />,
  },
  {
    title: 'API & Backend Integration',
    description: 'Connecting your frontend to secure, scalable backend systems and third-party APIs.',
    icon: <Database className="w-8 h-8 text-yellow-500" />,
  },
  {
    title: 'Performance Optimization',
    description: 'Improving site speed, accessibility, and SEO to ensure top performance and rankings.',
    icon: <Rocket className="w-8 h-8 text-purple-500" />,
  },
];

const Services = () => {
  return (
    <>
    <motion.section
  initial="hidden"
  whileInView="show"
  viewport={{ once: true, amount: 0.2 }}
  transition={{ duration: 0.5 }}
  variants={{
    hidden: { opacity: 0, y: 50 },
    show: { opacity: 1, y: 0 }
  }}
>

    <section id="services" className="py-20 px-4 bg-gray-950 text-white">
      <motion.h2
        className="text-4xl font-bold text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        What I Offer
      </motion.h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {services.map((service, index) => (
          <motion.div
            key={index}
            className="bg-gray-900 p-6 rounded-2xl shadow-lg hover:shadow-blue-500/30 transition-all border border-gray-800 hover:border-blue-600"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.2 }}
            whileHover={{ scale: 1.05 }}
          >
            <div className="mb-4">{service.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
            <p className="text-gray-400">{service.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
    </motion.section>
    </>
  );
};

export default Services;
