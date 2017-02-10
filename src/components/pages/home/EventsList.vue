<template>
  <section class="previous-events">
    <header>
      <h2>Previous Events</h2>
    </header>
    <ul class="events-list">
      <events-list-item v-for="event in events" :event="event"></events-list-item>
    </ul>
  </section>
</template>

<script>
  import EventsListItem from './EventsListItem';

  export default {
    name: 'eventsList',
    props: ['events'],
    components: {
      eventsListItem: EventsListItem,
    },
  };
</script>

<style scoped>
  .previous-events {
    box-sizing: border-box;
    width: 100%;
    max-width: 1440px;
    margin: 0 auto;
    padding: 0;
    clear: both;

    h2 {
      text-align: center;
      margin-bottom: 40px;
    }

    .events-list {
      list-style: none;
      padding: 0;
      margin-bottom: 0;
      box-sizing: border-box;
    }
  }
</style>
