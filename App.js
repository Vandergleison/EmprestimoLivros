import React from 'react';
import { View, Text } from 'react-native';
import { createStackNavigator } from 'react-navigation'; // 2.17.0
import ListaProduto from './components/ListaProduto';
import ListaCliente from './components/ListaCliente';
import ListaPedido from './components/ListaPedido'

const RootStack = createStackNavigator(
  {
    Produto: ListaProduto,
    Cliente: ListaCliente,
    Pedido : ListaPedido
    },
  {
    initialRouteName: 'Cliente',
  }
);

export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}