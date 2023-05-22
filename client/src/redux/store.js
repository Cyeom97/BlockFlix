import { configureStore } from '@reduxjs/toolkit'
import userSlice from './features/userSlice'
import themeModeSlice from './features/themeModeSlice'
import authModelSlice from './features/authModelSlice'
import appStateSlice from './features/appStateSlice'
import globalLoadingSlice from './features/globalLoadingSlice'

const store = configureStore({
  reducer: {
    user: userSlice,
    themeMode: themeModeSlice,
    authModel: authModelSlice,
    appState: appStateSlice,
    globalLoading: globalLoadingSlice
  }
})

export default store
