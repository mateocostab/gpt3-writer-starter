import Head from "next/head";
import Image from "next/image";
import { useState } from "react";

const Home = () => {
  const [userInput, setUserInput] = useState("");
  const [apiOutput, setApiOutput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const onUserChangedText = (event) => {
    console.log(event.target.value);
    setUserInput(event.target.value);
  };

  const callGenerateEndpoint = async () => {
    setIsGenerating(true);

    console.log("Calling OpenAI...");
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userInput }),
    });

    const data = await response.json();
    const { output } = data;
    console.log("OpenAI replied...", output.text);

    setApiOutput(`${output.text}`);
    setIsGenerating(false);
  };

  return (
    <div className="root">
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h1>Ask BuddAI </h1>
          </div>
          <div className="header-subtitle">
            <h2>
              Ahora puedes escuchar los consejos que necesitas, sin preocuparte
              por lo que puedan pensar los demás. Obtén respuestas a tus
              preguntas rápida y fácilmente con nuestra tecnología de IA.
              ¡Escucha consejos sin la incomodidad de contar lo que te pasa!{" "}
            </h2>
          </div>
        </div>
        <div className="prompt-container">
          <textarea
            className="prompt-box"
            placeholder="Escribe tu pregunta aquí...Tranquilo, no tengo forma de contar lo que me dices."
            value={userInput}
            onChange={onUserChangedText}
          />
          ;
          <div className="prompt-buttons">
            <a className="generate-button" onClick={callGenerateEndpoint}>
              <div className="generate">
                <p>Generar consejo</p>
              </div>
            </a>
          </div>
        </div>
      </div>
      {apiOutput && (
        <div className="output">
          <div className="output-header-container">
            <div className="output-header">
              <h3>Respuesta</h3>
            </div>
          </div>
          <div className="output-content">
            <p>{apiOutput}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
