import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const EventMap = () => {
  // Localização inicial (pode alterar para o endereço do evento)
  const initialRegion = {
    latitude: -23.55052,  // São Paulo (exemplo)
    longitude: -46.633308,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  };

  // Marcador de exemplo
  const marker = {
    latitude: -23.55052,
    longitude: -46.633308,
    title: 'Evento Exemplo',
    description: 'Local do evento',
  };

  return (
    <View style={{ flex: 1 }}>
      {Platform.OS === 'web' ? (
        <View style={styles.webPlaceholder}>
          <Text>O mapa não é compatível com a versão web. Use o aplicativo Expo Go no celular.</Text>
        </View>
      ) : (
        <MapView
          style={styles.map}
          initialRegion={initialRegion}
        >
          <Marker
            coordinate={{
              latitude: marker.latitude,
              longitude: marker.longitude,
            }}
            title={marker.title}
            description={marker.description}
          />
        </MapView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  map: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  webPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    margin: 10,
  },
});

export default EventMap;
