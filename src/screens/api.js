import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity, Image } from 'react-native';
import { API_URL } from '../api';

export default function EventsScreen({ navigation }) {
  const [eventos, setEventos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/events`)
      .then(res => res.json())
      .then(data => {
        setEventos(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Erro ao buscar eventos:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <FlatList
      data={eventos}
      keyExtractor={item => item.id.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity
          className="p-3 border-b border-gray-200 flex-row items-center"
          onPress={() => navigation.navigate('DetalhesEvento', { evento: item })}
        >
          <Image source={{ uri: item.imagem }} className="w-16 h-16 rounded-lg mr-3" />
          <View>
            <Text className="font-bold text-lg">{item.nome}</Text>
            <Text>{item.data}</Text>
            <Text className="text-gray-600">R$ {item.preco}</Text>
          </View>
        </TouchableOpacity>
      )}
    />
  );
}
