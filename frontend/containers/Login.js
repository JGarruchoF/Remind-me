import { StatusBar } from 'expo-status-bar';
import React , {useState} from 'react';
import {StyleSheet, Text, View, TextInput, Button, AsyncStorage } from 'react-native';
import {login} from '../services/UserService';
// import { decodeToken } from "react-jwt";
import jwt from 'jwt-decode';

export function Login( {navigation}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  async function entrada(username, password) {
    //console.log(username);
    await login(username, password);
    var token = null;
    //AsyncStorage.getItem('token').then((res)=>{const token = jwt(res)});

    token = await AsyncStorage.getItem('token');

    if(token != null){
      setError(false);
      setErrorMsg('');
      navigation.navigate("Home", {"userId":jwt(token)["id"]});
    }else{
      console.log("error al iniciar sesion");
      setError(true);
      setErrorMsg("error al iniciar sesion");
    }

  }


  return (
    <View style={styles.container}>

      <View style={{
        
        backgroundColor:'#F3C0A5',
        width:'80%',
        height: '70%',
        justifyContent:'center',
        borderWidth:2,
        borderRadius:15
        }}>
        <Text style={{fontSize: 40, 
          //fontFamily:'serif', 
          fontWeight: 'bold', textAlign:'center'}}>
          
          Remind Me</Text>

        <View style={{marginTop:10}}/>

      <TextInput placeholder='nombre de usuario'
        style={{
          textAlign:'center',
          borderRadius: 40,
          fontSize: 20, 
          borderColor:'#FFFFFF', 
          borderWidth:1,
          marginLeft:'10%',
          marginRight:'10%'
          }}
          onChangeText={(username) => setUsername(username)}
          >
      </TextInput>
      
      <View style={{marginTop:10}}/>
      
      <TextInput  
        placeholder='contraseña'
        secureTextEntry={true}style={{
          textAlign:'center',
          borderRadius: 40,
          fontSize: 20, 
          borderColor:'#FFFFFF', 
          borderWidth:1,
          marginLeft:'10%',
          marginRight:'10%'
          }}
          onChangeText={(password) => setPassword(password)}
          >
      </TextInput>

      <View style={{marginTop:10, paddingLeft:'25%', paddingRight:'25%'}}>
      
      <Button title="login" style={{width:10}} 
        onPress = {()=>entrada(username, password)}
      />

      
      <View style={{marginTop:10}}/>
     
     <Button title="registrarse"

          onPress={() => navigation.navigate("Register")}
     
      />
      
     
      
      
      <View style={{marginTop:10}}/>
      {error ? <Text style={styles.error}>{errorMsg}</Text> : <View></View>}

      </View>
      <StatusBar style="auto" />



    </View>


    
    </View>
    
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00FA9A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titulo:{
    fontSize: 400,
  },
  error: {

  }
});
