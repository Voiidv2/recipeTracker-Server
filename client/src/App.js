// import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import Axios from "axios";

function Profession({ profession, tiers, recipes }) {
  const { ProfessionId, ProfessionName } = profession; // deconstructing profession prop
  const { SkillTierId, SkillTierName, FKProfessionId } = tiers;

  return (
    <div>
      <h1>{ProfessionName}</h1>
      {tiers.map((tier) => {
        if (profession.ProfessionId === tier.FKProfessionId) {
          return <Tier key={tier.SkillTierId} profession={profession} tier={tier} recipes={recipes} />;
        }
      })}
    </div>
  );
}

function Tier({ profession, tier, recipes }) {
  const { ProfessionId, ProfessionName } = profession; // deconstructing profession prop
  const { SkillTierId, SkillTierName, FKProfessionId } = tier;
  const { RecipeId, RecipeName, RecipeIcon, SourceType, Source, SourceZone, FKSkillTierId } = recipes;
  // console.log(recipes);
  const getExpansion = () => {
    if (tier.SkillTierName === "Kul Tiran Blacksmithing / Zandalari Blacksmithing") {
      return "Battle for Azeroth";
    } else if (tier.SkillTierName === "Legion Blacksmithing") {
      return "Legion";
    } else if (tier.SkillTierName === "Draenor Blacksmithing") {
      return "Warlords of Draenor";
    } else if (tier.SkillTierName === "Pandaria Blacksmithing") {
      return "Mists of Pandaria";
    } else if (tier.SkillTierName === "Cataclysm Blacksmithing") {
      return "Cataclysm";
    } else if (tier.SkillTierName === "Northrend Blacksmithing") {
      return "Wrath of the Lich King";
    } else if (tier.SkillTierName === "Outland Blacksmithing") {
      return "The Burning Crusade";
    } else if (tier.SkillTierName === "Blacksmithing") {
      return "World of Warcraft";
    } else if (tier.SkillTierName === "Shadowlands Blacksmithing") {
      return "Shadowlands";
    }
  };
  return (
    <>
      <h3>{getExpansion()}</h3>
      <div className="row g-1">
        <Recipe profession={profession} tier={tier} recipes={recipes} />
      </div>
    </>
  );
}

function Recipe({ profession, tier, recipes }) {
  const { ProfessionId, ProfessionName } = profession; // deconstructing profession prop
  const { SkillTierId, SkillTierName, FKProfessionId } = tier;
  const { RecipeId, RecipeName, RecipeIcon, SourceType, Source, SourceZone, FKSkillTierId } = recipes;
  return (
    <>
      <Drop profession={profession} tier={tier} recipes={recipes} />
    </>
  );
}

function Drop({ profession, tier, recipes }) {
  const { ProfessionId, ProfessionName } = profession; // deconstructing profession prop
  const { SkillTierId, SkillTierName, FKProfessionId } = tier;
  const { RecipeId, RecipeName, RecipeIcon, SourceType, Source, SourceZone, FKSkillTierId } = recipes;
  return (
    <>
      <h6>Drops</h6>
      {recipes.map((recipe) => {
        if (tier.SkillTierId === recipe.FKSkillTierId && recipe.SourceType === "Drop") {
          return (
            <img
              key={recipe.RecipeId}
              id={recipe.RecipeId}
              src="https://picsum.photos/200"
              className="rounded-2"
              style={{ maxWidth: "35px" }}
              alt={recipe.RecipeName}
            ></img>
          );
        }
      })}
    </>
  );
}

function App() {
  const [professions, setProfessions] = useState([{ ProfessionId: 164, ProfessionName: "Blacksmithing" }]);
  const [skillTiers, setSkillTiers] = useState([]);
  const [recipes, setRecipes] = useState([]);

  const getProfessions = () => {
    Axios.get("http://localhost:3001/professions").then((response) => {
      // setProfessions(response.data);
    });
  };

  const getSkillTiers = () => {
    Axios.get("http://localhost:3001/skilltiers").then((response) => {
      setSkillTiers(response.data);
    });
  };

  const getRecipes = () => {
    Axios.get("http://localhost:3001/recipes").then((response) => {
      setRecipes(response.data);
    });
  };

  useEffect(() => {
    getProfessions();
    getSkillTiers();
    getRecipes();
  }, []);
  // console.log(professions);
  return (
    <div className="container">
      {professions.map((profession) => {
        return (
          <Profession key={profession.ProfessionId} profession={profession} tiers={skillTiers} recipes={recipes} />
        );
      })}
    </div>
  );
}

export default App;

// function Drop({ profession, tier, recipes }) {
//   const { ProfessionId, ProfessionName } = profession; // deconstructing profession prop
//   const { SkillTierId, SkillTierName, FKProfessionId } = tier;
//   const { RecipeId, RecipeName, RecipeIcon, SourceType, Source, SourceZone, FKSkillTierId } = recipes;
//   return (
//     <>
//       <h6>Drops</h6>
//       {recipes.map((recipe) => {
//         if (tier.SkillTierId === recipe.FKSkillTierId) {
//           return (
//             <img
//               key={recipe.RecipeId}
//               id={recipe.RecipeId}
//               src="https://picsum.photos/200"
//               className="rounded-2"
//               style={{ maxWidth: "35px" }}
//               alt={recipe.RecipeName}
//             ></img>
//           );
//         }
//       })}
//     </>
//   );
// }
