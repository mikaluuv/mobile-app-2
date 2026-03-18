import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  StyleSheet,
  Button,
  Switch,
} from "react-native";
import ProductCard from "./components/ProductCard";

export default function App() {
  const [text, setText] = useState("");
  const [isEnabled, setIsEnabled] = useState(false);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Mijn App</Text>

      <TextInput
        style={styles.input}
        placeholder="Typ iets..."
        value={text}
        onChangeText={setText}
      />

      <View style={styles.row}>
        <Text>Switch</Text>
        <Switch value={isEnabled} onValueChange={setIsEnabled} />
      </View>

      <Button title="Klik mij" onPress={() => alert("Klik!")} />

      <Pressable style={styles.button} onPress={() => alert("Pressable")}>
        <Text style={styles.buttonText}>Druk hier</Text>
      </Pressable>

      <Text style={styles.subtitle}>Producten</Text>

      <ProductCard />
      <ProductCard />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    backgroundColor: "white",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    alignItems: "center",
  },
  button: {
    backgroundColor: "black",
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  buttonText: {
    color: "white",
  },
  subtitle: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: "bold",
  },
});
