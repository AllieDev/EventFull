<template>
  <div class="view">
    <div
      @click.self="toggleModal"
      v-if="isEditMode"
      class="edit-model-background"
    >
      <div class="edit-model">
        <div class="edit-model__icon-section">
          <global-close-icon-vue
            class="edit-model__close-btn"
            @click="toggleModal"
          />
          <div class="edit-model__icon-container">
            <global-user-icon-vue :uData="uData" />
          </div>
        </div>
        <div
          @keypress.enter="emitUserInfoUpdateRequest"
          class="edit-model__inputs-section"
        >
          <div class="edit-model__inputs-container">
            <label class="edit-model__label" for="firstName">FIRST-NAME</label>
            <input
              maxlength="12"
              v-model="firstName"
              class="edit-model__name-input edit-model__inputs"
              type="text"
              name="firstName"
            />
          </div>
          <div class="edit-model__inputs-container">
            <label class="edit-model__label" for="lastName">LAST-NAME</label>
            <input
              maxlength="12"
              v-model="lastName"
              class="edit-model__name-input edit-model__inputs"
              type="text"
              name="lastName"
            />
          </div>
          <div class="edit-model__inputs-container">
            <label class="edit-model__label" for="about">ABOUT</label>
            <textarea
              v-model="about"
              class="edit-model__about-input"
              name="about"
              id="text"
              minlength="10"
              maxlength="200"
            ></textarea>
          </div>
          <button
            @click="emitUserInfoUpdateRequest"
            class="edit-model__update-btn"
          >
            UPDATE
          </button>
        </div>
      </div>
    </div>

    <div class="profile">
      <div class="profile__user-info">
        <div class="profile__username-and-icon-container">
          <div class="profile__user-icon">
            <global-user-icon-vue :uData="uData" />
          </div>
          <div class="profile__username-and-membersince-container">
            <p class="profile__username">
              {{ uData.firstName + " " + uData.lastName }}
            </p>
            <p class="profile__membersince">
              Member Since {{ uData.memberSince }}
            </p>
          </div>
        </div>
        <h4 class="abt">ABOUT</h4>
        <p class="profile__about">
          {{ uData.about }}
        </p>

        <global-edit-icon-vue class="profile_edit-btn" @click="toggleModal" />
      </div>
      <div class="profile__user-created-events">
        <div class="profile__subtitle">MY EVENTS</div>
        <div class="profile__events-container">
          <global-event-list-vue
            v-for="event in findListOfUsersCreatedEvents"
            :eData="event"
            :key="event._id"
            @sendEventData="sendEventData"
          />
        </div>
      </div>
      <div class="profile__user-to-attend-events">
        <div class="profile__subtitle">ATTENDING EVENTS</div>
        <div class="profile__events-container">
          <global-event-list-vue
            v-for="event in findListOfUsersToAttendEvents"
            :eData="event"
            :key="event._id"
            @sendEventData="sendEventData"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import GlobalCloseIconVue from "../components/icons/GlobalCloseIcon.vue";
import GlobalEditIconVue from "../components/icons/GlobalEditIcon.vue";
import GlobalUserIconVue from "../components/GlobalUserIcon.vue";
import GlobalEventListVue from "../components/GlobalEventList.vue";
export default {
  components: {
    GlobalCloseIconVue,
    GlobalEditIconVue,
    GlobalUserIconVue,
    GlobalEventListVue,
  },
  data() {
    return {
      isEditMode: false,
      firstName: "",
      lastName: "",
      about: "",
    };
  },
  props: ["uData", "eData"],
  methods: {
    emitUserInfoUpdateRequest() {
      if (this.firstName != "" && this.lastName != "") {
        this.$emit("updateUserInfo", {
          firstName: this.firstName,
          lastName: this.lastName,
          about: this.about,
        });
        alert("Your information was updated successfully");
        this.toggleModal();
      } else {
        alert(
          "Please make sure first-name and last-name input fields are not empty"
        );
      }
    },
    setDataForUpdateModel() {
      this.firstName = this.uData.firstName;
      this.lastName = this.uData.lastName;
      this.about = this.uData.about;
    },
    toggleModal() {
      this.isEditMode = !this.isEditMode;
      this.setDataForUpdateModel();
    },
    sendEventData(data) {
      this.$emit("specificEventDetail", data);
    },
  },
  computed: {
    findListOfUsersCreatedEvents() {
      let arrayOfCreatedEvents = [];
      for (let event of this.eData) {
        if (event.hostId == this.uData._id) {
          arrayOfCreatedEvents.push(event);
        }
      }
      return arrayOfCreatedEvents;
    },
    findListOfUsersToAttendEvents() {
      let arrayOfToAttendEvents = [];
      for (let event of this.eData) {
        for (let attendeeId of event.attendeesId) {
          if (attendeeId == this.uData._id) {
            arrayOfToAttendEvents.push(event);
          }
        }
      }
      return arrayOfToAttendEvents;
    },
  },
  watch: {},
  created() {
    this.setDataForUpdateModel();
    this.$emit("visibleNav");
    this.$emit("unvisibleSearchInput");
  },
};
</script>

