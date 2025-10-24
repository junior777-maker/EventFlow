import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const Map = ({ route }) => {
  // Recebendo os eventos via rota
  const { eventos } = route.params;

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: -15.7801, // coordenada inicial (exemplo: Brasília)
          longitude: -47.9292,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
      >
        {eventos.map((evento, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: evento.local.latitude,
              longitude: evento.local.longitude,
            }}
            title={evento.nome}
            description={`R$ ${evento.preco} - ${evento.data}`}
          />
        ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
});

export default Map;
