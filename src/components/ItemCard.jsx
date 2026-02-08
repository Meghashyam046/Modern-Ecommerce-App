import { motion } from 'framer-motion'
import { ShoppingCart, Star } from 'lucide-react'
import { cardVariants } from '../utils/motion'

const ItemCard = ({ item, onAddToCart }) => {
  return (
    <motion.div
      variants={cardVariants}
      whileHover="hover"
      className="card-hover group cursor-pointer"
    >
      <div className="relative overflow-hidden rounded-lg bg-gray-100 mb-4">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
        />
        {item.discount && (
          <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-lg text-xs font-bold">
            -{item.discount}%
          </div>
        )}
      </div>

      <div className="space-y-2">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-gray-900 line-clamp-2 flex-1">{item.name}</h3>
          <div className="flex items-center gap-1 text-yellow-500 flex-shrink-0">
            <Star className="w-4 h-4 fill-current" />
            <span className="text-sm font-medium text-gray-700">{item.rating}</span>
          </div>
        </div>

        <p className="text-sm text-gray-600">{item.category}</p>

        <div className="flex items-center justify-between pt-2">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-primary">${item.price}</span>
            {item.originalPrice && (
              <span className="text-sm text-gray-500 line-through">
                ${item.originalPrice}
              </span>
            )}
          </div>
        </div>

        <button
          onClick={() => onAddToCart(item)}
          className="btn-primary w-full flex items-center justify-center gap-2 mt-4"
        >
          <ShoppingCart className="w-5 h-5" />
          Add to Cart
        </button>
      </div>
    </motion.div>
  )
}

export default ItemCard
