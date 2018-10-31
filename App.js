import React from 'react';
import { View, Text } from 'react-native';
import {StackNavigator } from 'react-navigation'; // 2.17.0
import ListaLivros from './components/ListaLivros';
import ListaUsuario from './components/ListaUsuario';
import ListaEmprestimo from './components/ListaEmprestimo';
import CadastroEmprestimo from './components/CadastroEmprestimo';
import EnviaFoto from './components/EnviaFoto';
import Login from './components/Login';
import CadastroUsuario from './components/CadastroUsuario';

const RootStack = StackNavigator(
  {
    Lisvros: {
      screen: ListaLivros,
    },
    Emprestimos: {
      screen: ListaEmprestimo,
    },
    Login: {
      screen: Login,
    },
    Cadastrar: {
      screen: CadastroUsuario,
    },
    NovoEmprestimo: {
      screen: CadastroEmprestimo,
    },
    Usuarios: {
      screen: ListaUsuario,
    }
  },
  {
    initialRouteName: 'Login',
  }
);

export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}