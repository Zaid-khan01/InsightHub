import { useState } from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

const AuthForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignup, setIsSignup] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isSignup) {
        await createUserWithEmailAndPassword(auth, email, password);
        alert("Signup Successful!");
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        alert("Login Successful!");
      }
    } catch (err) {
      alert("Auth Error: " + err.message);
    }
  };

  return (
    <div className="p-6 bg-white text-black shadow rounded max-w-md mx-auto mt-20">
      <h2 className="text-xl font-bold mb-4">{isSignup ? "Signup" : "Login"}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="w-full bg-purple-600 text-white py-2 rounded"
        >
          {isSignup ? "Signup" : "Login"}
        </button>
      </form>
      <p
        className="mt-3 text-sm text-blue-600 cursor-pointer"
        onClick={() => setIsSignup(!isSignup)}
      >
        {isSignup ? "Already have an account? Login" : "Don't have an account? Signup"}
      </p>
    </div>
  );
};

export default AuthForm;
