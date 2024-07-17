import { auth } from "../firebase/firebase";

export default function Home(){
    const logOut = () => {
        auth.signOut();
    }
    return <h1><button onClick={logOut}>Logout</button></h1>;
}