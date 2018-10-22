import React from 'react';
import { Text, View, StyleSheet, AppRegistry, Image, Dimensions, TextInput, Button, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

//Implementar a função para integrar ao firebase e direcionar a página inicial do usuário cadastrado...
const botaoPressionado = () => {
  Alert.alert('Fazendo login...');
};


export default class Login extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Image source={''} style={styles.logo}/>

        <View>
          <TextInput 
            underlineColorAndroid='transparent' 
            placeholder='Login' 
            style={styles.textInput}
          />
        </View>

         <View>
          <TextInput underlineColorAndroid='transparent' placeholder='Senha' style={styles.textInput}/>
        </View>

        <View>
          <TouchableOpacity onPress={botaoPressionado} style={styles.botao}>
            <Text> ENTRAR </Text>
          </TouchableOpacity>
        </View>
    </View>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    backgroundColor: '#91b8da',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textInput:{
    width: 300,
    heigth: 40,
    borderColor: 'gray',
    borderWidth: 1,
    backgroundColor: 'white',
    marginTop: 10
  },
  botao:{
    backgroundColor: '#e88585',
    paddingVertical: 10,
    paddingHorizontal: 40,
    margintTop: 20
  },
  logo:{
    width: 200,
    heigth: 200,
    margin: 20
  },
  
});
