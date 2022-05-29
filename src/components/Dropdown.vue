<template>
  <div class="board__task-menu dropdown">
    <div class="dropdown-btn">
      <svg
        width="10"
        height="12"
        viewBox="0 0 10 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0 1C0 0.447715 0.447715 0 1 0H9C9.55228 0 10 0.447715 10 1C10 1.55228 9.55228 2 9 2H1C0.447716 2 0 1.55228 0 1Z"
          fill="currentColor"
        />
        <path
          d="M0 6C0 5.44772 0.447715 5 1 5H9C9.55228 5 10 5.44772 10 6C10 6.55228 9.55228 7 9 7H1C0.447716 7 0 6.55228 0 6Z"
          fill="currentColor"
        />
        <path
          d="M0 11C0 10.4477 0.447715 10 1 10H9C9.55228 10 10 10.4477 10 11C10 11.5523 9.55228 12 9 12H1C0.447716 12 0 11.5523 0 11Z"
          fill="currentColor"
        />
      </svg>
    </div>
    <div class="dropdown-content">
      <button class="dropdown-link">
        <a href="#">Редактировать</a>
      </button>
      <button type="button" class="dropdown-link accent">Удалить</button>
      <button class="dropdown-link" value="inProgress">Взять в работу</button>
      <button class="dropdown-link" value="testing">На тестирование</button>
      <button class="dropdown-link" value="complete">Сделано</button>
      <button class="dropdown-link" value="opened">Переоткрыть</button>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.dropdown {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    text-align: end;
    cursor: pointer;

    position: relative;

    &.main__user-profile {
        flex-direction: row;
        align-items: center;
        height: 60px;
    }

    &-btn {
        background-color: transparent;
        width: 20px;
        height: 20px;
        line-height: 0;
        padding: 4px 5px;
        color: $primaryColor;
        @include border-radius(5px);
        border: none;
        position: relative;
    }

    &-content {
        display: none;
        position: absolute;
        top: 20px;
        right: 0;
        z-index: 10;

        background-color: #FFFFFF;
        width: 112px;
        height: auto;
        @include border-radius(5px);
        box-shadow: 0px 0px 2px 2px rgba(123, 97, 255, 0.5);
        overflow: hidden;

        &.main__user-list {
            width: 136px;
            min-height: 40px;
            height: 40px;
            top: 52px;
            right: 0;
        }
    }

    &-link {
        font-family: 'Inter', sans-serif;
        font-weight: 400;
        font-size: 12px;
        line-height: 14px;
        text-decoration: none;
        color: $fontColor;
        background-color: #FFFFFF;
        display: block;
        padding: 3px 0 3px 4px;
        border: none;
        text-align: left;
        cursor: pointer;

        & a {
            text-decoration: none;
            color: inherit;
        }

        &.accent {
            color: $errorColor;
        }

        &:hover {
            background-color: #E6E1FF;
        }

        &:active {
            background-color: $primaryColor;
            color: #F4F4F4;
        }
    }

    &:hover &-content {
        display: flex;
        justify-content: space-around;
        flex-direction: column;
        text-align: start;
    }

    &:hover &-btn {
        color: #F4F4F4;
        background-color: $primaryColor;
        cursor: pointer;
    }
}
</style>