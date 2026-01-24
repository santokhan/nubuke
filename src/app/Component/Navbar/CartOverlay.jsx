import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function CartOverlay({
  isCartOpen,
  toggleCart,
  cartItems,
  cartCount,
  cartTotal,
  removeFromCart,
  updateQty,
  addToCart,
  availableBundleItems,
  bundleIndex,
  nextBundle,
  prevBundle,
  isNoteOpen,
  setIsNoteOpen,
  orderNote,
  setOrderNote,
  handleSaveNote,
  handleViewCart,
}) {
  return (
    <aside
      className={`fixed inset-0 z-200 transition-opacity duration-500 ${isCartOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
    >
      <div
        className="absolute inset-0 bg-black/40 cursor-[url('data:image/svg+xml;utf8,%3Csvg%20width%3D%2248%22%20height%3D%2248%22%20viewBox%3D%220%200%2032%2032%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Ccircle%20cx%3D%2216%22%20cy%3D%2216%22%20r%3D%2214%22%20fill%3D%22white%22%2F%3E%3Cpath%20d%3D%22M20%2012L12%2020M12%2012L20%2020%22%20stroke%3D%22%2339180F%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%2F%3E%3C%2Fsvg%3E'),_pointer]"
        onClick={toggleCart}
        aria-hidden="true"
      />
    <div
  className={`absolute inset-y-0 right-0 my-3 mr-3 ml-3 rounded-lg md:max-w-xl w-[calc(100%-1.5rem)] bg-[#F5EDDE] shadow-2xl transition-transform duration-500 ease-in-out p-6 flex flex-col ${isCartOpen ? "translate-x-0" : "translate-x-[calc(100%+1rem)]"}`}
>
        <div className="flex justify-between items-center w-full pb-4 border-b border-[#39180F]/10">
          <h2 className="flex items-center gap-1">
            <span className="font-bold text-[#39180F] text-3xl">Cart</span>
            <span className="bg-[#39180F] text-sm flex items-center justify-center w-6 h-6 rounded-full text-[#F5EDDE]">
              {cartCount}
            </span>
          </h2>
          <button
            onClick={toggleCart}
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

        <div className="grow overflow-y-auto py-4 no-scrollbar">
          {cartItems.length > 0 ? (
            <div className="flex flex-col gap-6">
              <div className="w-full text-center space-y-2">
                <p className="text-[#39180F] font-semibold mb-8 text-start">
                  Minimum order: $35.00 USD
                </p>
                <div className="flex flex-col items-center justify-center gap-2 text-[#39180F]">
                  <span className="text-xs font-medium">Free Shipping</span>
                  {Number(cartTotal || 0) >= 35 ? (
                    <svg
                      className="w-7 h-7 p-1 bg-[#39180F]/10 rounded-full"
                      fill="none"
                      stroke="#39180F"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-7 h-7 p-1 bg-[#39180F]/10 rounded-full"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm13.5 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM17 12V9.5h2.5l1.97 2.5H17z" />
                    </svg>
                  )}
                </div>
                <div className="w-10/12 mx-auto bg-[#39180F]/10 h-2.5 rounded-full mt-2 overflow-hidden">
                  <div
                    className="bg-[#39180F] h-full transition-all duration-500 ease-out"
                    style={{
                      width: `${Math.min((Number(cartTotal || 0) / 35) * 100, 100)}%`,
                    }}
                  />
                </div>
                <p className="text-sm text-[#39180F] font-semibold">
                  {Number(cartTotal || 0) >= 35
                    ? "You've earned free shipping!"
                    : `You're $${(35 - Number(cartTotal || 0)).toFixed(2)} away from free shipping`}
                </p>
              </div>

              <div className="space-y-6 pt-4">
                {cartItems.map((item) => (
                  <CartItem
                    key={item.id}
                    item={item}
                    removeFromCart={removeFromCart}
                    updateQty={updateQty}
                  />
                ))}
              </div>

              {availableBundleItems.length > 0 && (
                <BundleSection
                  availableBundleItems={availableBundleItems}
                  bundleIndex={bundleIndex}
                  nextBundle={nextBundle}
                  prevBundle={prevBundle}
                  addToCart={addToCart}
                />
              )}
            </div>
          ) : (
            <EmptyCart toggleCart={toggleCart} />
          )}
        </div>

        {cartItems.length > 0 && (
          <CartFooter
            isNoteOpen={isNoteOpen}
            setIsNoteOpen={setIsNoteOpen}
            orderNote={orderNote}
            setOrderNote={setOrderNote}
            handleSaveNote={handleSaveNote}
            cartTotal={cartTotal}
            toggleCart={toggleCart}
            handleViewCart={handleViewCart}
          />
        )}
      </div>
    </aside>
  );
}

const CartItem = ({ item, removeFromCart, updateQty }) => (
  <div className="flex md:gap-4 gap-2 items-center">
    <div className="relative md:h-25 md:w-25 w-15 h-15 shrink-0 bg-white rounded-md overflow-hidden border border-[#39180F]/10">
      <Image
        src={item.images?.[0]}
        alt={item.name}
        fill
        className="object-cover"
      />
    </div>
    <div className="flex-1">
      <div className="flex justify-between items-center">
        <Link href={`/products/${item.id}`} className="block">
          <h3 className="font-bold text-[#39180F] md:text-2xl text-lg transition-all cursor-pointer relative inline-block group">
            {item.name}
            <span className="absolute left-0 bottom-0 w-0 h-px bg-[#39180F]/50 transition-all duration-500 ease-in-out group-hover:w-full"></span>
          </h3>
        </Link>
        <button
          onClick={() => removeFromCart(item.id)}
          className="text-[#39180F]/40 md:hidden cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
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
      <div className="flex items-center justify-between">
        <p className="text-[#39180F] mb-2 md:text-lg text-sm">${item.price}</p>
        <div className="border rounded-full p-1 border-[#39180F]/10 md:hidden">
          <QuantityControls item={item} updateQty={updateQty} mobile />
        </div>
      </div>
    </div>
    <div className="md:flex flex-col items-end justify-between gap-2 hidden md:block">
      <button
        onClick={() => removeFromCart(item.id)}
        className="text-[#39180F]/40 cursor-pointer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
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
      <div className="border rounded-full p-1 border-[#39180F]/10">
        <QuantityControls item={item} updateQty={updateQty} />
      </div>
    </div>
  </div>
);

const QuantityControls = ({ item, updateQty, mobile = false }) => (
  <>
    <button
      disabled={item.qty <= 1}
      onClick={() => updateQty(item.id, -1)}
      className={`text-[#39180F] border border-[#39180F]/10 bg-[#39180F]/10 rounded-full ${mobile ? "px-4 py-1 text-sm" : "px-4 py-1 text-lg"} leading-none ${item.qty <= 1 ? "opacity-40 cursor-not-allowed" : "cursor-pointer hover:text-[#F5EDDE] hover:bg-[#39180F]"}`}
    >
      –
    </button>
    <span
      className={`px-3 text-sm font-bold min-w-6 text-center text-[#39180F] ${mobile ? "" : ""}`}
    >
      {item.qty}
    </span>
    <button
      onClick={() => updateQty(item.id, 1)}
      className={`text-[#39180F] border border-[#39180F]/10 bg-[#39180F]/10 rounded-full ${mobile ? "px-4 py-1 text-sm" : "px-4 py-1 text-lg"} leading-none cursor-pointer hover:text-[#F5EDDE] hover:bg-[#39180F]`}
    >
      +
    </button>
  </>
);

const BundleSection = ({
  availableBundleItems,
  bundleIndex,
  nextBundle,
  prevBundle,
  addToCart,
}) => (
  <div className="pt-6 border-t border-[#39180F]/10">
    <div className="flex justify-between items-center mb-4">
      <h3 className="text-[#39180F] text-xl tracking-tight uppercase">
        Bundle & Save
      </h3>
      <div className="flex gap-2">
        <button
          onClick={prevBundle}
          disabled={bundleIndex === 0}
          className={`p-1 bg-[#39180F]/10 border border-[#39180F]/20 rounded-full text-[#39180F] ${bundleIndex === 0 ? "opacity-50" : "hover:bg-[#39180F] hover:text-white cursor-pointer"}`}
        >
          <svg
            className="w-3 h-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M15 19l-7-7 7-7" strokeWidth="2" />
          </svg>
        </button>
        <button
          onClick={nextBundle}
          disabled={bundleIndex === availableBundleItems.length - 1}
          className={`p-1 bg-[#39180F]/10 border border-[#39180F]/20 rounded-full text-[#39180F] ${bundleIndex === availableBundleItems.length - 1 ? "opacity-30" : "hover:bg-[#39180F] hover:text-white cursor-pointer"}`}
        >
          <svg
            className="w-3 h-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M9 5l7 7-7 7" strokeWidth="2" />
          </svg>
        </button>
      </div>
    </div>
    <div>
      <h1 className="text-[#F5EDDE] bg-[linear-gradient(60deg,#39180F_0%,#5A2A1D_50%,#39180F_100%)] text-center rounded-xl py-2 mb-5">
        5 BARS: 5% OFF | 10 BARS: 15% OFF | 15+ BARS: 20% OFF
      </h1>
    </div>
    <div className="overflow-hidden">
      <div
        className="flex transition-transform duration-300 ease-in-out"
        style={{ transform: `translateX(-${bundleIndex * 100}%)` }}
      >
        {availableBundleItems.map((product) => (
          <BundleProduct
            key={product.id}
            product={product}
            addToCart={addToCart}
          />
        ))}
      </div>
    </div>
  </div>
);

const BundleProduct = ({ product, addToCart }) => (
  <div className="shrink-0 w-full pr-2">
    <div className="flex md:gap-4 gap-2 items-center bg-[#f5edd2] p-2 rounded-lg">
      <div className="relative md:h-18 md:w-18 h-14 w-14 bg-white rounded border overflow-hidden">
        <Image
          src={product.image || product.images?.[0] || "/placeholder.png"}
          alt={product.name}
          fill
          className="object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="flex-1 overflow-hidden">
        <Link href={`/products/${product.id}`} className="block">
          <h4 className="text-lg font-semibold text-[#39180F] transition-all cursor-pointer relative inline-block group">
            {product.name}
            <span className="absolute left-0 bottom-0 w-0 h-px bg-[#39180F]/50 transition-all duration-500 ease-in-out group-hover:w-full"></span>
          </h4>
        </Link>
        <div className="flex items-center justify-between">
          <p className="text-[#39180F]/70 text-sm">${product.price}</p>
          <button
            onClick={() => addToCart(product)}
            className="text-[#39180F] px-3 py-1 rounded-full text-sm font-semibold bg-[#39180F]/10 hover:border hover:border-[#39180F] transition-all sm:hidden cursor-pointer"
          >
            + Add
          </button>
        </div>
      </div>
      <button
        onClick={() => addToCart(product)}
        className="text-[#39180F] px-4 py-1.5 rounded-full text-sm font-bold bg-[#39180F]/10 border border-[#39180F]/10  hover:border-[#39180F] transition-all cursor-pointer sm:block hidden"
      >
        + Add
      </button>
    </div>
  </div>
);

const EmptyCart = ({ toggleCart }) => (
  <div className="flex flex-col items-center justify-center h-full gap-6 text-center">
    <div className="relative text-[#39180F]/20">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-24 w-24"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1"
          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
        />
      </svg>
    </div>
    <p className="text-[#39180F] text-xl font-medium">Your cart is empty</p>
    <Link
    href='/shop'
      onClick={toggleCart}
      className="bg-[#39180F] text-[#F5EDDE] px-8 py-4 border-2 border-[#39180F] hover:text-[#39180F] cursor-pointer rounded-full font-bold hover:bg-[#F5EDDE] transition-colors"
    >
      Continue shopping
    </Link>
  </div>
);

const CartFooter = ({
  isNoteOpen,
  setIsNoteOpen,
  orderNote,
  setOrderNote,
  handleSaveNote,
  cartTotal,
  toggleCart,
  handleViewCart,
}) => (
  <div className="relative pt-4 border-t border-[#39180F]/10 space-y-4 bg-[#F5EDDE]">
    <div
      className={`absolute bottom-full left-0 w-full bg-[#F5EDDE] border-t border-[#39180F]/10 p-4 transition-all duration-300 ease-in-out transform ${isNoteOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0 pointer-events-none"}`}
    >
      <div className="flex justify-between items-center mb-2">
        <label className="text-sm font-bold text-[#39180F] uppercase tracking-wider">
          Order Note
        </label>
        <button
          onClick={() => setIsNoteOpen(false)}
          className="text-xs underline"
        >
          Cancel
        </button>
      </div>
      <textarea
        value={orderNote}
        onChange={(e) => setOrderNote(e.target.value)}
        placeholder="Special instructions for your order..."
        className="w-full h-24 p-3 text-sm  border border-[#39180F]/20 rounded-lg focus:outline-none focus:border-[#39180F] resize-none text-[#39180F]"
      />
      <button
        onClick={handleSaveNote}
        className="w-full mt-2 bg-[#39180F] text-white py-2 rounded-full text-xs font-bold uppercase cursor-pointer "
      >
        Save Note
      </button>
    </div>
    <div className="flex justify-between items-center px-2">
      <h1 className="text-xl font-bold text-[#39180F]">Total</h1>
      <h1 className="text-lg font- text-[#39180F]">
        ${cartTotal?.toFixed(2)} USD
      </h1>
    </div>
    <div className="px-2">
      <p className="text-[#39180F]/60 mb-2 text-sm">
        Taxes and{" "}
        <Link
          href="/ShippingPolicy"
          onClick={toggleCart}
          className="relative inline-block hover:text-[#39180F] font-medium group"
        >
          shipping
          <span className="absolute left-0 bottom-0 w-full h-px bg-[#39180F]/50 transition-all duration-500 ease-in-out group-hover:w-0 group-hover:right-full"></span>
        </Link>{" "}
        calculated at checkout
      </p>
      <button
        onClick={() => setIsNoteOpen(!isNoteOpen)}
        className="text-[#39180F]/60 text-xs font-bold transition-all cursor-pointer relative inline-block group"
      >
        {orderNote ? "Edit order note" : "Add an order note"}
        <span className="absolute left-0 bottom-0 w-full h-px bg-[#39180F]/50 transition-all duration-500 ease-in-out group-hover:w-0"></span>
      </button>
    </div>
    <div className="flex gap-2">
      <button
        onClick={handleViewCart}
        className="w-full hover:border-[#39180F] bg-[#f5edd2] text-[#39180F] border-2 border-[#f5edd2] py-4 rounded-full font-bold hover:bg-[#F5EDDE] transition-opacity sm:text-md text-sm cursor-pointer"
      >
        View Cart
      </button>
      <button className="w-full bg-[#39180F] hover:border-[#39180F] text-[#F5EDDE] py-4 rounded-full border-2 border-[#f5edd2] font-bold hover:bg-[#F5EDDE] transition-opacity sm:text-md text-sm hover:text-[#39180F] tracking-widest cursor-pointer">
        Checkout
      </button>
    </div>
  </div>
);
