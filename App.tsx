import { View, Text } from 'react-native'
import React from 'react'
import WalletProvider from './src/provider/WalletProvider'
import Home from './src'
import { UserProvider } from './src/context/useUserContext'

const App = () => {
  return (
    <View>
      <WalletProvider>
        <UserProvider>
        <Home/>
        </UserProvider>
      </WalletProvider>
    </View>
  )
}

export default App