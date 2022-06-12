<template>
  <div class="board__item">
    <router-link class="board__task-link" :to="linkToTask">
      <div class="board__task-type">
        <TasksType :taskType="currentTask.type" />
      </div>
      <div class="board__task-header">
        <h3>{{ currentTask.title }}</h3>
      </div>
      <div class="board__task-user">
        <p>{{ assignedUserName }}</p>
      </div>
      <div class="board__task-status">
        <TaskStatus :status="currentTask.status" />
      </div>
      <div class="board__task-rank">
        <TaskRank :rank="currentTask.rank" />
      </div>
    </router-link>
    <Dropdown :classContent="`task-menu`" :classBtn="`task-menu-btn`">
      <template v-slot:dropdown-btn>
        <svg width="10" height="12">
          <use :xlink:href="`#burger`" />
        </svg>
      </template>
      <template v-slot:dropdown-content>
        <button type="button" class="dropdown-link" @click="editTask()">
          Редактировать
        </button>
        <button
          type="button"
          class="dropdown-link accent"
          @click="deletThisTask()"
        >
          Удалить
        </button>

        <div v-if="isOpened">
          <button
            type="button"
            class="dropdown-link"
            value="inProgress"
            @click="changeStatus(statuses.inProgress.value)"
          >
            {{ statuses.inProgress.btn }}
          </button>
          <button
            type="button"
            class="dropdown-link"
            value="complete"
            @click="changeStatus(statuses.complete.value)"
          >
            {{ statuses.complete.btn }}
          </button>
        </div>

        <div v-if="isInProgress">
          <button
            type="button"
            class="dropdown-link"
            value="testing"
            @click="changeStatus(statuses.testing.value)"
          >
            {{ statuses.testing.btn }}
          </button>
          <button
            type="button"
            class="dropdown-link"
            value="complete"
            @click="changeStatus(statuses.complete.value)"
          >
            {{ statuses.complete.btn }}
          </button>
          <button
            type="button"
            class="dropdown-link"
            value="opened"
            @click="changeStatus(statuses.opened.value)"
          >
            {{ statuses.opened.btn }}
          </button>
        </div>

        <div v-if="isTesting">
          <button
            type="button"
            class="dropdown-link"
            value="complete"
            @click="changeStatus(statuses.complete.value)"
          >
            {{ statuses.complete.btn }}
          </button>
          <button
            type="button"
            class="dropdown-link"
            value="opened"
            @click="changeStatus(statuses.opened.value)"
          >
            {{ statuses.opened.btn }}
          </button>
        </div>

        <div v-if="isComplete">
          <button
            type="button"
            class="dropdown-link"
            value="opened"
            @click="changeStatus(statuses.opened.value)"
          >
            {{ statuses.opened.btn }}
          </button>
        </div>
      </template>
    </Dropdown>
  </div>
</template>

<script>
import { statuses } from "../common/const";
import { mapActions } from "vuex";

export default {
  props: {
    currentTask: Object,
    users: [Array, Object],
    taskId: String,
    status: String,
  },
  data() {
    return {
      statuses,
      linkToTask: {
        name: "Task",
        params: {
          taskId: this.currentTask.id,
        },
      },
    };
  },
  computed: {
    findAssignedId() {
      if (this.users.length > 1)
        return this.users.find((x) => x.id === this.currentTask.assignedId);
    },
    assignedUserName() {
      if (this.findAssignedId) {
        return this.findAssignedId.username;
      } else return "";
    },
    isOpened() {
      return this.status === this.statuses.opened.value;
    },
    isInProgress() {
      return this.status === this.statuses.inProgress.value;
    },
    isTesting() {
      return this.status === this.statuses.testing.value;
    },
    isComplete() {
      return this.status === this.statuses.complete.value;
    },
  },
  methods: {
    ...mapActions("tasks", ["deletTask", "editStatus"]),
    editTask() {
      this.$router.push({
        name: "EditTask",
        params: { taskId: this.taskId },
      });
    },
    deletThisTask() {
      this.deletTask(this.taskId);
    },
    changeStatus(status) {
      this.editStatus({ taskId: this.taskId, status });
    },
  },
};
</script>

<style lang="scss" scoped>
.board {
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
}

.board__task {
  &-link {
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 100%;
    align-items: center;

    text-decoration: none;
    color: inherit;
  }

  &-type {
    width: 100%;
    max-width: 78px;
    margin-right: 14px;
  }

  &-header {
    width: 100%;
    max-width: 485px;
    margin-right: 14px;

    & a {
      text-decoration: none;
      color: inherit;
    }
  }

  &-user {
    width: 100%;
    max-width: 200px;
    margin-right: 14px;
  }

  &-status {
    width: 100%;
    max-width: 140px;
    margin-right: 14px;
  }

  &-rank {
    width: 100%;
    max-width: 100px;
  }

  &-menu {
    width: 100%;
    max-width: 140px;
  }
}
</style>