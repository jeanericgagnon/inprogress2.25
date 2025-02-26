import React from 'react';
import { questions } from '../data/questions';
import { useMediaQuery } from '../hooks/useMediaQuery';

interface FAQProps {
  faqRef: React.RefObject<HTMLDivElement>;
  faqTopPosition: number;
  activeQuestion: number | null;
  setActiveQuestion: (index: number | null) => void;
  className?: string;
}

export function FAQ({ faqRef, faqTopPosition, activeQuestion, setActiveQuestion, className = '' }: FAQProps) {
  const isDesktop = useMediaQuery('(min-width: 768px)');

  return (
    <div
      ref={faqRef}
      role="region"
      aria-label="Frequently Asked Questions"
      style={{ top: isDesktop ? `${faqTopPosition}px` : '0' }}
      className={`relative md:fixed md:right-0 w-[90%] md:w-[55%] z-10 p-4 md:p-8 md:mt-[72px] -mt-4 md:h-[calc(93vh_-_72px)] flex flex-col items-center justify-center pb-20 ${className}`}
    >
      <h2 className="text-2xl font-bold mb-4 md:hidden sticky top-[72px] bg-[#E5DDD0] w-full py-3 text-center border-b border-black">
        Tell me more
      </h2>
      <div className="w-full max-w-2xl mx-auto">
        <div className="space-y-2 md:space-y-3">
          {questions.map((item, index) => (
            <div
              key={index}
              className="group"
              role="button"
              aria-expanded={activeQuestion === index}
              aria-controls={`faq-answer-${index}`}
              onClick={() => setActiveQuestion(activeQuestion === index ? null : index)}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-black rounded-xl rotate-1 group-hover:rotate-2 transition-transform duration-300"></div>
                <div className={`
                  relative bg-[#E5DDD0] p-3 rounded-xl border-2 border-black
                  group-hover:-translate-y-1 transition-all duration-300
                  md:p-3
                  ${activeQuestion === index ? 'shadow-none translate-x-[4px] translate-y-[4px]' : 'shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'}
                `}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="bg-black rounded-full p-1.5 text-white">
                        <item.icon className="w-5 h-5" />
                      </div>
                      <h3 className="font-bold text-sm md:text-base">{item.question}</h3>
                    </div>
                    <div className={`transform transition-transform duration-300 ${activeQuestion === index ? 'rotate-180' : ''}`}>
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>
                  <div className={`
                    overflow-hidden transition-all duration-300
                    ${activeQuestion === index ? 'max-h-40 mt-4' : 'max-h-0'}
                    text-sm
                  `}
                  id={`faq-answer-${index}`}
                  role="region"
                  aria-hidden={activeQuestion !== index}>
                    <p className="text-gray-700">{item.answer}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}