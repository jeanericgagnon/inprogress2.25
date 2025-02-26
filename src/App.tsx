import React, { useState, useEffect } from 'react';
import { Mail, Instagram, Twitter, X, HelpCircle, Users, Sparkles, Mic2, Calendar, Share2 } from 'lucide-react';
import { FAQ } from './components/FAQ';

declare global {
  interface Window {
    hbspt: {
      forms: {
        create: (config: {
          portalId: string;
          formId: string;
          target?: string;
        }) => void;
      };
    };
  }
}
function App() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [activeQuestion, setActiveQuestion] = useState<number | null>(null);
  const [yellowSectionHeight, setYellowSectionHeight] = useState(0);
  const [faqHeight, setFaqHeight] = useState(0);
  const yellowSectionRef = React.useRef<HTMLDivElement>(null);
  const faqRef = React.useRef<HTMLDivElement>(null);

  const [formVisible, setFormVisible] = useState(true);

  useEffect(() => {
    const script = document.querySelector('script[src*="//js.hsforms.net"]');
    let timeoutId: number;

    function loadForm() {
      if (window.hbspt) {
        window.hbspt.forms.create({
          portalId: "49143429",
          formId: "6ab0d314-ceca-4e31-8a74-3ef085b99684",
          target: "#hubspot-form-container"
        });
        if (timeoutId) {
          window.clearTimeout(timeoutId);
        }
      }
    }

    if (window.hbspt) {
      loadForm();
    } else if (script) {
      timeoutId = window.setTimeout(loadForm, 100);
    } else {
      const newScript = document.createElement('script');
      newScript.src = "//js.hsforms.net/forms/embed/v2.js";
      newScript.async = true;
      newScript.onload = loadForm;
      document.head.appendChild(newScript);
    }

    return () => {
      if (timeoutId) {
        window.clearTimeout(timeoutId);
      }
    };
  }, []);

  React.useEffect(() => {
    const updateHeights = () => {
      if (yellowSectionRef.current && faqRef.current) {
        const yellowHeight = yellowSectionRef.current.offsetHeight;
        const faqHeight = faqRef.current.offsetHeight;
        setYellowSectionHeight(yellowHeight);
        setFaqHeight(faqHeight);
      }
    };

    // Initial update
    updateHeights();

    // Update on content changes
    const observer = new ResizeObserver(updateHeights);
    if (faqRef.current) {
      observer.observe(faqRef.current);
    }

    window.addEventListener('resize', updateHeights);
    return () => {
      window.removeEventListener('resize', updateHeights);
      observer.disconnect();
    };
  }, []);

  const faqTopPosition = React.useMemo(() => {
    return Math.max(0, (yellowSectionHeight - faqHeight) / 2);
  }, [yellowSectionHeight, faqHeight]);

  const questions = [
    {
      icon: <Users className="w-5 h-5" />,
      question: "Who is this for?",
      answer: "People who love hearing from experts in their field, being entertained while doing it, and aren't afraid to admit they miss being curious."
    },
    {
      icon: <HelpCircle className="w-5 h-5" />,
      question: "How do I join?",
      answer: 'Hit "Join the List" and be ready to secure your spot. Only 50 seats per event.'
    },
    {
      icon: <Sparkles className="w-5 h-5" />,
      question: "What's in it for me?",
      answer: "Great conversations, fresh ideas, and an excuse to drink on a weeknight."
    },
    {
      icon: <Mic2 className="w-5 h-5" />,
      question: "Who are the speakers?",
      answer: "Our speakers are top-tier professors, industry pros, and incredible storytellers—each with a unique perspective to share."
    },
    {
      icon: <Calendar className="w-5 h-5" />,
      question: "What to expect?",
      answer: "Expect 40-minute talks, lively Q&A sessions, a full bar, and great vibes all around."
    },
    {
      icon: <Share2 className="w-5 h-5" />,
      question: "How can I support the series?",
      answer: "Spread the word, share on social, or reach out if you'd like to collaborate with us!"
    }
  ];

  const handleEventClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowModal(true);
  };

  const handleRedirect = () => {
    window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '_blank');
    setShowModal(false);
  };

  return (
    <div className="min-h-screen relative font-mono">
      {/* Header */}
      <header className="w-full h-[72px] bg-[#78fcc4] fixed top-0 left-0 z-50 flex items-center justify-between pr-[5%] md:px-8" role="banner">
        <div className="block md:hidden flex items-center">
          <div className="pl-1 mt-1.5">
          <img 
            src="https://i.postimg.cc/vD3xXjZz/Martini-Glass-Mobile.png" 
            alt="The Social Study Logo" 
            role="img"
            className="w-[100px] h-[100px] object-contain hover:scale-110 transition-transform duration-300"
          />
          </div>
        </div>
        <div className="hidden md:block w-[96px] h-[96px]">
          <img 
            src="https://i.postimg.cc/8jYRqCF2/Martini-Glass-copy.png" 
            alt="The Social Study Logo" 
            role="img"
            className="w-full h-full object-contain hover:scale-110 transition-transform duration-300"
          />
        </div>
        <div className="flex gap-2 md:gap-6">
          <a href="https://www.instagram.com/thesocial.study" target="_blank" rel="noopener noreferrer" className="group relative" aria-label="Follow us on Instagram">
            <div className="flex absolute top-1/2 right-full -translate-y-1/2 mr-3 items-center gap-2 bg-[#e10086] text-white text-[10px] md:text-xs px-2 md:px-3 py-1 md:py-1.5 rounded-xl border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              <span className="font-bold whitespace-nowrap">follow us →</span>
            </div>
            <div className="absolute inset-0 bg-black rounded-xl -rotate-3 group-hover:-rotate-6 transition-transform duration-300 translate-y-0"></div>
            <div className="relative bg-[#E5DDD0] p-2.5 rounded-xl border-2 border-black group-hover:-translate-y-1 transition-transform duration-300">
              <Instagram className="w-5 h-5 md:w-7 md:h-7" />
            </div>
          </a>
          <a href="https://x.com/thesocial_study" target="_blank" rel="noopener noreferrer" className="group relative" aria-label="Follow us on X (formerly Twitter)">
            <div className="absolute inset-0 bg-black rounded-xl -rotate-3 group-hover:-rotate-6 transition-transform duration-300 translate-y-0"></div>
            <div className="relative bg-[#E5DDD0] p-2 rounded-xl border-2 border-black group-hover:-translate-y-1 transition-transform duration-300">
              <Twitter className="w-5 h-5 md:w-7 md:h-7" />
            </div>
          </a>
          <a href="https://www.tiktok.com/@thesocial.study" target="_blank" rel="noopener noreferrer" className="group relative" aria-label="Follow us on TikTok">
            <div className="absolute inset-0 bg-black rounded-xl rotate-2 group-hover:rotate-4 transition-transform duration-300 translate-y-0"></div>
            <div className="relative bg-[#E5DDD0] p-2 rounded-xl border-2 border-black group-hover:-translate-y-1 transition-transform duration-300">
              <svg
                viewBox="0 0 24 24"
                className="w-5 h-5 md:w-7 md:h-7 text-black"
                fill="currentColor"
              >
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
              </svg>
            </div>
          </a>
        </div>
      </header>

      {/* Decorative Bar */}
      <div className="w-full bg-[#78fcc4] py-2 fixed top-[72px] left-0 z-50 border-b border-black"></div>

      {/* Background Sections */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="fixed top-0 left-0 w-[90%] md:w-[45%] h-screen bg-[#f5cd89] border-r border-black"></div>
        <div ref={yellowSectionRef} className="fixed top-[72px] right-0 w-[10%] md:w-[55%] bg-[#fdfb76] border-b border-black h-[calc(60%_-_72px)] md:h-[calc(93%_-_72px)]"></div>
        <div className="fixed bottom-0 right-0 w-[10%] md:w-[55%] h-[40%] md:h-[7%] bg-[#e10086] z-[-1]"></div>
      </div>

      {/* Main Content */}
      <main className="relative z-20 flex flex-col items-start md:justify-center min-h-[calc(100vh-72px)] p-2 md:p-8 md:pl-16 max-w-[80%] md:max-w-[40%] mt-[72px] scrollbar-hide bg-transparent" role="main">
        <header className="mb-8 w-full">
          <h1 className="sr-only">The Social Study - Exclusive Lectures in San Diego</h1>
          <h2 className="text-3xl md:text-5xl font-bold text-black tracking-tight hover:tracking-wide transition-all duration-300 mt-4 md:mt-0">
            The Social Study
          </h2>
          <nav className="sr-only">
            <ul>
              <li><a href="https://www.instagram.com/thesocial.study">Follow us on Instagram</a></li>
              <li><a href="https://x.com/thesocial_study">Follow us on X</a></li>
              <li><a href="https://www.tiktok.com/@thesocial.study">Follow us on TikTok</a></li>
              <li><a href="https://www.sandiego.org/explore/things-to-do/nightlife.aspx">San Diego Nightlife</a></li>
              <li><a href="https://www.sandiego.edu/">University of San Diego</a></li>
              <li><a href="https://ucsd.edu/">UC San Diego</a></li>
              <li><a href="https://www.sdsu.edu/">San Diego State University</a></li>
            </ul>
          </nav>
          <nav className="sr-only">
            <ul>
              <li><a href="https://www.instagram.com/thesocial.study">Follow us on Instagram</a></li>
              <li><a href="https://x.com/thesocial_study">Follow us on X</a></li>
              <li><a href="https://www.tiktok.com/@thesocial.study">Follow us on TikTok</a></li>
              <li><a href="https://www.sandiego.org/explore/things-to-do/nightlife.aspx">San Diego Nightlife</a></li>
              <li><a href="https://www.sandiego.edu/">University of San Diego</a></li>
              <li><a href="https://ucsd.edu/">UC San Diego</a></li>
              <li><a href="https://www.sdsu.edu/">San Diego State University</a></li>
            </ul>
          </nav>
        </header>
        <section className="w-full pb-8 md:pb-0 flex flex-col">
          <p className="text-base md:text-xl text-black leading-relaxed mb-4 md:mb-6 hover:scale-[1.02] transition-transform duration-300">
            <span className="md:hidden"><span className="text-fuchsia-500 font-bold">40-minute</span> lectures from professors, storytellers, and industry experts—because your evenings deserve curiosity, community, and a dash of fun</span>
            <span className="hidden md:inline"><span className="text-fuchsia-500 font-bold">40-minute</span> lectures from professors, experts, and master storytellers—<span className="text-fuchsia-500 font-bold">designed for everyone</span>, because learning should be as fun as it is inspiring</span>
          </p>
          <p className="text-black/70 text-base italic mb-3 md:mb-6 hover:text-black transition-colors duration-300">
            coming early/mid 2025 to bars all over san diego
          </p>
          <p className="text-sm mb-2 md:mb-4 font-bold tracking-tight">
            <span className="text-black/90 hover:text-[#e10086] transition-colors duration-300">Drop your email. </span>
            <span className="text-black/90 hover:text-[#78fcc4] transition-colors duration-300">We'll drop the details</span>
            <span className="text-black/90 hover:text-black transition-colors duration-300">—no spam, no fluff. </span>
            <span className="text-black/90 hover:text-[#fdfb76] transition-colors duration-300">Just first dibs on tickets </span>
            <span className="text-black/90 hover:text-[#e10086] transition-colors duration-300">and a front-row seat to key updates.</span>
          </p>
          <div id="hubspot-form-container" className="w-full md:w-[400px] relative z-[2] min-h-[120px]"></div>
          <div className="w-full mb-4 relative z-[3] -mt-[100px] md:-mt-[80px] bg-transparent">
            <div className="relative bg-[#E5DDD0] p-4 rounded-xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]" role="status" aria-label="Signup Progress">
              <div className="mb-3">
                <div className="relative w-full h-10 bg-white/50 rounded-full border-2 border-black overflow-hidden shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)]" role="progressbar" aria-valuenow="10" aria-valuemin="0" aria-valuemax="500" aria-label="Current signup progress">
                  <div 
                    className="absolute top-0 left-0 h-full bg-[#78fcc4] border-r-2 border-black transition-all duration-1000 shadow-[0_0_10px_rgba(120,252,196,0.5)]"
                    style={{ width: '10%' }}
                  >
                    <div className="absolute inset-0 bg-[#78fcc4] animate-pulse"></div>
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
                  </div>
                </div>
                <div className="flex justify-between mt-2 text-sm font-bold tracking-tight">
                  <span>0</span>
                  <span>500</span>
                </div>
              </div>
              <p className="text-base text-black/90 leading-snug">
                Before launch our goal is to build a community of <span className="font-black text-[#e10086] hover:text-black transition-colors duration-300">500</span> curious minds to fill local bars and breweries. We're currently just above <span className="font-black text-[#e10086] hover:text-black transition-colors duration-300">50</span> and counting—join early and help shape The Social Study!
              </p>
            </div>
          </div>
          <div className="mb-4 relative z-[3]">
            <a
              href="#"
              aria-label="Check first event date"
              onMouseEnter={() => setIsExpanded(true)}
              onMouseLeave={() => setIsExpanded(false)}
              onClick={handleEventClick}
            >
              <div className={`
                relative px-4 md:px-8 py-3
                bg-[#FF1493]
                text-white font-bold
                border-2 border-black
                shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
                hover:shadow-none
                hover:translate-x-[4px]
                hover:translate-y-[4px]
                text-center
                ${isExpanded ? 'scale-110' : 'scale-100'}
                transition-all duration-300
              `}>
                When's the first event?
              </div>
            </a>
          </div>
        </section>
      </main>
      <FAQ
        faqRef={faqRef}
        faqTopPosition={faqTopPosition}
        activeQuestion={activeQuestion}
        setActiveQuestion={setActiveQuestion}
        className="md:block"
      />

      {/* Modal */}
      {showModal && (
        <dialog open className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" aria-labelledby="modal-title" aria-modal="true">
          <div className="relative bg-white p-8 rounded-lg border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] max-w-md w-full mx-4">
            <button 
              onClick={() => setShowModal(false)}
              aria-label="Close modal"
              className="absolute top-4 right-4 p-1 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <h2 id="modal-title" className="text-2xl font-bold mb-4">We're waiting to tell you</h2>
            <p className="text-gray-600 mb-6">But if you really want to know...</p>
            <button
              onClick={handleRedirect}
              className="w-full px-6 py-3 bg-[#FF1493] text-white font-bold border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] transition-all duration-300"
            >
              Tell me anyway
            </button>
          </div>
        </dialog>
      )}
    </div>
  );
}

export default App;