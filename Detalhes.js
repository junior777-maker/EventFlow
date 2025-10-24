import React from 'react';
import { View, Text, Button } from 'react-native';

export default function Detalhes({ route, navigation }) {
  const { evento } = route.params;

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{evento.nome}</Text>
      <Text>Data: {evento.data}</Text>
      <Text>Preço: R$ {evento.preco}</Text>
      <Text>Categoria: {evento.categoria}</Text>
      <Text>Local: {evento.local}</Text>
      <Text>Descrição: {evento.descricao}</Text>

      <Button title="Voltar" onPress={() => navigation.goBack()} />
    </View>
  );
}




