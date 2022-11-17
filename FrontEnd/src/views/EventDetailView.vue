<template>
  <div>
    <!-- MODAL STARTS -->
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
        </div>
        <div
          @keypress.enter="updatedEventRequest"
          class="edit-model__inputs-section"
        >
          <div class="edit-model__date-time-container">
            <div class="edit-model__inputs-container">
              <label class="edit-model__label" for="date">Date</label>
              <input
                v-model="eventDate"
                class="edit-model__name-input edit-model__inputs"
                type="date"
                name="date"
              />
            </div>
            <div class="edit-model__inputs-container">
              <label class="edit-model__label" for="time">Time</label>
              <input
                v-model="eventTime"
                class="edit-model__name-input edit-model__inputs"
                type="time"
                name="time"
              />
            </div>
          </div>
          <div class="edit-model__inputs-container">
            <label class="edit-model__label" for="firstName">Title</label>
            <input
              v-model="eventTitle"
              class="edit-model__name-input edit-model__inputs"
              type="text"
              name="firstName"
            />
          </div>
          <div class="edit-model__inputs-container">
            <label class="edit-model__label" for="lastName">Location</label>
            <input
              v-model="eventLocation"
              class="edit-model__name-input edit-model__inputs"
              type="text"
              name="lastName"
            />
          </div>
          <div class="edit-model__inputs-container">
            <label class="edit-model__label" for="about">Detail</label>
            <textarea
              v-model="eventDescription"
              class="edit-model__about-input"
              name="about"
              id="text"
              minlength="10"
              maxlength="200"
            ></textarea>
          </div>
          <button @click="updatedEventRequest" class="edit-model__update-btn">
            UPDATE
          </button>
          <button @click="deleteEventRequest" class="edit-model__update-btn">
            DELETE EVENT
          </button>
        </div>
      </div>
    </div>
    <!-- MODAL ENDS -->

    <div v-if="seData !== null" class="view">
      <div class="detail__heading">
        <div @click="goBack()" class="router-link">
          <global-arrow-icon-vue class="back__button" />
        </div>

        <div class="detail__boxx">
          <h3 class="time__date">
            {{ seData.eventData.date + " -- " + seData.eventData.time }}
          </h3>
          <h1 class="event__title">{{ seData.eventData.title }}</h1>
          <h4 class="event__location">{{ seData.eventData.location }}</h4>
        </div>
      </div>

      <!-- AVATAR AND BUTTONS -->

      <!-- MAIN CONTAINER -->

      <main class="main__eventDetails">
        <div class="main__detail">
          <div class="user__avatar">
            <div class="avatar__container">
              <div class="avatar__cricle-heading-container">
                <div class="avatar__circle">
                  <global-user-icon-vue :uData="seData.specificData.hostInfo" />
                </div>
                <div class="avatar__headings">
                  <h5 class="hosted__by">HOSTED BY</h5>
                  <h3 class="host__name">
                    {{
                      seData.specificData.hostInfo.firstName +
                      " " +
                      seData.specificData.hostInfo.lastName
                    }}
                  </h3>
                </div>
              </div>

              <div class="attend--edit__container">
                <button
                  v-if="!isCurrentUserAttending"
                  class="attend__event"
                  type="button"
                  @click="sendAttendEventRequest"
                >
                  ATTEND
                </button>
                <router-link v-else to="/log-in"
                  ><button class="attend__event">Attend</button>
                </router-link>

                <button
                  v-else
                  class="attend__event unattend white-button"
                  type="button"
                  @click="sendAttendEventRequest"
                >
                  UNATTEND
                </button>
                <button
                  @click="toggleModal"
                  v-if="
                    (seData.eventData.hostId == uData._id) &
                    (isUserLogedIn == true)
                  "
                  class="edit__event"
                  type="button"
                >
                  EDIT
                </button>
              </div>
            </div>
          </div>

          <div class="detail__image">
            <img
              v-if="seData.eventData.imageFile"
              class="details__image"
              :src="`data:image/jpeg;base64,${seData.eventData.imageFile.data}`"
              alt=""
            />
            <img
              v-else
              src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?crop=entropy&cs=tinysrgb&fm=jpg&ixid=Mnw3MjAxN3wwfDF8c2VhcmNofDN8fGV2ZW50fGVufDB8MHx8fDE2NjI0Mjg0MTA&ixlib=rb-1.2.1&q=80&q=85&fmt=jpg&crop=entropy&cs=tinysrgb&w=450"
              class="details__image"
            />
            <div class="event__detail">
              <h3 class="box__heading">DETAILS</h3>
              <p class="detail__text">
                {{ seData.eventData.detail }}
              </p>
              <button class="map__marker" type="button">
                <i class="fa fa-map-marker" aria-hidden="true"></i>
              </button>
            </div>
          </div>

          <!-- COMMENT SECTION -->

          <div class="write__comment">
            <div class="avatar__circle">
              <global-user-icon-vue :uData="uData" />
            </div>
            <div class="write__box">
              <input
                v-model="commentInput"
                class="post__box"
                placeholder="WRITE YOUR COMMENT HERE"
                type="text"
              />
              <button
                @click="sendCommentPostRequest"
                class="post"
                type="button"
              >
                POST
              </button>
            </div>
          </div>

          <div
            v-for="comment in seData.specificData.commentsInfo"
            class="view__comment"
          >
            <div class="avatar__circle">
              <global-user-icon-vue :uData="comment.commentator" />
            </div>
            <p class="posted__comment">
              {{ comment.comment }}
            </p>
          </div>
        </div>

        <!-- ATTENDING -->

        <div class="event__attendees">
          <div class="attendees__count">
            <h3 class="attendees__heading">ATTENDING</h3>
            <h3 class="attendees__number">
              ({{ seData.specificData.attendeesInfo.length }})
            </h3>
          </div>

          <div class="test__media">
            <div
              v-for="attendee in seData.specificData.attendeesInfo"
              class="attendees__avatar"
            >
              <div class="avatar__circle">
                <global-user-icon-vue :uData="attendee" />
              </div>
              <div class="attendees--name__status">
                <h4 class="attendee__name">
                  {{ attendee.firstName + " " + attendee.lastName }}
                </h4>
                <h5 class="attendees__status">Member</h5>
              </div>
            </div>
          </div>
        </div>
      </main>
      <div class="logo__bottom">
        <h1>eventFULL</h1>
      </div>
    </div>
  </div>
