import React from 'react';
import { Link } from 'react-router-dom';

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  const steps = [
    {
      number: 1,
      label: 'Sign In',
      icon: '🔐',
      path: '/login',
      active: step1,
    },
    {
      number: 2,
      label: 'Shipping',
      icon: '📦',
      path: '/shipping',
      active: step2,
    },
    {
      number: 3,
      label: 'Payment',
      icon: '💳',
      path: '/payment',
      active: step3,
    },
    {
      number: 4,
      label: 'Place Order',
      icon: '✅',
      path: '/place-order',
      active: step4,
    },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8 mb-6">
      {/* Mobile View - Vertical Steps */}
      <div className="md:hidden space-y-4">
        {steps.map((step, index) => (
          <div key={step.number} className="relative">
            {step.active ? (
              <Link
                to={step.path}
                className="flex items-center gap-4 p-4 bg-white rounded-2xl shadow-md border-2 border-green-500 hover:shadow-lg transition-all group"
              >
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center text-white font-bold shadow-lg group-hover:scale-110 transition-transform">
                  {step.number}
                </div>
                <div className="flex-1">
                  <div className="font-bold text-gray-900 text-lg">{step.label}</div>
                  <div className="text-sm text-green-600">Click to continue</div>
                </div>
                <div className="text-3xl">{step.icon}</div>
              </Link>
            ) : (
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl border-2 border-gray-200 opacity-50">
                <div className="flex-shrink-0 w-12 h-12 bg-gray-300 rounded-xl flex items-center justify-center text-gray-500 font-bold">
                  {step.number}
                </div>
                <div className="flex-1">
                  <div className="font-bold text-gray-500 text-lg">{step.label}</div>
                  <div className="text-sm text-gray-400">Locked</div>
                </div>
                <div className="text-3xl grayscale opacity-50">{step.icon}</div>
              </div>
            )}
            
            {/* Connector Line */}
            {index < steps.length - 1 && (
              <div className="absolute left-10 top-full w-0.5 h-4 bg-gray-300 -translate-x-1/2"></div>
            )}
          </div>
        ))}
      </div>

      {/* Desktop View - Horizontal Steps */}
      <div className="hidden md:block">
        <div className="relative">
          {/* Progress Bar Background */}
          <div className="absolute top-12 left-0 right-0 h-2 bg-gray-200 rounded-full"></div>
          
          {/* Active Progress Bar */}
          <div 
            className="absolute top-12 left-0 h-2 bg-gradient-to-r from-green-400 via-green-500 to-green-600 rounded-full transition-all duration-500 shadow-lg"
            style={{
              width: `${((steps.filter(s => s.active).length - 1) / (steps.length - 1)) * 100}%`
            }}
          ></div>

          {/* Steps */}
          <div className="relative flex justify-between">
            {steps.map((step, index) => (
              <div key={step.number} className="flex flex-col items-center flex-1">
                {step.active ? (
                  <Link
                    to={step.path}
                    className="group flex flex-col items-center"
                  >
                    {/* Circle with Icon */}
                    <div className="relative mb-6">
                      <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl flex flex-col items-center justify-center shadow-xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 border-4 border-white">
                        <div className="text-3xl mb-1">{step.icon}</div>
                        <div className="text-white font-bold text-sm">{step.number}</div>
                      </div>
                      {/* Pulse effect */}
                      <div className="absolute inset-0 bg-green-400 rounded-2xl animate-ping opacity-20"></div>
                    </div>
                    
                    {/* Label */}
                    <div className="text-center">
                      <div className="font-bold text-gray-900 text-lg group-hover:text-green-600 transition-colors">
                        {step.label}
                      </div>
                      <div className="text-sm text-green-600 font-medium mt-1">
                        Active
                      </div>
                    </div>
                  </Link>
                ) : (
                  <div className="flex flex-col items-center opacity-40">
                    {/* Circle with Icon - Disabled */}
                    <div className="relative mb-6">
                      <div className="w-24 h-24 bg-gray-300 rounded-2xl flex flex-col items-center justify-center shadow-md border-4 border-white">
                        <div className="text-3xl mb-1 grayscale">{step.icon}</div>
                        <div className="text-gray-600 font-bold text-sm">{step.number}</div>
                      </div>
                    </div>
                    
                    {/* Label */}
                    <div className="text-center">
                      <div className="font-bold text-gray-500 text-lg">
                        {step.label}
                      </div>
                      <div className="text-sm text-gray-400 mt-1">
                        🔒 Locked
                      </div>
                    </div>
                  </div>
                )}

                {/* Connector Arrow - Between Steps */}
                {index < steps.length - 1 && (
                  <div className="absolute top-12 left-1/2 w-full flex items-center justify-center pointer-events-none">
                    <div className={`text-2xl ${step.active && steps[index + 1]?.active ? 'text-green-500' : 'text-gray-300'}`}>
                      →
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Motivational Message */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-50 to-yellow-50 rounded-full border-2 border-green-200">
            <span className="text-2xl">🎉</span>
            <span className="font-semibold text-gray-700">
              {steps.filter(s => s.active).length === steps.length 
                ? "You're all set! Ready to place your order!"
                : `Step ${steps.filter(s => s.active).length} of ${steps.length} - You're doing great!`}
            </span>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes ping {
          75%, 100% {
            transform: scale(1.5);
            opacity: 0;
          }
        }

        .animate-ping {
          animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
      `}</style>
    </div>
  );
};

export default CheckoutSteps