import React from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import MapView, { Marker } from "react-native-maps";

export default function EventMap({ route }) {
  const { events } = route.params;

  return (
    <View style={styles.container}>
      {Platform.OS === "web" ? (
        <View style={styles.webPlaceholder}>
          <Text>Use o app no celular para visualizar o mapa.</Text>
        </View>
      ) : (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: events[0].location.latitude,
            longitude: events[0].location.longitude,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          }}
        >
          {events.map((event) => (
            <Marker
              key={event.id}
              coordinate={{
                latitude: event.location.latitude,
                longitude: event.location.longitude,
              }}
              title={event.name}
              description={`R$ ${event.price} - ${event.date}`}
            />
          ))}
        </MapView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
  webPlaceholder: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
});



