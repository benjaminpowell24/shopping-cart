import { useDispatch, useSelector } from 'react-redux'
import { CartItem } from './CartItem'
import { showModal } from '../features/modal/modalSlice'

export const CartContainer = () => {
  const { cartItems, total } = useSelector((store) => store.cart)

  const dispatch = useDispatch()

  if (cartItems.length < 1) {
    return (
      <section className='cart'>
        <header>
          <h2>Your bag</h2>
          <h4 className='empty-cart'>is currently empty</h4>
        </header>
      </section>
    )
  }
  return (
    <section className='cart'>
      <header>
        <h2>Your bag</h2>
      </header>
      <div>
        {cartItems.map((item) => {
          return <CartItem key={item.id} {...item} />
        })}
      </div>

      <footer>
        <hr />
        <div className='cart-total'>
          <h4>
            total
            <span>{total.toFixed(2)}</span>
          </h4>
        </div>
        <button className='btn clear-btn' onClick={() => dispatch(showModal())}>
          clear cart
        </button>
      </footer>
    </section>
  )
}
