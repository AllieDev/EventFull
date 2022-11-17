<template>
  <div class="view">
    <div v-if="isUser" class="login__container">
      <form
        @keypress.enter="emitUserLoginData"
        class="login__form"
        action="./events"
      >
        <h3 class="login__header">LOG IN</h3>
        <div class="login__inputs-container">
          <div>
            <label class="login__label" for="id">E-MAIL</label>
            <input
              class="login__form-input"
              v-model="email"
              type="email"
              id="email"
              name="id"
              required
            />
          </div>
          <div>
            <label class="login__label" for="password">PASSWORD</label>
            <input
              class="login__form-input"
              v-model="password"
              type="password"
              id="password"
              name="password"
              required
            />
          </div>
          <a>forget password</a>
        </div>

        <button @click.prevent="emitUserLoginData" type="button">LOG IN</button>
        <div class="login__signup">
          <p>dont have an account? <a @click="swapToSignUpForm">sign up</a></p>
        </div>
      </form>
    </div>

    <div v-else class="signup__container">
      <form
        @submit.prevent
        @keypress.enter="createUserAccountRequest"
        class="signup__form"
        action="./events"
      >
        <h3 class="signup__header">SIGN IN</h3>
        <div class="signup__inputs-container">
          <div>
            <label class="signup__label" for="first-name">FIRST-NAME</label>
            <input
              v-model="firstName"
              class="signup__form-input"
              type="text"
              id="first-name"
              name="id"
              required
            />
          </div>

          <div>
            <label class="signup__label" for="last-name">LAST-NAME</label>
            <input
              v-model="lastName"
              class="signup__form-input"
              type="text"
              id="last-name"
              name="last-name"
              required
            />
          </div>
          <div>
            <label class="signup__label" for="email">E-MAIL</label>
            <input
              v-model="email"
              class="signup__form-input"
              type="email"
              id="email"
              name="email"
              required
            />
          </div>
          <div>
            <label class="signup__label" for="password">PASSWORD</label>
            <input
              v-model="password"
              class="signup__form-input"
              type="password"
              id="password"
              name="password"
              required
            />
          </div>
          <div>
            <label class="signup__label" for="confirmed-password"
              >CONFIRM-PASSWORD</label
            >
            <input
              v-model="confirmPassword"
              class="signup__form-input"
              type="password"
              id="confirmed-password"
              name="confirmed-password"
              required
            />
          </div>
        </div>
        <button @click.prevent="createUserAccountRequest" type="button">
          SIGN UP
        </button>
        <div class="signup__login">
          <p>already have an account? <a @click="swapToLogInForm">log in</a></p>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      isUser: true,
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    };
  },
  props: [],
  methods: {
    swapToSignUpForm() {
      this.isUser = false;
    },
    swapToLogInForm() {
      this.isUser = true;
    },
    emitUserLoginData() {
      if (this.email != "" && this.password != "") {
        const userData = {
          email: this.email,
          password: this.password,
        };
        this.$emit("loginRequest", userData);
        this.savePassToLocalStorage(userData);
      } else {
        alert("Please fill in all the fields");
      }
    },
    savePassToLocalStorage(userData) {
      localStorage.setItem("userEmailDetail", userData.email);
      localStorage.setItem("userPassDetail", userData.password);
    },
    emitUserLoginDataIfUserExists() {
      const email = localStorage.getItem("userEmailDetail");
      const password = localStorage.getItem("userPassDetail");

      if (email != null && password != null) {
        const userData = {
          email: localStorage.getItem("userEmailDetail"),
          password: localStorage.getItem("userPassDetail"),
        };
        this.$emit("loginRequest", userData);
        // console.log("running");
      }
    },
    async createUserAccountRequest() {
      if (
        this.firstName != "" &&
        this.lastName != "" &&
        this.email != "" &&
        this.password != "" &&
        this.confirmPassword != ""
      ) {
        if (this.password == this.confirmPassword) {
          const response = await fetch("http://localhost:3000/users/sign-up", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              firstName: this.firstName,
              lastName: this.lastName,
              email: this.email,
              password: this.password,
            }),
          });
          const data = await response.json();

          if (data.message == "try a different email") {
            alert("try a different email");
          } else if (
            data.message == "You have successfully created an acount!"
          ) {
            alert(data.message);
            location.reload();
          } else {
            alert(data.message);
          }
        } else {
          alert("passwords do not match");
        }
      } else {
        alert("Please fill in all the fields");
      }
    },
  },
  created() {
    this.$emit("unvisibleNav");
    this.emitUserLoginDataIfUserExists();
  },
};
</script>

<style scoped>
.view {
  height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;
}
/* ---------------------------------------------------------------- */

.login__container {
  padding: 20px;
  margin: 0 10px;
  margin-bottom: 50px;
  height: 450px;
  max-width: 800px;
  width: 100%;

  background-color: #fff;
  box-shadow: 6px 10px 18px #00000028;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.signup__container {
  padding: 20px;
  margin: 0 10px;
  margin-bottom: 50px;
  height: 600px;
  max-width: 800px;
  width: 100%;

  background-color: #fff;
  box-shadow: 6px 10px 18px #00000028;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.login__header,
.signup__header {
  font-family: "Anton", sans-serif;
  font-size: xx-large;
  font-weight: 100;
}

.login__form,
.signup__form {
  height: 100%;
  width: 100%;
  max-width: 450px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.login__inputs-container {
  height: 40%;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.login__label,
.signup__label {
  font-family: "Abel", sans-serif;
  font-size: 1.3rem;
  letter-spacing: 0.1rem;

  color: rgb(99, 99, 99);
}
.login__form-input {
  padding-left: 10px;
  border: solid 2px #000;
  font-size: x-large;
  height: 50px;
  width: 100%;
}
.signup__form-input {
  padding-left: 10px;
  border: solid 2px #000;
  font-size: x-large;
  height: 50px;
  width: 100%;
}

.login__form a,
.signup__form a {
  font-family: "Anton", sans-serif;
  cursor: pointer;
  transition: 0.2s linear;

  color: rgb(0, 0, 0);
  border-bottom: solid 1px transparent;

  align-self: flex-end;
  text-transform: uppercase;
}

.login__form button,
.signup__form button {
  cursor: pointer;
  font-family: "Anton", sans-serif;
  font-size: 1.1rem;
  font-weight: 100;
  padding: 0.2rem 2.5rem;

  background-color: #fff;

  border: solid 2px #000;
  border-radius: 30px;
  outline: none;

  align-self: flex-end;
}

.login__form button:active,
.signup__form button:active {
  background: #dedede;
}

.login__signup p,
.signup__login p {
  text-align: right;
  color: rgb(99, 99, 99);
  text-transform: uppercase;
}

.login__signup a,
.signup__login a {
  border-bottom: solid 2px #000;
  margin-left: 0.5rem;
  cursor: pointer;
}

.login__signup,
.signup__login {
  margin-bottom: -60px;
  text-align: right;
}

@media screen and (max-width: 500px) {
  .signup__container {
    max-height: 500px;
  }

  .login__form-input {
    height: 30px;
  }
  .signup__form-input {
    height: 30px;
  }

  .login__label,
  .signup__label {
    font-family: "Abel", sans-serif;
    font-size: 1rem;
    letter-spacing: 0.1rem;

    color: rgb(99, 99, 99);
  }
}
</style>
