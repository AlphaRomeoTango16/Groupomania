<template>
<div id="post">
  <b-card
    img-src="https://picsum.photos/600/300/?image=25"
    img-alt="Image"
    img-bottom
    tag="article"
    class="mb-2"
  >
    <span id="header">
      <b-card-title>Title</b-card-title>
      <b-avatar src="https://placekitten.com/300/300"></b-avatar>
    </span>
    <b-card-text>
      Some quick example text to build on the card title and make up the bulk of the card's content.
    </b-card-text>
  </b-card>
</div>
</template>

<style lang="scss">
#header {
  display: flex;
  justify-content: space-between;
  padding-bottom: 2%;
}

</style>

<script>
export default {
  name: 'Post'
}

</script>

