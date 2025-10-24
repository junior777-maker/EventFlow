import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, Button, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "../config";

export default function HomeScreen({ navigation }) {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await fetch(`${API_URL}/events`);
      const data = await res.json();
      setEvents(data);
    } catch (e) {
      console.log("Erro ao carregar eventos:", e);
    }
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem("user");
    navigation.replace("Login");
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={events}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.eventItem} onPress={() => navigation.navigate("EventDetails", { event: item })}>
            <Text style={styles.name}>{item.name}</Text>
            <Text>{item.date} - {item.price}</Text>
          </TouchableOpacity>
        )}
      />
      <Button title="Ver Mapa" onPress={() => navigation.navigate("EventMap", { events })} />
      <Button title="Sair" onPress={handleLogout} color="#e74c3c" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  eventItem: { padding: 15, borderWidth: 1, borderRadius: 8, marginBottom: 10 },
  name: { fontSize: 18, fontWeight: "bold" },
});

