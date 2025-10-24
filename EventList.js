import React, { useState } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity } from 'react-native';

export default function EventList({ navigation }) {
  const [events, setEvents] = useState([
    { id: '1', name: 'Show de Rock', date: '20/10', price: 'R$ 100', category: 'Música', location: 'Estádio', description: 'Um show incrível de rock' },
    { id: '2', name: 'Feira', date: '21/10', price: 'R$ 50', category: 'Comércio', location: 'Praça', description: 'Feira da cidade' }
  ]);

  return (
    <View style={{padding:20}}>
      <Button title="Criar Evento" onPress={() => navigation.navigate('CreateEditEvent')} />
      <Button title="Categorias" onPress={() => navigation.navigate('Categories')} />
      <Button title="Locais" onPress={() => navigation.navigate('Locations')} />
      <Button title="Mapa de Eventos" onPress={() => navigation.navigate('EventMap')} />

      <FlatList
        style={{marginTop:20}}
        data={events}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <TouchableOpacity onPress={() => alert(`Detalhes:\nNome: ${item.name}\nData: ${item.date}\nPreço: ${item.price}\nCategoria: ${item.category}\nLocal: ${item.location}\nDescrição: ${item.description}`)}>
            <Text style={{fontSize:16, marginBottom:10}}>{item.name} - {item.price}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
