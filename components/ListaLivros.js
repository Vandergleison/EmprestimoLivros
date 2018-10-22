import * as React from 'react';
import { Text, View, Button, StyleSheet, FlatList, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
// import { Icon } from 'react-native-vector-icons';
import { Constants } from 'expo';

import firebase from 'firebase';
import config from './db';

export default class ListaLivros extends React.Component {

  constructor(props){
    super(props);
    this.state = { clientes : []}
  }

  componentDidMount(){

    if (!firebase.apps.length) {
      firebase.initializeApp(config);
    }  
    firebase.database().ref('clientes').on('value', (snapshot)=> {
        var aProdutos = [];
        snapshot.forEach( (child) => {
          aProdutos.push ({
            dados : child.val(),
            chave : child.key
          });
        });         
        this.setState({clientes : aProdutos});
    });

  }

  render() {

   const tarefasTemp = this.state.clients;

    return (
      <View  style={styles.container}>
        <Text style={styles.titulo}>Clientes</Text>
        <FlatList
          data = {tarefasTemp}
          keyExtractor = { item => item.quantidade.id} 
          renderItem = {
            ({item}) =>
            <TouchableWithoutFeedback >
            <View style={styles.items}>
              <Text>{item.dados.nome}</Text>
            <Text>{item.dados.cidade}-{item.dados.estado}</Text>  
            </View>
            </TouchableWithoutFeedback>
          }
        />

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