"use client";

import Image from "next/image";
import profile from "../../../public/images/my-image.png";
import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import Link from "next/link";

export default function Main() {
  return (
    <motion.section
      className="flex flex-col-reverse md:flex-row items-center justify-between gap-10 md:gap-16 mt-24 px-6 max-w-7xl mx-auto"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      variants={{
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0 },
      }}
    >
      {/* Text Section */}
      <div className="text-white md:w-1/2 w-full text-center md:text-left">
        <h1 className="text-3xl sm:text-4xl lg:text-6xl font-extrabold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 text-transparent bg-clip-text">
          {`Hi, I'm Umer Adnan`}
        </h1>

        <h2 className="text-lg sm:text-xl lg:text-3xl font-semibold mt-4 text-blue-300">
          <Typewriter
            words={["I'm a Web Developer", "I'm a Frontend Developer"]}
            loop
            cursor
            cursorStyle="|"
            typeSpeed={80}
            deleteSpeed={50}
            delaySpeed={1500}
          />
        </h2>

        <p className="mt-4 text-gray-300 text-sm sm:text-base lg:text-lg">
          I specialize in building fast, accessible, and interactive web apps using Next.js and TypeScript.
        </p>

        {/* Call to Action Button */}
        <motion.div
          className="mt-6"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link href="#projects">
            <button className="px-6 py-3 rounded-full bg-blue-600 text-white font-medium hover:bg-blue-700 transition-all duration-300">
              View Projects
            </button>
          </Link>
        </motion.div>

        {/* Social Icons */}
        <div className="flex gap-5 mt-6 justify-center md:justify-start">
          <a
            href="https://github.com/umeradnan7106"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400 transition-all duration-300"
          >
            <FaGithub size={28} />
          </a>
          <a
            href="https://www.linkedin.com/in/umer-adnan-a1b881291/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400 transition-all duration-300"
          >
            <FaLinkedin size={28} />
          </a>
          <a
            href="mailto:umeradnan7106@gmail.com"
            className="hover:text-blue-400 transition-all duration-300"
          >
            <FaEnvelope size={28} />
          </a>
        </div>
      </div>

      {/* Image Section */}
      <motion.div
        className="w-64 h-64 md:w-[450px] md:h-[450px] rounded-full overflow-hidden shadow-xl"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        whileHover={{ scale: 1.05 }}
      >
        <Image
          src={profile}
          alt="profile"
          className="rounded-full object-cover w-full h-full"
          priority
        />
      </motion.div>
    </motion.section>
  );
}
