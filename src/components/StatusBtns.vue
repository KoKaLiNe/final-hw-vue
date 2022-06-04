<template>
  <div>
      <CustomBtn v-if="status === 'opened'" @click="changeStatus('inProgress')">Взять в работу</CustomBtn>
      <CustomBtn v-if="status === 'opened'" @click="changeStatus('complete')">Сделано</CustomBtn>

      <CustomBtn v-if="status === 'inProgress'" @click="changeStatus('testing')">На тестирование</CustomBtn>
      <CustomBtn v-if="status === 'inProgress'" @click="changeStatus('complete')">Сделано</CustomBtn>
      <CustomBtn v-if="status === 'inProgress'" @click="changeStatus('opened')">Переоткрыть</CustomBtn>

      <CustomBtn v-if="status === 'testing'" @click="changeStatus('complete')">Сделано</CustomBtn>
      <CustomBtn v-if="status === 'testing'" @click="changeStatus('opened')">Переоткрыть</CustomBtn>

      <CustomBtn v-if="status === 'complete'" @click="changeStatus('opened')">Переоткрыть</CustomBtn>
      
  </div>
  
</template>

<script>
export default {
  props: {
    status: String,
  },
  methods: {
      changeStatus(value) {
          this.status = value;
      }
  }
};
</script>

<style lang="scss" scoped>
</style>