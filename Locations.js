import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, FlatList, Alert } from "react-native";
import { API_URL } from "../config";

export default function Locations() {
  const [locations, setLocations] = useState([]);
  const [newLocation, setNewLocation] = useState({ name: "", latitude: "", longitude: "" });

  useEffect(() => {
    fetchLocations();
  }, []);

  const fetchLocations = async () => {
    try {
      const res = await fetch(`${API_URL}/locations`);
      const data = await res.json();
      setLocations(data);
    } catch (e) {
      console.log(e);
    }
  };

  const addLocation = async () => {
    if (!newLocation.name) return;
    try {
      const res = await fetch(`${API_URL}/locations`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          name: newLocation.name, 
          latitude: parseFloat(newLocation.latitude), 
          longitude: parseFloat(newLocation.longitude) 
        }),
      });
      if (res.ok) {
        setNewLocation({ name: "", latitude: "", longitude: "" });
        fetchLocations();
      } else {
        Alert.alert("Erro", "Não foi possível adicionar local");
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Novo Local:</Text>
      <TextInput placeholder="Nome" value={newLocation.name} onChangeText={(text) => setNewLocation({ ...newLocation, name: text })} style={{ borderWidth: 1, marginBottom: 5, padding: 5 }} />
      <TextInput placeholder="Latitude" value={newLocation.latitude} keyboardType="numeric" onChangeText={(text) => setNewLocation({ ...newLocation, latitude: text })} style={{ borderWidth: 1, marginBottom: 5, padding: 5 }} />
      <TextInput placeholder="Longitude" value={newLocation.longitude} keyboardType="numeric" onChangeText={(text) => setNewLocation({ ...newLocation, longitude: text })} style={{ borderWidth: 1, marginBottom: 5, padding: 5 }} />
      <Button title="Adicionar Local" onPress={addLocation} />

      <Text style={{ marginTop: 20 }}>Locais:</Text>
      <FlatList
        data={locations}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <Text>{item.name} ({item.latitude}, {item.longitude})</Text>}
      />
    </View>
  );
}

