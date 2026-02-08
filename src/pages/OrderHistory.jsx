import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Package, Calendar, DollarSign, CheckCircle, ShoppingBag } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { fadeIn, slideUp, staggerContainer } from '../utils/motion'

const OrderHistory = () => {
  const navigate = useNavigate()
  const [orders, setOrders] = useState([])

  useEffect(() => {
    loadOrders()
  }, [])

  const loadOrders = () => {
    const savedOrders = localStorage.getItem('orders')
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders))
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  if (orders.length === 0) {
    return (
      <div className="container-bordered py-16">
        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          className="text-center space-y-6"
        >
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gray-100 rounded-full">
            <Package className="w-12 h-12 text-gray-400" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">No orders yet</h2>
            <p className="text-gray-600 mt-2">Start shopping to see your order history</p>
          </div>
          <button
            onClick={() => navigate('/items')}
            className="btn-primary inline-flex items-center gap-2"
          >
            <ShoppingBag className="w-5 h-5" />
            Start Shopping
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
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Order History</h1>
          <p className="text-gray-600 mt-1">View and track your past orders</p>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="space-y-4"
        >
          {orders.map((order, index) => (
            <motion.div
              key={order.id}
              variants={slideUp}
              custom={index}
              className="panel-bordered space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-gray-200">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-gray-900">Order #{order.id}</h3>
                    <span className="badge-success">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      {order.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {formatDate(order.date)}
                    </span>
                    <span className="flex items-center gap-1">
                      <Package className="w-4 h-4" />
                      {order.items.length} items
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-primary" />
                  <span className="text-2xl font-bold text-primary">
                    ${order.total.toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                {order.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="w-16 h-16 bg-white rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-gray-900 truncate">{item.name}</h4>
                      <p className="text-sm text-gray-600">{item.category}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                      <p className="font-semibold text-gray-900">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  )
}

export default OrderHistory
