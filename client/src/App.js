// import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import Axios from "axios";

function Profession({ profession, tiers }) {
  const { ProfessionId, ProfessionName } = profession; // deconstructing profession prop
  const { SkillTierId, SkillTierName, FKProfessionId } = tiers;

  return (
    <div>
      <h1>{ProfessionName}</h1>
      {tiers.map((tier) => {
        if (profession.ProfessionId == tier.FKProfessionId) {
          return <Tier profession={profession} tier={tier} />;
        }
      })}
    </div>
  );
}

function Tier({ profession, tier }) {
  const { ProfessionId, ProfessionName } = profession; // deconstructing profession prop
  const { SkillTierId, SkillTierName, FKProfessionId } = tier;
  return <h6>{tier.SkillTierName}</h6>;
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
        return <Profession key={profession.ProfessionId} profession={profession} tiers={skillTiers} />;
      })}
    </div>
  );
}

export default App;
