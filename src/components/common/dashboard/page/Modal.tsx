import React, { useEffect, useRef } from "react";
import { FaTimes } from "react-icons/fa";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string; // Optional title
  children: React.ReactNode;
  showCloseButton?: boolean; // Add this prop
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  showCloseButton = true, // Default to showing the close button
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // Close modal on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  // Prevent body scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset"; // Clean up on unmount
    };
  }, [isOpen]);

  // Handle escape key to close
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black bg-opacity-50"
      aria-modal="true"
      role="dialog"
    >
      <div
        ref={modalRef}
        className="relative max-h-full w-full max-w-2xl p-4 md:h-auto"
      >
        <div className="relative rounded-lg bg-white shadow dark:bg-gray-700">
          {/* Modal Header */}
          {(title || showCloseButton) && ( // Only render header if there's a title OR close button
            <div className="flex items-start justify-between rounded-t border-b p-4 dark:border-gray-600">
              {title && (
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {title}
                </h3>
              )}
              {showCloseButton && (
                <button
                  type="button"
                  className="mr-auto inline-flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
                  onClick={onClose}
                >
                  <FaTimes className="h-5 w-5" />
                  <span className="sr-only">Close modal</span>
                </button>
              )}
            </div>
          )}
          {/* Modal Body */}
          <div className="space-y-4 p-4">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
