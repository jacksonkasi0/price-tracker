import ProductsTable from "./sections/ProductTable";
import AddProductModal from "./sections/AddProductModal";
import { ThemeController } from "@/components/ThemeController";

import { Avatar } from "@lemonsqueezy/wedges";

export default function Home() {
  return (
    <main className="p-6 flex flex-col space-y-6">
      {/* Header Section */}
      <header className="flex justify-between items-center mb-6">
        {/* Left Side - Title and Description */}
        <div>
          <h1 className="text-2xl font-bold text-primary">Price Tracker</h1>
          <p className="text-secondary">
            Monitor and manage price changes for your favorite products across platforms.
          </p>
        </div>

        {/* Right Side - Avatar and Theme Controller */}
        <div className="flex items-center space-x-4">
          <ThemeController />
          <Avatar
            alt="User"
            src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=250&h=250&auto=format&fit=crop"
          />
        </div>
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
