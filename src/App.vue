<template>
  <div class="app">
    Paging
    <div class="wrapper">
      <div v-for="data in paginatedData" :key="data.id">{{ data.text }}</div>
      <Pagination
        :dataArray="dataArray"
        :size="size"
        :startStep="startStep"
        :endStep="endStep"
        :pages="pages"
        @nextPage="nextPage()"
        @prevPage="prevPage()"
        @handleChangePage="handleChangePage(index)"
      />
    </div>
    <!-- Dropdown
    <div class="wrapper left">
      <Dropdown />
    </div>
    Input
    <div class="wrapper">
      <Input
        type="text"
        name="text"
        placeholder="text"
        :required="true"
        labelText=""
      />
      <Input
        type="email"
        name="email"
        placeholder="email"
        :required="true"
        labelText=""
      />
      <Input
        type="password"
        name="password"
        placeholder="password"
        :required="true"
        labelText=""
      />
    </div>
    Textarea
    <div class="wrapper">
      <Textarea
        type="text"
        name="textareaName"
        placeholder="add your comment here"
        :maxLength="124"
        :required="true"
        labelText=""
      />
    </div>
    Checkbox
    <div class="wrapper">
      <Checkbox id="checkbox-item" />
    </div>
    Select
    <div class="wrapper filter">
      <Select :data="users" id="filter-type" selectName="Тип" :class="'type'" />
      <Select
        :data="users"
        id="filter-users"
        selectName="Пользователи"
        :class="'users'"
      />
      <Select
        :data="users"
        id="filter-rank"
        selectName="Приоритет"
        :class="'rank'"
      />
      <Select
        :data="users"
        id="filter-status"
        selectName="Статус"
        :class="'status'"
      />
    </div>
    Buttons
    <div class="wrapper">
      {{ count }}
      <Button @click="clickBtn">Button</Button>
      <Button :primaryBtn="true" @click="count += 1" />
      <Button :errorBtn="true" />
      <Button :successBtn="true" />
    </div> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentPage: 0,
      size: 10,
      dataArray: [
        { id: 1, text: "1" },
        { id: 2, text: "2" },
        { id: 3, text: "3" },
        { id: 4, text: "4" },
        { id: 5, text: "5" },
        { id: 6, text: "6" },
        { id: 7, text: "7" },
        { id: 8, text: "8" },
        { id: 9, text: "9" },
        { id: 10, text: "10" },
        { id: 11, text: "11" },
        { id: 12, text: "12" },
        { id: 13, text: "13" },
      ],
      users: [
        { id: 1, name: "1" },
        { id: 2, name: "2" },
        { id: 3, name: "3" },
        { id: 4, name: "4" },
      ],
      type: [
        { name: "Задача", value: "task" },
        { name: "Ошибка", value: "bug" },
      ],
    };
  },
  computed: {
    startStep() {
      return this.currentPage * this.size;
    },
    endStep() {
      return this.startStep + this.size;
    },
    pages() {
      return Math.ceil(this.dataArray.length / this.size);
    },
    paginatedData() {
      return this.dataArray.slice(this.startStep, this.endStep);
    },
  },
  methods: {
    nextPage() {
      console.log(this.currentPage);
      this.currentPage++;
    },
    prevPage() {
      this.currentPage--;
    },
    handleChangePage(index) {
      this.currentPage = index - 1;
    },
  },
};
</script>

<style lang="scss" scoped>
/deep/ * {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.app {
  padding: 20px;
}

.wrapper {
  border: 1px solid black;
  padding: 15px;
  margin-bottom: 15px;

  &.left {
    text-align: end;
    padding-right: 40px;
  }
}

.filter {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 20px;
}
</style>
