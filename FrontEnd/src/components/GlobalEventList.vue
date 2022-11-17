<template>
  <div @click="$emit('sendEventData', eData)" class="event-card__container">
    <img
      :src="`data:image/jpeg;base64,${eData.imageFile.data}`"
      v-if="eData.imageFile"
      class="event-card__background"
    />
    <img
      v-else
      src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?crop=entropy&cs=tinysrgb&fm=jpg&ixid=Mnw3MjAxN3wwfDF8c2VhcmNofDN8fGV2ZW50fGVufDB8MHx8fDE2NjI0Mjg0MTA&ixlib=rb-1.2.1&q=80&q=85&fmt=jpg&crop=entropy&cs=tinysrgb&w=450"
      class="event-card__background"
    />
    <div class="event-card__contents">
      <p class="event-card__contents--date">{{ eData.date }}</p>
      <h3 class="event-card__contents--title">
        {{ eData.title }}
      </h3>
      <p class="event-card__contents--details">
        {{ eData.detail }}
      </p>
      <p class="event-card__contents--place">{{ eData.location }}</p>
      <a href="#">more</a>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: ["eData"],
};
</script>

<style scoped>
.event-card__container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 450px;
  min-width: 450px;
  cursor: pointer;
}

.event-card__background {
  background-color: #f6f6f6;
  width: 100%;
  height: 15rem;
}

.event-card__contents {
  background-color: #fff;
  box-shadow: 6px 10px 18px #00000028;
  margin-top: -8rem;
  padding: 3rem 3rem;
  width: 80%;
  height: 13rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  display: flex;
}

.event-card__contents--date {
  text-transform: uppercase;
  margin-bottom: 1.5rem;
}

.event-card__contents--title {
  text-transform: capitalize;
  margin-bottom: 1.5rem;
  letter-spacing: 0.1rem;
}

.event-card__contents--details {
  margin-bottom: 2rem;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
}
.event-card__contents--place {
  color: #7e7e7e;
  text-transform: uppercase;
  font-family: "Anton", sans-serif;
}

.event-card__contents a {
  align-self: flex-end;
  text-decoration: none;
  text-transform: uppercase;
  color: #e35353;
  cursor: pointer;
  border-bottom: solid 1px #e35353;
}

/* Portrait Mobile 0px ~ 414px */
@media only screen and (max-width: 414px) {
  .event-card__container {
    min-width: 300px;
  }
  .event-card__contents--details {
    -webkit-line-clamp: 3;
  }
}
</style>
