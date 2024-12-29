import React from 'react';

import Header from '@/components/Header';
import Footer from '@/components/Footer';

import ProductsTable from './sections/ProductTable';
import AddProductModal from './sections/AddProductModal';

const Home: React.FC = () => {
  return (
    <main className="p-6 pb-4 flex flex-col min-h-screen">
      {/* Header Section */}
      <Header />

      {/* Actions Section */}
      <section className="mb-6">
        <AddProductModal />
      </section>

      {/* Table Section */}
      <section className="flex-grow">
        <ProductsTable />
      </section>

      {/* Footer Section */}
      <Footer />
    </main>
  );
};

export default Home;
