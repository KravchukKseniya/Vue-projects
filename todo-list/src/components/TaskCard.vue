<template>
  <div class="card">
    <p> {{ card.text }} </p>
    <button
        v-if="card.status !== 'done'">
      {{ statusForButton }}
    </button>
  </div>
</template>

<script>
  export default {
    name: 'TaskCard',
    props: {
      card: {
        id: Number,
        text: String,
        status: String
      }
    },
    computed: {
      statusForButton() {
        if (this.card.status === 'todo') {
          return 'in progress'
        } else if (this.card.status === 'in_progress') {
          return 'done';
        }
        return '';
      }
    }
  }
</script>

<style scoped>
.card {
  border: 1px solid black;
  border-radius: 5px;
  padding: 5px;
  margin: 5px;
}
</style>
