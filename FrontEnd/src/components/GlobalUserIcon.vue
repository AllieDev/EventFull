<template>
  <div class="icon">
    <p class="icon__firstNameInitial">{{ firstNameInitial.toUpperCase() }}</p>
    <p class="icon__lastNameInitial">{{ lastNameInitial.toUpperCase() }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      firstNameInitial: "",
      lastNameInitial: "",
      iconColor: "",
      userData: {},
    };
  },
  props: ["uData"],
  methods: {
    seperateIntialsFromSentDataAndSaveToData() {
      this.userData = this.$props.uData;
      this.firstNameInitial = this.userData.firstName.slice(0, 1);
      this.lastNameInitial = this.userData.lastName.slice(0, 1);
      this.iconColor = this.userData.iconColor;
    },
  },
  watch: {
    uData() {
      this.seperateIntialsFromSentDataAndSaveToData();
    },
  },
  created() {
    this.seperateIntialsFromSentDataAndSaveToData();
  },
};
</script>

<style scoped>
.icon {
  font-family: sans-serif;
  width: 100%;
  height: 100%;

  background-color: v-bind(iconColor);
  border-radius: 50%;

  display: flex;
  justify-content: center;
  align-items: center;
}
.icon__lastNameInitial,
.icon__firstNameInitial {
  font-size: 1.2rem;
  font-weight: 100;
  color: white;
}

@media screen and (max-width: 800px) {
  .icon__lastNameInitial,
  .icon__firstNameInitial {
    font-size: 1.1rem;
  }
}

@media screen and (max-width: 450px) {
  .icon__lastNameInitial,
  .icon__firstNameInitial {
    font-size: 1rem;
  }
}
</style>
