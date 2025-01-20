import { MutableRefObject, useEffect, useLayoutEffect, useRef } from 'react';

export function useClickAway<T extends Element>(
  cb: (e: Event) => void
): MutableRefObject<T | null> {
  const ref = useRef<T>(null);
  const cbRef = useRef(cb);

  useLayoutEffect(() => {
    cbRef.current = cb;
  });

  useEffect(() => {
    const handler = (e: MouseEvent | TouchEvent) => {
      const element = ref.current;
      if (element && !element.contains(e.target as Node)) {
        cbRef.current(e);
      }
    };

    document.addEventListener('mousedown', handler);
    document.addEventListener('touchstart', handler);

    return () => {
      document.removeEventListener('mousedown', handler);
      document.removeEventListener('touchstart', handler);
    };
  }, []);

  return ref;
}
