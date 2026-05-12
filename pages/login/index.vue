<template>
  <el-container>
    <el-col style="text-align:center">
      <h1>Login</h1>
      <el-divider></el-divider>
      <span style="color:red"
        ><i>{{ message }}</i></span
      >

      <div style="max-width: 400px; margin: 0 auto;">
        <el-form @submit.native.prevent="login">
          <el-form-item>
            <el-input
              v-model="auth.email"
              placeholder="Username / Email"
              prefix-icon="el-icon-user"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-input
              v-model="auth.password"
              type="password"
              placeholder="Password"
              prefix-icon="el-icon-lock"
              show-password
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="login" style="width: 100%"
              >Login</el-button
            >
          </el-form-item>
        </el-form>
      </div>

      <el-divider>or</el-divider>

      <div v-if="$auth">
        <div style="margin-bottom:20px">
          <el-button @click="$auth.loginWith('facebook')" round type="primary"
            >Login with Facebook</el-button
          >
        </div>
        <div style="margin-bottom:20px">
          <el-button @click="$auth.loginWith('google')" round type="danger"
            >Login with Google</el-button
          >
        </div>
        <div style="margin-bottom:20px">
          <el-button @click="$auth.loginWith('auth0')" round type="warning"
            >Login with Auth0</el-button
          >
        </div>
        <div style="margin-bottom:20px">
          <el-button @click="$auth.loginWith('github')" round type="default"
            >Login with Github</el-button
          >
        </div>
      </div>
    </el-col>
  </el-container>
</template>

<script>
export default {
  auth: "guest",
  head: {
    title: "Login"
  },
  data() {
    return {
      message: "",
      auth: {
        email: null,
        password: null
      },
      error: null
    };
  },
  methods: {
    async login() {
      this.error = null;
      this.message = "";

      if (!this.$auth) {
        this.message = "Auth module not loaded";
        return;
      }

      try {
        await this.$auth.loginWith("local", {
          data: {
            username: this.auth.email,
            password: this.auth.password
          }
        });
      } catch (e) {
        this.error = e + "";
        this.message = "Login failed";
      }
    }
  },
  computed: {
    redirect() {
      return (
        this.$route.query.redirect &&
        decodeURIComponent(this.$route.query.redirect)
      );
    },
    isCallback() {
      return Boolean(this.$route.query.callback);
    }
  }
};
</script>
