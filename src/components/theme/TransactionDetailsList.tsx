import { View, Text } from 'react-native'
import React from 'react'

const TransactionDetailsList = ({keyData,value}:any) => {
  return (
    <View style={{width:'100%',flexDirection:'row',alignItems:'center',justifyContent:'space-between',marginVertical:6}}>
      <Text style={{color:'rgba(0,0,0,0.6)',fontSize:16,fontWeight:'500'}}>{keyData} :</Text>
      <Text style={{color:'black',fontSize:16,fontWeight:'600',opacity:1}}>{value}</Text>
    </View>
  )
}

export default TransactionDetailsList