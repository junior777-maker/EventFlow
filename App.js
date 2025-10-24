// App.js
import React from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MapView, { Marker } from 'react-native-maps';

// ========================
// Login
// ========================
function Login({ navigation }) {
  const [nome, setNome] = React.useState('');
  const [email, setEmail] = React.useState('');

  const handleLogin = async () => {
    if (nome && email) {
      await AsyncStorage.setItem('usuario', JSON.stringify({ nome, email }));
      navigation.replace('ListaEventos');
    } else {
      Alert.alert('Atenção', 'Preencha nome e e-mail!');
    }
  };

  React.useEffect(() => {
    const checkUser = async () => {
      const jsonValue = await AsyncStorage.getItem('usuario');
      if (jsonValue) navigation.replace('ListaEventos');
    };
    checkUser();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput placeholder="Nome" value={nome} onChangeText={setNome} style={styles.input} />
      <TextInput placeholder="E-mail" value={email} onChangeText={setEmail} style={styles.input} keyboardType="email-address" />
      <Button title="Entrar" onPress={handleLogin} />
    </View>
  );
}

// ========================
// Perfil
// ========================
function Perfil({ navigation }) {
  const [usuario, setUsuario] = React.useState({ nome: '', email: '' });

  React.useEffect(() => {
    const carregarUsuario = async () => {
      const jsonValue = await AsyncStorage.getItem('usuario');
      if (jsonValue) setUsuario(JSON.parse(jsonValue));
    };
    carregarUsuario();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem('usuario');
    navigation.replace('Login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil</Text>
      <Text style={styles.label}>Nome: {usuario.nome}</Text>
      <Text style={styles.label}>E-mail: {usuario.email}</Text>
      <Button title="Sair" onPress={handleLogout} color="#e74c3c" />
    </View>
  );
}

// ========================
// Lista de Eventos
// ========================
function ListaEventos({ navigation }) {
  const [eventos, setEventos] = React.useState([]);

  React.useEffect(() => {
    const carregarEventos = async () => {
      const stored = await AsyncStorage.getItem('eventos');
      if (stored) setEventos(JSON.parse(stored));
      else setEventos([
        { id: '1', nome: 'Show de Rock', data: '25/10/2025', preco: 'R$ 50', categoria: 'Música', lat: -23.55052, lng: -46.633308 },
        { id: '2', nome: 'Feira de Tecnologia', data: '28/10/2025', preco: 'Grátis', categoria: 'Tecnologia', lat: -23.551, lng: -46.634 }
      ]);
    };
    carregarEventos();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Eventos</Text>
      <FlatList
        data={eventos}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('DetalhesEvento', { evento: item })} style={styles.eventItem}>
            <Text style={styles.eventName}>{item.nome}</Text>
            <Text>{item.data} | {item.preco} | {item.categoria}</Text>
          </TouchableOpacity>
        )}
      />
      <Button title="Cadastrar Evento" onPress={() => navigation.navigate('CadastrarEvento')} />
      <Button title="Categorias" onPress={() => navigation.navigate('Categorias')} />
      <Button title="Locais" onPress={() => navigation.navigate('Locais')} />
      <Button title="Perfil" onPress={() => navigation.navigate('Perfil')} />
    </View>
  );
}

// ========================
// Cadastrar Evento
// ========================
function CadastrarEvento({ navigation }) {
  const [nome, setNome] = React.useState('');
  const [data, setData] = React.useState('');
  const [preco, setPreco] = React.useState('');
  const [categoria, setCategoria] = React.useState('');
  const [lat, setLat] = React.useState('');
  const [lng, setLng] = React.useState('');

  const handleAdd = async () => {
    if (!nome || !data || !preco || !categoria || !lat || !lng) {
      Alert.alert('Erro', 'Preencha todos os campos!');
      return;
    }
    const novoEvento = {
      id: Date.now().toString(),
      nome, data, preco, categoria,
      lat: parseFloat(lat),
      lng: parseFloat(lng)
    };
    const stored = await AsyncStorage.getItem('eventos');
    const eventos = stored ? JSON.parse(stored) : [];
    const updated = [...eventos, novoEvento];
    await AsyncStorage.setItem('eventos', JSON.stringify(updated));
    Alert.alert('Sucesso', 'Evento cadastrado!');
    navigation.navigate('ListaEventos');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastrar Evento</Text>
      <TextInput placeholder="Nome" value={nome} onChangeText={setNome} style={styles.input} />
      <TextInput placeholder="Data" value={data} onChangeText={setData} style={styles.input} />
      <TextInput placeholder="Preço" value={preco} onChangeText={setPreco} style={styles.input} />
      <TextInput placeholder="Categoria" value={categoria} onChangeText={setCategoria} style={styles.input} />
      <TextInput placeholder="Latitude" value={lat} onChangeText={setLat} style={styles.input} keyboardType="numeric" />
      <TextInput placeholder="Longitude" value={lng} onChangeText={setLng} style={styles.input} keyboardType="numeric" />
      <Button title="Salvar Evento" onPress={handleAdd} />
    </View>
  );
}

// ========================
// Detalhes do Evento
// ========================
function DetalhesEvento({ route, navigation }) {
  const { evento } = route.params;
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{evento.nome}</Text>
      <Text>ID: {evento.id}</Text>
      <Text>Data: {evento.data}</Text>
      <Text>Preço: {evento.preco}</Text>
      <Text>Categoria: {evento.categoria}</Text>
      <Button title="Ver Mapa" onPress={() => navigation.navigate('MapaEvento', { evento })} />
    </View>
  );
}

