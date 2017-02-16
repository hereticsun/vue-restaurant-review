<template>
    <section class="event event--active" v-if="event">
        <div class="event__content">
            <header class="event__header" :style="{background: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%,rgba(0,0,0,0.65) 100%), url(' + eventImage + ') center center no-repeat / cover'}">
                <div>
                    <h2>{{ event.venue }}</h2>
                    <h3>{{ event.date | formattedDate }}</h3>
                </div>
            </header>
            <div id="map" class="event__map">
                <a :href="mapLink" :style="`background: url('${mapSrc}') center center /cover`">
                    <span class="vhdn">Google map of {{ event.venue }}</span>
                </a>
            </div>
            <ul class="event-info">
                <li class="event-info__date">Date: {{ event.date | formattedDate }}</li>
                <li class="event-info__address">Address: {{ event.address }}</li>
                <li v-if="event.website" class="event-info__website"><a :href="event.website">Visit website</a></li>
                <li v-if="event.menu" class="event-info__menu"><a :href="event.menu">View menu</a></li>
                <li class="event-info__meister">Chosen by: <strong>{{ event.bananaMeister }}</strong></li>
                <li v-if="user" class="event-info__rating">
                    Rate this restaurant:
                    <div class="event__rating" :class="{ submitted: isSubmitted }">
                        <span @click="submitRating(5)">&#9734;</span>
                        <span @click="submitRating(4)">&#9734;</span>
                        <span @click="submitRating(3)">&#9734;</span>
                        <span @click="submitRating(2)">&#9734;</span>
                        <span @click="submitRating(1)">&#9734;</span>
                    </div>
                </li>
                <li v-if="averageRating > 0" class="event-info__ave-rating">Ave. rating: {{ averageRating }}</li>
            </ul>
        </div>
    </section>
</template>
<script>
export default {
    name: 'activeEvent',
    data() {
        return {
            isSubmitted: false,
        };
    },
    props: ['event', 'user'],
    computed: {
        averageRating() {
            const values = this.event.rating;
            const l = values.length;
            let sum = 0;

            for (let i = 0; i < l; i += 1) {
                sum += values[i];
            }

            return (sum / l).toFixed(2);
        },
        eventImage() {
            if (this.event.image) {
                return this.event.image;
            }

            return './img/burger-400.jpg';
        },
        mapSrc() {
            const src = `https://maps.googleapis.com/maps/api/staticmap?autoscale=2&size=408x408&maptype=roadmap&format=png&visual_refresh=true&markers=size:mid%7Ccolor:0xff0000%7Clabel:%7C${encodeURI(this.event.address)}`;
            return src;
        },
        mapLink() {
            const link = `https://www.google.com/maps/dir//${encodeURI(this.event.address)}/`;
            return link;
        },
        mapAlt() {
            const alt = `Google Map of ${this.event.venue}`;
            return alt;
        },
    },
    methods: {
        submitRating(star) {
            if (this.event.rating[0] === 0 && this.event.rating.length === 1) {
                this.event.rating[0] = star;
            } else {
                this.event.rating.push(star);
            }

            this.isSubmitted = true;
            // eslint-disable-next-line
            console.log('Ratings: ', this.event.rating);
            this.$firebaseRefs.events.child(this.event['.key']).child('rating').set(this.event.rating);
        },
    },
};
</script>
<style scoped>
.event {
    box-sizing: border-box;
    width: 100%;
    max-width: 1440px;
    margin: 0 auto 80px;
    padding: 0;
    clear: both;
    overflow: hidden;
    background: #eaeaea;
    .event__content {
        width: 100%;
        background: #eaeaea;
        @media(min-width: 769px) {
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            align-items: stretch;
        }
        .event__header {
            box-sizing: border-box;
            width: 100%;
            height: calc((408/1440) * 100vw);
            min-height: 360px;
            padding: 10px;
            color: #fff;
            text-align: center;
            text-shadow: 0px 0px 2px rgba(0, 0, 0, 1);
            display: flex;
            flex-direction: row;
            align-items: center;

            @media(min-width: 769px) {
                width: 50%;
            }

            > div {
                width: 100%;
            }

            h2 {
                font-size: 64px;
                margin: 0 auto 0;
            }
        }
        .event__map {
            width: 50%;
            float: left;
            overflow: hidden;
            @media(min-width: 769px) {
                width: calc(50% - ((1/3) * 100%));
                float: none;
            }
            a {
                display: block;
                width: 100%;
                height: 100%;
            }
            img {
                min-width: 100%;
                object-fit: cover;
                object-position: 50% 50%;
            }
        }
        .event-info {
            box-sizing: border-box;
            padding: 10px 20px;
            width: 50%;
            float: left;
            list-style: none;
            font-size: 16px;
            line-height: 20px;
            @media(min-width: 769px) {
                width: calc((1/3) * 100%);
                float: none;
            }
            li {
                background-position: left center;
                background-repeat: no-repeat;
                background-size: 20px;
                padding: 3px 0 3px 30px;
                a {
                    color: #415c76;
                    border-bottom: 1px dotted #415c76;
                    text-decoration: none;
                    transition: border-style 0.2s ease-in;
                    &:hover {
                        border-bottom: 1px solid #415c76;
                    }
                }
            }
            &__date {
                background-image: url('./img/calendar.png');
            }
            &__address {
                background-image: url('./img/map-pin.png');
            }
            &__website {
                background-image: url('./img/link.png');
            }
            &__menu {
                background-image: url('./img/menu.png');
            }
            &__meister {
                background-image: url('./img/banana.png');
            }
            li.event-info__rating {
                padding: 3px 0 0 30px;
            }
            li.event-info__ave-rating {
                padding: 0 0 3px 30px;
            }
        }
    }
    .event__rating {
        unicode-bidi: bidi-override;
        direction: rtl;
        > span {
            display: inline-block;
            position: relative;
            width: 1.1em;
            &:hover:before,
            > span:hover ~ span:before {
                content: "\2605";
                position: absolute;
                color: #FEF200;
            }
        }
        > span:hover:before,
        > span:hover ~ span:before {
            content: "\2605";
            position: absolute;
            color: #FEF200;
        }
    }
}

.vhdn {
    border: 0;
    clip: rect(0 0 0 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    width: 1px;
}
</style>
