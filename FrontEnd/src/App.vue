<template>
  <div>
    <nav v-if="isNavVisible" class="nav">
      <div class="nav__container">
        <div class="nav__logo-and-search-input-container">
          <router-link to="/" class="nav__logo">eventFULL</router-link>
          <div
            @keypress.enter="filterSearchedEventData"
            v-if="isSearchInputAvailable"
            class="nav__search-input-container"
          >
            <input v-model="navSearch" class="nav__search-input" type="text" />
            <button
              @click="filterSearchedEventData"
              class="nav__search-btn"
              type="button"
            >
              <global-search-icon-vue />
            </button>
          </div>
        </div>
        <div :class="navClasses">
          <div
            v-if="isUserLogedIn"
            @click="toggleDropDownMenue"
            class="nav__user-icon-container"
          >
            <global-user-icon-vue :uData="userData" />
          </div>
          <p
            v-if="isUserLogedIn"
            @click="toggleDropDownMenue"
            class="nav__links-dropdown"
          >
            ⌄
          </p>

          <router-link v-else class="nav__create-event-btn1" to="/log-in"
            >LOG IN</router-link
          >

          <router-link
            v-if="isUserLogedIn"
            to="/create-event"
            class="nav__create-event-btn"
            >CREATE EVENT</router-link
          >
          <global-menu-icon-vue
            @click="toggleDropDownMenue"
            class="nav__mobile-menu-icon"
          />
          <global-help-icon-vue
            @click="toggleHelpCardVisiblity"
            class="nav__help-btn"
          />
          <!-- Help Card Starts -->
          <div v-if="isHelpCardVisible" class="help-card">
            <div class="help-card__pages" id="help-card__page-1">
              <p>
                EventFull is a platform connecting people to local and
                international events. To attend an event, start by Signing up or
                Log in <router-link to="/log-in">Here</router-link>. Events can
                be filtered by event type next to the “FIND EVENTS” located on
                the homepage. To let the host know your will be attending an
                event, click on the ‘ATTEND’ button on any event on the events
                page.
              </p>
              <!-- Change from Lorem Epsom -->
              <div class="help-card__navigation-btn-container">
                <a class="help-card__navigation-btn" href="#help-card__page-2">
                  <global-arrow-icon-vue class="up-arrow" />
                </a>
              </div>
            </div>
            <div class="help-card__pages" id="help-card__page-2">
              <p>
                To create an Event as a Host click on the ‘CREATE EVENT’ button
                on the navigation bar. You can also click on ‘Create’ on the
                dropdown menu by first clicking on your profile icon or the down
                arrow on the navigation bar. From this menu you can also go to
                your profile and log out. You can also search through all event
                through the search bar on the navigation menu.
              </p>
              <div class="help-card__navigation-btn-container">
                <a class="help-card__navigation-btn" href="#help-card__page-1">
                  <global-arrow-icon-vue class="down-arrow" />
                </a>
              </div>
            </div>
          </div>
          <!-- Help Card Ends -->
        </div>
        <!-- Dropdown Menu Starts -->
        <div v-if="isDropDownVisible" :class="navDropDownClasses">
          <router-link
            @click="toggleDropDownMenue"
            to="/"
            class="drop-down__links"
            >Events</router-link
          >
          <router-link
            @click="toggleDropDownMenue"
            v-if="isUserLogedIn"
            to="/profile"
            class="drop-down__links"
            >Profile</router-link
          >
          <div class="drop-down__login-logout-container">
            <router-link
              v-if="!isUserLogedIn"
              class="drop-down__login-btn drop-down__log-btns"
              to="/log-in"
            >
              LOG IN
            </router-link>
            <router-link
              v-else
              to="/"
              @click="logOutUser"
              class="drop-down__logout-btn drop-down__log-btns"
            >
              LOG OUT
            </router-link>
          </div>
        </div>
        <!-- Dropdown Menu Ends -->
      </div>
      <div v-if="isSearchInputAvailable" class="nav__mobile-search-input">
        <div
          class="nav__search-input-container nav__mobile-search-input-container"
        >
          <input class="nav__search-input" type="text" />
          <button class="nav__search-btn" type="button">
            <global-search-icon-vue />
          </button>
        </div>
      </div>
    </nav>
    <div @click="closeAllDropDowns" class="router-view-container">
      <router-view
        :seData="specificEventDetail"
        :uData="userData"
        :eData="isSearching ? searchEventData : eventData"
        :isUserLogedIn="isUserLogedIn"
        @unvisibleSearchInput="hideSearchInput"
        @visibleSearchInput="showSearchInput"
        @unvisibleNav="makeNavUnvisible"
        @visibleNav="makeNavVisible"
        @specificEventDetail="getSpecificEventDetail"
        @loginRequest="submitLoginRequest"
        @uploadImage="createEventRequest"
        @updateUserInfo="userInfoUpdateRequest"
      />
    </div>
    <!-- For Development Only -->
    <!-- <div class="dev__quick-page-access">
      <router-link class="router-link" to="/log-in">Sign-Up Login</router-link>
      <router-link class="router-link" to="/">Event List</router-link>
      <router-link class="router-link" to="/event-detail"
        >Event Detail</router-link
      >
      <router-link class="router-link" to="/create-event"
        >Create Event</router-link
      >
      <router-link class="router-link" to="/profile">User Profile</router-link>
    </div> -->
    <!-- For Development Only -->
  </div>