// ========================
// Mapa do Evento
// ========================
function MapaEvento({ route }) {
  const { evento } = route.params;
  return (
    <MapView
      style={{ flex: 1 }}
      initialRegion={{
        latitude: evento.lat,
        longitude: evento.lng,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01
      }}
    >
      <Marker coordinate={{ latitude: evento.lat, longitude: evento.lng }} title={evento.nome} />
    </MapView>
  );
}

// ========================
// Categorias
// ========================
function Categorias() {
  const [categorias, setCategorias] = React.useState([]);
  const [novaCategoria, setNovaCategoria] = React.useState('');

  React.useEffect(() => {
    const carregar = async () => {
      const stored = await AsyncStorage.getItem('categorias');
      if (stored) setCategorias(JSON.parse(stored));
    };
    carregar();
  }, []);

  const addCategoria = async () => {
    if (!novaCategoria) return;
    const updated = [...categorias, { id: Date.now().toString(), nome: novaCategoria }];
    setCategorias(updated);
    await AsyncStorage.setItem('categorias', JSON.stringify(updated));
    setNovaCategoria('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Categorias</Text>
      <FlatList
        data={categorias}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <Text style={styles.label}>{item.nome}</Text>}
      />
      <TextInput placeholder="Nova Categoria" value={novaCategoria} onChangeText={setNovaCategoria} style={styles.input} />
      <Button title="Adicionar Categoria" onPress={addCategoria} />
    </View>
  );
}

// ========================
// Locais
// ========================
function Locais() {
  const [locais, setLocais] = React.useState([]);
  const [nome, setNome] = React.useState('');
  const [lat, setLat] = React.useState('');
  const [lng, setLng] = React.useState('');

  React.useEffect(() => {
    const carregar = async () => {
      const stored = await AsyncStorage.getItem('locais');
      if (stored) setLocais(JSON.parse(stored));
    };
    carregar();
  }, []);

  const addLocal = async () => {
    if (!nome || !lat || !lng) {
      Alert.alert('Erro', 'Preencha todos os campos!');
      return;
    }
    const novoLocal = {
      id: Date.now().toString(),
      nome,
      lat: parseFloat(lat),
      lng: parseFloat(lng)
    };
    const updated = [...locais, novoLocal];
    setLocais(updated);
    await AsyncStorage.setItem('locais', JSON.stringify(updated));
    setNome(''); setLat(''); setLng('');
    Alert.alert('Sucesso', 'Local cadastrado!');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Locais</Text>
      <FlatList
        data={locais}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <Text style={styles.label}>{item.nome} ({item.lat}, {item.lng})</Text>}
      />
      <TextInput placeholder="Nome" value={nome} onChangeText={setNome} style={styles.input} />
      <TextInput placeholder="Latitude" value={lat} onChangeText={setLat} style={styles.input} keyboardType="numeric" />
      <TextInput placeholder="Longitude" value={lng} onChangeText={setLng} style={styles.input} keyboardType="numeric" />
      <Button title="Adicionar Local" onPress={addLocal} />
    </View>
  );
}

// ========================
// Stack Navigator
// ========================
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="ListaEventos" component={ListaEventos} />
        <Stack.Screen name="DetalhesEvento" component={DetalhesEvento} />
        <Stack.Screen name="MapaEvento" component={MapaEvento} />
        <Stack.Screen name="CadastrarEvento" component={CadastrarEvento} />
        <Stack.Screen name="Perfil" component={Perfil} />
        <Stack.Screen name="Categorias" component={Categorias} />
        <Stack.Screen name="Locais" component={Locais} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// ========================
// Estilos
// ========================
const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  label: { fontSize: 18, marginBottom: 10 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 10, borderRadius: 5 },
  eventItem: { padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc', marginBottom: 5 },
  eventName: { fontSize: 18, fontWeight: 'bold' }
});




















