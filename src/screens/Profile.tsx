import { View, Text, Alert } from 'react-native'
import React from 'react'
import { useUser } from '../context/useUserContext'
import KeyValue from '../components/theme/KeyValue';
import Button from '../components/theme/Button';
import { showAlert } from '../components/theme/Toast';
import { useDisconnect } from '@reown/appkit-ethers5-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Profile = () => {
  const {user,logoutUser}:any=useUser();
  const {disconnect}=useDisconnect();
  console.log(user)


  const logout=async()=>{
    try{
      let data = await AsyncStorage.clear();
      const logoutData= await logoutUser();
      console.log('LogoutData',logoutData,data)
    }catch(err){
      console.log(err)
    }
   
  }
 

  //console.log('User',user)
  return (
    <View style={{width:'100%',padding:24,backgroundColor:'white',height:'100%'}}>
     <KeyValue keyData={'Name'} value={user?.firstName}/>
     <Divider/>
     <KeyValue keyData={'Last name'} value={user?.lastName}/>
     <Divider/>
     <KeyValue keyData={'KYC Status'} value={user?.kycInfo?.kycStatus}/>
     <Divider/>
     <KeyValue keyData={'Email'} value={user?.email}/>
     <Divider/>
     <KeyValue keyData={'Country'} value={user?.address?.country}/>
     <Divider/>
     <KeyValue keyData={'Phone Verified'} value={user?.phoneVerified?.toString()}/>
     <Divider/>
     <KeyValue keyData={'Email Verified'} value={user?.emailVerified?.toString()}/>
     <Divider/>
     <Button text={'Logout'} onClick={()=>{
      showAlert(logout);
     }}
     style={{width:'100%',borderColor:'black',borderWidth:1,marginVertical:20}}
     />
    </View>
  )
}

const Divider=()=>{
  return (
    <View style={{width:'100%',height:1,backgroundColor:'rgba(0,0,0,0.1)'}}></View>
  )
}

export default Profile