// THIS IS OUT OF THE PROJECT'S SCOPE, I JUST ADDED IT TO SHOW YOU THE VIDEO


import { useEffect, useState } from 'react';

const STORAGE_KEY = 'welcomeVideoPopupShown';
const SHOW_DELAY_MS = 5000;
const YOUTUBE_EMBED_URL = 'https://www.youtube.com/embed/vXk0QIlRurA';

export function WelcomeVideoPopup() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (localStorage.getItem(STORAGE_KEY)) return;

    const timer = setTimeout(() => {
      setIsOpen(true);
      localStorage.setItem(STORAGE_KEY, 'true');
    }, SHOW_DELAY_MS);

    return () => clearTimeout(timer);
  }, []);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      onClick={() => setIsOpen(false)}
    >
      <div
        className="relative w-full max-w-lg rounded-lg bg-white p-4 shadow-xl sm:p-5 md:max-w-2xl md:p-6 lg:max-w-3xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          aria-label="Close"
          className="absolute -top-3 -right-3 flex h-8 w-8 items-center justify-center rounded-full bg-white text-gray-600 shadow-md hover:text-gray-900"
        >
          ✕
        </button>
        <h2 className="font-display mb-2 pr-6 text-center md:mb-3">
          Hello EcomExpert Team – probably Eng. Khaled Abdelrhem 😄
        </h2>
        <p className="font-body mb-3 text-center text-gray-600 md:mb-4">
          I'm genuinely excited about the chance to join your team — this task was such a fun
          challenge to dig into, and I'd love to bring that same energy and passion to working
          with you every day. Thanks for taking the time to watch! 🚀
        </p>
        <div className="aspect-video w-full overflow-hidden rounded-md">
          <iframe
            className="h-full w-full"
            src={YOUTUBE_EMBED_URL}
            title="Welcome video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
}
