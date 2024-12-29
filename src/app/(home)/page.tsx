import ProductsTable from "./sections/ProductTable";
import AddProductModal from "./sections/AddProductModal";

export default function Home() {
  return (
    <main className="p-6 flex flex-col space-y-6">
      {/* Header Section */}
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-primary">Price Tracker</h1>
        <p className="text-secondary">
          Monitor and manage price changes for your favorite products across platforms.
        </p>
      </header>

      {/* Actions Section */}
      <section className="mb-6">
        <AddProductModal />
      </section>

      {/* Table Section */}
      <section>
        <ProductsTable />
      </section>
    </main>
  );
}
