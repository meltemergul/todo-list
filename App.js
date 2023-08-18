import React, { Component } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text, FlatList } from 'react-native';

class TodoList extends Component {
  state = {
    todos: [],
    newTodo: '',
  };

  addTodo = () => {
    const { todos, newTodo } = this.state;

    if (newTodo.trim() !== '') {
      const updatedTodos = [...todos, { id: Date.now(), text: newTodo }];
      this.setState({ todos: updatedTodos, newTodo: '' });
    }
  };

  deleteTodo = (id) => {
    const { todos } = this.state;
    const updatedTodos = todos.filter(todo => todo.id !== id);
    this.setState({ todos: updatedTodos });
  };

  renderTodoItem = ({ item }) => (
    <View style={styles.todoItem}>
      <Text style={styles.todoText}>{item.text}</Text>
      <TouchableOpacity onPress={() => this.deleteTodo(item.id)}>
        <Text style={styles.deleteButton}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  render() {
    const { todos, newTodo } = this.state;

    return (
      <View style={styles.container}>
        <Text style={styles.text}>Yapılacaklar Listesi</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Yeni görev ekle.."
            value={newTodo}
            onChangeText={(text) => this.setState({ newTodo: text })}
          />
          <TouchableOpacity style={styles.addButton} onPress={this.addTodo}>
            <Text style={styles.addButtonText}>Ekle</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={todos}
          renderItem={this.renderTodoItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.todoList}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 5,
    padding: 10,
    backgroundColor: 'whitesmoke',
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 10,
    color: 'brown',
    fontWeight: 'bold',
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 10,
    backgroundColor: 'whitesmoke',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    marginRight: 10,
    padding: 10,
  },
  addButton: {
    backgroundColor: 'olivedrab',
    padding: 15,
    borderRadius: 5,
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  todoList: {
    flexGrow: 1,
  },
  todoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  todoText: {
    flex: 1,
    fontSize: 20,
  },
  deleteButton: {
    color: 'red',
    marginLeft: 10,
    fontStyle: 'italic',
  },
});

export default TodoList;
