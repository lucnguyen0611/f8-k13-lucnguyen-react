import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getMethod, postMethod, putMethod, deleteMethod } from "../../utils"

export const getCustomers = createAsyncThunk('customers/getCustomers', async () => {
  return await getMethod('/customers/')
})

export const createCustomer = createAsyncThunk('customers/createCustomer', async (customer) => {
  return await postMethod('/customers/', customer)
})

export const updateCustomer = createAsyncThunk(
    'customers/updateCustomer',
    async (customer: any) => {
      const result = await putMethod(`/customers/${customer.id}`, customer)
      return result
    }
)

export const deleteCustomer = createAsyncThunk(
    'customers/deleteCustomer',
    async (id: number) => {
      await deleteMethod(`/customers/${id}`)
      return id
    }
)

const customersSlice = createSlice({
  name: 'customers',
  initialState: {
    isLoading: false,
    data: []
  },
  reducers: {},
  extraReducers: builder => {
    builder
        .addCase(getCustomers.pending, state => {
          state.isLoading = true
        })
        .addCase(getCustomers.fulfilled, (state, action) => {
          state.isLoading = false
          state.data = action.payload
        })
        .addCase(createCustomer.fulfilled, (state, action) => {
          state.isLoading = false
          // @ts-ignore
          state.data.push(action.payload)
        })
        .addCase(updateCustomer.fulfilled, (state, action) => {
          const index = state.data.findIndex(c => c.id === action.payload.id)
          if (index !== -1) {
            // @ts-ignore
            state.data[index] = action.payload
          }
        })
        .addCase(deleteCustomer.fulfilled, (state, action) => {
          // @ts-ignore
          state.data = state.data.filter(c => c.id !== action.payload)
        })
  }
})

export default customersSlice.reducer
