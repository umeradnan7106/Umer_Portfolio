'use client';

import React from 'react';
import ProjectCard from './projectCard';
import {
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiStripe,
  SiAuth0,
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiReact
} from 'react-icons/si';
import { motion } from 'framer-motion';

const Projects = () => {
  const projects = [
    {
      title: 'Nike',
      description:
        'A fully responsive e-commerce site built with Next.js, TypeScript, OAuth authentication, Stripe integration, and Tailwind CSS.',
      link: 'https://example.com/nike',
      icons: [SiNextdotjs, SiTypescript, SiTailwindcss, SiStripe, SiAuth0], // passed as components
    },
    {
      title: 'Jadoo',
      description:
        'A pixel-perfect travel website design built for desktop using HTML, CSS, and JavaScript.',
      link: 'https://example.com/jadoo',
      icons: [SiHtml5, SiCss3, SiJavascript],
    },
    {
      title: 'Microsoft Store',
      description:
        'Another pixel-perfect design for desktop only, mimicking Microsoft Store UI using React and CSS.',
      link: 'https://example.com/microsoft-store',
      icons: [SiReact, SiCss3],
    },
  ];

  return (
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
      <section id="projects" className="py-20 px-6 text-white">
        <h2 className="text-4xl font-bold text-center mb-12">Projects</h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
          {projects.map((project) => (
            <ProjectCard
              key={project.title}
              title={project.title}
              description={project.description}
              link={project.link}
              icons={project.icons}
            />
          ))}
        </div>
      </section>
    </motion.section>
  );
};

export default Projects;
