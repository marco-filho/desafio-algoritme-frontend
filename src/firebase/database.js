import {
  getDatabase,
  ref,
  get,
  query,
  orderByChild,
  push,
  set,
  increment,
  update,
  equalTo,
  remove,
  onValue
} from "firebase/database";
import { getAuth } from "firebase/auth";
// eslint-disable-next-line no-unused-vars
import firebase from "./"

let _uid, dbRef;
getAuth().onAuthStateChanged((user) => {
  if (user) {
    _uid = user.uid
    dbRef = ref(getDatabase(), `${_uid}/clients`)
  }
})

const db = {
  getOne: async (id) => {
    try {
      const q = query(dbRef, orderByChild("id"), equalTo(id))
      const snapshot = await get(q)
      return snapshot.exists() ? Object.values(snapshot.val())[0] : {}
    } catch (error) {
      console.error(error);
    }
  },
  getAll: async () => {
    try {
      const q = query(dbRef, orderByChild("id"))
      const snapshot = await get(q);
      if (snapshot.exists())
        return snapshot.val();
      else
        console.log("No list available");
    } catch (error) {
      console.error(error);
    }
  },
  create: (newObj) => {
    const countRef = ref(getDatabase(), `${_uid}/clients-count`)
    set(countRef, increment(1))
      .then(() => {
        get(countRef)
          .then((snapshot) => {
            newObj.id = snapshot.val()
            push(dbRef, newObj)
          })
      })
  },
  update: (updateObj) => {
    const q = query(dbRef, orderByChild("id"), equalTo(updateObj.id))
    get(q)
      .then((snapshot) => {
        const key = snapshot.exists() ? Object.keys(snapshot.val())[0] : -1
        const updateRef = ref(getDatabase(), `${_uid}/clients/${key}`)
        update(updateRef, updateObj).then(() => console.log(updateObj))
      })
  },
  delete: (id) => {
    const q = query(dbRef, orderByChild("id"), equalTo(id))
    get(q)
      .then((snapshot) => {
        const key = snapshot.exists() ? Object.keys(snapshot.val())[0] : -1
        const deleteRef = ref(getDatabase(), `${_uid}/clients/${key}`)
        remove(deleteRef).then(() => console.log("Deleted!"))
      })
  },
  refreshOn: (set) => {
    const q = query(dbRef, orderByChild("id"))
    onValue(q, (snapshot) => set(snapshot.val() ? Object.values(snapshot.val()) : []))
  }
}
  
export default db