'use client';

import { useState } from 'react';
import { useCart } from '@/contexts/CartContext';
import { Bounded } from '@/components/Bounded';
import { formatPrice } from '@/utils/formatters';
import { HiCreditCard, HiTruck, HiShieldCheck } from 'react-icons/hi2';
import Image from 'next/image';

export default function CheckoutPage() {
  const { state, updateQuantity, removeItem } = useCart();
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'United States',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    nameOnCard: '',
  });

  const shipping = 15;
  const tax = state.total * 0.08; // 8% tax
  const finalTotal = state.total + shipping + tax;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock checkout process
    alert('Thank you for your order! This is a demo checkout.');
  };

  if (state.items.length === 0) {
    return (
      <Bounded className="py-16">
        <div className="text-center">
          <h1 className="font-display text-4xl text-white mb-4">Your bag is empty</h1>
          <p className="text-neutral-400 mb-8">Add some fragrances to continue</p>
          <a href="/shop" className="bg-white text-black px-8 py-3 font-medium uppercase hover:bg-neutral-200 transition-colors">
            Continue Shopping
          </a>
        </div>
      </Bounded>
    );
  }

  return (
    <Bounded className="py-16">
      <div className="max-w-6xl mx-auto">
        <h1 className="font-display text-4xl md:text-5xl text-white mb-12 text-center">
          Checkout
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Checkout Form */}
          <div className="space-y-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Contact Information */}
              <div className="bg-neutral-800/50 border border-neutral-700 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-white mb-4">Contact Information</h2>
                <div className="space-y-4">
                  <input
                    type="email"
                    name="email"
                    placeholder="Email address"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full p-3 bg-neutral-700 border border-neutral-600 rounded text-white placeholder-neutral-400 focus:border-white focus:outline-none"
                    required
                  />
                </div>
              </div>

              {/* Shipping Address */}
              <div className="bg-neutral-800/50 border border-neutral-700 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-white mb-4">Shipping Address</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First name"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="p-3 bg-neutral-700 border border-neutral-600 rounded text-white placeholder-neutral-400 focus:border-white focus:outline-none"
                    required
                  />
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last name"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="p-3 bg-neutral-700 border border-neutral-600 rounded text-white placeholder-neutral-400 focus:border-white focus:outline-none"
                    required
                  />
                  <input
                    type="text"
                    name="address"
                    placeholder="Address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="md:col-span-2 p-3 bg-neutral-700 border border-neutral-600 rounded text-white placeholder-neutral-400 focus:border-white focus:outline-none"
                    required
                  />
                  <input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="p-3 bg-neutral-700 border border-neutral-600 rounded text-white placeholder-neutral-400 focus:border-white focus:outline-none"
                    required
                  />
                  <input
                    type="text"
                    name="postalCode"
                    placeholder="Postal code"
                    value={formData.postalCode}
                    onChange={handleInputChange}
                    className="p-3 bg-neutral-700 border border-neutral-600 rounded text-white placeholder-neutral-400 focus:border-white focus:outline-none"
                    required
                  />
                </div>
              </div>

              {/* Payment Information */}
              <div className="bg-neutral-800/50 border border-neutral-700 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  <HiCreditCard className="w-5 h-5" />
                  Payment Information
                </h2>
                <div className="space-y-4">
                  <input
                    type="text"
                    name="nameOnCard"
                    placeholder="Name on card"
                    value={formData.nameOnCard}
                    onChange={handleInputChange}
                    className="w-full p-3 bg-neutral-700 border border-neutral-600 rounded text-white placeholder-neutral-400 focus:border-white focus:outline-none"
                    required
                  />
                  <input
                    type="text"
                    name="cardNumber"
                    placeholder="Card number"
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    className="w-full p-3 bg-neutral-700 border border-neutral-600 rounded text-white placeholder-neutral-400 focus:border-white focus:outline-none"
                    required
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="expiryDate"
                      placeholder="MM/YY"
                      value={formData.expiryDate}
                      onChange={handleInputChange}
                      className="p-3 bg-neutral-700 border border-neutral-600 rounded text-white placeholder-neutral-400 focus:border-white focus:outline-none"
                      required
                    />
                    <input
                      type="text"
                      name="cvv"
                      placeholder="CVV"
                      value={formData.cvv}
                      onChange={handleInputChange}
                      className="p-3 bg-neutral-700 border border-neutral-600 rounded text-white placeholder-neutral-400 focus:border-white focus:outline-none"
                      required
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-white text-black py-4 font-semibold uppercase text-lg hover:bg-neutral-200 transition-colors"
              >
                Complete Order
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <div className="bg-neutral-800/50 border border-neutral-700 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-white mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                {state.items.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="w-16 h-16 bg-neutral-700 rounded overflow-hidden">
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
                      <p className="text-neutral-400 text-sm">Qty: {item.quantity}</p>
                      <p className="text-white font-semibold">{formatPrice(item.price * item.quantity)}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-neutral-600 pt-4 space-y-2">
                <div className="flex justify-between text-neutral-300">
                  <span>Subtotal</span>
                  <span>{formatPrice(state.total)}</span>
                </div>
                <div className="flex justify-between text-neutral-300">
                  <span>Shipping</span>
                  <span>{formatPrice(shipping)}</span>
                </div>
                <div className="flex justify-between text-neutral-300">
                  <span>Tax</span>
                  <span>{formatPrice(tax)}</span>
                </div>
                <div className="flex justify-between text-white font-semibold text-lg border-t border-neutral-600 pt-2">
                  <span>Total</span>
                  <span>{formatPrice(finalTotal)}</span>
                </div>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="bg-neutral-800/50 border border-neutral-700 rounded-lg p-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-neutral-300">
                  <HiTruck className="w-5 h-5" />
                  <span className="text-sm">Free shipping on orders over $100</span>
                </div>
                <div className="flex items-center gap-3 text-neutral-300">
                  <HiShieldCheck className="w-5 h-5" />
                  <span className="text-sm">Secure checkout with SSL encryption</span>
                </div>
                <div className="flex items-center gap-3 text-neutral-300">
                  <HiCreditCard className="w-5 h-5" />
                  <span className="text-sm">30-day money-back guarantee</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Bounded>
  );
}