</template>

<script>
import GlobalUserIconVue from "./components/GlobalUserIcon.vue";
import GlobalSearchIconVue from "./components/icons/GlobalSearchIcon.vue";
import GlobalHelpIconVue from "./components/icons/GlobalHelpIcon.vue";
import GlobalArrowIconVue from "./components/icons/GlobalArrowIcon.vue";
import GlobalMenuIconVue from "./components/icons/GlobalMenuIcon.vue";
import router from "./router";

export default {
  components: {
    GlobalUserIconVue,
    GlobalSearchIconVue,
    GlobalHelpIconVue,
    GlobalArrowIconVue,
    GlobalMenuIconVue,
  },
  data() {
    return {
      isSearching: false,
      navSearch: "",
      isUserLogedIn: false,
      isDropDownVisible: false,
      isSearchInputAvailable: true,
      isHelpCardVisible: false,
      isNavVisible: true,
      userData: {
        _id: "63197b52f62ff345ce130c62",
        iconColor: "lightgray",
        firstName: "Guest",
        lastName: "",
        email: "no-gmail@gmail.com",
        memberSince: "Now",
        about: "This is a little about me...",
      },
      searchEventData: [],
      eventData: null,
      specificEventDetail: null,
    };
  },
  methods: {
    makeNavVisible() {
      this.isNavVisible = true;
    },
    makeNavUnvisible() {
      this.isNavVisible = false;
    },
    toggleHelpCardVisiblity() {
      this.isHelpCardVisible = !this.isHelpCardVisible;
      this.isDropDownVisible = false;
    },
    toggleDropDownMenue() {
      this.isDropDownVisible = !this.isDropDownVisible;
      this.isHelpCardVisible = false;
    },
    closeAllDropDowns() {
      this.isHelpCardVisible = false;
      this.isDropDownVisible = false;
    },
    hideSearchInput() {
      this.isSearchInputAvailable = false;
    },
    showSearchInput() {
      this.isSearchInputAvailable = true;
    },
    logOutUser() {
      localStorage.clear();
      this.isUserLogedIn = false;
      this.isDropDownVisible = false;
      this.userData = {
        _id: "63197b52f62ff345ce130c62",
        iconColor: "lightgray",
        firstName: "Guest",
        lastName: "",
        email: "no-gmail@gmail.com",
        memberSince: "Now",
        about: "This is a little about me...",
      }
      router.push("/");
      // location.reload();
    },
    async createEventRequest(data) {
      if (!data) {
        alert("No data was captured! you cannot send the request");
      } else {
        const formData = new FormData();
        formData.append("image", data.imageFile);
        formData.append("title", data.title);
        formData.append("location", data.location);
        formData.append("date", data.date);
        formData.append("time", data.time);
        formData.append("detail", data.detail);

        const response = await fetch("http://localhost:3000/events/", {
          method: "POST",
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
          body: formData,
        });
        this.getListOfAllEventsRequest();
        alert("Your event was successfully created!");
        router.push("/");
      }
    },
    // ----------------------------------------------------------------
    async userInfoUpdateRequest(updateData) {
      const response = await fetch("http://localhost:3000/users/", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify(updateData),
      });
      const data = await response.json();
      if (data.firstName) {
        this.userData = data;
      }
    },
    // ----------------------------------------------------------------
    async getListOfAllEventsRequest() {
      const response = await fetch("http://localhost:3000/events");
      const data = await response.json();
      this.eventData = data;
    },
    // ----------------------------------------------------------------
    async getSpecificEventDetail(data) {
      const response = await fetch(`http://localhost:3000/events/${data._id}`);

      const specificData = await response.json();
      const evenData = data;

      this.specificEventDetail = {
        eventData: evenData,
        specificData: specificData,
      };

      router.push("/event-detail");
    },
    // ----------------------------------------------------------------
    async submitLoginRequest(loginData) {
      const response = await fetch("http://localhost:3000/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
      });
      const data = await response.json();
      localStorage.setItem("token", data.token);
      if (data.token) {
        this.userData = data;
        this.isUserLogedIn = true;
        this.$router.replace("/");
      } else if (data.message && localStorage.getItem("token")) {
        alert(data.message);
        localStorage.clear();
      }
      this.getListOfAllEventsRequest();
    },
    // ----------------------------------------------------------------
    filterSearchedEventData() {
      if (!this.navSearch) {
        this.isSearching = false;
      } else {
        this.isSearching = true;
        this.searchEventData = [];
        for (let event of this.eventData) {
          if (
            event.title.toLowerCase().includes(this.navSearch.toLowerCase())
          ) {
            this.searchEventData.push(event);
          }
        }
      }
    },
    logUserIfUserExists() {
      const email = localStorage.getItem("userEmailDetail");
      const password = localStorage.getItem("userPassDetail");

      if (email != null && password != null) {
        this.submitLoginRequest({
          email: email,
          password: password,
        });
        // console.log("running on home page!");
      }
    },
  },
  computed: {
    navClasses() {
      if (this.isUserLogedIn) {
        return "nav__user-icon-create-btn-and-help-btn-container ";
      } else {
        return "useIsNotLoggedIn";
      }
    },
    navDropDownClasses() {
      if (this.isUserLogedIn) {
        return "drop-down__container";
      } else {
        return "user-not-logged-in-drop-down__container";
      }
    },
  },
  created() {
    this.getListOfAllEventsRequest();
    this.logUserIfUserExists();
    // this.submitLoginRequest({
    //   email: localStorage.getItem("userEmailDetail"),
    //   password: localStorage.getItem("userPassDetail"),
    // });
  },
};
</script>