</template>

<script>
import GlobalCloseIconVue from "../components/icons/GlobalCloseIcon.vue";
import GlobalArrowIconVue from "../components/icons/GlobalArrowIcon.vue";
import GlobalUserIconVue from "../components/GlobalUserIcon.vue";
import router from "../router";
export default {
  components: {
    GlobalCloseIconVue,
    GlobalUserIconVue,
    GlobalArrowIconVue,
  },
  data() {
    return {
      isCurrentUserAttending: false,

      eventTitle: "",
      eventLocation: "",
      eventDate: "",
      eventTime: "",
      eventDescription: "",
      isEditMode: false,
      commentInput: "",
    };
  },

  props: ["uData", "seData", "isUserLogedIn"],
  methods: {
    updateAttendButton() {
      if(localStorage.userEmailDetail) {
        console.log("updateAttendButton");
      // get loged in user email

      const currentUserEmail = localStorage.userEmailDetail;

      // get list of users attending the current evet

      const attendeeList = this.seData.specificData.attendeesInfo;

      // use the emails to check if logged in user is in the list of attendees

      const checkEmails = (attendee) => {
        return currentUserEmail === attendee.email;
      };
      this.isCurrentUserAttending = attendeeList.some(checkEmails);

      // if logged in user is attending show unattending button else shoe attending button
      }
    },
    toggleModal() {
      this.isEditMode = !this.isEditMode;

      this.eventTitle = this.$props.seData.eventData.title;
      this.eventLocation = this.$props.seData.eventData.location;
      this.eventDate = this.$props.seData.eventData.date;
      this.eventTime = this.$props.seData.eventData.time;
      this.eventDescription = this.$props.seData.eventData.detail;
      console.log();
    },
    goBack() {
      router.back();
    },
    async sendAttendEventRequest() {
      // console.log(this.seData.eventData._id);
      const response = await fetch(
        `http://localhost:3000/events/attend/${this.$props.seData.eventData._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      const data = await response.json();
      console.log("updating button");
      alert(data.message);
      this.$emit("specificEventDetail", this.$props.seData.eventData);
    },
    async sendCommentPostRequest() {
      if (!this.$props.isUserLogedIn) {
        window.alert("You need to Log In before you can comment");
      }
      console.log("sending comment post request");
      console.log(this.commentInput);
      const response = await fetch(
        `http://localhost:3000/events/${this.$props.seData.eventData._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
          body: JSON.stringify({
            comment: this.commentInput,
          }),
        }
      );
      // const data = await response.json();
      this.$emit("specificEventDetail", this.$props.seData.eventData);
    },
    async deleteEventRequest() {
      const response = await fetch(
        `http://localhost:3000/events/${this.$props.seData.eventData._id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      const data = await response.json();
      alert(data.message);
      location.reload();
    },
    async updatedEventRequest() {
      if (
        this.eventTitle != "" &&
        this.eventLocation != "" &&
        this.eventDate != "" &&
        this.eventTime != "" &&
        this.eventDescription != ""
      ) {
        const response = await fetch(
          `http://localhost:3000/events/hosted/${this.$props.seData.eventData._id}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
            body: JSON.stringify({
              title: this.eventTitle,
              time: this.eventTime,
              date: this.eventDate,
              location: this.eventLocation,
              detail: this.eventDescription,
            }),
          }
        );
        const data = await response.json();
        // alert(data);
        // location.reload();
        this.$emit("specificEventDetail", {
          _id: data,
          hostId: this.$props.seData.eventData.hostId,
          title: this.eventTitle,
          time: this.eventTime,
          date: this.eventDate,
          location: this.eventLocation,
          detail: this.eventDescription,
        });

        alert("Event was updated successfully");

        this.toggleModal();
      } else {
        alert("All input fields are required!");
      }
    },
  },
  computed: {},
  created() {
    this.updateAttendButton();
    this.$emit("unvisibleSearchInput");
  },
};
</script>

