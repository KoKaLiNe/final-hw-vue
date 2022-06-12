<template>
  <div class="filter">
    <CustomSelect
      :data="types"
      id="filter-type"
      selectName="Тип"
      :class="'type'"
      :selectedFilter="selectedType"
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
      :selectedFilter="selectedUser"
      itemValue="id"
      itemName="username"
      @change="filterUser"
    />
    <CustomSelect
      :data="statuses"
      id="filter-status"
      selectName="Статус"
      :class="'status'"
      :selectedFilter="selectedStatus"
      itemValue="value"
      itemName="name"
      @change="filterStatus"
    />
    <CustomSelect
      :data="ranks"
      id="filter-rank"
      selectName="Приоритет"
      :class="'rank'"
      :selectedFilter="selectedRank"
      itemValue="value"
      itemName="name"
      @change="filterRank"
    />
    <CustomBtn @click="setFilter()" :primaryBtn="true" v-text="'Применить'" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { types, ranks, statuses } from "../common/const";

export default {
  props: {
    tasks: Array,
    users: Array,
  },
  data() {
    return {
      types,
      ranks,
      statuses,
      typeFilter: [],
      taskTheme: "",
      userFilter: [],
      statusFilter: [],
      rankFilter: [],
    };
  },

  methods: {
    ...mapActions("tasks", ["filterTasks"]),
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
    setFilter() {
      this.filterTasks({
        filter: {
          query: this.taskTheme || this.tasksFilter.query,
          assignedUsers: this.userFilter || this.selectedUser,
          type: this.typeFilter || this.selectedType,
          status: this.statusFilter || this.selectedStatus,
          rank: this.rankFilter || this.selectedRank,
        },
      });
    },
  },
  computed: {
    ...mapGetters("tasks", ["tasksFilter"]),
    selectedType() {
      return this.tasksFilter.type;
    },
    selectedUser() {
      return this.tasksFilter.assignedUsers;
    },
    selectedStatus() {
      return this.tasksFilter.status;
    },
    selectedRank() {
      return this.tasksFilter.rank;
    },
  },
  mounted() {
    this.taskTheme = this.tasksFilter.query;
    this.typeFilter = this.tasksFilter.type;
    this.userFilter = this.tasksFilter.user;
    this.statusFilter = this.tasksFilter.status;
    this.rankFilter = this.tasksFilter.rank;
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