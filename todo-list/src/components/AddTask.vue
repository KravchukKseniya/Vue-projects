<template>
  <div class="addTask">
    <h3>Add new task</h3>
    <input @keydown.enter="addTask" type="text" v-model="newTask">
    <button @click="addTask">Add</button>
    <p class="warn" :class="{'hidden': !showWarn}">Please, add task description!</p>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        newTask: '',
        showWarn: false
      }
    },
    methods: {
      addTask() {
        if (this.newTask === '') {
          this.showWarn = true;
          setTimeout(() => {
            this.showWarn = false;
          }, 10000)
        } else {
          this.$emit('add-task', this.newTask);
          this.showWarn = false;
          this.newTask = '';
        }
      }
    }
  }
</script>

<style scoped>
  .addTask {
    background-color: #e0e0e0;
    padding: 10px;
  }
  .warn {
    color: red;
  }
  .hidden {
    visibility: hidden;
  }
</style>
