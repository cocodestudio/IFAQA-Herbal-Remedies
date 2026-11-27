// Lightweight server-only stub so Next.js SSR in Cloudflare Workers never bundles or evaluates
// Firebase/Firestore/protobufjs codegen (which uses Function() disallowed in workerd).

const noop = () => {};
const asyncNull = async () => null;
const emptySnapshot = async () => ({
  docs: [],
  empty: true,
  size: 0,
  forEach: noop,
  exists: () => false,
  data: () => undefined,
});

export const getApps = () => [];
export const getApp = () => null;
export const initializeApp = () => null;

export const getAuth = () => null;
export const onAuthStateChanged = () => noop;
export const signInWithEmailAndPassword = asyncNull;
export const signInWithPhoneNumber = asyncNull;
export const signOut = async () => undefined;
export class RecaptchaVerifier {
  clear() {}
  render() {
    return Promise.resolve(0);
  }
}

export const getFirestore = () => null;
export const collection = () => null;
export const doc = () => null;
export const query = () => null;
export const where = () => null;
export const orderBy = () => null;
export const limit = () => null;
export const getDoc = emptySnapshot;
export const getDocs = emptySnapshot;
export const setDoc = async () => undefined;
export const updateDoc = async () => undefined;
export const addDoc = asyncNull;
export const deleteDoc = async () => undefined;
export const onSnapshot = () => noop;
export const serverTimestamp = () => null;
export class Timestamp {
  static now() {
    return new Timestamp();
  }
  toDate() {
    return new Date();
  }
}

export const getStorage = () => null;
export const ref = () => null;
export const uploadBytes = asyncNull;
export const getDownloadURL = async () => '';
export const deleteObject = async () => undefined;
