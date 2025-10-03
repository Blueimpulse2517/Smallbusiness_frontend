import React, { useEffect } from 'react';
declare global {
  interface Window {
    instgrm?: {
      Embeds: {
        process: () => void;
      };
    };
  }
}

const Video = () => {
  const videoList = [
    {
      id: 1,
      url: 'https://www.instagram.com/reel/DPOfdgJjTwa/?utm_source=ig_web_copy_link&igsh=MXZxcm9sNmo1OTc2NQ==', // Replace with real Instagram video URL
    },
    {
      id: 2,
      url: 'https://www.instagram.com/reel/DJ4TM_gSfzO/?utm_source=ig_web_copy_link&igsh=MWEzN2NlcWZrbWR3dA==', // Replace with real Instagram video URL
    },
    
  ];
  // useEffect(() => {
  //   // Check if the embed script is already loaded
  //   const existingScript = document.querySelector('script[src="https://www.instagram.com/embed.js"]');

  //   if (!existingScript) {
  //     const script = document.createElement("script");
  //     script.src = "https://www.instagram.com/embed.js";
  //     script.async = true;
  //     document.body.appendChild(script);

  //     script.onload = () => {
  //       if (window.instgrm) {
  //         window.instgrm.Embeds.process();
  //       }
  //     };
  //   } else {
  //     // If already loaded, just reprocess
  //     if (window.instgrm) {
  //       window.instgrm.Embeds.process();
  //     }
  //   }
  // });

  useEffect(() => {
    // Load the Instagram embed script
    const script = document.createElement("script");
    script.src = "https://www.instagram.com/embed.js";
    script.async = true;
    document.body.appendChild(script);

    // Optional: re-render embeds when videoList changes
  //  Console.log(window,"window")
  //   window.instagram?.Embeds?.process();
  }, []);

  return (
    <section id="rooms" className="py-16 sm:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-gray-900 mb-10 sm:mb-12">
          Videos
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
          {videoList.map((video, index) => (
            <div className="relative overflow-hidden rounded-xl shadow-lg aspect-[14/16] max-h-[500px]">
              <div
                className="w-full h-full"
                dangerouslySetInnerHTML={{
                  __html: `
                    <blockquote 
                      class="instagram-media" 
                      data-instgrm-permalink="${video.url}" 
                      data-instgrm-version="14" 
                      style="width:100%; max-width:540px; margin:auto;">
                    </blockquote>
                  `,
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Video;
