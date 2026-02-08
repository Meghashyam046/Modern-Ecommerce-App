import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Search, Loader2, ShoppingCart } from 'lucide-react'
import toast from 'react-hot-toast'
import ItemCard from '../components/ItemCard'
import { items as mockItems } from '../data/mockData'
import { fadeIn, staggerContainer } from '../utils/motion'

const ItemsList = () => {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [cart, setCart] = useState([])

  useEffect(() => {
    loadItems()
    loadCart()
  }, [])

  const loadItems = async () => {
    try {
      setLoading(true)
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800))
      setItems(mockItems)
    } catch (error) {
      toast.error('Failed to load items')
    } finally {
      setLoading(false)
    }
  }

  const loadCart = () => {
    const savedCart = localStorage.getItem('cart')
    if (savedCart) {
      setCart(JSON.parse(savedCart))
    }
  }

  const addToCart = (item) => {
    const existingItem = cart.find(i => i.id === item.id)
    let newCart

    if (existingItem) {
      newCart = cart.map(i =>
        i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
      )
      toast.success('Quantity updated in cart')
    } else {
      newCart = [...cart, { ...item, quantity: 1 }]
      toast.success('Added to cart')
    }

    setCart(newCart)
    localStorage.setItem('cart', JSON.stringify(newCart))
  }

  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <div className="container-bordered py-8">
      <motion.div
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        className="space-y-6"
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Our Products</h1>
            <p className="text-gray-600 mt-1">Discover amazing products at great prices</p>
          </div>
          {cartItemCount > 0 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-lg"
            >
              <ShoppingCart className="w-5 h-5" />
              <span className="font-semibold">{cartItemCount} items in cart</span>
            </motion.div>
          )}
        </div>

        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search products..."
            className="input-field pl-10"
          />
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">No products found</p>
          </div>
        ) : (
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {filteredItems.map((item) => (
              <ItemCard
                key={item.id}
                item={item}
                onAddToCart={addToCart}
              />
            ))}
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}

export default ItemsList
