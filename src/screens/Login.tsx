import { View, Text } from 'react-native'
import React from 'react'
import { useUser } from '../context/useUserContext'

const Login = () => {
    const {userLogin}:any=useUser();
  return (
    <View>
      <Text onPress={()=>{
        userLogin('kishore@endl.app','G7m@xQ2w!')
      }}>Login</Text>
    </View>
  )
}

export default Login