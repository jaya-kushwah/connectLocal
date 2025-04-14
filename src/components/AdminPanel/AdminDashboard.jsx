import React, { useState, useEffect } from 'react';
import "../../assets/Style/AdminDashboard.css"

const AdmainDashboard = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Sample data for the boxes
  const boxData = [
    {
      title: "Users",
      count: 2458,
      growth: "+14.5%",
      isPositive: true,
      icon: "👥",
      isBlack: true
    },
    {
      title: "Revenue",
      count: "₹128,250",
      growth: "+8.2%",
      isPositive: true,
      icon: "💰",
      isBlack: false
    },
    {
      title: "Tasks",
      count: 64,
      growth: "-2.4%",
      isPositive: false,
      icon: "📋",
      isBlack: true
    },
    {
      title: "Projects",
      count: 36,
      growth: "+5.1%",
      isPositive: true,
      icon: "📊",
      isBlack: false
    }
  ];

  return (
    <div className="bg-gray-100 min-h-screen">

      {/* Main Content Area */}
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 ">Dashboard Overview</h1>

        {/* Animated Boxes Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {boxData.map((box, index) => (
            <div
              key={index}
              className={`rounded-lg shadow-md p-6 transform transition-all duration-500 overflow-hidden relative ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Animated Background - Black boxes vs Styled boxes */}
              <div className="absolute inset-0">
                {box.isBlack ? (
                  <>
                    <div className="absolute inset-0 bg-black"></div>
                    <div className="absolute inset-0 opacity-10"
                      style={{
                        backgroundImage: 'linear-gradient(135deg, #333 25%, transparent 25%), linear-gradient(225deg, #333 25%, transparent 25%), linear-gradient(45deg, #333 25%, transparent 25%), linear-gradient(315deg, #333 25%, transparent 25%)',
                        backgroundPosition: '10px 0, 10px 0, 0 0, 0 0',
                        backgroundSize: '20px 20px',
                        backgroundRepeat: 'repeat',
                        animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
                      }}>
                    </div>
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-blue-500"></div>
                    <div className={`absolute h-full w-2 left-0 top-0 ${index === 0 ? 'bg-blue-500' : 'bg-green-500'}`}></div>
                  </>
                ) : (
                  <>
                    <div className={`absolute inset-0 ${index === 1 ? 'bg-gradient-to-br from-purple-500 to-pink-500' : 'bg-gradient-to-br from-blue-400 to-indigo-600'} opacity-10`}></div>
                    <div className="absolute inset-0 bg-white opacity-90"></div>
                    <div className={`absolute inset-0 bg-gradient-to-br from-transparent via-transparent ${index === 1 ? 'to-purple-100' : 'to-blue-100'}`}></div>
                    <div className={`absolute bottom-0 left-0 w-full h-1 ${index === 1 ? 'bg-purple-500' : 'bg-blue-500'}`}></div>
                  </>
                )}
              </div>

              {/* Content */}
              <div className="relative z-10 flex justify-between items-start">
                <div>
                  <p className={`text-sm ${box.isBlack ? 'text-gray-400' : 'text-gray-500'}`}>{box.title}</p>
                  <h2 className={`text-2xl font-bold mt-1 ${box.isBlack ? 'text-white' : 'text-gray-800'}`}>{box.count}</h2>
                  <p className={`text-sm ${box.isPositive ? 'text-green-500' : 'text-red-500'} mt-2`}>
                    {box.growth} {box.isPositive ? '↑' : '↓'}
                  </p>
                </div>
                <div className={`text-2xl h-12 w-12 rounded-full flex items-center justify-center ${box.isBlack
                    ? 'bg-gray-800 text-gray-300'
                    : index === 1
                      ? 'bg-purple-100 text-purple-600'
                      : 'bg-blue-100 text-blue-600'
                  }`}>
                  {box.icon}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* </div> */}
      </div>
    </div>
  );
};

export default AdmainDashboard;