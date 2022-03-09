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
    /** review:
      Кране желательно чтобы компопнеты содержали свойство name.
     */
    /** review:
      Provide/inject используюся в довольно редких случаях,
      когда вложенность компонентов так велика, что прокинуть нужные данные или слушатели 
      через props&emits слишком сложно. Конкретно в данном случае корректнее (более vue-way)
      вынести if выше и лишить карточку функциональности скрывать/показывать себя, передавая эту функции компоненту родителю.
     */
    inject: ['changeStatus'],
    /** review:
      У props есть два синтаксиса - массив и объект. Объект всегда предпочтительнее,
      тк позволяет типизировать/валидировать/ставить дефолтное значение
     */
    props: ['card'],
    data() {
      return {
        currentStatus: this.card.status
      }
    },
    computed: {
      statusForButton() {
        /** review:
          Понимаю что это просто проба пера, но concole.log в прод попасть не должен)
          Так же в данной функции у тебя три return, два из которых возвращают string
          и один false. Typescript расслабляет)
         */
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
/** review:
  Нужен scoped аттрибут
 */
.card {
  border: 1px solid black;
  border-radius: 5px;
  padding: 5px;
  margin: 5px;
}
</style>
