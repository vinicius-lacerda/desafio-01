import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export type EditaTaskArgs = {
  taskId: number;
  taskNewTitle: string;
}

export function Home() {
  // Estado 
  const [tasks, setTasks] = useState<Task[]>([]);
  //Função para adicionar uma na Task
  function handleAddTask(newTaskTitle: string) {
    //Verifica se o nome da Task digitada no input já existe dentro do estado
    const foundTask = tasks.find(item => item.title === newTaskTitle);
    //Se existir, exige um alerta
    if (foundTask) {
      return Alert.alert(
        "Tray Again."
      )
    }
    //Criação de um objeto dos dados que vamos receber 
    const data = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false
    }
    //Atualização do estado
    setTasks(oldState => [...oldState, data]);
  }
  //Função para alternar a box como marcada ou não marcada
  function handleToggleTaskDone(id: number) {
    //Copia o array do objeto tasks
    const updateTasks = tasks.map(task => ({ ...task }));
    //Verifica se a tasks existia
    const foundItem = updateTasks.find(item => item.id === id);

    if (!foundItem)
      return;

    foundItem.done = !foundItem.done;
    setTasks(updateTasks);
  }
  //Função para remover uma task
  function handleRemoveTask(id: number) {

    Alert.alert(
      "Warning!",
      "Do you want to remove this item?",
      [
        {
          text: "Cancel", onPress: () => console.log("Cancel Pressed")
        },
        {
          text: "OK", onPress: () => {
            const updateTasks = tasks.filter(task => task.id !== id);
            setTasks(updateTasks);
          }
        }
      ]
    )
  } 
  //Função para editar uma task
  function handleEditTask({taskId, taskNewTitle} : EditaTaskArgs){  

    const updateTasks = tasks.map(task => ({...task}))

    const taskToBeUpdate = updateTasks.find(task => task.id === taskId);

    if(!taskToBeUpdate)
    return;

    taskToBeUpdate.title = taskNewTitle;

    setTasks(updateTasks);
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})