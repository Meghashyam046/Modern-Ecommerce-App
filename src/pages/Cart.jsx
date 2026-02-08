import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ShoppingCart, Trash2, Plus, Minus, ArrowRight, Package } from 'lucide-react'
import toast from 'react-hot-toast'
import { fadeIn, slideUp } from '../utils/motion'

const Cart = () => {
  const navigate = useNavigate()
  const [cart, setCart] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    loadCart()
  }, [])

  const loadCart = () => {
    const savedCart = localStorage.getItem('cart')
    if (savedCart) {
      setCart(JSON.parse(savedCart))
    }
  }

  const updateCart = (newCart) => {
    setCart(newCart)
    localStorage.setItem('cart', JSON.stringify(newCart))
  }

  const updateQuantity = (itemId, delta) => {
    const newCart = cart.map(item => {
      if (item.id === itemId) {
        const newQuantity = item.quantity + delta
        if (newQuantity <= 0) return null
        return { ...item, quantity: newQuantity }
      }
      return item
    }).filter(Boolean)

    updateCart(newCart)
    toast.success('Cart updated')
  }

  const removeItem = (itemId) => {
    const newCart = cart.filter(item => item.id !== itemId)
    updateCart(newCart)
    toast.success('Item removed from cart')
  }

  const handleCheckout = async () => {
    if (cart.length === 0) {
      toast.error('Your cart is empty')
      return
    }

    setLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))

      // Create order
      const order = {
        id: Date.now(),
        items: cart,
        total: totalAmount,
        date: new Date().toISOString(),
        status: 'completed',
      }

      // Save to order history
      const orders = JSON.parse(localStorage.getItem('orders') || '[]')
      orders.unshift(order)
      localStorage.setItem('orders', JSON.stringify(orders))

      // Clear cart
      updateCart([])

      toast.success('Order placed successfully!')
      navigate('/orders')
    } catch (error) {
      toast.error('Checkout failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const tax = subtotal * 0.1
  const totalAmount = subtotal + tax

  if (cart.length === 0) {
    return (
      <div className="container-bordered py-16">
        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          className="text-center space-y-6"
        >
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gray-100 rounded-full">
            <ShoppingCart className="w-12 h-12 text-gray-400" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Your cart is empty</h2>
            <p className="text-gray-600 mt-2">Start shopping to add items to your cart</p>
          </div>
          <button
            onClick={() => navigate('/items')}
            className="btn-primary inline-flex items-center gap-2"
          >
            Continue Shopping
            <ArrowRight className="w-5 h-5" />
          </button>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="container-bordered py-8">
      <motion.div
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        className="space-y-6"
      >
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
          <span className="text-gray-600">{cart.length} items</span>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item, index) => (
              <motion.div
                key={item.id}
                variants={slideUp}
                custom={index}
                initial="hidden"
                animate="visible"
                className="card-hover flex flex-col sm:flex-row gap-4"
              >
                <div className="w-full sm:w-32 h-32 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 space-y-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-900">{item.name}</h3>
                      <p className="text-sm text-gray-600">{item.category}</p>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-red-600 hover:text-red-700 p-2 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 bg-gray-100 rounded-lg p-1">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="p-1.5 hover:bg-white rounded transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="font-medium w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="p-1.5 hover:bg-white rounded transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-lg font-bold text-primary">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="lg:col-span-1">
            <motion.div
              variants={slideUp}
              initial="hidden"
              animate="visible"
              className="panel-bordered sticky top-8 space-y-4"
            >
              <h2 className="text-xl font-bold text-gray-900">Order Summary</h2>
              
              <div className="space-y-3 py-4 border-t border-b border-gray-200">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax (10%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-lg font-bold text-gray-900">
                  <span>Total</span>
                  <span>${totalAmount.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                disabled={loading}
                className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? (
                  'Processing...'
                ) : (
                  <>
                    <Package className="w-5 h-5" />
                    Proceed to Checkout
                  </>
                )}
              </button>

              <button
                onClick={() => navigate('/items')}
                className="btn-outline w-full"
              >
                Continue Shopping
              </button>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default Cart
