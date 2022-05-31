<template>
  <div class="app">
    Select
    <div class="wrapper left">
      <Select
        :data="dataArray"
        v-model="selectedValues"
        id="filter-users"
        selectName="Пользователи"
        itemValue="id"
        itemName="username"
      />
    </div>
    Checkbox
    <div class="wrapper left">
      <Checkbox
        label="Item 1"
        value="item_1"
        id="checkbox"
        v-model="selectedCheckbox"
      >
        {{ "Item 1" }}
      </Checkbox>
    </div>
    Dropdown
    <div class="wrapper left">
      <TaskMenu />
    </div>
    <div class="wrapper left">
      <TaskMenu />
    </div>
    Input
    <div class="wrapper left">
      <Input
        v-model="inputText"
        type="text"
        placeholder="Add some text"
        name="name"
        id="id"
        :required="true"
      />
    </div>
    Textarea
    <div class="wrapper left">
      <Textarea
        v-model="textareaText"
        placeholder="Add some text"
        name="name"
        id="id"
        required="true"
      />
    </div>
    pagination
    <div class="wrapper left">
      <Pagination
        :dataSize="dataArray.length"
        :itemsOnPage="itemsOnPage"
        :firstItem="firstItem"
        :totalPages="totalPages"
      />
    </div>
    Buttons
    <div class="wrapper left">
      {{ count }}
      <CustomBtn @click="click">Button</CustomBtn>
    </div>
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
  data() {
    return {
      textareaText: "",
      inputText: "",
      isActive: false,
      count: 0,
      currentPage: 0,
      itemsOnPage: 10,
      selectedCheckbox: [],
      selectedValues: [],
      dataArray: [
        {
          id: "6273dca5d09b551dca87629c",
          login: "SPB_Alexey_Kutilov",
          password: "123",
          username: "Алексей Кутилов",
          about: "",
          photoUrl: "",
        },
        {
          id: "6273dcb7d09b551dca87629d",
          login: "Alexius04",
          password: "123",
          username: "AlexDev04",
          about: "WTF is your Python? \nIt's JavaScript, Bro!",
          photoUrl:
            "https://as-ecars.ru/wp-content/uploads/2019/06/electric-scooter-super-soco-02_1157353144.jpg",
        },
        {
          id: "6273dcd2d09b551dca87629e",
          login: "maxigroove",
          password: "1Q2w3e4r5t",
          username: "Артем Сорокин",
          about: "Во славу Императору!",
          photoUrl:
            "https://avatars.mds.yandex.net/get-zen_doc/3994559/pub_6064c0224878ca659c8c08b6_6064cbccd5b01e21343bb760/scale_1200",
        },
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
    firstItem() {
      return this.currentPage * this.itemsOnPage;
    },
    lastItem() {
      return this.firstItem + this.itemsOnPage;
    },
    totalPages() {
      return Math.ceil(this.dataArray.length / this.itemsOnPage);
    },
    paginatedData() {
      return this.dataArray.slice(this.firstItem, this.lastItem);
    },
  },
  watch: {
    inputText(val) {
      this.$emit("input", val);
    },
    // textareaText(val) {
    //   this.$emit("textarea", val);
    // },
  },
  mounted() {
    this.inputText = this.value;
    // this.textareaText = this.textareaValue;
  },
  methods: {
    handleNewData(data) {
      (this.selectedValues = data), console.log(this.selectedValues);
    },
    input(e) {
      return (this.text = e.target.value);
    },
    click() {
      return (this.count += 1);
    },
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
  font-family: "Roboto", sans-serif;
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
