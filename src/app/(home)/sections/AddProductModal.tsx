"use client";

import React, { useState } from "react";
import { Button } from "@lemonsqueezy/wedges";

import Modal from "@/components/ui/Modal";
import AddProduct from "@/components/AddProduct";

function AddProductModal() {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <>
      {/* Trigger Button */}
      <Button variant="primary" onClick={openModal}>
        Add New Product
      </Button>

      {/* Reusable Modal */}
      <Modal isOpen={isOpen} onOpenChange={setIsOpen} title="Add New Product">
        <AddProduct onSuccess={closeModal} />
      </Modal>
    </>
  );
}

export default AddProductModal;
