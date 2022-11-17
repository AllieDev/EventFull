<template>
  <div class="view">
    <div class="search-event__mobile">
      <div class="search-event__container">
        <h3>find events</h3>
        <div class="search-event__sub-container">
          <div class="search-event__options">
            <p>all events</p>
            <i @click="toggleDropdown" class="fas fa-caret-down"></i>
          </div>
          <div v-if="isDropdown" class="search-event__dropdown">
            <p>concerts</p>
            <p>exhibiitions</p>
            <p>festivals</p>
            <p>sports</p>
            <p>workshop</p>
            <p>conferences</p>
          </div>
        </div>
      </div>
    </div>

    <div class="event-list__container">
      <div class="event-list__event-cards">
        <h3 class="event-list__header">All Events</h3>
        <global-event-list
          @sendEventData="sendEventData"
          v-for="event in eData"
          :eData="event"
          :key="event._id"
        />
      </div>
    </div>
  </div>
</template>

<script>
import GlobalEventList from "../components/GlobalEventList.vue";
export default {
  components: { GlobalEventList },
  data() {
    return { isDropdown: false };
  },
  props: ["eData"],
  methods: {
    toggleDropdown() {
      this.isDropdown = !this.isDropdown;
    },
    sendEventData(data) {
      this.$emit("specificEventDetail", data);
    },
  },
  computed: {},
  watch: {},
  created() {
    this.$emit("visibleNav");
    this.$emit("visibleSearchInput");
  },
};
</script>

<style scoped>
.view {
  height: calc(100vh - 100px);
  overflow: hidden scroll;
  /* background-color: rgb(173, 230, 200); */
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
.search-event__container {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  max-width: 1200px;
  margin: auto;
  margin-top: 9rem;
  margin-left: 13rem;
}

.search-event__container h3 {
  font-family: "Anton", sans-serif;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.search-event__container p {
  font-size: 0.75rem;
  width: 100%;
  text-transform: uppercase;
  letter-spacing: 0.1rem;
  cursor: pointer;
}
.search-event__sub-container {
  cursor: pointer;
  display: flex;
  flex-direction: column;
  border: solid 1px #000;
  margin-left: 2rem;
  position: relative;
  cursor: pointer;
}

.search-event__options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.4rem 1.5rem;
}

.search-event__options p {
  margin-right: 15rem;
  font-size: 12px;
}

.search-event__dropdown {
  background-color: #fff;
  position: absolute;
  top: 35px;
  z-index: 1;
  border: solid 1px #000;
}

.search-event__dropdown p {
  width: 100%;
  padding: 1rem 15.8rem 1rem 1.4rem;
}

.search-event__dropdown p:hover {
  background-color: lightgray;
}

.event-list__container {
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 1200px;
  margin: auto;
  margin-bottom: 10rem;
}

.event-list__event-cards {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10rem;
  margin-top: 10rem;
  max-width: 1100px;
  position: relative;
}

.event-list__header {
  position: absolute;
  top: -50px;
  left: 0;
  text-transform: uppercase;
}

/* Landscape Tablet to Small Laptop 848px ~ 1403px */
@media only screen and (max-width: 1403px) {
  .search-event__container {
    justify-content: flex-start;
    margin: 9rem 5rem 8rem;
  }
}
/* Landscape Mobile to Portrait Tablet 404px ~ 847px */
@media only screen and (max-width: 847px) {
  .search-event__mobile {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: -2rem 0rem -10rem 0rem;
  }
  .search-event__container {
    margin: 8rem 0rem 8rem;
  }

  .search-event__options p {
    margin-right: 10.9rem;
  }

  .search-event__dropdown {
    background-color: #fff;
    position: absolute;
    top: 37px;
    z-index: 1;
    /* padding: 1rem 10.3rem 1rem 1.45rem; */
    border: solid 1px #000;
  }

  .search-event__dropdown p {
    width: 100%;
    padding: 1rem 11.7rem 1rem 1rem;
  }
  .event-list__event-cards {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
}

/* Portrait Mobile 0px ~ 414px */
@media only screen and (max-width: 414px) {
  .search-event__mobile {
    display: flex;
    align-items: center;
    margin: -3.5rem 0;
  }

  .search-event__container {
    justify-content: center;
    width: 100%;
    gap: 1.5rem;
  }

  .search-event__container h3 {
    font-size: 14px;
    letter-spacing: 1px;
  }
  .search-event__sub-container {
    margin-left: -0.5rem;
  }

  .search-event__options {
    padding: 0.15rem 0.8rem;
    gap: 1.7rem;
  }

  .search-event__options p {
    font-size: 0.6rem;
    margin-right: 5.2rem;
  }

  .search-event__dropdown {
    background-color: #fff;
    position: absolute;
    top: 25px;
    z-index: 1;
    border: solid 1px #000;
    width: 100%;
  }

  .search-event__dropdown p {
    width: 100%;
    padding: 1rem 3.1rem 1rem 0.7rem;
    font-size: 0.6rem;
  }

  .event-list__container {
    max-width: 1200px;
    margin: auto;
    margin-bottom: 10rem;
    margin-top: -12rem;
  }
  .event-list__event-cards {
    max-width: 320px;
    gap: 5.5rem;
  }
  .event-list__header {
    font-size: 0.9rem;
  }
}
</style>
