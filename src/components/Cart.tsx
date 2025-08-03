'use client';

import { useState } from 'react';
import { useCart } from '@/contexts/CartContext';
import { formatPrice } from '@/utils/formatters';
import { HiX, HiShoppingBag, HiMinus, HiPlus, HiTrash } from 'react-icons/hi';
import Image from 'next/image';

export function CartIcon() {
  const { state } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="relative p-2 text-white hover:text-neutral-300 transition-colors"
      >
        <HiShoppingBag className="w-6 h-6" />
        {state.itemCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-white text-black text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
            {state.itemCount}
          </span>
        )}
      </button>

      <CartSidebar isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

function CartSidebar({ isOpen, onClose }: CartSidebarProps) {
  const { state, removeItem, updateQuantity, clearCart } = useCart();

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      />

      {/* Sidebar */}
      <div className="fixed right-0 top-0 h-full w-96 bg-neutral-900 border-l border-neutral-700 z-50 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-neutral-700">
          <h2 className="text-xl font-semibold text-white">Shopping Bag</h2>
          <button
            onClick={onClose}
            className="text-white hover:text-neutral-300 transition-colors"
          >
            <HiX className="w-6 h-6" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {state.items.length === 0 ? (
            <div className="text-center text-neutral-400 mt-8">
              <HiShoppingBag className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>Your bag is empty</p>
            </div>
          ) : (
            <div className="space-y-4">
              {state.items.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  onUpdateQuantity={updateQuantity}
                  onRemove={removeItem}
                />
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {state.items.length > 0 && (
          <div className="border-t border-neutral-700 p-6 space-y-4">
            <div className="flex justify-between text-white">
              <span className="font-semibold">Total:</span>
              <span className="font-semibold text-xl">{formatPrice(state.total)}</span>
            </div>
            
            <a 
              href="/checkout"
              className="block w-full bg-white text-black py-3 font-medium uppercase transition duration-200 hover:bg-neutral-200 text-center"
            >
              Checkout
            </a>
            
            <button
              onClick={clearCart}
              className="w-full border border-neutral-600 text-white py-2 font-medium uppercase transition duration-200 hover:bg-neutral-800"
            >
              Clear Bag
            </button>
          </div>
        )}
      </div>
    </>
  );
}

interface CartItemProps {
  item: any;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
}

function CartItem({ item, onUpdateQuantity, onRemove }: CartItemProps) {
  return (
    <div className="flex gap-4 p-4 border border-neutral-700 rounded">
      <div className="w-16 h-16 bg-neutral-800 rounded overflow-hidden">
        {item.image && (
          <Image
            src={item.image}
            alt={item.title}
            width={64}
            height={64}
            className="w-full h-full object-cover"
          />
        )}
      </div>
      
      <div className="flex-1">
        <h3 className="text-white font-medium text-sm">{item.title}</h3>
        <p className="text-neutral-400 text-sm">{formatPrice(item.price)}</p>
        
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-2">
            <button
              onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
              className="w-6 h-6 flex items-center justify-center bg-neutral-700 text-white rounded hover:bg-neutral-600"
            >
              <HiMinus className="w-3 h-3" />
            </button>
            
            <span className="text-white text-sm w-8 text-center">{item.quantity}</span>
            
            <button
              onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
              className="w-6 h-6 flex items-center justify-center bg-neutral-700 text-white rounded hover:bg-neutral-600"
            >
              <HiPlus className="w-3 h-3" />
            </button>
          </div>
          
          <button
            onClick={() => onRemove(item.id)}
            className="text-neutral-400 hover:text-red-400 transition-colors"
          >
            <HiTrash className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}