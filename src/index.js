import './js/'
import './assets/scss/main.scss'

/**
 * const API url
 * @constant
 * @type {string}
 * @default
 */
const baseUrl = "https://randomuser.me/api/?seed=abc";


/**
 *
 * @namespace Vue
 */
window.Vue = require('vue');

/**
 * @memberOf Vue
 * @instance
 */
Vue.component('person-card', require('./components/PersonCard.vue').default);

/**
 * @memberOf Vue
 * @instance
 */
const app = new Vue({
  el: '#app',
  data: {
    /** type {Array}*/
    people: [],
    /** type {Number} - quantity of items in package */
    quantity: 12,
    pageCnt: 1,
    showLoader: false,
    observer: null
  },
  methods: {
    /**
     * method to get data from API
     * @method getPeople
     */

    getPeople() {
      /**
       * Create API url with params
       * @constant
       * @type {string}
       */
      const url = `${baseUrl}&page=${this.pageCnt++}&results=${this.quantity}`;
      /**
       * async function get request from API
       * @async
       * @method fetch
       * @params {string} url - API url
       * @return {Array} people - Array of users
        */
      fetch(url)
        .then(response => {
            return response.json();
        })
        .then(data => {
          this.people = this.people.concat(data.results);
          this.showLoader = false;
          this.onScroll();
        })
        .catch(err => console.log(err));
    },

    /**
     * method provides a way to asynchronously observe changes in the intersection of a target element with an ancestor element
     * @method onScroll
     * @async
     */
    onScroll() {
      /**
       * @constructs observer
       * @type {IntersectionObserver}
       */
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if( entry.intersectionRatio > 0) {
            this.showLoader = true;
            this.getPeople();
          }
        })
      });

      observer.observe(this.$refs.infiniteScrollTrigger);
    }
  },
  mounted() {
    this.getPeople();
  }
})
