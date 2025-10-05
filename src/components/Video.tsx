import React, { useEffect } from 'react';

const Video = () => {
  const videoList = [
    {
      id: 1,
      url: 'https://www.instagram.com/reel/DN5jeu5EjQ8/?utm_source=ig_web_copy_link&igsh=MXBsbHNuMnE2M2NkZw==',
    },
    {
      id: 2,
      url: 'https://www.instagram.com/reel/DN5jeu5EjQ8/?utm_source=ig_web_copy_link&igsh=MXBsbHNuMnE2M2NkZw==',
    },
  ];

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://www.instagram.com/embed.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup the script when component unmounts (optional)
      document.body.removeChild(script);
    };
  }, []);

  return (
    <section id="videos" className="py-16 bg-gray-100">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10 text-indigo-700"> Videos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {videoList.map((video) => (
            <div key={video.id} className="rounded overflow-hidden shadow-lg">
              <blockquote
                className="instagram-media"
                data-instgrm-permalink={video.url}
                data-instgrm-version="14"
                style={{ background: "#FFF", border: 0, margin: "1px auto", maxWidth: "540px", minWidth: "326px", padding: 0, width: "99%" }}
              ></blockquote>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Video;
