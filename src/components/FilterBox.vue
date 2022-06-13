<template>
  <div @click="fire" :class="filter + ' filter-item'" :style="`background-image:url(${a})`">
    <!-- 클래스를 하나 더 만들어도 괜찮음 -->
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "filterbox-vue",
  methods:{
    fire(){
      this.emitter.emit('boxClick',this.filter);
      console.log(this.filter);
    }
  },
  props: {
    a: String,
    filter: String,
  },
};
</script>

<style>
.filter-item {
  width: 100px;
  height: 100px;
  margin: 10px 10px 10px auto;
  padding: 8px;
  display: inline-block;
  color: white;
  background-size: cover;
  background-position: center;
}
</style>