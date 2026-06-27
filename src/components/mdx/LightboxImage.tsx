import React, { useState, useEffect } from 'react';

export const LightboxImage = ({ src, alt, caption }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Handle ESC key press and scroll locking
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setIsOpen(false);
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      // Lock background scrolling when modal is open
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup on unmount
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <>
      {/* Base Image (Thumbnail) */}
      <figure className="my-8 flex flex-col items-center">
        <button
          onClick={() => setIsOpen(true)}
          className="relative group focus:outline-none transition-transform hover:scale-[1.01] cursor-zoom-in"
          aria-label={`View enlarged: ${alt}`}
        >
          <img
            src={src}
            alt={alt}
            className="rounded-xl shadow-md border border-slate-200/20 max-h-[500px] w-auto object-contain"
          />
          {/* Subtle hover overlay to indicate it's clickable */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors rounded-xl flex items-center justify-center pointer-events-none" />
        </button>
        {caption && (
          <figcaption className="mt-3 text-sm text-slate-500 font-['Montserrat',sans-serif] text-center max-w-2xl">
            {caption}
          </figcaption>
        )}
      </figure>

      {/* Lightbox Modal Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#001226]/90 backdrop-blur-sm p-4 sm:p-8 cursor-zoom-out"
          onClick={() => setIsOpen(false)}
          aria-modal="true"
          role="dialog"
        >
          {/* Close Button */}
          <button
            className="absolute top-4 right-4 sm:top-6 sm:right-6 text-white/70 hover:text-white p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors focus:outline-none"
            onClick={() => setIsOpen(false)}
            aria-label="Close lightbox"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>

          {/* Expanded Image Container */}
          <div className="relative flex flex-col items-center justify-center w-full h-full">
            <img
              src={src}
              alt={alt}
              className="max-w-full max-h-full object-contain rounded-md shadow-2xl cursor-default"
              onClick={(e) => e.stopPropagation()} // Prevent clicking the image from closing the modal
            />
            
            {caption && (
              <div className="absolute bottom-[-2rem] left-0 right-0 text-center text-slate-300 text-sm font-['Montserrat',sans-serif] pointer-events-none">
                {caption}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};