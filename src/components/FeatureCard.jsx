import React from 'react';
import { Link } from 'react-router-dom';

export default function FeatureCard({ feature }) {
  return (
    <div className="bg-white/70 backdrop-blur-md border border-blue-200/30 rounded-2xl p-3 m-1 w-100 shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl duration-300 group">
      <Link to={feature.path} className="block h-full">
        <h2 className="text-xl font-semibold text-blue-900 group-hover:text-blue-600 transition-colors duration-300">
          {feature.name}
        </h2>
        <p className="text-gray-700  text-sm group-hover:text-gray-900 transition-colors duration-300">
          {feature.description}
        </p>
        <div className="mt-2 inline-block text-sm text-blue-500 group-hover:underline">
          Explore →
        </div>
      </Link>
    </div>
  );
}