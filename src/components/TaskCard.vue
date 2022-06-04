<template>
  <div class="card__wrap">
    <div class="card__col col-1">
      <p class="card__title">Исполнитель</p>
      <p class="card__text">{{ userAssignedName }}</p>

      <p class="card__title">Автор задачи</p>
      <p class="card__text">{{ userAuthorName }}</p>

      <p class="card__title">Тип запроса</p>
      <p class="card__text">{{ taskType }}</p>

      <p class="card__title">Приоритет</p>
      <p class="card__text">{{ taskRank }}</p>

      <p class="card__title">Дата создания</p>
      <p class="card__text">{{ dateOfCreation }}</p>

      <p class="card__title">Дата изменения</p>
      <p class="card__text">{{ dateOfUpdate }}</p>

      <p class="card__title">Затрачено времени</p>
      <p class="card__text">
        {{ taskTime }}
      </p>

      <CustomBtn :class="'btn-primary  btn'"
        >Сделать запись о работе
      </CustomBtn>
    </div>

    <div class="card__col col-2">
      <p class="card__title">Описание</p>
      <p class="card__decription">{{ task.description }}</p>
    </div>

    <div class="card__col col-3">
      <form class="card__form" method="post" onSubmit="{handleSubmit}">
        <label for="comment" class="card__title label"
          >Комментарии ({{ "comments.length" }})
        </label>
        <CustomTextarea
          onChange="{handleFieldChange}"
          class="input__comment input"
          id="text"
          type="text"
          name="text"
          placeholder="Текст комментария"
          required
        >
          commentForm.text</CustomTextarea
        >
        <CustomBtn :successBtn="true" type="submit">
          Добавить комментарий
        </CustomBtn>
      </form>

      <div class="card__comments">
        <!-- {comments.map((comment) => { return (
        <div class="card__comment comment" key="{comment.id}">
          <div class="comment__title">
            <p class="comment__user-name">
              { (((users.data.find(x => x.id === comment.userId) !== undefined)
              && users.data.find(x => x.id === comment.userId).username)) ||
              ("не указан") } ({moment(comment.dateOfUpdate).format('DD.MM.YYYY
              HH:MM')})
            </p>

            {loggedUser.id === comment.userId &&
            <button
              onClick="{handelDeletComment}"
              type="button"
              class="btn__comment btn-link btn currentUser"
              value="{comment.id}"
            >
              Удалить</button
            >}
          </div>
          <p class="comment__text">{comment.text}</p>
        </div>
        ) }) } -->
      </div>
    </div>
  </div>
  <!-- <Modal
                isVisible={isModal}
                onClose={() => setModal(false)}
                tasks={tasks}
                setComments={setComments}
            /> -->
</template>

<script>
import moment from "moment";

export default {
  props: {
    task: Object,
    users: Array,
  },
  computed: {
    userAssignedName() {
      return this.users.find((user) => user.id === this.task.assignedId)
        .username;
    },
    userAuthorName() {
      return this.users.find((user) => user.id === this.task.userId).username;
    },
    taskType() {
      if (this.task.type === "task") {
        return "Задача";
      } else if (this.task.type === "bug") {
        return "Ошибка";
      }
    },
    taskRank() {
      if (this.task.rank === "low") {
        return "Низкий";
      } else if (this.task.type === "madium") {
        return "Средний";
      } else if (this.task.type === "high") {
        return "Высокий";
      }
    },
    dateOfCreation() {
      return moment(this.task.dateOfCreation).format("DD.MM.YYYY HH:MM");
    },
    dateOfUpdate() {
      return moment(this.task.dateOfUpdate).format("DD.MM.YYYY HH:MM");
    },
    taskTime() {
      let min = this.task.timeInMinutes;
      let hour = min / 60;
      let decCache = [],
        decCases = [2, 0, 1, 1, 1, 2];

      function decOfNum(number, titles) {
        if (!decCache[number])
          decCache[number] =
            number % 100 > 4 && number % 100 < 20
              ? 2
              : decCases[Math.min(number % 10, 5)];
        return titles[decCache[number]];
      }

      let fullTime =
        Math.floor(hour / 24) +
        " " +
        decOfNum(Math.floor(hour / 24), ["день", "дня", "дней"]) +
        " " +
        Math.floor(hour % 24) +
        " " +
        decOfNum(Math.floor(hour % 24), ["час", "часа", "часов"]) +
        " " +
        Math.floor(min % 60) +
        " " +
        decOfNum(Math.floor(min % 60), ["минута", "минуты", "минут"]);
      return fullTime;
    },
  },
};
</script>

<style lang="scss" scoped>
.card {
  @include card;

  &__col.create {
    border-right: none;
  }

  &__user-img {
    width: 182px;
    height: 182px;
    @include border-radius(50%);
    cursor: pointer;

    &-wrapper {
      width: 186px;
      height: 186px;
      background: conic-gradient(
        #ff6161,
        #7b61ff,
        #ff6161,
        #7b61ff,
        #ff6161,
        #7b61ff,
        #ff6161
      );
      padding: 2.3px;
      @include border-radius(50%);
      margin-bottom: 20px;
    }
  }

  &__title {
    color: $labelFontColor;
    margin-bottom: 8px;
  }

  &__text {
    margin-bottom: 20px;

    &:last-of-type {
      margin-bottom: 5px;
    }
  }

  &__decription {
    margin-bottom: 20px;
    line-height: 19px;
    text-indent: 20px;
    white-space: pre-line;
  }

  &__form {
    margin-bottom: 20px;
  }

  &__comments {
    max-height: 555px;
    overflow-y: auto;
  }
}
</style>