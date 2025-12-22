import React from 'react';
import { Lightbulb, TrendingUp, Headphones, Award } from 'lucide-react';

const Services2 = () => {
  const services = [
    {
      icon: <Lightbulb className="w-6 h-6 text-white" />,
      title: "BRANDING",
      description: "Simple text. Lorem ipsum dolor sit amet, consectetur adipiscing elit nullam nunc justo sagittis suscipit ultrices."
    },
    {
      icon: <TrendingUp className="w-6 h-6 text-white" />,
      title: "DEVELOPMENT",
      description: "Simple text. Lorem ipsum dolor sit amet, consectetur adipiscing elit nullam nunc justo sagittis suscipit ultrices."
    },
    {
      icon: <Headphones className="w-6 h-6 text-white" />,
      title: "SUPPORT",
      description: "Simple text. Lorem ipsum dolor sit amet, consectetur adipiscing elit nullam nunc justo sagittis suscipit ultrices."
    },
    {
      icon: <Award className="w-6 h-6 text-white" />,
      title: "AWARDS",
      description: "Simple text. Lorem ipsum dolor sit amet, consectetur adipiscing elit nullam nunc justo sagittis suscipit ultrices."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-300 via-green-400 to-lime-300 relative overflow-hidden">
      {/* Background decorative elements (unchanged) */}
      <div className="absolute inset-0 z-0">
        {/* keep your decorative images as is */}
        {/* (keeping your existing images code unchanged for brevity) */}
      </div>
      
      {/* Main content */}
      <div className="relative z-10 container mx-auto px-4 py-8 md:py-16">
        <div className="max-w-3xl mx-auto">
          {/* Title */}
          <div className="text-center mb-6 md:mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Our Services</h1>
            <p className="text-white/80 text-sm md:text-base">Professional solutions for your business needs</p>
          </div>
          
          {/* Services grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-xl p-3 md:p-6 text-center min-h-[200px] hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
              >
                {/* Icon circle */}
                <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
                  {service.icon}
                </div>
                
                {/* Title */}
                <h3 className="text-[10px] md:text-xs font-bold text-gray-800 mb-2 tracking-wide">
                  {service.title}
                </h3>
                
                {/* Description */}
                <p className="text-[10px] md:text-xs text-gray-600 leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services2;
