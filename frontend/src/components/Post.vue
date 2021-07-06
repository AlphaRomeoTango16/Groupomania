<template>
<div id="post">
  <b-card
    img-src="image"
    img-alt="title"
    img-bottom
    tag="article"
    class="mb-2"
  >
    <span id="header">
      <b-card-title>{{ title }}</b-card-title>
      <b-avatar> {{ image }} </b-avatar>
    </span>
    <b-card-text> {{ content }} </b-card-text>
  </b-card>
</div>
</template>

<style lang="scss">
#post {
  margin-bottom: 5%;
}

#header {
  display: flex;
  justify-content: space-between;
  padding-bottom: 2%;
}

</style>

<script>
export default {
  props: {
    url: {
      type: String
    },
    title: {
      type: String
    },
    image: {
      type: String
    },
    content: {
      type: String
    }
  },
  name: 'Post',
  methods: {

  }
}

</script>

