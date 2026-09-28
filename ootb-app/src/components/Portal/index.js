import React, { useEffect, useState } from "react";
import { renderPortal } from "../../renderReactRoot"; // your dynamic import utility

const Portal = ({ children, container }) => {
  const [portalContent, setPortalContent] = useState(null);

  useEffect(() => {
    let isMounted = true;

    if (container) {
      renderPortal(children, container).then((portal) => {
        if (isMounted) setPortalContent(portal);
      });
    }

    return () => {
      isMounted = false;
      setPortalContent(null);
    };
  }, [children, container]);

  return portalContent;
};

export default Portal;
