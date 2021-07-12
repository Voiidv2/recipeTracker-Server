// import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import Axios from "axios";

function Profession({ profession, tiers }) {
  const { ProfessionId, ProfessionName } = profession; // deconstructing profession prop
  const { SkillTierId, SkillTierName, FKProfessionId } = tiers;
  tiers.forEach((tier) => console.log(tier.FKProfessionId));
  return (
    <div>
      <h1>{ProfessionName}</h1>
    </div>
  );
}

function App() {
  const [professions, setProfessions] = useState([]);
  const [skillTiers, setSkillTiers] = useState([]);

  const getProfessions = () => {
    Axios.get("http://localhost:3001/professions").then((response) => {
      setProfessions(response.data);
    });
  };

  const getSkillTiers = () => {
    Axios.get("http://localhost:3001/skilltiers").then((response) => {
      setSkillTiers(response.data);
    });
  };

  useEffect(() => {
    getProfessions();
    getSkillTiers();
  }, []);
  // console.log(skillTiers);
  return (
    <div className="App">
      {professions.map((profession) => {
        return <Profession key={profession.id} profession={profession} tiers={skillTiers} />;
      })}
    </div>
  );
}

export default App;