<style scoped>
.view {
  margin: 2%;
  height: calc(100vh - 100px);
  overflow: hidden scroll;
}
@media screen and (max-width: 800px) {
  .view {
    height: calc(100vh - 70px);
  }
}
.profile {
  padding: 20px;
  width: 100%;
  margin-top: 4rem;
  overflow: scroll;
  /* background-color: white; */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 50px;
}

@media screen and (max-width: 800px) {
  .profile {
    margin-top: 1rem;
  }
}
.profile__subtitle {
  font-family: "Anton", sans-serif;
  letter-spacing: 1px;
  font-size: 20px;
  max-width: 1000px;
  width: 100%;
  margin: auto;
  margin-top: 0rem;
}

@media screen and (max-width: 800px) {
  .profile__subtitle {
    margin-top: -3rem;
    font-size: 17px;
  }
}
.profile__events-container {
  min-height: 400px;
  max-width: 1200px;
  margin: auto;
  overflow: scroll hidden;

  display: flex;
  flex-direction: row;
  justify-content: start;
  gap: 20px;
}
.profile__events-container::-webkit-scrollbar {
  display: none;
}
.profile__user-info {
  /* border: 1px solid black; */
  min-height: 300px;
  width: 100%;
  max-width: 1000px;
  margin: auto;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 20px;
}
.profile__username-and-icon-container {
  /* border: 1px solid black; */
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 20px;
}
.profile__user-icon {
  height: 100px;
  width: 100px;
}

.profile__username {
  font-family: "Anton", sans-serif;
  letter-spacing: 1px;
  font-size: x-large;
  width: fit-content;
  margin-right: 10px;
}
.profile__membersince {
  font-family: "Abel", sans-serif;
  font-size: 16px;
  color: rgb(164, 164, 164);
}

.abt {
  margin-top: 30px;
  font-family: anton, sans-serif;
  font-size: 18px;
  letter-spacing: 1px;
}

@media screen and (max-width: 800px) {
  .abt {
    font-size: 16px;
  }
}
.profile__about {
  font-family: "Abel", sans-serif;
  font-size: 18px;
  width: 100%;
  outline: none;
  /* padding: 0 20px; */
}

.profile_edit-btn {
  /* align-self: flex-end; */
  position: relative;
  bottom: 5.5rem;
  left: 57rem;
}

@media screen and (max-width: 800px) {
  .profile_edit-btn {
    left: 27rem;
  }
}
.profile__user-created-events {
  width: 100%;
}
.profile__user-to-attend-events {
  width: 100%;
}

@media screen and (max-width: 568px) {
  .profile__user-icon {
    height: 60px;
    width: 60px;
  }
  .profile__username {
    font-size: large;
  }
  .profile__membersince {
    font-size: small;
  }
  .profile__about {
    font-size: 16px;
  }
}
/* ------------------------------------------------ */
.edit-model-background {
  position: fixed;
  top: 0;
  right: 0;

  height: 100vh;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.713);

  display: flex;
  justify-content: center;
  align-items: center;
}
.edit-model {
  padding: 10px 20px;
  max-height: 600px;
  height: 100%;
  max-width: 500px;
  width: 100%;

  background-color: white;
}

.edit-model__icon-section {
  position: relative;
  margin-bottom: 50px;
  height: 80px;

  display: flex;
  justify-content: center;
  align-items: center;
}
.edit-model__close-btn {
  position: absolute;
  cursor: pointer;
  right: 0;
  top: 0;

  max-width: 30px;
}
.edit-model__icon-container {
  height: 100%;
  width: 80px;
}
.edit-model__inputs-container {
  height: 100px;
  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 5px;
}
.edit-model__inputs {
  font-family: "Abel", sans-serif;
  font-size: large;
  padding-left: 10px;
  height: 50px;
  width: 100%;

  border: 2px solid black;
}
.edit-model__about-input {
  font-size: large;
  padding: 10px;
  height: 200px;
  min-width: 100%;

  border: 2px solid black;
  resize: none;
}
.edit-model__update-btn {
  font-family: "Anton", sans-serif;
  font-size: large;
  margin-top: 30px;
  width: 100%;
  height: 50px;
  cursor: pointer;
  color: white;
  background-color: red;
  border: none;
}
.edit-icon__svg {
  cursor: pointer;
}
</style>
