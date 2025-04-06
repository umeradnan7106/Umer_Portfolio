'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import './project.css'; // Assuming this handles skill/progress-bar styles

const SkillBar = ({ skill, percentage }: { skill: string, percentage: number }) => {
  const [isInView, setIsInView] = useState(false);
  const skillRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ref = skillRef.current; // ✅ Fix for the warning
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true);
        observer.disconnect();
      }
    });

    if (ref) {
      observer.observe(ref);
    }

    return () => {
      if (ref) {
        observer.unobserve(ref);
      }
    };
  }, []);

  return (
    <div className="skill" ref={skillRef}>
      <h3>{skill}</h3>
      <motion.div
        className="progress-bar"
        initial={{ width: '0%' }}
        animate={{ width: isInView ? `${percentage}%` : '0%' }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
        whileHover={{ scale: 1.05, boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)' }}
      >
        <span>{isInView ? `${percentage}%` : ''}</span>
      </motion.div>
    </div>
  );
};

const Skills = () => {
  return (
    <div className="skills-container">
      <h2 className="skills-heading">My Skills</h2>
      <div className="skills">
        <SkillBar skill="HTML" percentage={90} />
        <SkillBar skill="CSS" percentage={95} />
        <SkillBar skill="JavaScript" percentage={85} />
        <SkillBar skill="React" percentage={80} />
        <SkillBar skill="Next.js" percentage={75} />
        <SkillBar skill="TypeScript" percentage={80} />
        <SkillBar skill="Tailwind CSS" percentage={90} />
        <SkillBar skill="Python" percentage={40} />
      </div>
    </div>
  );
};

export default Skills;
