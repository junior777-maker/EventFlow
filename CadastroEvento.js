import React, { useState } from 'react';
import { View, Text, TextInput, Button, ScrollView, StyleSheet } from 'react-native';

export default function CadastroEvento({ navigation }) {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [data, setData] = useState('');
  const [preco, setPreco] = useState('');
  const [categoria, setCategoria] = useState('');
  const [local, setLocal] = useState('');

  const salvarEvento = () => {
    // Por enquanto só vamos mostrar um alerta
    alert(`Evento salvo:\n${nome}\n${descricao}\n${data}\n${preco}\n${categoria}\n${local}`);
    // Depois podemos adicionar a integração com a API
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.titulo}>Cadastro de Evento</Text>
      <Text>Nome:</Text>
      <TextInput style={styles.input} value={nome} onChangeText={setNome} />

      <Text>Descrição:</Text>
      <TextInput style={styles.input} value={descricao} onChangeText={setDescricao} />

      <Text>Data (dd/mm):</Text>
      <TextInput style={styles.input} value={data} onChangeText={setData} />

      <Text>Preço (R$):</Text>
      <TextInput style={styles.input} value={preco} onChangeText={setPreco} keyboardType="numeric" />

      <Text>Categoria:</Text>
      <TextInput style={styles.input} value={categoria} onChangeText={setCategoria} />

      <Text>Local:</Text>
      <TextInput style={styles.input} value={local} onChangeText={setLocal} />

      <Button title="Salvar Evento" onPress={salvarEvento} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  titulo: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  input: { borderWidth: 1, borderColor: '#ccc', marginBottom: 15, padding: 8, borderRadius: 5 }
});
