import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const url = `https://course-api.com/react-useReducer-cart-project`

const initialState = {
  cartItems: [],
  total: 0,
  isLoading: true,
}

export const getItems = createAsyncThunk(
  'cart/getItems',
  async (_, thunkAPI) => {
    //thunkAPI gives access to entire state as well as dispatch and other functions
    //to manipulate state. Potential is limitless
    try {
      const res = await axios(url)
      return res.data
    } catch (err) {
      return thunkAPI.rejectWithValue('Something went wrong')
    }
  }
)

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cartItems = []
    },
    removeItem: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload.id
      )
    },
    increaseQty: (state, action) => {
      const item = state.cartItems.find((item) => {
        return item.id === action.payload.id
      })
      item.amount = item.amount + 1
    },
    decreaseQty: (state, action) => {
      const item = state.cartItems.find((item) => {
        return item.id === action.payload.id
      })
      if (item.amount > 0) {
        item.amount = item.amount - 1
      } else {
        console.log('Item cannot be less than 1')
      }
    },
    calculateTotal: (state) => {
      state.total = state.cartItems?.reduce(
        (total, item) => item.price * item.amount + total,
        0
      )
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getItems.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getItems.fulfilled, (state, action) => {
        state.isLoading = false
        state.cartItems = action.payload
      })
      .addCase(getItems.rejected, (state, action) => {
        console.log(action.payload)
        state.isLoading = false
      })
  },
})

export const {
  clearCart,
  removeItem,
  increaseQty,
  decreaseQty,
  calculateTotal,
} = cartSlice.actions

export default cartSlice.reducer
