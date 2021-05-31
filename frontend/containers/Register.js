import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Button } from 'react-native';
import {createUser} from '../services/UserService'


export function Register({ navigation }) {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');

  function crearUsuario(email, username, password, passwordCheck) {
    if(password == passwordCheck){
      const data = {
        "username":username,
        "password":password
      }
      createUser(data);
    }

  }


  return (
    <View style={styles.container}>

      <View style={{

        backgroundColor: '#F3C0A5',
        width: '80%',
        height: '70%',
        justifyContent: 'center',
        borderWidth: 2,
        borderRadius: 15
      }}>


        {/* <TextInput placeholder='email'
          style={{
            textAlign: 'center',
            borderRadius: 40,
            fontSize: 20,
            borderColor: '#FFFFFF',
            borderWidth: 1,
            marginLeft: '10%',
            marginRight: '10%'
          }}
          onChangeText={(v) => setEmail(v)}
        >
        </TextInput> */}
        <TextInput placeholder='nombre de usuario'
          style={styles.input}
          onChangeText={(v) => setUsername(v)}
        >
        </TextInput>


        <TextInput
          placeholder='contraseña'
          secureTextEntry={true} style={styles.input}
          onChangeText={(v) => setPassword(v)}>
        </TextInput>

        <TextInput
          placeholder='repite tu contraseña'
          secureTextEntry={true} style={styles.input}
          onChangeText={(v) => setPasswordCheck(v)}
        >
        </TextInput>

        <View style={{ marginTop: 10, paddingLeft: '25%', paddingRight: '25%' }}>

          <Button title="login" style={{
            width: 10
          }}
            onPress={() => navigation.navigate("Login")}
          ></Button>

          <View style={{ marginTop: 10 }} />

          <Button title="registrarse"
          onPress={()=>crearUsuario(email, username, password, passwordCheck)}
          
          ></Button>

          <View style={{ marginTop: 10 }} />
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
  titulo: {
    fontSize: 400,
  },
  input: {
      textAlign: 'center',
      borderRadius: 40,
      fontSize: 20,
      borderColor: '#FFFFFF',
      borderWidth: 1,
      marginLeft: '10%',
      marginRight: '10%',
      marginTop: 10
  }

});
