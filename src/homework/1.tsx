import React, { useEffect, useRef } from "react";

// Опис пропсів
interface Props {
  children: React.ReactNode;
  onContentEndVisible: () => void;
}

// Опис типу useRef
const endContentRef = useRef<HTMLDivElement | null>(null);

// Опис типу options
const options = {
  rootMargin: "0px",
  threshold: 1.0,
  root: null,
} as IntersectionObserverInit;

export function Observer({ children, onContentEndVisible }: Props) {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.intersectionRatio > 0) {
          onContentEndVisible();
          observer.disconnect();
        }
      });
    }, options);

    if (endContentRef.current) {
      observer.observe(endContentRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [onContentEndVisible]);

  return (
    <div>
      {children}
      <div ref={endContentRef} />
    </div>
  );
}
