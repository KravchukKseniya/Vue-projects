<template>
  <div>
    <div class="header">
      <h1>TODO List</h1>
    </div>

    <add-task
      @add-task="addNewTask">
    </add-task>

    <div class="tasks-area">
      <task-list v-for="status in statuses"
       :cards="tasks.filter(task => task.status === status)"
       :key="status"
       :title="status"
       @change-status="changeStatus"
      ></task-list>
    </div>
  </div>
</template>

<script>
import TaskList from './components/TaskList.vue';
import AddTask from './components/AddTask';

export default {
  name: 'App',
  components: {
    TaskList,
    AddTask
  },
  data() {
    return {
      statuses: ['todo', 'in_progress', 'done'],
      tasks: [
        {
          id: 1,
          text: 'English lesson at 19-00',
          status: 'todo'
        },
        {
          id: 2,
          text: 'Cleaning kitchen',
          status: 'todo'
        },
        {
          id: 3,
          text: 'Learning Vue!',
          status: 'todo'
        }
      ]
    }
  },
  methods: {
    addNewTask(newTask) {
      const task = {
        id: this.tasks.length + 1,
        text: newTask,
        status: 'todo'
      }
      this.tasks.push(task);
    },
    changeStatus(taskId) {
      const task = this.tasks.find(task => task.id === taskId)
      task.status = this.statuses[this.statuses.indexOf(task.status) + 1];
    }
  }
}
</script>

<style>

* {
  box-sizing: border-box;
}

html, body {
  font-family: Tahoma, sans-serif;
  margin: 0;
  padding: 0;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#app .header {
  height: 10vh;
  background-color: #cdcdcd;
  display: flex;
  justify-content: center;
  align-items: center;
}

.tasks-area {
  padding: 10px;
  display: flex;
  justify-content: space-around;
  align-items: start;
}
</style>
