<template>
  <div class="card">
    <p> {{ card.text }} </p>
    <button
        v-if="card.status !== 'done'"
        @click="changeStatus(card.id)">
      {{ statusForButton }}
    </button>
  </div>
</template>

<script>
  export default {
    inject: ['changeStatus'],
    props: ['card'],
    data() {
      return {
        currentStatus: this.card.status
      }
    },
    computed: {
      statusForButton() {
        console.log(this.card.status === 'todo')
        if (this.card.status === 'todo') {
          return 'in progress'
        } else if (this.card.status === 'in_progress') {
          return 'done';
        }
        return false;
      }
    }
  }
</script>

<style>
.card {
  border: 1px solid black;
  border-radius: 5px;
  padding: 5px;
  margin: 5px;
}
</style>
