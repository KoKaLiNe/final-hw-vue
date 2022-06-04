<template>
  <div class="filter">
    <CustomSelect
      :data="type"
      id="filter-type"
      selectName="Тип"
      :class="'type'"
      itemValue="value"
      itemName="name"
      @change="filterType"
    />
    <CustomInput
      :class="'select__item task-name'"
      :className="`input-filter`"
      type="text"
      name="filter-theme"
      id="filter-theme"
      placeholder="Название задачи"
      v-model="taskTheme"
    />
    <CustomSelect
      :data="users"
      id="filter-user"
      selectName="Пользователи"
      :class="'users'"
      itemValue="id"
      itemName="username"
      @change="filterUser"
    />
    <CustomSelect
      :data="status"
      id="filter-status"
      selectName="Статус"
      :class="'status'"
      itemValue="value"
      itemName="name"
      @change="filterStatus"
    />
    <CustomSelect
      :data="rank"
      id="filter-rank"
      selectName="Приоритет"
      :class="'rank'"
      itemValue="value"
      itemName="name"
      @change="filterRank"
    />
    <CustomBtn :primaryBtn="true" v-text="'Применить'" />
  </div>
</template>

<script>
export default {
  props: {
    tasks: Array,
    users: Array,
  },
  data() {
    return {
      type: [
        { name: "Задача", value: "task" },
        { name: "Ошибка", value: "bug" },
      ],
      status: [
        {
          name: "Открыто",
          value: "opened",
        },
        {
          name: "В работе",
          value: "inProgress",
        },
        {
          name: "Тестирование",
          value: "testing",
        },
        {
          name: "Сделано",
          value: "complete",
        },
      ],
      rank: [
        {
          name: "Низкий",
          value: "low",
        },
        {
          name: "Средний",
          value: "medium",
        },
        {
          name: "Высокий",
          value: "high",
        },
      ],
      typeFilter: [],
      taskTheme: "",
      userFilter: [],
      statusFilter: [],
      rankFilter: [],
    };
  },
  methods: {
    filterType(value) {
      this.typeFilter = value;
    },
    filterUser(value) {
      this.userFilter = value;
    },
    filterStatus(value) {
      this.statusFilter = value;
    },
    filterRank(value) {
      this.rankFilter = value;
    },
  },
};
</script>

<style lang="scss" scoped>
.filter {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 20px;
}

.select {
  &__item {
    font-family: "Inter", sans-serif;
    font-size: 14px;
    color: $labelFontColor;
    display: flex;
    width: 100%;
    height: 100%;
    margin-right: 14px;

    &.type {
      border: 1px solid transparent;
      max-width: 98px;
    }

    &.task-name {
      max-width: 507px;
    }

    &.users {
      border: 1px solid transparent;
      max-width: 200px;
    }

    &.status {
      border: 1px solid transparent;
      max-width: 140px;
    }

    &.rank {
      border: 1px solid transparent;
      max-width: 120px;
    }
  }
}
</style>