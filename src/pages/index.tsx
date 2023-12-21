import Image from "next/image";
import { Inter } from "next/font/google";
import PageLayout from "@/components/shared/pagelayout";
import { useRouter } from "next/router";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const router = useRouter();

  return (
    <PageLayout>
      <div className="flex flex-col items-center p-12 justify-center  space-y-6">
        <h1 className="font-monsterrat">Welcome to the Social Dashboard</h1>
        <p>Description/images</p>
        <br />
        <button
          className="btn btn-primary w-1/4"
          onClick={() => router.push("/login")}
        >
          {" "}
          Login
        </button>
        <button
          className="btn btn-primary w-1/4"
          onClick={() => router.push("/register")}
        >
          Register
        </button>
      </div>
    </PageLayout>
  );
}
