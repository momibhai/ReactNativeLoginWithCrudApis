import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

const EditUserScreen = ({ route, navigation }) => {
  const { user } = route.params;
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState(user.password);

  const handleUpdateUser = () => {
    // Perform the user update logic
    fetch(`http://192.168.0.108/uniexpo/update_user.php?id=${user.id}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: user.id, // Send the user ID to the server for identification
        email: email,
        password: password,
      }),
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw new Error('Server error');
        }
      })
      .then((data) => {
        if (data.message === 'User updated successfully') {
          alert('User updated successfully');
          setEmail('')
          setPassword('')
          navigation.navigate('UserListScreen')
        } else {
          alert('Failed to update user');
        }
      })
      .catch((error) => {
        console.error(error);
        alert('Error occurred while updating the user');
      });
  };

  return (
    <View>
      <Text>Edit User</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <Button title="Update User" onPress={handleUpdateUser} />
      
    </View>
  );
};

export default EditUserScreen;
