<template>
  <main>
    <div id="lang">
      <a href="#" v-on:click="lang('fr')">FR</a>
      <a href="#" v-on:click="lang('en')">EN</a>
    </div>

    <article :class="{ success: success, error: error }">
      <p>
        {{
          language == "en"
            ? "What does this CSS selector mean?"
            : "Que veut dire ce sélecteur CSS ?"
        }}
      </p>
      <h2>{{ currentProblem.selector }}</h2>
      <ul
        class="animate__animated"
        :class="{ empty: a === '', animate__headShake: full }"
      >
        <li
          v-for="(a, i) in currentAnswer"
          :key="i"
          class="animate__animated"
          :class="{
            empty: a === '',
            animate__headShake: error,
            animate__bounce: success,
          }"
          v-on:click="empty(i)"
        >
          <ListItem :value="a" :language="language" />
        </li>
      </ul>

      <p v-if="success && language == 'en'">
        🥳 <b>Well done!</b> Ready for the
        <a href="#" @click="next">next one</a>?
      </p>
      <p v-if="success && language == 'fr'">
        🥳 <b>Bravo!</b> Prêt·e pour <a href="#" @click="next">un autre</a>?
      </p>

      <p v-if="error">
        {{
          language == "en"
            ? "Something's wrong, try again!"
            : "Quelque chose ne va pas, vérifiez votre réponse."
        }}
      </p>
      <p v-if="!success">
        <a href="#" v-on:click="check">
          {{ language == "en" ? "Check" : "Vérifier" }}
        </a>
        -
        <a href="#" v-on:click="reset">
          {{ language == "en" ? "Reset" : "Réinitialiser" }}
        </a>
        -
        <a href="#" v-on:click="next">
          {{ language == "en" ? "Another" : "Je passe" }}
        </a>
      </p>
    </article>
    <section>
      <ul>
        <li
          v-for="(elem, i) in currentProblem.available"
          :key="i"
          v-on:click="addToAnswer(elem, i)"
          class="animate__animated"
          :class="{ clicked: elem.clicked }"
        >
          <ListItem :value="elem.text" :language="language" />
        </li>
      </ul>
    </section>

    <aside>
      <h1>what is this</h1>
      <p>Learn CSS selectors by translating them.</p>
      <p>
        Currently <b>{{ values.length }}</b> selectors available
      </p>
      <hr />
      <p><i>Made by Camille F.</i> 🧁</p>
      <a href="https://github.com/muffincode">Github</a>
    </aside>
  </main>
</template>

<script>
import "animate.css";
import { db, getRandomElement } from "./assets/elements.js";
import ListItem from "./components/ListItem.vue";

const compareArrays = (a, b) =>
  a.length === b.length && a.every((element, index) => element === b[index]);

export default {
  name: "App",
  data: () => {
    return {
      language: "en",
      success: false,
      error: false,
      full: false,
      currentAnswer: [],
      currentProblem: {},
      values: [],
    };
  },
  components: { ListItem },
  methods: {
    addToAnswer: function (elem, index) {
      this.error = false;
      this.currentProblem.available[index].clicked = true;
      let i = this.currentAnswer.indexOf("");
      if (i === -1) {
        this.full = true;
        setTimeout(() => {
          this.full = false;
        }, 500);
      }
      this.currentAnswer[i] = elem.text;
    },
    check: function () {
      if (compareArrays(this.currentAnswer, this.currentProblem.answer)) {
        this.success = true;
      } else {
        this.error = true;
      }
    },
    reset: function () {
      this.success = false;
      this.error = false;
      this.currentAnswer = [];
      this.currentProblem.answer.forEach(() => this.currentAnswer.push(""));
      this.currentProblem.available = [...this.currentProblem.answer];
      for (let i = 0; i < 2; i++) {
        this.currentProblem.available.push(getRandomElement());
      }
      this.currentProblem.available = this.currentProblem.available.sort(
        (a, b) => 0.5 - Math.random()
      );
      this.currentProblem.available = this.currentProblem.available.map((e) => {
        return { text: e, clicked: false };
      });
    },
    empty: function (index) {
      this.currentAnswer[index] = "";
    },
    next: function () {
      this.currentProblem = db[Math.floor(Math.random() * db.length)];
      this.reset();
    },
    lang: function (l) {
      this.language = l;
    },
  },
  created() {
    this.values = db;
    this.currentProblem = db[0];
    this.reset();
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Unbounded:wght@200;400;700&display=swap");

body {
  font-family: Unbounded, Arial, sans-serif;
  background: #2E294E;
  color: white;
  margin: 0;
  h1,
  h2 {
    margin: 0;
  }
}

a {
  color: #2E294E;
}

#lang {
  position: fixed;
  top: 0;
  left: 0;
  background: white;
  padding: 0.5em;
}

main {
  height: 100vh;
  display: grid;
  grid-template-columns: 5fr 1fr;
  grid-template-rows: 2fr 1fr;
  > * {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
}

ul {
  list-style: none;
  display: flex;
  gap: 5px;
  margin: 0;
  padding: 0;
}
li {
  background: #D90368;
  bottom: 0;
  padding: 1em;
  border-radius: 5px;
  box-shadow: 2px 2px 0px #2E294E;
  display: flex;
  align-items: center;
  &.empty {
    min-width: 50px;
    min-height: 1.5em;
  }
  &.clicked {
    opacity: 0.5;
  }
}

/* Current problem */

article {
  background: #FFD400;
  grid-column: 1 / 2;
  grid-row: 1 / 2;
  transition: background 500ms;
  h2 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }
  ul {
    margin: 2em 0;
  }
  &.success {
    background: #659157;
  }
  &.error {
    background: #EE6123;
  }
}

/* Available answers */

section {
  background: #F1E9DA;
  grid-column: 1 / 2;
  grid-row: 2 / 2;
}

section ul li {
  position: relative;
  transition: bottom 350ms;
  &:hover {
    cursor: pointer;
    bottom: 10px;
  }
}

aside {
  display: block;
  padding: 1em;
  grid-row: 1 / 3;
  a {
    color: #FFD400;
  }
}

@media only screen and (max-width: 600px) {
  main {
    display: flex;
    flex-direction: column;
  }
  article {
    min-height: 49vh;
  }
  section {
    padding: 1em;
    min-height: 49vh;
  }
}
</style>
