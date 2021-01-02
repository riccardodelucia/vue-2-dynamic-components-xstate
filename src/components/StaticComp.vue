<template>
  <div>
    <button>Test</button>
    <div class="page-container">
      <div>
        <h1>
          State:
        </h1>
        <p>{{ text }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      text: "test-text"
    };
  }
};
</script>

<style>
.page-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 500px;
  margin: 50px;
  background-color: yellowgreen;
}
</style>
