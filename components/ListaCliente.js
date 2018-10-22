import * as React from 'react';

import { Text, View, Button, StyleSheet, FlatList, TouchableWithoutFeedback,ScrollView, TouchableOpacity } from 'react-native';
import { Icon,  SearchBar } from 'react-native-elements';
// import { Icon } from 'react-native-vector-icons';
import { Constants } from 'expo';

import firebase from 'firebase';
import config from './db';

export default class ListaCliente extends React.Component {

  constructor(props){
    super(props);
    this.state = { clientes : []}  
  }
  
  componentDidMount(){

    if (!firebase.apps.length) {
      firebase.initializeApp(config);
    } 

    firebase.database().ref('clientes').on('value', (snapshot)=> {
        var aTarefas = [];
        snapshot.forEach( (child) => {
          aTarefas.push ({
            dados : child.val(),
            chave : child.key
          });
        });         
        this.setState({tarefas : aTarefas});
    });

  }

  filtraClientes(text){
   
    if (!firebase.apps.length) {
      firebase.initializeApp(config);
    } 

    firebase.database().ref('clientes').orderByChild('nome').startAt(text).on('value',    (snapshot)=> {
        var aTarefas = [];
        snapshot.forEach( (child) => {
          aTarefas.push ({
            dados : child.val(),
            chave : child.key
          });
        });         
        this.setState({tarefas : aTarefas});
    });
  }

  render() {

   const tarefasTemp = this.state.tarefas;

    return (
      <ScrollView  style={styles.container}>
        <Text style={styles.titulo}>Clientes</Text>
        <View>
        <SearchBar
          onChangeText={this.filtraClientes.bind(this)}
          //onClear={someMethod}
          placeholder='Digite sua pesquisa' /></View>

        <FlatList
          data = {tarefasTemp}
          keyExtractor = { item => item.dados.id} 
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

      </ScrollView>
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