// FileStorageService.js
import RNFS from 'react-native-fs';

class ToDoFileIO {
  constructor(fileName = 'toDos.json') {
    this.fileName = fileName;
    this.filePath = `${RNFS.DocumentDirectoryPath}/${fileName}`;
  }

  async initializeFile() {
    try {
      const exists = await RNFS.exists(this.filePath);
      console.log(this.filePath)
      
      if (!exists) {
        const initialData = {};
        await RNFS.writeFile(
          this.filePath,
          JSON.stringify(initialData),
          'utf8'
        );
      }
    } catch (error) {
      console.error('Error initializing file:', error);
    }
  }

  async getTodosForDate(date) {
    try {
      await this.initializeFile();
      
      const fileContent = await RNFS.readFile(this.filePath, 'utf8');
      const data = JSON.parse(fileContent);
      
      return data[date] || [];
    } catch (error) {
      console.error('Error getting todos:', error);
      return [];
    }
  }

  async addTodo(date, todo) {
    try {
      await this.initializeFile();
      
      const fileContent = await RNFS.readFile(this.filePath, 'utf8');
      const data = JSON.parse(fileContent);
      
      const id = Date.now().toString();
      const todoWithId = {
        ...todo,
        id,
        time: todo.time || '00:00'
      };
      
      if (!data[date]) {
        data[date] = [];
      }
      
      data[date].push(todoWithId);
      
      await RNFS.writeFile(
        this.filePath,
        JSON.stringify(data),
        'utf8'
      );
      
      return todoWithId;
    } catch (error) {
      console.error('Error adding todo:', error);
      throw error;
    }
  }

  async updateTodo(date, todoId, updatedTodo) {
    try {
      await this.initializeFile();
      
      const fileContent = await RNFS.readFile(this.filePath, 'utf8');
      const data = JSON.parse(fileContent);
      
      if (!data[date]) {
        throw new Error(`Date ${date} not found`);
      }
      
      const todoIndex = data[date].findIndex(todo => todo.id === todoId);
      
      if (todoIndex === -1) {
        throw new Error(`Todo with id ${todoId} not found`);
      }
      
      data[date][todoIndex] = {
        ...data[date][todoIndex],
        ...updatedTodo,
        id: todoId
      };
      
      await RNFS.writeFile(
        this.filePath,
        JSON.stringify(data),
        'utf8'
      );
      
      return data[date][todoIndex];
    } catch (error) {
      console.error('Error updating todo:', error);
      throw error;
    }
  }

  async deleteTodo(date, todoId) {
    try {
      await this.initializeFile();
      
      const fileContent = await RNFS.readFile(this.filePath, 'utf8');
      const data = JSON.parse(fileContent);
      
      if (!data[date]) {
        throw new Error(`Date ${date} not found`);
      }
      
      const initialLength = data[date].length;
      data[date] = data[date].filter(todo => todo.id !== todoId);
      
      if (data[date].length === initialLength) {
        throw new Error(`Todo with id ${todoId} not found`);
      }
      
      if (data[date].length === 0) {
        delete data[date];
      }
      
      await RNFS.writeFile(
        this.filePath,
        JSON.stringify(data),
        'utf8'
      );
      
      return true;
    } catch (error) {
      console.error('Error deleting todo:', error);
      throw error;
    }
  }
}

export default new ToDoFileIO();