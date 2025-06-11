'use client';

import React from 'react';

interface ProjectCardProps {
  title: string;
  description: string;
  link: string;
  link2: string;
  icons: React.ElementType[]; // array of icon components
}

const ProjectCard: React.FC<ProjectCardProps> = ({ title, description, link, link2, icons }) => {
  return (
    <div className="bg-gray-900 rounded-2xl p-6 shadow-md flex flex-col justify-between h-full">
      <div>
        <h3 className="text-2xl font-bold mb-2">{title}</h3>
        <p className="text-gray-300 mb-4">{description}</p>
        <div className="flex space-x-3 mb-4">
          {icons.map((Icon, index) => (
            <Icon key={index} className="text-2xl text-blue-500" />
          ))}
        </div>
      </div>
      <div className='flex gap-3'>
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-auto text-blue-400 hover:underline border p-2 rounded"
        >
          View Project
        </a>
        <a
          href={link2}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-auto text-blue-400 hover:underline border p-2 rounded"
        >
          View Code
        </a>
      </div>
    </div>
  );
};

export default ProjectCard;
