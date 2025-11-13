import React, { useEffect, useRef, useState } from 'react';

// ✅ Lazy load Instagram embed component
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
      };
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

// ✅ Main component
const InstagramVideo = () => {
  const [videoList, setVideoList] = useState<
    { id: number; url: string }[]
  >([]);

  useEffect(() => {
    // Default static reels
    const initialVideos = [
      { id: 1, url: 'https://www.instagram.com/reel/DOyCW2Jkoaa/' },
      { id: 2, url: 'https://www.instagram.com/reel/DMNLxrkh73l/' },
      { id: 3, url: 'https://www.instagram.com/reel/DMNMydthFBH/' },
      { id: 4, url: 'https://www.instagram.com/reel/DOyB-LVkphM/' },
      { id: 5, url: 'https://www.instagram.com/reel/DLcAPHEBcbY/' },
      { id: 6, url: 'https://www.instagram.com/reel/DL5IL3EBpiA/' },
    ];

    // ✅ Load admin-uploaded reels from localStorage
    const storedReelUrls: string[] = JSON.parse(
      localStorage.getItem('reelUrls') || '[]'
    );

    // Add admin-uploaded reels after static ones
    const adminVideos = storedReelUrls.map((url, index) => ({
      id: initialVideos.length + index + 1,
      url,
    }));

    setVideoList([...initialVideos, ...adminVideos]);
  }, []);

  return (
    <section id="video" className="py-16 sm:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-indigo-700 mb-10 sm:mb-12">
          Hotel Instagram Videos
        </h2>

        {/* ✅ Centered Grid like Rooms & Dishes */}
        <div className="flex justify-center">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl w-full justify-items-center">
            {videoList.map((video) => (
              <LazyInstagramEmbed key={video.id} url={video.url} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// ✅ Default export
export default InstagramVideo;

// import React, { useEffect, useRef, useState } from 'react';

// // ✅ Lazy load Instagram embed
// const LazyInstagramEmbed = ({ url }: { url: string }) => {
//   const ref = useRef<HTMLDivElement>(null);
//   const [isVisible, setIsVisible] = useState(false);

//   useEffect(() => {
//     const observer = new IntersectionObserver(([entry]) => {
//       if (entry.isIntersecting) setIsVisible(true);
//     });
//     if (ref.current) observer.observe(ref.current);
//     return () => observer.disconnect();
//   }, []);

//   useEffect(() => {
//     if (isVisible) {
//       const script = document.createElement('script');
//       script.src = 'https://www.instagram.com/embed.js';
//       script.async = true;
//       document.body.appendChild(script);

//       return () => {
//         if (document.body.contains(script)) {
//           document.body.removeChild(script);
//         }
//       };
//     }
//   }, [isVisible]);

//   return (
//     <div ref={ref} className="rounded-xl shadow-lg bg-white p-4">
//       {isVisible && (
//         <blockquote
//           className="instagram-media"
//           data-instgrm-permalink={url}
//           data-instgrm-version="14"
//           style={{
//             background: '#FFF',
//             border: 0,
//             margin: '0 auto',
//             maxWidth: '100%',
//             minWidth: '300px',
//             padding: 0,
//             width: '100%',
//           }}
//         ></blockquote>
//       )}
//     </div>
//   );
// };

// // ✅ Main component
// const InstagramVideo = () => {
//   const videoList = [
//     { id: 1, url: 'https://www.instagram.com/reel/DOyCW2Jkoaa/' },
//     { id: 2, url: 'https://www.instagram.com/reel/DMNLxrkh73l/' },
//     { id: 3, url: 'https://www.instagram.com/reel/DMNMydthFBH/' },
//     { id: 4, url: 'https://www.instagram.com/reel/DOyB-LVkphM/' },
//     { id: 5, url: 'https://www.instagram.com/reel/DLcAPHEBcbY/' },
//     { id: 6, url: 'https://www.instagram.com/reel/DL5IL3EBpiA/' },
//   ];

//   return (
//     <section id="video" className="py-16 sm:py-20 bg-gray-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-indigo-700 mb-10 sm:mb-12">
//           Hotel Instagram Videos
//         </h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
//           {videoList.map((video) => (
//             <LazyInstagramEmbed key={video.id} url={video.url} />
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// // ✅ Default export
// export default InstagramVideo;