<style scoped>
/* ---------------------------------------------------------------- */
.view {
  height: calc(100vh - 100px);
  overflow: hidden scroll;
}

.view::-webkit-scrollbar {
  display: none;
}

@media screen and (max-width: 800px) {
  .view {
    height: calc(100vh - 70px);
    margin: 5%;
  }
}
/* ---------------------------------------------------------------- */

.back__button {
  cursor: pointer;
  margin: 4rem 0rem 4rem 0rem;
  height: 35px;
}

.router-link {
  width: fit-content;
}
.detail__heading {
  padding: 0 20px;
  max-width: 1200px;
  margin: auto;
}
@media screen and (max-width: 768px) {
  .detail__heading {
    padding: 0 10px;
  }
}

.time__date {
  margin-bottom: 0.5rem;
  font-family: abel, sans-serif;
  font-size: 20px;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: #5c5c5c;
}

@media screen and (max-width: 768px) {
  .time__date {
    font-size: 16px;
  }
}
.event__title {
  font-family: anton, sans-serif;
  text-transform: uppercase;
  letter-spacing: 2px;
}

@media screen and (max-width: 768px) {
  .event__title {
    font-size: 25px;
  }
}

.event__location {
  margin-top: 0.5rem;
  margin-bottom: 4rem;
  font-family: anton, sans-serif;
  font-size: 16px;
  letter-spacing: 1.5px;
  color: #5c5c5c;
}

@media screen and (max-width: 768px) {
  .event__location {
    font-size: 15px;
  }
}
.user__avatar {
  margin-top: 4%;
  margin-bottom: 4%;
}

.avatar__headings {
  margin-left: 1.5rem;
}

.avatar__circle {
  border-radius: 100%;
  width: 3.5rem;
  height: 3.5rem;
}

@media screen and (max-width: 768px) {
  .avatar__circle {
    width: 3rem;
    height: 3rem;
  }
}

