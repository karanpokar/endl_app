import { View, Text } from 'react-native'
import React from 'react'

const KeyValue = ({keyData,value}:any) => {
  return (
    <View style={{width:'100%',flexDirection:'column',alignItems:'flex-start',marginVertical:12}}>
      <Text style={{color:'rgba(0,0,0,0.6)',fontSize:16,fontWeight:'500',marginBottom:6}}>{keyData} :</Text>
      <Text style={{color:'black',fontSize:16,fontWeight:'600',opacity:1,marginTop:6}}>{value}</Text>
    </View>
  )
}

export default KeyValue