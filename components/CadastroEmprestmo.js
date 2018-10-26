import * as React from 'react';
import { Text, TextInput, Picker, View, Button, StyleSheet, FlatList, TouchableWithoutFeedback, TouchableOpacity, Alert } from 'react-native';
import { Icon } from 'react-native-elements';
// import { Icon } from 'react-native-vector-icons';
import { Constants } from 'expo';

import firebase from 'firebase';
import config from './db';

export default class CadastroEmprestimo extends React.Component {

  constructor(props){
    super(props);

    let clienteSelecionado = this.props.navigation.getParam('clienteSel', 'NO-ID'); 

    this.state = { livros : [], 
                  usuarios: clienteSelecionado, 
                  produtoSelecionado : '',
                  quantidade : 0}
  }

  componentDidMount(){

    if (!firebase.apps.length) {
      firebase.initializeApp(config);
    }  
    firebase.database().ref('livros').on('value', (snapshot)=> {
        var aLivros = [];
        snapshot.forEach( (child) => {
          aLivros.push ({
            dados : child.val(),
            chave : child.key
          });
        });
        this.setState({livros : aLivros});
    });

  }

  selecionaProduto(itemValue, itemIndex) {
    this.setState({ produtoSelecionado : itemValue});

    console.log('Cliente selecionado: ' + this.state.usuarios);
    console.log('Produto selecionado: ' + this.state.produtoSelecionado);
  }

  cadastraPedido(){
    if (!firebase.apps.length) {
      firebase.initializeApp(config);
    }

    let emprestimo = {
      idCliente : this.state.usuarios,
      idProduto : this.state.produtoSelecionado,
      quantidade : this.state.quantidade,
      situacao : 'Em andamento'
    };

    firebase.database().ref('emprestimos').push(emprestimo)
    Alert.alert('Empréstmo Realizado Com Sucesso');
    this.props.navigation.goBack();
  }

  render() {

   const livros = this.state.livros;

    return (
      <View  style={styles.container}>
        <Picker
          selectedValue={this.state.produtoSelecionado}
          style={{ height: 50, width: 200 , }}
          
          onValueChange = {this.selecionaProduto.bind(this)}
          >
            {livros.map( (item) => 
              (<Picker.Item label={item.dados.nome} value={item.chave}/>
            ))
            }
        </Picker>
        <Text style={styles.titulo}>Quantidade: </Text>
        <TextInput style={{ height: 50, width: 200 }} onValueChange={(quantidade) => this.setState({quantidade})}>
        </TextInput>
      

        <Button style={styles.botao} onPress={this.cadastraPedido.bind(this)} title='Confirmar'/>
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