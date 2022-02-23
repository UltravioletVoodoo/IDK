import { useState } from "react";
import Base from "../components/base";
import Generator from "../components/generator";
import Output from "../components/output";

export default function Index() {
  const [idkValue, setIdkValue] = useState("I Don't Know")

  return (
    <>
      <Base />
      <div className="titleContainer">
        <p className="titleText">I.D.K.</p>
      </div>
      <Generator setter={setIdkValue} />
      <Output idkValue={idkValue} />
      <style jsx>{`
      .titleContainer {
        width: 100%;
        text-align: center;
        margin-top: 50px;
      }
      .titleText {
        font-size: 64px;
        font-weight: bold;
      }
      `}</style>
    </>
  )
}
