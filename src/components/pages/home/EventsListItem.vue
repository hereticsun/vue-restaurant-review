<template>
    <li class="events-list__event" @click="toggleFlip">
        <div class="events-list__event-content">
            <div class="events-list__event--front" style="background-size: cover;" :style="backgroundImage">
                <header class="events-list__event-header">
                    <h3>{{ event.venue }}</h3>
                    <dl>
                        <dt>Average Rating:</dt>
                        <dd>{{ averageRating }}</dd>
                        <dt>Chosen by:</dt>
                        <dd>{{ event.bananaMeister }} &ndash; {{ event.date | formattedDate }}</dd>
                    </dl>
                </header>
            </div>
            <div class="events-list__event--back">
                <div class="events-list__event__map">
                    <a :href="mapLink"><img :src="mapSrc" :alt="mapAlt"></a>
                </div>
                <ul class="event-info">
                    <li class="event-info__venue">
                        <h4>{{ event.venue }}</h4></li>
                    <li class="event-info__date">Date: {{ event.date }}</li>
                    <li class="event-info__address">Address: {{ event.address }}</li>
                    <li v-if="event.website" class="event-info__website"><a :href="event.website">Visit website</a></li>
                    <li v-if="event.menu" class="event-info__menu"><a :href="event.menu">View menu</a></li>
                    <li class="event-info__meister">Chosen by: <strong>{{ event.bananaMeister }}</strong></li>
                    <li class="event-info__ave-rating">Ave. rating: {{ averageRating }}</li>
                </ul>
            </div>
        </div>
    </li>
</template>
<script>
export default {
    name: 'eventsListItem',
    props: ['event'],
    computed: {
        backgroundImage() {
            const s = `background: linear-gradient(to bottom, rgba(0,0,0,0) 0%,rgba(0,0,0,0.65) 100%), url('${this.event.image}') center center no-repeat /cover`;
            return s;
        },
        averageRating() {
            const values = this.event.rating;
            const l = values.length;
            let sum = 0;

            for (let i = 0; i < l; i += 1) {
                sum += values[i];
            }

            return (sum / l).toFixed(2);
        },
        mapSrc() {
            const src = `https://maps.googleapis.com/maps/api/staticmap?autoscale=2&size=240x270&maptype=roadmap&format=png&visual_refresh=true&markers=size:mid%7Ccolor:0xff0000%7Clabel:%7C${encodeURI(this.event.address)}`;
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
        toggleFlip() {
            this.addEventListener('touchstart', () => {
                this.classList.toggle('hover');
            }, false);
        },
    },
};
</script>
<style>
.events-list__event {
    width: 100%;
    float: left;
    height: 37.5vw;
    min-height: 270px;
    position: relative;
    perspective: 1000px;
    @media(min-width: 769px) {
        width: 50%;
        height: calc((270/1440) * 100vw);
    }
    @media(min-width: 1025px) {
        width: calc((1/3) * 100vw);
        max-width: calc(1440px/3);
        max-height: 270px;
    }
    &:hover .events-list__event-content,
    &.hover .events-list__event-content {
        transform: rotateY(180deg);
    }
    .events-list__event-content {
        position: relative;
        width: 100%;
        height: 100%;
        transition: 0.6s;
        transform-style: preserve-3d;
        .events-list__event--front,
        .events-list__event--back {
            backface-visibility: hidden;
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            box-sizing: border-box;
        }
        .events-list__event--front {
            z-index: 2;
            transform: rotateY(0deg);
            background: linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.65) 100%), url('./img/burger-400.jpg') center center no-repeat #eadeda;
            background-size: cover;
            padding: 0 20px;
            text-shadow: 0px 0px 2px rgba(0, 0, 0, 1);
            color: #fff;
            .events-list__event-header {
                position: absolute;
                bottom: 10px;
            }
        }
        .events-list__event--back {
            transform: rotateY(180deg);
            background: #000;
            color: #fff;
            overflow: hidden;
            a {
                color: #FEF200;
                text-decoration: none;
                &:hover {
                    border-bottom: 1px dotted #FEF200;
                }
            }
            li {
                margin-bottom: 2px;
            }
            .events-list__event__map {
                float: left;
                width: 50%;
                overflow: hidden;
                text-align: center;
                img {
                    min-width: 100%;
                    object-fit: cover;
                    object-position: 50% 50%;
                }
            }
            .event-info {
                float: left;
                width: 50%;
                padding: 20px 0 20px 20px;
                box-sizing: border-box;
                list-style: none;
            }
        }
        h3 {
            margin-bottom: 3px;
            font-size: 18px;
            line-height: 1em;
        }
    }
    dl,
    ul {
        font-size: 14px;
        line-height: 1.4em;
        overflow: hidden;
        margin: 0;
    }
    dt {
        clear: left;
        float: left;
    }
    dd {
        float: left;
        margin-left: 5px;
    }
}
</style>
