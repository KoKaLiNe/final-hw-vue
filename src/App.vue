<template>
  <router-view>
    <div class="app">
      <!-- Select
      <div class="wrapper left">
        <CustomSelect
          :data="dataArray"
          id="filter-users"
          selectName="Пользователи"
          itemValue="id"
          itemName="username"
          @change="updateSelect"
        />
      </div>
      Checkbox
      <div class="wrapper left">
        <CustomCheckbox
          label="Item 1"
          value="item_1"
          id="checkbox"
          v-model="selectedCheckbox"
        >
          {{ "Item 1" }}
        </CustomCheckbox>
      </div>
      Input
      <div class="wrapper left">
        <CustomInput
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
        <CustomTextarea
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
      </div> -->
    </div>
  </router-view>
</template>

<script>
export default {
  // inheritAttrs: false,
  data() {
    return {
      // link1: {
      //   name: "Main",
      //   params: {
      //     page: "Main",
      //   },
      // },
      // link2: {
      //   name: "Main",
      //   params: {
      //     page: "Users",
      //   },
      // },
      // textareaText: "",
      // inputText: "",
      // selectedCheckbox: [],
      // isActive: false,
      // count: 0,
      // currentPage: 0,
      // itemsOnPage: 10,
      // filter: null,
      // dataArray: [
      //   {
      //     id: "6273dca5d09b551dca87629c",
      //     login: "SPB_Alexey_Kutilov",
      //     password: "123",
      //     username: "Алексей Кутилов",
      //     about: "",
      //     photoUrl: "",
      //   },
      //   {
      //     id: "6273dcb7d09b551dca87629d",
      //     login: "Alexius04",
      //     password: "123",
      //     username: "AlexDev04",
      //     about: "WTF is your Python? \nIt's JavaScript, Bro!",
      //     photoUrl:
      //       "https://as-ecars.ru/wp-content/uploads/2019/06/electric-scooter-super-soco-02_1157353144.jpg",
      //   },
      //   {
      //     id: "6273dcd2d09b551dca87629e",
      //     login: "maxigroove",
      //     password: "1Q2w3e4r5t",
      //     username: "Артем Сорокин",
      //     about: "Во славу Императору!",
      //     photoUrl:
      //       "https://avatars.mds.yandex.net/get-zen_doc/3994559/pub_6064c0224878ca659c8c08b6_6064cbccd5b01e21343bb760/scale_1200",
      //   },
      // ],
      // users: [
      //   { id: 1, name: "1" },
      //   { id: 2, name: "2" },
      //   { id: 3, name: "3" },
      //   { id: 4, name: "4" },
      // ],
      // type: [
      //   { name: "Задача", value: "task" },
      //   { name: "Ошибка", value: "bug" },
      // ],
    };
  },
  computed: {
    // firstItem() {
    //   return this.currentPage * this.itemsOnPage;
    // },
    // lastItem() {
    //   return this.firstItem + this.itemsOnPage;
    // },
    // totalPages() {
    //   return Math.ceil(this.dataArray.length / this.itemsOnPage);
    // },
    // paginatedData() {
    //   return this.dataArray.slice(this.firstItem, this.lastItem);
    // },
  },
  watch: {},
  mounted() {},
  methods: {
    // goToView() {
    //   this.$router.push({
    //     name: "Users",
    //     params: {
    //       page: "Users",
    //     },
    //   });
    // },
    // updateSelect(data) {
    //   console.log(data);
    //   return (this.filter = data);
    // },
    // click() {
    //   return (this.count += 1);
    // },
    // nextPage() {
    //   console.log(this.currentPage);
    //   this.currentPage++;
    // },
    // prevPage() {
    //   this.currentPage--;
    // },
  },
};
</script>

<style lang="scss" scoped>
</style>

<style lang="scss">
// Reset CSS

html, body,div,span,applet,object,iframe,h1,h2,h3,h4,h5,h6,p,blockquote,pre,a,abbr,acronym,address,big,
cite,code,del,dfn,em,img,ins,kbd,q,s,samp,small,strike,strong,sub,sup,tt,var,b,u,i,center,dl,dt,dd,ol,
ul,li,fieldset,form,label,legend,table,caption,tbody,tfoot,thead,tr,th,td,article,aside,canvas,details,
embed,figure,figcaption,footer,header,hgroup,menu,nav,output,ruby,section,summary,time,mark,audio,video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
  box-sizing: border-box;
}
/* HTML5 display-role reset for older browsers */
article,aside,details,figcaption,figure,footer,header,hgroup,menu,nav,section {
  display: block;
}
body {
  line-height: 1;
}
ol,
ul {
  list-style: none;
}
blockquote,
q {
  quotes: none;
}
blockquote:before,
blockquote:after,
q:before,
q:after {
  content: "";
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
input,
textarea {
  box-sizing: border-box;
}

// App styles
.app {
  font-family: "Roboto", sans-serif;
}

.main {
  &__wrapper {
    display: flex;
    justify-content: center;
    background-color: #e5e5e5;
    height: calc(100vh - 60px);
  }
}

.board {
  width: 100%;
  max-width: 1280px;
  margin-top: 30px;

  &__item {
    font-family: "Roboto", sans-serif;
    @include flexible;
    flex-direction: row;
    align-items: center;
    width: 100%;
    height: 10%;
    padding: 0 30px;

    &:nth-child(2n) {
      background-color: #f2f2f2;
    }
  }

  &__header {
    font-family: "Roboto", sans-serif;
    @include flexible;
    align-items: center;
    margin-bottom: 20px;

    &-title {
      @include font($size: 24px, $weight: 300);

      &.task-title {
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-right: 10px;
      }
    }

    &-text {
      margin-right: 10px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 410px;
      cursor: default;
    }

    &-btns {
      display: flex;
      text-align: end;
    }
  }

  &__content {
    display: flex;
    flex-direction: column;
    height: 755px;
    background-color: $boardBGColor;
    padding: 20px;
    @include border-radius(5px);
    box-shadow: 0 0 5px #b5b5b5;
  }

  &__list {
    display: flex;
    flex-direction: column;
    height: 100%;
    margin-bottom: 18px;
    position: relative;

    @include border-radius(10px);

    &:after {
      content: "";
      width: calc(100% + 20px);
      height: calc(100% + 20px);
      position: absolute;
      top: -10px;
      left: -10px;
      box-sizing: border-box;
      @include border-radius(17px);
      border: 10px solid $boardBGColor;
      box-shadow: inset 0 0 5px #b5b5b5;
      pointer-events: none;
    }
  }
}

.field {
  @include flexible;
  flex-direction: column;
}

.select {
  @include input-default;
  margin-bottom: 20px;
  padding-right: 10px;
  appearance: none;
  overflow: hidden;
  background: url("./assets/icons/select-arrow.svg") no-repeat center;
  background-position: 98%;
}

.label {
  font-family: "Roboto", sans-serif;
  @include font($size: 16px, $weight: false);
  color: #cccccc;
  margin-bottom: 5px;
  width: 100%;
}
</style>