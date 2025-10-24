import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, ScrollView, Alert } from "react-native";
import { API_URL } from "../config";

export default function CreateEditEvent({ route, navigation }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState({ name: "", latitude: 0, longitude: 0 });

  const editingEvent = route.params?.event;

  useEffect(() => {
    if (editingEvent) {
      setName(editingEvent.name);
      setDescription(editingEvent.description);
      setDate(editingEvent.date);
      setPrice(editingEvent.price.toString());
      setCategory(editingEvent.category);
      setLocation(editingEvent.location);
    }
  }, []);

  const saveEvent = async () => {
    if (!name || !description || !date || !price || !category || !location.name) {
      Alert.alert("Erro", "Preencha todos os campos");
      return;
    }

    try {
      const res = await fetch(`${API_URL}/events${editingEvent ? `/${editingEvent.id}` : ""}`, {
        method: editingEvent ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, description, date, price, category, location }),
      });
      if (res.ok) {
        Alert.alert("Sucesso", "Evento salvo!");
        navigation.goBack();
      } else {
        Alert.alert("Erro", "Falha ao salvar evento");
      }
    } catch (e) {
      console.log(e);
      Alert.alert("Erro", "Não foi possível conectar à API");
    }
  };

  return (
    <ScrollView style={{ padding: 20 }}>
      <Text>Nome:</Text>
      <TextInput value={name} onChangeText={setName} style={{ borderWidth: 1, marginBottom: 10, padding: 5 }} />
      <Text>Descrição:</Text>
      <TextInput value={description} onChangeText={setDescription} style={{ borderWidth: 1, marginBottom: 10, padding: 5 }} />
      <Text>Data:</Text>
      <TextInput value={date} onChangeText={setDate} style={{ borderWidth: 1, marginBottom: 10, padding: 5 }} />
      <Text>Preço:</Text>
      <TextInput value={price} onChangeText={setPrice} keyboardType="numeric" style={{ borderWidth: 1, marginBottom: 10, padding: 5 }} />
      <Text>Categoria:</Text>
      <TextInput value={category} onChangeText={setCategory} style={{ borderWidth: 1, marginBottom: 10, padding: 5 }} />
      <Text>Local:</Text>
      <TextInput value={location.name} onChangeText={(text) => setLocation({ ...location, name: text })} style={{ borderWidth: 1, marginBottom: 10, padding: 5 }} />
      <Text>Latitude:</Text>
      <TextInput value={location.latitude.toString()} onChangeText={(text) => setLocation({ ...location, latitude: parseFloat(text) })} keyboardType="numeric" style={{ borderWidth: 1, marginBottom: 10, padding: 5 }} />
      <Text>Longitude:</Text>
      <TextInput value={location.longitude.toString()} onChangeText={(text) => setLocation({ ...location, longitude: parseFloat(text) })} keyboardType="numeric" style={{ borderWidth: 1, marginBottom: 10, padding: 5 }} />

      <Button title={editingEvent ? "Atualizar Evento" : "Criar Evento"} onPress={saveEvent} />
    </ScrollView>
  );
}


