import * as React from 'react';
import { Text, Picker, View, Button, StyleSheet, FlatList, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
// import { Icon } from 'react-native-vector-icons';
import { Constants } from 'expo';

import firebase from 'firebase';
import config from './db';

export default class ListaPedido extends React.Component {

  constructor(props){
    super(props);
    this.state = { clientes : []}


  }

  componentDidMount(){

    if (!firebase.apps.length) {
      firebase.initializeApp(config);
    }  
    firebase.database().ref('clientes').on('value', (snapshot)=> {
        var aClientes = [];
        snapshot.forEach( (child) => {
          aClientes.push ({
            dados : child.val(),
            chave : child.key
          });
        });         
        this.setState({clientes :aClientes });
    });

  }

  selecionaCliente(itemValue, itemIndex){
    console.log(itemValue);
    //Buscar

  }

  render() {

   const clientes= this.state.clientes;

   const pedidos = [];

    return (
      <View  style={styles.container}>
        <Picker
          style={{ height: 50, width: 100 }}
           onValueChange={this.selecionaCliente.bind(this)}>
          {clientes.map(({item})=>
           <Picker.Item label={item.dados.nome} value={item.chave} />
          )
          }
        </Picker>
        

      </View>
    );
  }
}

const styles = StyleSheet.create({ 
container : {
  flex : 0,
  // flexDirection : 'row',
  backgroundColor : '#00ffff',
  alignItems: 'center',
  justifyContent: 'center'
}, 
items: {
    flex: 1,
    margin : 5,
    padding : 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor : '#ffff00'
},
titulo : {
  fontSize : 32
},
botao : {
   borderWidth:1,
       borderColor:'rgba(0,0,0,0.2)',
       alignItems:'center',
       justifyContent:'center',
       width:70,
       position: 'absolute',
       bottom: 10,
       right: 10,
       height:70,
       backgroundColor:'#fff',
       borderRadius:100,
} 
});