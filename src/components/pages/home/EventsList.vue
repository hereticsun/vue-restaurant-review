<template>
    <section class="previous-events">
        <header>
            <h2>Previous Events</h2>
        </header>
        <ul class="events-list">
            <events-list-item v-for="event in sortedEvents" :event="event"></events-list-item>
        </ul>
    </section>
</template>
<script>
import db from '../../../data/firebase';
import EventsListItem from './EventsListItem';

export default {
    name: 'eventsList',
    components: {
        eventsListItem: EventsListItem,
    },
    firebase: {
        data: {
            source: db.ref('data'),
            asObject: true,
        },
        events: db.ref('events').orderByChild('date'),
        activeEvent: db.ref('events').orderByChild('date').limitToLast(1),
    },
    computed: {
        sortedEvents() {
            const eventsList = this.events;
            return eventsList.slice().reverse().splice(1);
        },
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
