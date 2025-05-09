import React from 'react';
import { Link } from 'react-router-dom';

export default function FeatureCard({ feature }) {
  return (
    <div className="bg-white/70 backdrop-blur-md border min-h-48 border-blue-200/30 rounded-2xl p-6 w-80 shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl duration-300 group">
      <Link to={feature.path} className="block h-full">
        <h2 className="text-xl font-semibold text-blue-900 group-hover:text-blue-600 transition-all duration-300 transform group-hover:scale-105 text-animate">
          {feature.name}
        </h2>
        <p className="text-gray-700 text-sm group-hover:text-gray-900 transition-all duration-300 transform group-hover:scale-105 text-animate delay-100">
          {feature.description}
        </p>
        <button className="mt-4 px-4 py-2 bg-blue-500/70 backdrop-blur-md border border-blue-300/50 rounded-lg text-sm text-white group-hover:bg-blue-600 group-hover:shadow-md group-hover:scale-105 transition-all duration-300 text-animate delay-200">
          Explore →
        </button>
      </Link>
    </div>
  );
}