.avatar__container {
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: space-between;
}

@media screen and (max-width: 768px) {
  .avatar__container {
    flex-wrap: wrap;
    gap: 10px;
  }
}

.avatar__cricle-heading-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* @media screen and (max-width: 768px) {
  .avatar__cricle-heading-container {
    width: 150px;
  }
} */

.hosted__by {
  font-family: abel, sans-serif;
  font-size: 15px;
}

@media screen and (max-width: 768px) {
  .hosted__by {
    font-size: 13px;
  }
}

.host__name {
  font-family: anton, sans-serif;
  letter-spacing: 2px;
  font-size: 20px;
}

@media screen and (max-width: 768px) {
  .host__name {
    font-size: 16px;
  }
}

.attend--edit__container {
  display: flex;
  gap: 2rem;
}
@media screen and (max-width: 800px) {
  .attend--edit__container {
    display: flex;
    gap: 1rem;
  }
}

.attend__event,
.edit__event {
  cursor: pointer;
  border: 0px solid #e35353;
  border-radius: 20px;
  background-color: #e35353;
  color: #f1f1f1;
  width: 5rem;
  height: 2rem;
  font-family: anton, sans-serif;
  font-size: 14px;
  letter-spacing: 2px;
}

.unattend {
  border: 2px solid #e35353;
  background-color: #ffffff;
  color: #333333;
  width: 6rem;
  height: 2rem;
}

/* @media screen and (max-width: 768px) {
  .unattend {
    border: 2px solid #e35353;
    background-color: #ffffff;
    color: #333333;
    width: 6rem;
    height: 2rem;
  }
} */

.attend__event:hover,
.edit__event:hover {
  cursor: pointer;
  border: 2px solid #e35353;
  background-color: #ffffff;
  color: #333333;
}

@media screen and (max-width: 800px) {
  .attend__event,
  .edit__event {
    cursor: pointer;
    border: 2px solid #e35353;
    border-radius: 20px;
    /* background-color: #e35353; */
    color: #ffffff;
    width: 5rem;
    height: 2rem;
    font-family: anton, sans-serif;
    font-size: 14px;
    letter-spacing: 2px;
  }
}

@media screen and (max-width: 800px) {
  .white-button {
    color: #333333;
    width: 6rem;
    height: 2rem;
  }
}

/* /////////////////////////////////////////////// */

.main__eventDetails {
  display: flex;
  justify-content: space-between;
  margin-top: 2%;
  padding: 0 20px;
  width: 100%;
  max-width: 1200px;
  margin: auto;
}

@media screen and (max-width: 768px) {
  .main__eventDetails {
    display: block;
    padding: 0 10px;
  }
}

.main__detail {
  width: 50%;
}

@media screen and (max-width: 768px) {
  .main__detail {
    margin-left: 0rem;
    width: 100%;
  }
}

.detail__image {
  margin-bottom: 50px;
  min-width: 100%;
  height: 550px;

  display: flex;
  flex-direction: column;
  align-items: center;
}

.details__image {
  width: 100%;
  height: 250px;
  object-fit: cover;
}

.event__detail {
  height: auto;
  margin-top: -15%;
  width: 90%;
  padding: 40px;
  background-color: white;
  box-shadow: 6px 10px 18px #00000028;
}

.box__heading {
  font-family: anton, sans-serif;
  font-size: 20px;
  letter-spacing: 2px;
}

@media screen and (max-width: 768px) {
  .box__heading {
    font-size: 16px;
  }
}

.detail__text {
  margin-top: 2%;
  font-family: abel, sans-serif;
  font-size: 20px;
}

@media screen and (max-width: 768px) {
  .detail__text {
    font-size: 18px;
  }
}

.map__marker {
  cursor: pointer;
  background-color: white;
  border: 0px;
  margin-top: 10%;
  margin-left: 90%;
  font-size: 25px;
  color: rgb(58, 152, 215);
}

@media screen and (max-width: 768px) {
  .map__marker {
    font-size: 22px;
  }
}

/* //////////////////////////////////////////////////////////// */

/* //////////////////////////////////////////////////////////// */

