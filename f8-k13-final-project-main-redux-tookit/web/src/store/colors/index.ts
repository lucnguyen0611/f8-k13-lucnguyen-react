import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {getMethod, postMethod, putMethod, deleteMethod} from "../../utils";

// payload trong action chính là giá trị mà bạn return từ async function trong createAsyncThunk
export const getColors = createAsyncThunk('colors/getColors', async () => {
    return await getMethod('/colors/')
})

export const createColor = createAsyncThunk('colors/createColor', async (color) => {
    return await postMethod('/colors/', color)
})

export const updateColor = createAsyncThunk('color/updateColor', async ({colorId, editedColor}:{colorId : number, editedColor: any})=>{
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
            // state là initialState
            .addCase(getColors.pending, state => {
                state.isLoading = true
            })
            .addCase(getColors.fulfilled, (state, action) => {
                state.isLoading = false
                state.data = action.payload
                console.log(action, action.payload)
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
                console.log(action, action.payload)
            })

            .addCase(deleteColor.fulfilled, (state, action) => {
                state.isLoading = false
                const id = action.payload.id
                state.data = state.data.filter((c)=> c.id !== id)
                console.log(action, action.payload)
            })

    }
})

export default colorsSlice.reducer

export const { ...actions } =  colorsSlice