<style scoped>
.router-view-container {
  height: calc(100vh - 100px);
  /* border: 3px solid rgb(255, 0, 0); */
}
.nav {
  height: 100px;
  box-shadow: 5px 5px 15px 1px rgba(138, 138, 138, 0.771);

  display: flex;
  justify-content: center;
  align-items: center;
}
.nav__container {
  position: relative;

  padding: 0 20px;
  height: 100%;
  max-width: 1200px;
  width: 100%;

  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 30px;

  /* border: 1px solid black; */
}
.nav__logo-and-search-input-container {
  max-width: 500px;
  width: 100%;

  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
}
.nav__logo {
  text-decoration: none;
  font-weight: 600;
  font-size: xx-large;

  color: rgb(244, 60, 60);
}
.nav__search-input-container {
  height: 30px;
  max-width: 300px;
  width: 100%;

  display: flex;
  border: 1px solid black;
  border-radius: 5px;
}

.nav__search-input {
  font-size: medium;
  padding-left: 10px;
  height: 100%;
  width: calc(100% - 20px);

  border: none;
  border-radius: 5px 0 0 5px;
  outline: none;
}

.nav__search-btn {
  height: 100%;
  width: 50px;

  display: flex;
  justify-content: center;
  align-items: center;

  border: none;
  background-color: white;
  border-left: 1px solid black;
  border-radius: 0 5px 5px 0;

  cursor: pointer;
}
.useIsNotLoggedIn {
  max-width: 150px;
  width: 100%;
  /* border: 1px solid black; */
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  cursor: pointer;
}
.nav__user-icon-create-btn-and-help-btn-container {
  max-width: 380px;
  width: 100%;

  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
}

.nav__user-icon-container {
  text-decoration: none;
  height: 50px;
  width: 50px;
  cursor: pointer;
}
.nav__create-event-btn {
  text-decoration: none;
  font-size: medium;
  padding: 8px 20px;

  background-color: rgb(244, 60, 60);
  color: white;

  border: none;
  border-radius: 20px;
}
.nav__create-event-btn1 {
  text-decoration: none;
  font-size: medium;
  padding: 8px 10px;
  background-color: rgb(244, 60, 60);
  color: white;
  border: none;
  border-radius: 20px;
}
.nav__mobile-menu-icon {
  display: none;
}
.nav__links-dropdown {
  cursor: pointer;
  font-size: 30px;
  margin-left: -2rem;
  margin-top: -1rem;
  cursor: pointer;
}
.nav__mobile-search-input {
  display: none;
}

