<template>
  <div class="list">
    <h3>{{ title.toUpperCase() }} ({{ cards.length }})</h3>
    <task-card
      v-for="card in cards"
      :key="card.id"
      :card="card">
    </task-card>
  </div>
</template>

<script>
import TaskCard from './TaskCard'

export default {
    /** review:
      Кране желательно чтобы компопнеты содержали свойство name.
      Example:
     */
    // name: 'TaskList',
    /** review:
      У props есть два синтаксиса - массив и объект. Объект всегда предпочтительнее,
      тк позволяет типизировать/валидировать/ставить дефолтное значение
     */
    props: ['cards', 'title'],
    components: {
      TaskCard
    }
  }
</script>


<style scoped>
  .list {
    width: 25%;
    min-height: 70vh;
    border: 1px solid black;
    border-radius: 5px;
    padding: 13px;
  }
</style>
