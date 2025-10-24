import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, FlatList, Alert } from "react-native";
import { API_URL } from "../config";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await fetch(`${API_URL}/categories`);
      const data = await res.json();
      setCategories(data);
    } catch (e) {
      console.log(e);
    }
  };

  const addCategory = async () => {
    if (!newCategory) return;
    try {
      const res = await fetch(`${API_URL}/categories`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newCategory }),
      });
      if (res.ok) {
        setNewCategory("");
        fetchCategories();
      } else {
        Alert.alert("Erro", "Não foi possível adicionar categoria");
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Nova Categoria:</Text>
      <TextInput value={newCategory} onChangeText={setNewCategory} style={{ borderWidth: 1, marginBottom: 10, padding: 5 }} />
      <Button title="Adicionar" onPress={addCategory} />

      <Text style={{ marginTop: 20 }}>Categorias:</Text>
      <FlatList
        data={categories}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <Text>{item.name}</Text>}
      />
    </View>
  );
}
