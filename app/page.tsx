"use server"
import { Suspense } from "react";
import Dashboard from "./customComponents/dashboard";
import Loading from "./customComponents/loading";

const Main = async () => {
  return(
    <>
    <Suspense fallback={<Loading/>}>
    <Dashboard/>
    </Suspense>
    </>
  )
}
export default Main;
