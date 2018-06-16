<template>
  <div id="app">
    <h1 id="title">
      <span>员工言职在线论坛</span></h1>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

  /* body{
    background:url("./assets/bg.jpg")
  } */
  body{
    background: aliceblue;
  }
  h1>span{
    text-shadow:0 0 10px #e4e7ed;
  }
</style>
