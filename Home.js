import React, { useEffect, useState } from "react";
import { View, Text, Button, FlatList, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Home({ navigation }) {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const carregarUsuario = async () => {
      const dados = await AsyncStorage.getItem("usuarioLogado");
      if (dados) setUsuario(JSON.parse(dados));
    };
    carregarUsuario();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem("usuarioLogado");
    navigation.replace("Login");
  };

  const eventos = [
    { id: "1", nome: "Show de Rock", data: "20/10", preco: "R$ 100" },
    { id: "2", nome: "Feira Tech", data: "25/10", preco: "R$ 50" },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.boasVindas}>Bem-vindo, {usuario?.email}</Text>

      <FlatList
        data={eventos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.evento}>
            <Text style={styles.nome}>{item.nome}</Text>
            <Text>{item.data} - {item.preco}</Text>
            <Button title="Ver Detalhes" onPress={() => navigation.navigate("Detalhes", { evento: item })} />
          </View>
        )}
      />

      <Button title="Sair" onPress={handleLogout} color="red" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  boasVindas: { fontSize: 18, marginBottom: 20 },
  evento: {
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#ddd",
  },
  nome: { fontWeight: "bold", fontSize: 16 },
});
