import { useState, useCallback } from "react";

interface ModalState<T> {
  create: boolean;
  update: boolean;
  read: boolean;
  delete: boolean;
  props?: Record<string, any>;
  item?: T | null;
}

function useModal<T>() {
  const [modalState, setModalState] = useState<ModalState<T>>({
    create: false,
    update: false,
    read: false,
    delete: false,
    props: undefined, // Initialize props
  });
  const [selectedItem, setSelectedItem] = useState<T | null>(null);

  const openModal = useCallback(
    (
      modalType: keyof Omit<ModalState<T>, "item" | "props">,
      item?: T,
      props?: Record<string, any>
    ) => {
      setModalState((prev) => ({
        ...prev,
        create: false,
        read: false,
        update: false,
        delete: false,
        [modalType]: true,
        props: props,
      }));
      setSelectedItem(item || null);
    },
    []
  );

  const closeModal = useCallback(
    (modalType: keyof Omit<ModalState<T>, "item" | "props">) => {
      setModalState((prev) => ({
        ...prev,
        [modalType]: false,
      }));
    },
    []
  );

  return { modalState, openModal, closeModal, selectedItem, setSelectedItem };
}

export { useModal };
