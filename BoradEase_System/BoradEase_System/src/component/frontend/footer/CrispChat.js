// CrispChat.js
import React, { useEffect } from 'react';

const CrispChat = () => {
  useEffect(() => {
    // Initialize Crisp chat script
    window.$crisp = [];
    window.CRISP_WEBSITE_ID = "872d80cd-e640-4615-bb65-b1bd4e875f9a";
    (function () {
      var d = document;
      var s = d.createElement("script");
      s.src = "https://client.crisp.chat/l.js";
      s.async = 1;
      d.getElementsByTagName("head")[0].appendChild(s);
    })();

    // Cleanup when component unmounts
    return () => {
      // You may want to add cleanup code here if necessary
    };
  }, []); // Empty dependency array ensures this effect runs only once after initial render

  return (
    <div>
      {/* You can add any additional content related to Crisp chat here */}
    </div>
  );
};

export default CrispChat;
