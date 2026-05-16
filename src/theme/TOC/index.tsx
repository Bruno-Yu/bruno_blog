import React, { useState, useEffect, type ReactNode } from 'react';
import TOC from '@theme-original/TOC';
import type TOCType from '@theme/TOC';
import type { WrapperProps } from '@docusaurus/types';

type Props = WrapperProps<typeof TOCType>;

export default function TOCWrapper(props: Props): ReactNode {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const scrollMax = document.body.scrollHeight - window.innerHeight;
      setProgress(scrollMax > 0 ? Math.min(window.scrollY / scrollMax, 1) : 0);
    };

    update(); // set initial value
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  return (
    <>
      {/* Reading progress bar */}
      <div
        aria-hidden="true"
        style={{
          height: 3,
          background: 'var(--ph-border, rgba(17,20,24,0.13))',
          borderRadius: 2,
          marginBottom: 12,
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            height: '100%',
            width: `${progress * 100}%`,
            background: 'var(--ifm-color-primary)',
            borderRadius: 2,
            transition: 'width 0.1s linear',
          }}
        />
      </div>

      <TOC {...props} />
    </>
  );
}
