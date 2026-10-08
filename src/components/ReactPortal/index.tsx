import { useState, type ReactNode } from 'react';
import { createPortal } from 'react-dom';

function getPortalRoot() {
  let portalRoot = document.getElementById('portal-root');

  if (!portalRoot) {
    portalRoot = document.createElement('div');
    portalRoot.id = 'portal-root';
    document.body.appendChild(portalRoot);
  }

  return portalRoot;
}

interface ReactPortalProps {
  children: ReactNode;
}

export function ReactPortal({ children }: ReactPortalProps) {
  const [portalRoot] = useState(getPortalRoot);

  return createPortal(children, portalRoot);
}
