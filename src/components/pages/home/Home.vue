<template>
    <div class="home">
        <section class="bananameister">
            <div class="container">
                <h2>Current Banana Meister: <mark>{{ data.bananaMeister }}</mark> <button v-if="user" @click="editMeister = !editMeister" class="bananameister__edit-link">{{ editMeister ? 'Cancel' : 'Edit' }}</button></h2>
                <transition name="fade">
                    <form class="edit-meister" v-if="editMeister">
                        <label for="newMeister">New Banana Meister</label>
                        <input type="text" v-model="newMeister" />
                        <button @click.prevent="updateMeister(newMeister)" class="bananameister__submit">Update</button>
                    </form>
                </transition>
                <button @click="onUserLogIn" class="bananameister__button" v-if="!user">Sign In</button>
                <div class="controls">
                    <button @click="onUserLogOut" class="bananameister__button" v-if="user">Sign Out</button>
                    <button @click="eventForm = !eventForm" class="bananameister__button" v-if="user">{{ eventForm ? 'Cancel' : 'Add Event' }}</button>
                    <button @click="editEventForm = !editEventForm" class="bananameister__button" v-if="user">{{ editEventForm ? 'Cancel' : 'Edit Event' }}</button>
                </div>
            </div>
        </section>
        <add-event v-if="eventForm" @resetForm="eventForm = $event"></add-event>
        <edit-event v-if="editEventForm" @resetEditForm="editEventForm = $event" :event="activeEvent[0]"></edit-event>
        <active-event v-if="activeEvent" :event="activeEvent[0]" :user="user"></active-event>
        <events-list></events-list>
    </div>
</template>
<script>
import firebase from 'firebase';
import db from '../../../data/firebase';
import AddEvent from './AddEvent';
import ActiveEvent from './ActiveEvent';
import EditEvent from './EditEvent';
import EventsList from './EventsList';

export default {
    name: 'home',
    data() {
        return {
            newMeister: '',
            bananaMeister: '',
            activeEvent: null,
            editMeister: false,
            eventForm: false,
            editEventForm: false,
            user: undefined,
        };
    },
    firebase: {
        data: {
            source: db.ref('data'),
            asObject: true,
        },
        activeEvent: db.ref('events').orderByChild('date').limitToLast(1),
    },
    methods: {
        updateMeister(bananaMeister) {
            this.$firebaseRefs.data.child('bananaMeister').set(bananaMeister);
            this.editMeister = false;
            this.newMeister = '';
        },
        onUserLogIn() {
            const provider = new firebase.auth.GoogleAuthProvider();
            firebase.auth().signInWithPopup(provider)
                // eslint-disable-next-line
                .then((result) => {
                    this.user = result.user.uid;
                    return result;
                })
                // eslint-disable-next-line
                .catch((error) => {
                    return error;
                });
        },
        onUserLogOut() {
            firebase.auth().signOut()
                // eslint-disable-next-line
                .then(() => {
                    this.user = undefined;
                })
                // eslint-disable-next-line
                .catch((error) => {
                    //eslint-disable-next-line
                    console.log('Sign out error', error);
                });
        },
        checkUser() {
            firebase.auth().onAuthStateChanged((user) => {
                if (user) {
                    this.user = user;
                    //eslint-disable-next-line
                    console.log('Check user', user);
                } else {
                    this.user = undefined;
                    //eslint-disable-next-line
                    console.log('User not logged in');
                }
            });
        },
    },
    components: {
        addEvent: AddEvent,
        activeEvent: ActiveEvent,
        editEvent: EditEvent,
        eventsList: EventsList,
    },
};
</script>
<style lang="postcss" scoped>
.bananameister {
    box-sizing: border-box;
    width: 100%;
    margin: 0 auto;
    padding: 0 20px;
    overflow: hidden;
    background: #000;
    color: #fff;
    text-align: center;
    h2 {
        font-size: 16px;
        line-height: 20px;
        float: left;
        mark {
            color: #FEF200;
            background: transparent;
        }
    }
    .controls {
        clear: both;
        width: 100%;
        text-align: left;

        @media(min-width: 600px) {
            float: right;
            clear: none;
            width: auto;
        }
    }
}

.bananameister__edit-link {
    position: relative;
    top: -1px;
    font-size: 12px;
    display: inline-block;
    width: 50px;
    margin-left: 5px;
    background-color: #eaeaea;
    border: 1px solid #d5d5d5;
    border-radius: 5px;
    padding: 3px 5px;
    transition: background 0.4s ease-in;
    cursor: pointer;
    &:hover {}
}

.edit-meister {
    box-sizing: border-box;
    float: left;
    padding: 10px 20px;
    overflow: hidden;
}

.bananameister__button {
    position: relative;
    font-size: 12px;
    display: inline-block;
    width: auto;
    margin: 13px 0 13px 5px;
    background-color: #eaeaea;
    border: 1px solid #d5d5d5;
    border-radius: 5px;
    padding: 3px 5px;
    transition: background 0.4s ease-in;
    cursor: pointer;

    @media(min-width: 600px) {
        float: right;
    }
}

.bananameister__submit {
    background-color: #eaeaea;
    border: 1px solid #d5d5d5;
    border-radius: 5px;
    padding: 3px 5px;
    margin-left: 5px;
}

.container {
    width: 100%;
    max-width: 1440px;
    box-sizing: border-box;
    margin: 0 auto;
}

.fade-enter {
    opacity: 0;
}

.fade-enter-active {
    transition: opacity 0.2s ease-in;
}

.fade-leave {}

.fade-leave-active {
    transition: opacity 0.2s ease-in;
    opacity: 0;
}

.slide-enter {
    height: 0;
}

.slide-enter-active {
    transition: height 0.2s ease-in;
}

.slide-leave {}

.slide-leave-active {
    transition: height 0.2s ease-in;
    height: 0;
}

@keyframes slide-in {
    from {
        transform: translateY(-44px);
    }
    to {
        transform: translateY(0);
    }
}

@keyframes slide-out {
    from {
        transform: translateY(0);
    }
    to {
        transform: translateY(-44px);
    }
}
</style>
