"use client";

import { motion } from "framer-motion";

export default function About() {
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

        <div className="max-w-7xl mx-auto px-6 py-24">
          {/* Title with Animation */}
          <motion.div
            className="text-3xl sm:text-4xl font-bold text-center text-white"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            About Me
          </motion.div>

          {/* Main Content */}
          <motion.div
            className="mt-8 text-lg sm:text-xl text-gray-300"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <p>
              {`Hi! I'm Umer Adnan, a frontend web developer from Pakistan. I specialize in building fast, accessible, and scalable web applications using modern frameworks like Next.js,React, TypeScript, and Tailwind CSS.`}
            </p>

            <p className="mt-4">
              {`I’m passionate about clean code, pixel-perfect UI, and delivering
            smooth user experiences. Whether it's a startup project or my
            personal project, I put my full effort into everything I do. I bring
            energy and attention to every detail.`}
            </p>

            <p className="mt-4">
              {`When I’m not coding, I enjoy exploring new tools of AI, watching dev
            content, and constantly leveling up my skillset.`}
            </p>

            <p className="mt-4">
              <strong>{`Let's build something amazing together.`}</strong>
            </p>
          </motion.div>

          {/* Interactive Hover Effect on Button */}
          <motion.div
            className="flex justify-center mt-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1.2 }}
          >
            <a
              href="#contact"
              className="px-8 py-4 rounded-full bg-blue-600 text-white text-lg font-semibold hover:bg-blue-700 transition-all duration-300 transform hover:scale-105"
            >
              Get in Touch
            </a>
          </motion.div>
        </div>
      </motion.section>
    </>
  );
}
