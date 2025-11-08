import { StatusBar } from 'expo-status-bar';
import React,{useState} from 'react';
import { StyleSheet, Text, View ,SafeAreaView,TextInput,Button,Alert} from 'react-native';

const API_URL = 'http://10.181.55.60:3000/add-user';
export default function App() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const saveUser = async () => {
    if (!name || !email) {
      Alert.alert('Error', 'Please fill both fields');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email }),
      });

      const data = await response.json();
      console.log(data)

      if (data.message === 'User added successfully!') {
        Alert.alert('Success', `Saved! ID: ${data.id}`);
        setName('');
        setEmail('');
      } else {
        Alert.alert('Error', data.error);
      }
    } catch (err) {
      Alert.alert('Network Error', 'Check your connection or backend');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Save to Firebase</Text>

      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <Button
        title={loading ? 'Saving...' : 'Save User'}
        onPress={saveUser}
        disabled={loading}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    marginBottom: 12,
    borderRadius: 8,
  },
});
