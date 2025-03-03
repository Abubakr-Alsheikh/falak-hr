import { useState, useCallback } from "react";

type ModalState = {
  create: boolean;
  update: boolean;
  read: boolean;
  delete: boolean;
};

const initialModalState: ModalState = {
  create: false,
  update: false,
  read: false,
  delete: false,
};

export const useModal = <T>() => {
  const [modalState, setModalState] = useState<ModalState>(initialModalState);
  const [selectedItem, setSelectedItem] = useState<T | null>(null);

  const openModal = useCallback((type: keyof ModalState, item?: T) => {
    if (item) {
      setSelectedItem(item);
    }
    setModalState((prev) => ({ ...prev, [type]: true }));
  }, []);

  const closeModal = useCallback((type: keyof ModalState) => {
    setModalState((prev) => ({ ...prev, [type]: false }));
    // Clear selected item only when closing specific modals, not all.
    if (type === "create" || type === "update" || type === "delete") {
      setSelectedItem(null);
    }
  }, []);

  return { openModal, closeModal, modalState, selectedItem, setSelectedItem };
};
