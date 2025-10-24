import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Profile({ navigation }) {
  const [user, setUser] = useState({ name: "", email: "" });

  useEffect(() => {
    const loadUser = async () => {
      const json = await AsyncStorage.getItem("user");
      if (json) setUser(JSON.parse(json));
    };
    loadUser();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem("user");
    navigation.replace("Login");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil</Text>

      <Text style={styles.label}>Nome:</Text>
      <Text style={styles.value}>{user.name}</Text>

      <Text style={styles.label}>Email:</Text>
      <Text style={styles.value}>{user.email}</Text>

      <Button title="Sair" onPress={handleLogout} color="#e74c3c" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  label: { fontSize: 16, fontWeight: "600", marginTop: 10 },
  value: { fontSize: 18, marginBottom: 10 }
});

