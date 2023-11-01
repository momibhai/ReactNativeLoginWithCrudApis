import React, { useState } from 'react';
import { Button, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Sign in">
        <Stack.Screen name="SignIn" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function HomeScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
    </View>
  );
}

function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    fetch('http://192.168.100.8/uniexpo/signin.php', {
      // 192.168.100.8 it is your PC ip  
      //  go to your terminal of PC type ipconfig and look ip4 ip and paste here 
      // IPv4 Address. . . . . . . . . . . : 192.168.100.8
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.message === 'Sign-in successful') {
          alert('Sign-in successfully');
          setEmail('')
          setPassword('')
          navigation.navigate('Home');
        }
        else {
          alert('Invalid email or password');
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', backgroundColor: 'white', paddingHorizontal: 40 }}>
      <View style={{ alignItems: 'center', paddingBottom: 30 }}>
        <Image
          source={{ uri: 'https://i.pinimg.com/originals/0d/cf/b5/0dcfb548989afdf22afff75e2a46a508.jpg' }}
          style={styles.image}
        />
      </View>
      <Text style={{ fontSize: 22, color: 'black', fontWeight: 600, alignItems: 'flex-start', paddingBottom: 30 }}>
        Login to your account
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={(val) => setEmail(val)}
      />
      <View style={styles.spacer} />

      <TextInput
        style={styles.input}
        placeholder="Password"
        onChangeText={(val) => setPassword(val)}
      />
      <View style={styles.spacer} />
      <View style={styles.spacer} />

      <Button
        title="Sign in"
        onPress={handleLogin}
      />
      <View style={styles.spacer} />
      <View style={styles.spacer} />
      <View style={styles.spacer} />

      <View style={styles.or}>
        <Text>or sign in with</Text>
      </View>
      <View style={styles.spacer} />
      <View style={styles.spacer} />

      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <View style={styles.iconbox}>
          <Image
            source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTG0gpNFMHVj7TbYjWKrQcHrrBuPvjulgv_qVLLGwvhvO42PHvbMaW0HIiupb7KN17Ses&usqp=CAU' }}
            style={styles.icon}
          />
        </View>
        <View style={styles.iconbox}>
          <Image
            source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjosqAy09697KEoT5QVcRIWaJwYPcgRGf4bg&usqp=CAU' }}
            style={styles.icon}
          />
        </View>
        <View style={styles.iconbox}>
          <Image
            source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7Iq6bEI-PU9hqsYYK1RFPetkT-s0irr0JFQ&usqp=CAU' }}
            style={styles.icon}
          />
        </View>
      </View>

      <View style={styles.spacer} />
      <View style={styles.spacer} />
      <View style={styles.spacer} />

      <View style={{ flexDirection: 'row' }}>
        <Text style={{ marginRight: 5 }}>Don't have an account</Text>
        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
          <Text style={{ color: 'blue' }}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function SignUpScreen({ navigation }) {


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = () => {
    fetch('http://192.168.100.8/uniexpo/signup.php', {
      // 192.168.100.8 it is your PC ip  
      //  go to your terminal of PC type ipconfig and look ip4 ip and paste here 
      // IPv4 Address. . . . . . . . . . . : 192.168.100.8
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.message === 'Sign-Up successful') {
          alert('Sign-Up successfully');
          setEmail('')
          setPassword('')
          navigation.navigate('SignIn');
        } else {
          alert('Invalid email or password');
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };


  return (
    <View style={{ flex: 1, justifyContent: 'center', backgroundColor: 'white', paddingHorizontal: 40 }}>
      <View style={{ alignItems: 'center', paddingBottom: 30 }}>
        <Image
          source={{ uri: 'https://i.pinimg.com/originals/0d/cf/b5/0dcfb548989afdf22afff75e2a46a508.jpg' }}
          style={styles.image}
        />
      </View>
      <Text style={{ fontSize: 22, color: 'black', fontWeight: 600, alignItems: 'flex-start', paddingBottom: 30 }}>
        Create your account
      </Text>

      <View style={styles.spacer} />

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(txt) => setEmail(txt)}
      />
      <View style={styles.spacer} />

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={(txt) => setPassword(txt)}
      />
      <View style={styles.spacer} />
      <View style={styles.spacer} />

      <Button
        title="Sign up"
        onPress={handleSignUp}
      />
      <View style={styles.spacer} />
      <View style={styles.spacer} />
      <View style={styles.spacer} />

      <View style={styles.or}>
        <Text>or sign up with</Text>
      </View>
      <View style={styles.spacer} />
      <View style={styles.spacer} />

      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <View style={styles.iconbox}>
          <Image
            source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTG0gpNFMHVj7TbYjWKrQcHrrBuPvjulgv_qVLLGwvhvO42PHvbMaW0HIiupb7KN17Ses&usqp=CAU' }}
            style={styles.icon}
          />
        </View>
        <View style={styles.iconbox}>
          <Image
            source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjosqAy09697KEoT5QVcRIWaJwYPcgRGf4bg&usqp=CAU' }}
            style={styles.icon}
          />
        </View>
        <View style={styles.iconbox}>
          <Image
            source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7Iq6bEI-PU9hqsYYK1RFPetkT-s0irr0JFQ&usqp=CAU' }}
            style={styles.icon}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 100,
  },
  icon: {
    width: 30,
    height: 30,
  },
  iconbox: {
    shadowOpacity: 2,
    borderWidth: 1,
    borderColor: '#ddd',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  or: {
    alignItems: 'center',
  },
  spacer: {
    marginTop: 10,
  },
  input: {
    width: 300,
    height: 60,
    borderColor: 'gray',
    borderRadius: 5,
    paddingHorizontal: 10,
    shadowColor: 'rgba(0, 0, 0, 0.2)',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 3,
  },
});

export default App;