.help-icon__container {
  cursor: pointer;
}

.help-card::-webkit-scrollbar {
  display: none;
}

.help-card {
  z-index: 2;
  position: absolute;
  top: 101px;
  right: 2px;
  max-width: 300px;
  height: 400px;

  background-color: white;
  box-shadow: 5px 10px 10px 0 rgba(23, 23, 23, 0.25);

  overflow: hidden scroll;
  scroll-snap-type: y mandatory;
}
.help-card__pages {
  box-sizing: border-box;
  padding: 30px;
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  scroll-snap-align: center;
}
.help-card__navigation-btn-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
.help-card__navigation-btn {
  font-size: 15px;
  text-decoration: none;
  width: 3.5rem;
  height: 3.5rem;

  display: flex;
  align-items: center;
  justify-content: center;
}
.down-arrow {
  rotate: 90deg;
}
.up-arrow {
  rotate: 270deg;
}
.dev__quick-page-access {
  padding-bottom: 20px;
  z-index: 1;
  position: fixed;
  bottom: 0;
  left: 0;

  display: flex;
  gap: 20px;
  background-color: rgb(0, 136, 255);
}
.user-not-logged-in-drop-down__container {
  z-index: 1;
  position: absolute;
  top: 101px;
  right: 0px;

  padding: 10px;
  height: 200px;
  width: 200px;

  background-color: rgb(255, 255, 255);
  box-shadow: 5px 10px 10px 0 rgba(23, 23, 23, 0.25);

  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
}
.drop-down__container {
  z-index: 1;
  position: absolute;
  top: 101px;
  right: 250px;

  padding: 10px;
  height: 200px;
  width: 200px;

  background-color: rgb(255, 255, 255);
  box-shadow: 5px 10px 10px 0 rgba(23, 23, 23, 0.25);

  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
}
.drop-down__links {
  text-decoration: none;
  font-family: "Abel", sans-serif;
  color: black;
}

@media screen and (max-width: 800px) {
  .drop-down__links {
    margin-bottom: -1rem;
    margin-top: -12rem;
  }
}
.drop-down__login-logout-container {
  width: 100%;
}

@media screen and (max-width: 800px) {
  .drop-down__login-logout-container {
    width: 100%;
    position: relative;
    top: 10rem;
  }
}
.drop-down__log-btns {
  text-decoration: none;
  font-size: small;
  padding: 10px 0;
  width: 100%;

  color: white;
  background-color: red;
  border: none;

  display: flex;
  justify-content: center;
  align-items: center;
}
.router-link {
  font-size: medium;
  text-decoration: none;
  background-color: rgb(0, 136, 255);
  color: white;
}
.router-link:hover {
  margin-top: -20px;
}
.nav__help-btn {
  cursor: pointer;
}
@media screen and (max-width: 800px) {
  .nav {
    height: 70px;
  }
  .nav__search-input-container {
    display: none;
  }
  .nav__user-icon-create-btn-and-help-btn-container {
    max-width: 100px;
  }
  .nav__links-dropdown {
    display: none;
  }
  .nav__create-event-btn {
    display: none;
  }

  .nav__help-btn {
    display: none;
  }
  .nav__mobile-search-input {
    z-index: 1;
    position: fixed;
    top: 70px;
    left: 0;

    padding-bottom: 10px;
    width: 100vw;
    height: 40px;
    background-color: white;

    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0px 5px 15px 0px rgba(149, 149, 149, 0.156);
  }
  .nav__mobile-search-input-container {
    max-width: 97vw;

    display: flex;
  }

  .nav__user-icon-container {
    text-decoration: none;
    height: 45px;
    width: 45px;
  }

  .nav__mobile-menu-icon {
    display: flex;
  }
  .drop-down__container {
    z-index: 2;
    position: fixed;
    top: 70px;
    right: 0;
    height: 100vh;
    width: 100vw;
    /* border: 10px solid black; */
  }
}

@media screen and (max-width: 450px) {
  .nav__user-icon-container {
    text-decoration: none;
    height: 40px;
    width: 40px;
  }
}
</style>
