<template>
  <section>
    <Header :error404="true" />

    <section class="main__wrapper">
      <div class="main__error">
        <h3 class="main__error-title">Ошибка 404. Страница не найдена</h3>
        <CustomBtn @click="goMain()">Вернуться на главную</CustomBtn>
      </div>
    </section>
  </section>
</template>

<script>
export default {
    methods: {
        goMain() {
            this.$router.replace({name: "TaskList"})
        }
    }
};
</script>

<style lang="scss" scoped>
.main {
  &__error {
    font-family: "Roboto", sans-serif;
    font-size: 16px;
    text-transform: uppercase;
    margin-top: 40vh;

    &-title {
      margin-bottom: 20px;
    }
  }

  display: flex;
  align-items: center;
  height: 60px;
}
</style>