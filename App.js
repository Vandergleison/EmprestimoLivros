import React from 'react';
import { View, Text } from 'react-native';
import { createStackNavigator } from 'react-navigation'; // 2.17.0
import ListaLivros from './components/ListaLivros';
import ListaUsuario from './components/ListaUsuario';
import ListaEmprestimo from './components/ListaEmprestimo';
import CadastroEmprestimo from './components/CadastroEmprestimo';
import EnviaFoto from './components/EnviaFoto';

const RootStack = createStackNavigator(
  {
    Livros: ListaLivros,
    Usuario: ListaUsuario,
    Emprestimo : ListaEmprestimo,
    Foto : EnviaFoto,
    NovoEmprestimo: CadastroEmprestimo
    },
  {
    initialRouteName: 'Usuario',
  }
);

export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}