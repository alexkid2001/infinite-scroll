<template>
  <div class="person-card">
    <div class="person-card__wrap">
      <div class="person-card__img">
        <img :src="person.picture.large" :alt="person.id.value">
      </div>
      <div class="person-card__info">
        <div class="person-card__name">{{ person.name.title }}. {{ person.name.first }} {{ person.name.last }}</div>
        <div class="person-card__email">{{ person.email }}</div>
        <div class="person-card__phone">{{ person.phone }}</div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  props: {
      person: Object
  },
  data() {
    return {

    };
  }
};
</script>

<style lang="scss" scoped>

</style>
