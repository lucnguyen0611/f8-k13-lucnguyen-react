import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {getMethod, postMethod, putMethod, deleteMethod} from "../../utils";


export const getColor = createAsyncThunk('colors/getColors', async () => {
    return await getMethod('/colors/')
})

export const createColor = createAsyncThunk('colors/createColors', async (color) => {
    return await postMethod('/colors/', color)
})

export const updateColor = createAsyncThunk('color/editColor', async ({colorId, editedColor}:{colorId : number, editedColor: any})=>{
    return await putMethod(`/colors/${colorId}`, editedColor)
})

export const deleteColor = createAsyncThunk('colors/deleteColor', async (colorId: number) => {
    return  await deleteMethod(`/colors/${colorId}`)
})

const colorsSlice = createSlice({
    name: 'colors',
    initialState: {
        isLoading: false,
        data: []
    },
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getColor.pending, state => {
                state.isLoading = true
            })
            .addCase(getColor.fulfilled, (state, action) => {
                state.isLoading = false
                state.data = action.payload
            })

            .addCase(createColor.fulfilled, (state, action) => {
                state.isLoading = false
                // @ts-ignore
                state.data.push(action.payload)
            })

            .addCase(updateColor.fulfilled, (state, action) => {
                const index = state.data.findIndex(c => c.id === action.payload.id)
                if (index !== -1) {
                    state.isLoading = false
                    // @ts-ignore
                    state.data[index] = action.payload
                }
            })

            .addCase(deleteColor.fulfilled, (state, action) => {
                state.isLoading = false
                const id = action.payload.id
                state.data = state.data.filter((c)=> c.id !== id)
            })

    }
})

export default colorsSlice.reducer

export const { ...actions } =  colorsSlice