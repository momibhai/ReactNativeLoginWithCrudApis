import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet,Button } from 'react-native';

const UserListScreen = ({ navigation }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUserApi();
  }, []);

  const handleUpdateUserList = () => {
    // Manually trigger a refresh of the user list
    fetchUserApi();
  };


  const fetchUserApi = () => {
    // Fetch the list of users from your API
    fetch('http://192.168.0.108/uniexpo/get_users.php')
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error(error));
  };

  const handleEditUser = (user) => {
    // Navigate to the EditUserScreen with user data
    navigation.navigate('EditUserScreen', { user });
  };

  const handleUpdateUser = (updatedUser) => {
    // Update the user in the user list with the new data
    const updatedUsers = users.map((user) =>
      user.id === updatedUser.id ? updatedUser : user
    );
    setUsers(updatedUsers);
  };

  const handleDeleteUser = (user) => {
    fetch(`http://192.168.0.108/uniexpo/delete_user.php?id=${user.id}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === 'User deleted successfully') {
          alert('User deleted successfully');
          // Update the user list after deleting the user
          const updatedUsers = users.filter((u) => u.id !== user.id);
          setUsers(updatedUsers);
        } else {
          alert('Failed to delete the user');
        }
      })
      .catch((error) => {
        console.error(error);
        alert('Error occurred while deleting the user');
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.tableHeader}>User List</Text>
      <FlatList
        data={users}
        keyExtractor={(user) => user.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.tableRow}>
            <View style={styles.tableCell}>
              <Text>{item.id}</Text>
            </View>
            <View style={styles.tableCell}>
              <Text>{item.email}</Text>
            </View>
            <View style={styles.tableCell}>
              <Text>{item.password}</Text>
            </View>
            <View style={styles.tableCell}>
              <TouchableOpacity onPress={() => handleEditUser(item)}>
                <Text style={styles.editButton}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDeleteUser(item)}>
                <Text style={styles.deleteButton}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
            <Button title="Refresh User List" onPress={handleUpdateUserList} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  tableHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  tableCell: {
    flex: 1,
  },
  editButton: {
    color: 'blue',
    marginRight: 10,
  },
  deleteButton: {
    color: 'red',
  },
});

export default UserListScreen;
