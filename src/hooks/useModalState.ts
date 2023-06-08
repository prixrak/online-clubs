import { useCallback, useState } from "react";

export const useModalState = (): {
  openModal: () => void;
  closeModal: () => void;
  isModalOpen: boolean;
} => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = useCallback(() => setIsModalOpen(true), []);
  const closeModal = useCallback(() => setIsModalOpen(false), []);

  return {
    openModal,
    closeModal,
    isModalOpen,
  };
};
