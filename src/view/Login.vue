<template>
  <section>
    <Header :loginForm="true" />
    <section class="main__wrapper">
      <form class="main__login-from">
        <div class="main__login-wrap">
          <h2 class="main__login-title">Авторизация</h2>
          <fieldset class="main__login-field">
            <label for="login" class="main__login-label label"> Логин </label>
            <CustomInput
              type="login"
              className="input__login"
              v-model="login"
              placeholder="Введите ваш логин"
              name="login"
              required
            />
            <label for="password" class="main__login-label label">
              Пароль
            </label>
            <CustomInput
              type="password"
              className="input__login"
              v-model="password"
              placeholder="********"
              name="password"
              required
            />
          </fieldset>

          <CustomBtn
            type="button"
            @click="submit()"
            class="btn-submit"
            :successBtn="true"
          >
            Вход
          </CustomBtn>
        </div>
        <p class="main__login-error">{{ error }}</p>
      </form>
    </section>
  </section>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      login: "",
      password: "",
      error: null,
    };
  },
  computed: {
    ...mapGetters("users", ["loggedUser"]),
  },
  methods: {
    ...mapActions("users", ["getLoggedUser"]),

    submit() {
      this.getLoggedUser({ login: this.login, password: this.password })
        .then((data) => {
          if (data.status === 200) {
            localStorage.setItem("loggedUserInfo", JSON.stringify(data.data));
            localStorage.setItem("userPassword", JSON.stringify(this.password));
            this.$router.push({ name: "TaskList" });
          }
        })
        .catch(({ data }) => {
          this.error = data.message;
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.main {
  &__login {
    &-from {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 200px;
      background-color: #ffffff;
      width: 300px;
      height: 288px;
      @include border-radius(2%);
      box-shadow: 0 0 5px #b5b5b5;
    }

    &-wrap {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 30px;
      width: 240px;
    }

    &-title {
      font-family: "Roboto", sans-serif;
      @include font($size: 24px, $weight: 300);
      margin-bottom: 30px;
    }

    &-field {
      display: flex;
      flex-direction: column;
      width: 100%;
    }

    &-error {
      font-family: "Roboto", sans-serif;
      @include font($size: 14px, $weight: 300);
      color: $errorColor;
      margin-top: 8px;
    }
  }
}
</style>