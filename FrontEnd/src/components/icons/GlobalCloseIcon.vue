<template>
  <div class="close-icon__container">
    <svg
      class="close-icon__svg"
      viewBox="0 0 104 104"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="52" cy="52" r="49" stroke="black" stroke-width="6" />
      <path
        d="M36 36L69 69"
        stroke="black"
        stroke-width="6"
        stroke-linecap="round"
      />
      <path
        d="M36 69L69 36"
        stroke="black"
        stroke-width="6"
        stroke-linecap="round"
      />
    </svg>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.close-icon__container {
  height: 40px;
  width: 40px;
}
.close-icon__svg {
  height: 100%;
  width: 100%;
}
</style>
