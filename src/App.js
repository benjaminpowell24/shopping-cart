import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CartContainer } from './components/CartContainer'
import Navbar from './components/Navbar'
import Modal from './components/Modal'
import { calculateTotal, getItems } from './features/cart/cartSlice'

function App() {
  const dispatch = useDispatch()
  const { cartItems, isLoading } = useSelector((store) => store.cart)

  const { show } = useSelector((store) => store.modal)

  useEffect(() => {
    dispatch(getItems())
  }, [])

  useEffect(() => {
    dispatch(calculateTotal())
  }, [cartItems])

  if (isLoading) {
    return (
      <div className='loading'>
        <h2>Loading...</h2>
      </div>
    )
  }

  return (
    <main>
      {show && <Modal />}
      <Navbar />
      <CartContainer />
    </main>
  )
}
export default App
