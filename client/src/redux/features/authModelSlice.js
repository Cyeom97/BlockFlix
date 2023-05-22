import { createSlice } from '@reduxjs/toolkit'

export const authModelSlice = createSlice({
  name: 'AuthModel',
  initialState: {
    authModelOpen: false
  },
  reducers: {
    setAuthModelOpen: (state, action) => {
      state.authModel = action.payload
    }
  }
})

export const { setAuthModelOpen } = authModelSlice.actions

export default authModelSlice.reducer
