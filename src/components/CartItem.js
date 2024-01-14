import { useDispatch } from 'react-redux'
import {
  removeItem,
  increaseQty,
  decreaseQty,
} from '../features/cart/cartSlice'
import { ChevronUp, ChevronDown } from '../icons'

export const CartItem = ({ id, title, price, img, amount }) => {
  const dispatch = useDispatch()
  return (
    <article className='cart-item'>
      <img src={img} alt={title} />
      <div>
        <h4>{title}</h4>
        <h4 className='item-price'>${price}</h4>
        <button
          className='remove-btn'
          onClick={() => dispatch(removeItem({ id }))}
        >
          remove
        </button>
      </div>
      <div>
        <button
          className='amount-btn'
          onClick={() => dispatch(increaseQty({ id }))}
        >
          <ChevronUp />
        </button>
        <p className='amount'>{amount}</p>
        <button
          className='amount-btn'
          onClick={() => dispatch(decreaseQty({ id }))}
        >
          <ChevronDown />
        </button>
      </div>
    </article>
  )
}
