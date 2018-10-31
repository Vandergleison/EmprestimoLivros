import React from 'react';
import { View,
        ScrollView,
         Text,
         Alert,
         StyleSheet,
         TextInput,
         KeyboardAvoidingView,
         TouchableOpacity,
         AsyncStorage
         
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import firebase from 'firebase';
import config from './db';


export default class CadastroUsuario extends React.Component {
  
  constructor(props){
      super(props);
      this.state = {
        nome: '',
        endereco : '',
        areaInteresse: '',
        username: '',
        senha: '',
        senhaConf : ''
      }
  }
  
 componentDidMount(){

    if (!firebase.apps.length) {
      firebase.initializeApp(config);
    }  
    firebase.database().ref('usuarios').on('value', (snapshot)=> {
        var aCadastro = [];
        snapshot.forEach( (child) => {
          aCadastro.push ({
            dados : child.val(),
            chave : child.key
          });
        });
        this.setState({usuarios : aCadastro});
    });

  }

  cadastrar(){
    if (!firebase.apps.length) {
      firebase.initializeApp(config);
    }

    let usuario = {
      nome: this.state.nome,
      endereco: this.state.endereco,
      areaInteresse: this.state.areaInteresse,
      username: this.state.username,
      senha: this.state.senha,
      senhaConf: this.state.senhaConf
    };

    firebase.database().ref('usuarios').push(usuario)
    Alert.alert('Cadastro Realizado Com Sucesso');
    //this.props.navigation.goBack();
    this.props.navigation.navigate('Login');
  }

  render() {
    return (
      <KeyboardAvoidingView behavior='padding' style={styles.wrapper}>
        <ScrollView style={styles.container2}>
            <Text style={styles.header}>Cadastro de Usuário</Text>
            <Text>Nome Completo:</Text>
            <TextInput 
              style={styles.textInput} 
              maxLength = "100"
              placeholder='Nome' 
              onChangeText={ (nome) => this.setState ({nome}) }
              underlineColorAndroid='transparent'
            />
            <Text>Endereco:</Text>
            <TextInput 
              style={styles.textInput} 
              maxLength = "100"
              placeholder='Endereçco' 
              onChangeText={ (endereco) => this.setState ({endereco}) }
              underlineColorAndroid='transparent'
            />
            <Text>Area de Interesse:</Text>
            <TextInput 
              style={styles.textInput} 
              maxLength = "100"
              placeholder='Área' 
              onChangeText={ (areaInteresse) => this.setState ({areaInteresse}) }
              underlineColorAndroid='transparent'
            />
            <Text>Nome do Usuário:</Text>
            <TextInput 
              style={styles.textInput} 
              maxLength = "100"
              placeholder='Usuário' 
              onChangeText={ (username) => this.setState ({username}) }
              underlineColorAndroid='transparent'
            />
            <Text>Senha:</Text>
            <TextInput 
              maxLength = "8"
              style={styles.textInput} 
              placeholder='xxxxxxxx' 
              onChangeText={ (senha) => this.setState ({senha}) }
              underlineColorAndroid='transparent'
            />

            <Text>Confirme Senha:</Text>
            <TextInput 
              maxLength = "8"
              style={styles.textInput} 
              placeholder='*******' 
              onChangeText={ (username) => this.setState ({username}) }
              underlineColorAndroid='transparent'
            />

            <TouchableOpacity style={styles.btn} 
              onPress={this.cadastrar.bind(this)}>
              <Text style={styles.bt}>Confirmar</Text>
            </TouchableOpacity>
          
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({ 

  /* Estilos de CadastroEmprestimo.js , ListaLivros.js , ListaUsuario */

    
    /* Estilos de CadastroUsuario.js , ListaEmprestimos , Login */

        wrapper: {
          flex: 1,
        },
        container2 : {
          flex : 1,
          justifyContent: 'center',
          backgroundColor : '#2896d3',
          paddingLeft: 40,
          paddingRight: 40,
          
        },
        header:{
          fontSize: 24,
          marginBottom: 60,
          color: '#fff',
          fontWeight : 'bold',
          textAlign: 'center',
        },
        textInput : {
          alingSelf: 'stretch',
          padding : 16,
          marginBottom : 20,
          backgroundColor : '#fff', 
          borderRadius: 10
        },
        btn : {
          alingSelf: 'stretch',
          padding : 20,
          backgroundColor : '#01c853',
          alingItems: 'center',
          margin: 10,
          borderRadius: 10,
          
        },
        bt : {
          textAlign: 'center',
        },

    

    });