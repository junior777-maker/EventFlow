
import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

export default function EventDetails({ route, navigation }) {
  const { event } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{event.name}</Text>
      <Text>Data: {event.date}</Text>
      <Text>Preço: {event.price}</Text>
      <Text>Categoria: {event.category}</Text>
      <Text>Local: {event.location.name}</Text>
      <Text>Descrição: {event.description}</Text>
      <Button title="Ver Mapa" onPress={() => navigation.navigate("EventMap", { events: [event] })} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, marginBottom: 15 },
});


