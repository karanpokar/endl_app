import { View, Text } from 'react-native'
import React from 'react'
import WalletProvider from './src/provider/WalletProvider'
import Home from './src'
import { UserProvider } from './src/context/useUserContext'
import { AssetProvider } from './src/context/useAssetContext'

const App = () => {
  return (
    <View style={{flex:1}}>
      <WalletProvider>
        <UserProvider>
          <AssetProvider>
        <Home/>
        </AssetProvider>
        </UserProvider>
        
      </WalletProvider>
    </View>
  )
}

export default App