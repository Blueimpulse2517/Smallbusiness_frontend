import React, { useEffect, useRef, useState } from 'react';
import { Save, Trash2, Upload } from 'lucide-react';

// ✅ Lazy load Instagram embed component
const LazyInstagramEmbed = ({ 
  url, 
  reelIndex,
  onReplace,
  onDelete
}: { 
  url: string;
  reelIndex: number;
  onReplace?: (index: number, newUrl: string) => void;
  onDelete?: (index: number) => void;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [newUrl, setNewUrl] = useState('');
  const isAdmin = localStorage.getItem("isAdmin") === "true";
  const isReplaced = url.includes('reel/') && JSON.parse(localStorage.getItem('replacedReels') || '{}')[reelIndex];

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
  }, [isVisible, url]);

  const handleSave = () => {
    if (!newUrl.trim()) {
      alert('Please enter a valid Instagram reel URL');
      return;
    }
    if (onReplace) {
      onReplace(reelIndex, newUrl.trim());
    }
    setNewUrl('');
    setShowUrlInput(false);
  };

  return (
    <div>
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
      {/* Instagram-style action buttons below reel */}
      {isAdmin && (
        <div className="mt-3 px-2">
          {showUrlInput ? (
            <div className="space-y-2 mb-2">
              <input
                type="text"
                value={newUrl}
                onChange={(e) => setNewUrl(e.target.value)}
                placeholder="Paste Instagram reel URL"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs sm:text-sm"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSave();
                  } else if (e.key === 'Escape') {
                    setShowUrlInput(false);
                    setNewUrl('');
                  }
                }}
                autoFocus
              />
              <div className="flex gap-2">
                <button
                  onClick={handleSave}
                  className="flex-1 bg-purple-600 hover:bg-purple-700 text-white px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition"
                >
                  Save
                </button>
                <button
                  onClick={() => {
                    setShowUrlInput(false);
                    setNewUrl('');
                  }}
                  className="flex-1 bg-gray-500 hover:bg-gray-600 text-white px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center gap-3">
              {/* Save button with upload icon - replaces this reel */}
              <button
                onClick={() => setShowUrlInput(true)}
                className="flex items-center gap-1.5 text-purple-600 hover:text-purple-700 transition-colors"
                title="Replace reel"
              >
                <Save className="w-4 h-4 sm:w-5 sm:h-5" />
                <Upload className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="text-xs sm:text-sm font-medium">Save</span>
              </button>
              {/* Delete button - only for replaced reels (reset to default) */}
              {isReplaced && onDelete && (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    onDelete(reelIndex);
                  }}
                  className="flex items-center gap-1.5 text-red-600 hover:text-red-700 transition-colors"
                  title="Reset to default"
                >
                  <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="text-xs sm:text-sm font-medium">Delete</span>
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// ✅ Main component
const InstagramVideo = () => {
  // Default 6 reels
  const defaultReels = [
    'https://www.instagram.com/reel/DOyCW2Jkoaa/',
    'https://www.instagram.com/reel/DMNLxrkh73l/',
    'https://www.instagram.com/reel/DMNMydthFBH/',
    'https://www.instagram.com/reel/DOyB-LVkphM/',
    'https://www.instagram.com/reel/DLcAPHEBcbY/',
    'https://www.instagram.com/reel/DL5IL3EBpiA/',
  ];

  const [videoList, setVideoList] = useState<string[]>(defaultReels);

  useEffect(() => {
    const loadVideos = () => {
      // Load replaced reels from localStorage
      const replacedReels: { [key: number]: string } = JSON.parse(
        localStorage.getItem('replacedReels') || '{}'
      );

      // Merge defaults with replacements
      const merged = defaultReels.map((defaultUrl, index) => {
        return replacedReels[index] || defaultUrl;
      });

      setVideoList(merged);
    };

    loadVideos();

    // Listen for storage changes
    const handleStorageChange = () => {
      loadVideos();
    };
    window.addEventListener('storage', handleStorageChange);
    // Also listen for custom events (for same-window updates)
    window.addEventListener('reelsUpdated', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('reelsUpdated', handleStorageChange);
    };
  }, []);

  // Handle replacing a reel at specific index
  const handleReplaceReel = (index: number, newUrl: string) => {
    const replacedReels: { [key: number]: string } = JSON.parse(
      localStorage.getItem('replacedReels') || '{}'
    );
    replacedReels[index] = newUrl;
    localStorage.setItem('replacedReels', JSON.stringify(replacedReels));
    
    // Update state
    const updated = [...videoList];
    updated[index] = newUrl;
    setVideoList(updated);

    // Trigger custom event for same-window updates
    window.dispatchEvent(new Event('reelsUpdated'));
  };

  // Handle deleting (resetting to default) a reel
  const handleDeleteReel = (index: number) => {
    if (!window.confirm('Are you sure you want to reset this reel to default?')) return;

    const replacedReels: { [key: number]: string } = JSON.parse(
      localStorage.getItem('replacedReels') || '{}'
    );
    delete replacedReels[index];
    localStorage.setItem('replacedReels', JSON.stringify(replacedReels));
    
    // Update state with default
    const updated = [...videoList];
    updated[index] = defaultReels[index];
    setVideoList(updated);

    // Trigger custom event for same-window updates
    window.dispatchEvent(new Event('reelsUpdated'));
  };

  return (
    <section id="video" className="py-16 sm:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-indigo-700 mb-10 sm:mb-12">
          Hotel Instagram Videos
        </h2>

        {/* ✅ Centered Grid like Rooms & Dishes - Always 6 reels */}
        <div className="flex justify-center">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl w-full justify-items-center">
            {videoList.map((url, index) => (
              <LazyInstagramEmbed 
                key={index} 
                url={url}
                reelIndex={index}
                onReplace={handleReplaceReel}
                onDelete={handleDeleteReel}
              />
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


// import React, { useEffect, useRef, useState } from 'react';

// // ✅ Lazy load Instagram embed component
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
//   const [videoList, setVideoList] = useState<
//     { id: number; url: string }[]
//   >([]);

//   useEffect(() => {
//     // Default static reels
//     const initialVideos = [
//       { id: 1, url: 'https://www.instagram.com/reel/DOyCW2Jkoaa/' },
//       { id: 2, url: 'https://www.instagram.com/reel/DMNLxrkh73l/' },
//       { id: 3, url: 'https://www.instagram.com/reel/DMNMydthFBH/' },
//       { id: 4, url: 'https://www.instagram.com/reel/DOyB-LVkphM/' },
//       { id: 5, url: 'https://www.instagram.com/reel/DLcAPHEBcbY/' },
//       { id: 6, url: 'https://www.instagram.com/reel/DL5IL3EBpiA/' },
//     ];

//     // ✅ Load admin-uploaded reels from localStorage
//     const storedReelUrls: string[] = JSON.parse(
//       localStorage.getItem('reelUrls') || '[]'
//     );

//     // Add admin-uploaded reels after static ones
//     const adminVideos = storedReelUrls.map((url, index) => ({
//       id: initialVideos.length + index + 1,
//       url,
//     }));

//     setVideoList([...initialVideos, ...adminVideos]);
//   }, []);

//   return (
//     <section id="video" className="py-16 sm:py-20 bg-gray-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-indigo-700 mb-10 sm:mb-12">
//           Hotel Instagram Videos
//         </h2>

//         {/* ✅ Centered Grid like Rooms & Dishes */}
//         <div className="flex justify-center">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl w-full justify-items-center">
//             {videoList.map((video) => (
//               <LazyInstagramEmbed key={video.id} url={video.url} />
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// // ✅ Default export
// export default InstagramVideo;

// // import React, { useEffect, useRef, useState } from 'react';

// // // ✅ Lazy load Instagram embed
// // const LazyInstagramEmbed = ({ url }: { url: string }) => {
// //   const ref = useRef<HTMLDivElement>(null);
// //   const [isVisible, setIsVisible] = useState(false);

// //   useEffect(() => {
// //     const observer = new IntersectionObserver(([entry]) => {
// //       if (entry.isIntersecting) setIsVisible(true);
// //     });
// //     if (ref.current) observer.observe(ref.current);
// //     return () => observer.disconnect();
// //   }, []);

// //   useEffect(() => {
// //     if (isVisible) {
// //       const script = document.createElement('script');
// //       script.src = 'https://www.instagram.com/embed.js';
// //       script.async = true;
// //       document.body.appendChild(script);

// //       return () => {
// //         if (document.body.contains(script)) {
// //           document.body.removeChild(script);
// //         }
// //       };
// //     }
// //   }, [isVisible]);

// //   return (
// //     <div ref={ref} className="rounded-xl shadow-lg bg-white p-4">
// //       {isVisible && (
// //         <blockquote
// //           className="instagram-media"
// //           data-instgrm-permalink={url}
// //           data-instgrm-version="14"
// //           style={{
// //             background: '#FFF',
// //             border: 0,
// //             margin: '0 auto',
// //             maxWidth: '100%',
// //             minWidth: '300px',
// //             padding: 0,
// //             width: '100%',
// //           }}
// //         ></blockquote>
// //       )}
// //     </div>
// //   );
// // };

// // // ✅ Main component
// // const InstagramVideo = () => {
// //   const videoList = [
// //     { id: 1, url: 'https://www.instagram.com/reel/DOyCW2Jkoaa/' },
// //     { id: 2, url: 'https://www.instagram.com/reel/DMNLxrkh73l/' },
// //     { id: 3, url: 'https://www.instagram.com/reel/DMNMydthFBH/' },
// //     { id: 4, url: 'https://www.instagram.com/reel/DOyB-LVkphM/' },
// //     { id: 5, url: 'https://www.instagram.com/reel/DLcAPHEBcbY/' },
// //     { id: 6, url: 'https://www.instagram.com/reel/DL5IL3EBpiA/' },
// //   ];

// //   return (
// //     <section id="video" className="py-16 sm:py-20 bg-gray-50">
// //       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// //         <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-indigo-700 mb-10 sm:mb-12">
// //           Hotel Instagram Videos
// //         </h2>
// //         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
// //           {videoList.map((video) => (
// //             <LazyInstagramEmbed key={video.id} url={video.url} />
// //           ))}
// //         </div>
// //       </div>
// //     </section>
// //   );
// // };

// // // ✅ Default export
// // export default InstagramVideo;

