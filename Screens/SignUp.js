import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios'; 

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleSignUp = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/auth/signup', {
        email: username,
        password: password,
      });

      if (res.data.token) {
        Alert.alert('Success', 'Sign-up successful!');
        navigation.navigate('InterestsScreen', { token: res.data.token });
      }
    } catch (err) {
      Alert.alert('Error', err.response?.data?.msg || 'An error occurred during sign-up');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Image source={require('../assets/images/back-icon.png')} style={styles.backIcon} />
      </TouchableOpacity>

      <Text style={styles.title}>flippr.</Text>

      <TextInput
        placeholder="username"
        value={username}
        onChangeText={setUsername} 
        style={styles.input}
        placeholderTextColor="#888"
      />
      <TextInput
        placeholder="password"
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword} 
        style={styles.input}
        placeholderTextColor="#888"
      />

      <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
        <Text style={styles.buttonText}>sign up</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E7EAF2',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 10,
  },
  backIcon: {
    width: 24,
    height: 24,
  },
  title: {
    fontSize: 48,
    fontFamily: 'ProximaNova-Bold',
    color: '#000',
    marginBottom: 60,
    textShadowColor: 'rgba(0, 0, 0, 0.25)',
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 4,
  },
  input: {
    width: '80%',
    height: 50,
    backgroundColor: 'transparent',
    borderBottomWidth: 1,
    borderBottomColor: '#888',
    marginBottom: 20,
    fontSize: 18,
    fontFamily: 'ProximaNova-Regular',
    color: '#000',
    paddingLeft: 10,
  },
  signUpButton: {
    backgroundColor: '#C76D7E',
    padding: 15,
    borderRadius: 30,
    width: '80%',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    fontSize: 20,
    fontFamily: 'ProximaNova-Bold',
    color: '#fff',
  },
});

export default Signup;
