import React, { useEffect, useRef, useState } from 'react';

const LazyInstagramEmbed = ({ url }: { url: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setIsVisible(true);
    });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
  if (isVisible) {
    const script = document.createElement('script');
    script.src = 'https://www.instagram.com/embed.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    }; // ✅ returns void
  }
}, [isVisible]);

  return (
    <div ref={ref} className="rounded-xl shadow-lg bg-white p-4">
      {isVisible && (
        <blockquote
          className="instagram-media"
          data-instgrm-permalink={url}
          data-instgrm-version="14"
          style={{
            background: '#FFF',
            border: 0,
            margin: '0 auto',
            maxWidth: '100%',
            minWidth: '300px',
            padding: 0,
            width: '100%',
          }}
        ></blockquote>
      )}
    </div>
  );
};

// ✅ Wrap in a parent component and export it
const Video = () => {
  const videoList = [
    {
      id: 1,
      url: 'https://www.instagram.com/reel/DN5jeu5EjQ8/',
    },
    {
      id: 2,
      url: 'https://www.instagram.com/reel/DN5jeu5EjQ8/',
    },
  ];

  return (
    <section id="videos" className="py-16 sm:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-indigo-700 mb-10 sm:mb-12">
          Instagram Videos
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
          {videoList.map((video) => (
            <LazyInstagramEmbed key={video.id} url={video.url} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Video;