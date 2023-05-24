<template>
  <div id="app">

      <PGage/>

  </div>
</template>

<script>
import  PGage from "./components/PGage.vue";
import bus from "./assets/eventBus";
export default {
  name: "App",
  data() {
    return {
      resizeFn: null, //zi自适应
      sonTo: "ini"
    };
  },
  components: {
   PGage
  },
  mounted() {
    //zishi自适应大小
    const documentWidth = document.body.offsetWidth;
    const ratio = documentWidth / 1920;
    if (documentWidth > 1920) {
      document.body.style.transform = `scale(${ratio}, ${ratio})`;
    }
    this.resizeFn = this.$debounce(function() {
      const documentWidth = document.body.offsetWidth;
      const ratio = documentWidth / 1920;
      if (documentWidth > 1920) {
        document.body.style.transform = `scale(${ratio}, ${ratio})`;
      }
    }, 200);
    window.addEventListener("resize", this.resizeFn);
     bus.$on("index", mes => {
        this.sonTo = mes;
      });
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.resizeFn);
  }
};
</script>

<style>

html,
body {
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
  border: 0;
  background-color: rgba(255, 255, 255, 0.993);
   background-size: cover;
  background-position: center center;
  min-height: 100%;
   overflow-y: hidden;
    overflow-x: hidden;
}
html {
    font-size: 20px;
}
body {
    transform-origin: left top;
    background-size: 2560px 1600px;
}

</style>
