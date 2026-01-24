import React from "react";
import Image from "next/image";

export default function SearchOverlay({
  isSearchOpen,
  searchQuery,
  setSearchQuery,
  filteredProducts,
  closeSearch,
  handleProductClick,
}) {
  return (
    <aside
      className={`fixed inset-0 z-200 transition-opacity duration-500 ${isSearchOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
    >
      <div
        className="absolute inset-0 bg-black/40 cursor-[url('data:image/svg+xml;utf8,%3Csvg%20width%3D%2248%22%20height%3D%2248%22%20viewBox%3D%220%200%2032%2032%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Ccircle%20cx%3D%2216%22%20cy%3D%2216%22%20r%3D%2214%22%20fill%3D%22white%22%2F%3E%3Cpath%20d%3D%22M20%2012L12%2020M12%2012L20%2020%22%20stroke%3D%22%2339180F%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%2F%3E%3C%2Fsvg%3E'),_pointer]"
        onClick={closeSearch}
        aria-hidden="true"
      />
      <div
        className={`absolute top-0 right-0 rounded-lg md:max-w-xl w-[calc(100%-1.5rem)] h-[97vh] bg-[#F5EDDE] shadow-2xl transition-transform duration-500 ease-in-out p-6 my-3 mx-3 flex flex-col ${isSearchOpen ? "translate-x-0" : "translate-x-[calc(100%+2rem)]"}`}
      >
        <div className="relative flex items-center mt-4">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent border-b-2 border-[#39180F] py-2 pr-20 text-[#39180F] focus:outline-none text-lg placeholder:text-[#39180F]/50"
            autoFocus={isSearchOpen}
          />
          <div className="absolute right-0 flex items-center gap-2">
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="p-1 text-[#39180F]/50 rounded-full"
              >
                Clear
              </button>
            )}
            <button
              onClick={closeSearch}
              className="p-1 text-[#39180F] rounded-full cursor-pointer hover:rotate-90 transition-transform"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
        <div className="mt-8 overflow-y-auto grow max-h-[70vh]">
          {filteredProducts.length > 0 ? (
            <div className="flex flex-col gap-4">
              {filteredProducts.map((product) => {
                const productImage = Array.isArray(product.images)
                  ? product.images[0]
                  : product.images || product.image;
                return (
                  <div
                    key={product.id}
                    onClick={() => handleProductClick(product.id)}
                    className="flex items-center gap-4 p-2 hover:bg-[#39180F]/5 rounded-lg cursor-pointer transition-colors"
                  >
                    <Image
                      src={productImage || "/placeholder.png"}
                      alt={product.name}
                      width={64}
                      height={64}
                      className="h-16 w-16 object-cover rounded-md"
                      unoptimized={productImage?.startsWith("http")}
                    />
                    <div>
                      <h3 className="font-bold text-[#39180F]">
                        {product.name}
                      </h3>
                      <p className="text-sm text-[#39180F]/70">View Details</p>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : searchQuery.length > 0 ? (
            <p className="text-[#39180F]/60 text-center mt-10">
              No products found for `{searchQuery}`
            </p>
          ) : (
            <p className="text-[#39180F]/40 text-center mt-10 italic">
              Start typing to search...
            </p>
          )}
        </div>
      </div>
    </aside>
  );
}
