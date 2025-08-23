"use client";

import React from "react";
import ProjectCard from "./projectCard";
import {
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiStripe,
  SiAuth0,
  SiHtml5,
  // SiCss3,
  // SiJavascript,
  SiReact,
  SiSanity,
} from "react-icons/si";
import { motion } from "framer-motion";

const Projects = () => {
  const projects = [
    {
      title: "Nike",
      description:
        "A fully responsive e-commerce site built with Next.js, TypeScript, OAuth authentication, Stripe integration, and Tailwind CSS.",
      link: "https://hackathon-ecommmerce-website-g8uy.vercel.app/",
      link2: "https://github.com/umeradnan7106/hackathon-ecommmerce-website",
      icons: [
        SiHtml5,
        SiReact,
        SiNextdotjs,
        SiTypescript,
        SiTailwindcss,
        SiStripe,
        SiAuth0,
      ], // passed as components
    },
    {
      title: "Foodtuck",
      description:
        "A fully responsive e-commerce site built with Next.js, TypeScript, OAuth authentication, Stripe integration, and Tailwind CSS.",
      link: "https://hackathon-weld-theta.vercel.app/",
      link2: "https://github.com/armanzkhan/Hackathon",
      icons: [
        SiHtml5,
        SiReact,
        SiNextdotjs,
        SiTypescript,
        SiTailwindcss,
        SiStripe,
        SiAuth0,
        SiSanity,
      ],
    },
    {
      title: "Services Website",
      description:
        "A fully responsive site built with Next.js, TypeScript, and Tailwind CSS.",
      link: "https://services-website-orpin.vercel.app/",
      link2: "https://github.com/umeradnan7106/Services-website",
      icons: [SiHtml5, SiReact, SiNextdotjs, SiTypescript, SiTailwindcss],
    },
    {
      title: "Client & Engineer Portal",
      description: `Built a two-way portal system for clients and engineers with dynamic forms. Integrated Sanity CMS for data storage and approval workflow (pending/approved/hidden status).`,
      link: "https://client-and-engineer-portal.vercel.app/",
      link2: "https://github.com/umeradnan7106/Client-and-engineer-portal",
      icons: [SiHtml5, SiReact, SiNextdotjs, SiTypescript, SiSanity],
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
        show: { opacity: 1, y: 0 },
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
              link2={project.link2}
              icons={project.icons}
            />
          ))}
        </div>
      </section>
    </motion.section>
  );
};

export default Projects;
