import firebase from 'firebase/app';
import 'firebase/firestore';
import FirestorePersistence, {getSnapshot} from './Firestore';
import expect from 'expect';

describe("FirestoreProvider", ()=>{
    const config = {
        apiKey: "AIzaSyAEimivowRPliJkAdr7RhYvzaunoD2b9W0",
        authDomain: "numbani-framework.firebaseapp.com",
        databaseURL: "https://numbani-framework.firebaseio.com",
        projectId: "numbani-framework",
        storageBucket: "numbani-framework.appspot.com",
        messagingSenderId: "146150168433"
    };
    firebase.initializeApp(config);
    const db = firebase.firestore();
    const provider = new FirestorePersistence(db, {
        mapDocId : value => value.UID
    });
    
    it('Provide zero-config implementation', ()=>{
        expect(new FirestorePersistence(db)).toExist();
    });

    it.skip('it saves and read back the magic number', ()=>{
        const magicNumber = Math.floor(Math.random()*100);
        return provider
            .at("test")
            .save({ UID : "it saves the magic number", magicNumber})
            .then(ref => {
                expect(ref.id).toBe("it saves the magic number");
                return provider.read(ref);
            })
            .then(data => {
                expect(data.magicNumber).toBe(magicNumber);
                expect(getSnapshot(data)).toExist();
            });
    });
});