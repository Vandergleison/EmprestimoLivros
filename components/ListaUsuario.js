import * as React from 'react';
import { Text, View,ScrollView, Button, StyleSheet, FlatList, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import { Icon, SearchBar } from 'react-native-elements';
// import { Icon } from 'react-native-vector-icons';
import { Constants } from 'expo';
import ListaEmprestimo from './ListaPedido';
import firebase from 'firebase';
import config from './db';

export default class ListaUsuario extends React.Component {

  constructor(props){
    super(props);
    this.state = { usuarios : [], clienteSelecionado: ''}
  }

  componentDidMount(){
    this.buscaClientes();
  }

  buscaClientes() {
    console.log('Consultando ...');
    if (!firebase.apps.length) {
      firebase.initializeApp(config);
    } 

    firebase.database().ref('usuarios').on('value', (snapshot)=> {
        var aUsuarios = [];
        snapshot.forEach( (child) => {
          aUsuarios.push ({
            dados : child.val(),
            chave : child.key
          });
        });         
        this.setState({usuarios : aUsuarios});
    });
  }

  filtraClientes(text){

    if (!firebase.apps.length) {
      firebase.initializeApp(config);
    } 

    if(text.length > 0) {
      firebase.database().ref('usuarios')
      .orderByChild('nome')
      .equalTo(text)
      .on('value', (snapshot)=> {
          var aUsuarios = [];
          snapshot.forEach( (child) => {
            aUsuarios.push ({
              dados : child.val(),
              chave : child.key
            });
          });         
          this.setState({usuarios : aUsuarios});
      });
    }
    else {
      this.buscaClientes();
    }

    
  }

  render() {

   const usuarios = this.state.usuarios;

    return (
      <View  style={styles.container}>
      <ScrollView>
        <Text style={styles.titulo}>Usuários</Text>
        <Button onPress={this.props.navigation.navigate('Emprestimo')} title = 'Realizar Emprestimo'>
        </Button>
        <SearchBar
          lightTheme
          ref={search => this.search = search}
          onChangeText={this.filtraClientes.bind(this)}
          placeholder='Type Here...' />

        <FlatList
          data = {usuarios}
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