import { useCallback, useState } from 'react';

export function useModal<T>() {
  const [isVisible, setIsVisible] = useState(false);
  const [data, setData] = useState<T | null>(null);

  const handleOpenModal = useCallback((arg?: T) => {
    setData(arg ?? null);
    setIsVisible(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsVisible(false);
  }, []);

  return {
    isVisible,
    data,
    handleOpenModal,
    handleCloseModal,
  };
}
