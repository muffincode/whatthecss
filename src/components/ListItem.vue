<template>
  <span v-if="language == 'en'">
    {{ en[value] }}
  </span>
  <span v-if="language == 'fr'">
    {{ fr[value] }}
  </span>
</template>

<script>
export default {
  name: "ListItem",
  data: () => {
    return {
      en: {
        every: "every",
        the: "the",
        in: "in",
        "that-has-class-item": "that has class 'item'",
        "that-has-class-big": "that has class 'big'",
        "that-has-id-one": "that has id 'one'",
        "direct-child-of": "that is a direct child of",
        "element-section": "<section>",
        "element-div": "<div>",
        "element-p": "<p>",
        "element-img": "<img>",
      },
      fr: {
        every: "toutes les",
        the: "la",
        in: "dans",
        "that-has-class-item": "qui ont la classe 'item'",
        "that-has-class-big": "qui ont la classe 'big'",
        "that-has-id-one": "qui a l'id 'one'",
        "direct-child-of": "qui est l'enfant direct de",
        "element-section": "<section>",
        "element-div": "<div>",
        "element-p": "<p>",
        "element-img": "<img>",
      },
    };
  },
  props: {
    value: String,
    language: String,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