.write__comment {
  margin-top: -7rem;
  display: flex;
  align-items: center;
  gap: 2rem;
}

@media screen and (max-width: 768px) {
  .write__comment {
    gap: 1rem;
    margin-top: -8rem;
  }
}

.write__box {
  width: 80%;
  border: 1.5px solid black;
  display: flex;
  justify-content: space-between;
}

@media screen and (max-width: 768px) {
  .write__box {
    width: 80%;
  }
}

.post__box {
  outline: none;
  margin-left: 1rem;
  width: 90%;
  height: 2rem;
  border: 0px;
  font-family: abel, sans-serif;
}

.post {
  cursor: pointer;
  margin-right: 1rem;
  border: 0px;
  background-color: white;
  font-family: anton, sans-serif;
  letter-spacing: 1px;
  color: black;
}

.view__comment {
  margin-top: 3%;
  margin-left: 0rem;
  display: flex;
  align-items: center;
  gap: 2rem;
}

@media screen and (max-width: 768px) {
  .view__comment {
    gap: 1rem;
  }
}

.posted__comment {
  width: 80%;
}

@media screen and (max-width: 768px) {
  .posted__comment {
    font-size: small;
  }
}

/* /////////////////////////////////////////////////// */

.event__attendees {
  margin-top: 2.5rem;
  width: 30%;
}

@media screen and (max-width: 768px) {
  .event__attendees {
    margin-top: 5rem;
    width: 100%;
  }
}

.attendees__count {
  display: flex;
  gap: 10px;
  margin-bottom: 3rem;
  font-family: anton, sans-serif;
  font-size: 14px;
  letter-spacing: 2px;
}

@media screen and (max-width: 768px) {
  .attendees__count {
    font-size: 12px;
    margin-bottom: 2rem;
  }
}

.attendees__avatar {
  font-family: anton, sans-serif;
  font-size: 14px;
  letter-spacing: 1.5px;
  display: flex;
  align-items: center;
  gap: 2rem;
  color: #333333;
}

@media screen and (max-width: 768px) {
  .attendees--name__status {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}

@media screen and (max-width: 768px) {
  .attendee__name {
    text-align: center;
  }
}

.attendees__status {
  font-family: abel, sans-serif;
}

@media screen and (max-width: 768px) {
  .attendees__avatar {
    width: 100%;
    display: flex;
    flex-direction: column;
    /* justify-content: center; */
    align-items: center;
    gap: 0.5rem;

    font-size: 12px;
  }
}
.test__media {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

@media screen and (max-width: 768px) {
  .test__media {
    padding: px;
    /* width: 100%; */
    display: flex;
    overflow: scroll hidden;
    flex-direction: row;
    /* gap: 1.5rem; */
  }
}
/* /////////////////////////////////////////////////// */

.logo__bottom {
  margin-top: 6rem;
  font-family: anton, sans-serif;
  letter-spacing: 2px;
  font-size: 12px;
  color: #e35353;
  /* background-color: aquamarine; */
  display: flex;
  justify-content: center;
  padding: 50px;
}

@media screen and (max-width: 768px) {
  .logo__bottom {
    font-size: 8px;
    margin-top: 3rem;
    margin-bottom: 3rem;
  }
}
/* -------------------------------------------------------------------------- */
/* -------------------------------------------------------------------------- */
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
  margin-bottom: 10px;
  /* height: 80px; */

  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px soid black;
}
.edit-model__close-btn {
  position: absolute;
  right: 0;
  top: 0;
  cursor: pointer;

  max-width: 30px;
}
.edit-model__date-time-container {
  display: flex;
  gap: 5px;
  /* border: 2px solid red; */
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

@media screen and (max-width: 600px) {
  .edit-model__inputs {
    height: 40px;
    border: 1px solid black;
  }
  .edit-model__about-input {
    border: 1px solid black;
  }
  .edit-model__update-btn {
    font-family: "Anton", sans-serif;
    font-size: large;
    margin-top: 20px;
    width: 100%;
    height: 40px;
    color: white;
    background-color: red;
    border: none;
  }
}
</style>
