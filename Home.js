import React from 'react';
import { View, Text, Button, FlatList, TouchableOpacity } from 'react-native';

const Home = ({ navigation }) => {
  const eventos = [
    {
      nome: 'Show de Rock',
      data: '20/10',
      preco: 100,
      categoria: 'Música',
      local: { latitude: -15.7801, longitude: -47.9292, nome: 'Estádio' },
      descricao: 'Um show incrível de rock',
    },
    {
      nome: 'Feira Tech',
      data: '25/10',
      preco: 50,
      categoria: 'Tecnologia',
      local: { latitude: -15.7942, longitude: -47.8822, nome: 'Centro' },
      descricao: 'Feira de tecnologia',
    },
  ];

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text>Bem-vindo!</Text>

      <FlatList
        data={eventos}
        keyExtractor={(item) => item.nome}
        renderItem={({ item }) => (
          <View style={{ marginVertical: 10 }}>
            <Text>{item.nome}</Text>
            <Text>{item.data} - R$ {item.preco}</Text>
            <Button
              title="Ver Detalhes"
              onPress={() => navigation.navigate('Detalhes', { evento: item })}
            />
          </View>
        )}
      />

      <Button
        title="Ver no Mapa"
        onPress={() => navigation.navigate('Map', { eventos })}
      />
    </View>
  );
};

export default Home;


