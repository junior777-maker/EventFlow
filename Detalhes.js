import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

export default function Detalhes({ route, navigation }) {
  const { evento } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>{evento.nome}</Text>
      <Text>Data: {evento.data}</Text>
      <Text>Preço: {evento.preco}</Text>

      <Button title="Voltar" onPress={() => navigation.goBack()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  titulo: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
});

