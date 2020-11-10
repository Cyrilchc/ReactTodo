import firebase from 'firebase';
import "@firebase/firestore";

var firebaseConfig = {
    apiKey: "AIzaSyA-UDlQYUlXhoI36lUo_HWNkh1oPgxI_Qo",
    authDomain: "todo-57c56.firebaseapp.com",
    databaseURL: "https://todo-57c56.firebaseio.com",
    projectId: "todo-57c56",
    storageBucket: "todo-57c56.appspot.com",
    messagingSenderId: "931285358245",
    appId: "1:931285358245:web:c5a5da1431abe473a59f4c",
    measurementId: "G-HEKDST08QS"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();


export default class Fire {
    constructor(callback) {
        this.init(callback);
    }

    init(callback) {
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }

        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                callback(null);
            }
            else {
                firebase.auth().signInAnonymously().catch(error => {
                    callback(error);
                })
            }
        })
    }

    get ref() {
        return firebase.firestore().collection("List");
    }

    getLists(callback) {
        let ref = this.ref.orderBy("Name");
        this.unsubscribe = ref.onSnapshot(snapshot => {
            let lists = [];
            snapshot.forEach(doc => {
                lists.push({ id: doc.id, ...doc.data() });
            });
            callback(lists);
        }, function (error) {
            console.error(error);
        });
    }

    addList(list){
        let ref = this.ref;
        ref.add(list)
    }

    deleteList(list){
        let ref = this.ref;
        ref.doc(list.id).delete();
    }

    updateList(list){
        let ref = this.ref;
        ref.doc(list.id).update(list);
    }

    detach(){
        this.unsubscribe();
    }
}