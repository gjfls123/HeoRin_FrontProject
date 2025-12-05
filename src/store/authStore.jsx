import React from 'react'
import { configureStore } from '@reduxjs/toolkit'
import authSlice from '../slice/authSlice'

const authStore = configureStore({

  reducer: {
    auth: authSlice
  }
})

export default authStore