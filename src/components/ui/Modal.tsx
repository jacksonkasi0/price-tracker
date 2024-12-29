/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useRef } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { motion } from "framer-motion";
import { useOnClickOutside } from "usehooks-ts";

interface ModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  title?: string;
  children: React.ReactNode;
  overlayAnimation?: Record<string, any>;
  contentAnimation?: Record<string, any>;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onOpenChange,
  title,
  children,
  overlayAnimation = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  },
  contentAnimation = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.9 },
  },
}) => {
  const ref = useRef<HTMLDivElement>(null!);

  // Close modal when clicking outside
  useOnClickOutside(ref, () => onOpenChange(false));

  return (
    <Dialog.Root open={isOpen} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        {/* Overlay */}
        <Dialog.Overlay>
          <motion.div
            className="fixed inset-0 bg-black backdrop-blur-sm z-40 bg-opacity-25"
            variants={overlayAnimation}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.2, ease: "easeInOut" }}
          />
        </Dialog.Overlay>

        {/* Dialog Content */}
        <Dialog.Content>
          <motion.div
            className="fixed inset-0 flex items-center  justify-center p-4  z-50"
            variants={contentAnimation}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            <div
              ref={ref}
              className="relative w-full max-w-lg bg-surface-overlay p-6 rounded-xl shadow-wg-md focus:outline-none"
            >
              {title && (
                <Dialog.Title className="text-lg font-semibold text-primary">
                  {title}
                </Dialog.Title>
              )}
              <div className="mt-4">{children}</div>
              <Dialog.Close asChild>
                <button
                  className="absolute top-6 right-6 inline-flex items-center justify-center rounded-full focus:outline-none"
                  aria-label="Close"
                >
                  ✕
                </button>
              </Dialog.Close>
            </div>
          </motion.div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default Modal;
