<template>
    <section class="add-event">
        <div class="container">
            <form>
                <h2>Create an event</h2>
                <fieldset>
                    <ul>
                        <li>
                            <label for="eventdate">Date:</label>
                            <datepicker name="eventdate" placeholder="Event date" format="yyyy-MM-dd" v-model="event.date" ></datepicker>
                        </li>
                        <li>
                            <label for="eventvenue">Venue name:</label>
                            <input name="eventvenue" type="text" placeholder="Venue name" v-model="event.venue" required />
                        </li>
                        <li>
                            <label for="eventaddress">Address:</label>
                            <input name="eventaddress" type="text" placeholder="Venue address" v-model="event.address" required />
                        </li>
                        <li>
                            <label for="eventimage">Image URL:</label>
                            <input name="eventimage" type="url" placeholder="Image URL" v-model="event.image" required />
                        </li>
                        <li>
                            <label for="eventwebsite">Website URL:</label>
                            <input name="eventwebsite" type="url" placeholder="Venue website URL" v-model="event.website" />
                        </li>
                        <li>
                            <label for="eventmenu">Menu URL:</label>
                            <input name="eventmenu" type="url" placeholder="Menu URL" v-model="event.menu" />
                        </li>
                        <li>
                            <button @click.prevent="addEvent">Create Event</button>
                    </ul>
                </fieldset>
            </form>
        </div>
    </section>
</template>
<script>
import Datepicker from 'vuejs-datepicker';

export default {
    data() {
        return {
            event: {
                date: '',
                venue: '',
                address: '',
                image: '',
                website: '',
                menu: '',
                bananaMeister: '',
            },
            resource: {},
        };
    },
    methods: {
        addEvent() {
            const event = {
                date: this.formattedDate(this.event.date),
                venue: this.event.venue,
                address: this.event.address,
                image: this.event.image,
                website: this.event.website,
                menu: this.event.menu,
                rating: [0],
                bananaMeister: this.event.bananaMeister,
            };
            this.resource.save({}, event);
            this.$emit('resetForm', false);
        },
        fetchData() {
            this.$http.get('data.json')
                .then((response) => {
                    const data = response.json();
                    return data;
                })
                .then((data) => {
                    this.event.bananaMeister = data.bananaMeister;
                });
        },
        formattedDate(date) {
            const d = new Date(date);
            return [d.getFullYear(), d.getMonth() + 1, d.getDate()].join('/');
        },
    },
    components: {
        Datepicker,
    },
    created() {
        this.resource = this.$resource('events.json');
        this.fetchData();
    },
};
</script>
<style>
.add-event {
    box-sizing: border-box;
    width: 100%;
    max-width: 1440px;
    margin: 0 auto;
    padding: 0 20px 80px;
    clear: both;
    text-align: center;

    h2 {
        text-align: center;
        margin: 80px auto 40px;
    }

    .container {
        width: 100%;
        max-width: 1440px;
        box-sizing: border-box;
        margin: 0 auto;
    }

    fieldset {
        border: none;
        padding: 0;
    }

    ul {
        list-style: none;
        padding-left: 0;
        margin: 0;
    }

    input,
    .datepicker > input {
        box-sizing: border-box;
        width: 300px;
        max-width: 100%;
        @include font(16, 16);
        padding: 12px 10px 7px;
        border: 1px solid #2c3e50;
        box-shadow: inset 0 0 6px 1px rgba(#000, 0.25);
        appearance: none;
        margin: 10px 0 40px;
    }

    label {
        width: 100%;
        display: block;
        @include font(14, 22);
    }

    .calendar {
        left: 50%;
        margin: 0 0 0 -150px;
    }

    button {
        background-color: #eaeaea;
        border: 1px solid #d5d5d5;
        border-radius: 5px;
        padding: 3px 5px;
        margin-left: 5px;
    }
}
</style>
