// import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import Axios from "axios";

function Profession({ profession, tiers, recipes, sourceTypes, sources }) {
  return (
    <div id={profession.ProfessionId}>
      <header className="row text-center">
        <h1>{profession.ProfessionName}</h1>
      </header>
      <section>
        {tiers.map((expansion) => {
          if (expansion.FKProfessionId === profession.ProfessionId) {
            return <Expansion key={expansion.SkillTierId} recipes={recipes} expansion={expansion} />;
          }
        })}
      </section>
    </div>
  );
}

function Expansion({ profession, expansion, recipes, sourceTypes, sources }) {
  const getExpansion = () => {
    if (expansion.SkillTierName.includes("Kul Tiran")) {
      return "Battle for Azeroth";
    } else if (expansion.SkillTierName.includes("Legion")) {
      return "Legion";
    } else if (expansion.SkillTierName.includes("Draenor")) {
      return "Warlords of Draenor";
    } else if (expansion.SkillTierName.includes("Pandaria")) {
      return "Mists of Pandaria";
    } else if (expansion.SkillTierName.includes("Cataclysm")) {
      return "Cataclysm";
    } else if (expansion.SkillTierName.includes("Northrend")) {
      return "Wrath of the Lich King";
    } else if (expansion.SkillTierName.includes("Outland")) {
      return "The Burning Crusade";
    } else if (expansion.SkillTierName.includes("Shadowlands")) {
      return "Shadowlands";
    } else {
      return "World of Warcraft";
    }
  };

  return (
    <>
      <header className="row text-center">
        <h3>{getExpansion()}</h3>
      </header>
      <section className="d-flex flex-wrap">
        <div className="row">
          <Drop recipes={recipes} expansion={expansion} />
        </div>
        <div className="row">
          <Quest recipes={recipes} expansion={expansion} />
        </div>
        <div className="row">
          <Vendor recipes={recipes} expansion={expansion} />
        </div>
        <div className="row">
          <Trainer recipes={recipes} expansion={expansion} />
        </div>
      </section>
    </>
  );
}

function Drop({ expansion, recipes }) {
  const filterRecipes = recipes.filter(
    (recipe) => recipe.FKSkillTierId === expansion.SkillTierId && recipe.SourceType === "Drop"
  );
  console.log(filterRecipes);
  return (
    <>
      <p className="mb-0 mt-2 ">Drop</p>
      <div>
        {filterRecipes.map((recipe) => {
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
        })}
      </div>
    </>
  );
}

function Quest({ expansion, recipes }) {
  const filterRecipes = recipes.filter(
    (recipe) => recipe.FKSkillTierId === expansion.SkillTierId && recipe.SourceType === "Quest"
  );
  console.log(filterRecipes);
  return (
    <>
      <p className="mb-0 mt-2">Quest</p>
      <div>
        {filterRecipes.map((recipe) => {
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
        })}
      </div>
    </>
  );
}

function Vendor({ expansion, recipes }) {
  const filterRecipes = recipes.filter(
    (recipe) =>
      recipe.FKSkillTierId === expansion.SkillTierId && recipe.SourceType === "Vendor" && recipe.Source !== "Trainer"
  );
  console.log(filterRecipes);
  return (
    <>
      <p className="mb-0 mt-2">Vendor</p>
      <div>
        {filterRecipes.map((recipe) => {
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
        })}
      </div>
    </>
  );
}

function Trainer({ expansion, recipes }) {
  const filterRecipes = recipes.filter(
    (recipe) => recipe.FKSkillTierId === expansion.SkillTierId && recipe.Source === "Trainer"
  );
  console.log(filterRecipes);
  return (
    <>
      <p className="mb-0 mt-2">Trainer</p>
      <div>
        {filterRecipes.map((recipe) => {
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
        })}
      </div>
    </>
  );
}

function App() {
  const [professions, setProfessions] = useState([]);
  const [skillTiers, setSkillTiers] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [sourceTypes, setSourceTypes] = useState([]);
  const [sources, setSources] = useState([]);

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

  const getRecipes = () => {
    Axios.get("http://localhost:3001/recipes").then((response) => {
      setRecipes(response.data);
    });
  };

  const getSourceTypes = () => {
    Axios.get("http://localhost:3001/sourcetypes").then((response) => {
      setSourceTypes(response.data);
    });
  };

  const getSources = () => {
    Axios.get("http://localhost:3001/sources").then((response) => {
      setSources(response.data);
    });
  };

  useEffect(() => {
    getProfessions();
    getSkillTiers();
    getRecipes();
    getSourceTypes();
    getSources();
  }, []);

  return (
    <div className="container">
      {professions.map((profession) => {
        return (
          <Profession
            key={profession.ProfessionId}
            profession={profession}
            tiers={skillTiers}
            recipes={recipes}
            sourceTypes={sourceTypes}
            sources={sources}
          />
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
{
  /* <img
  key={recipe.RecipeId}
  id={recipe.RecipeId}
  src="https://picsum.photos/200"
  className="rounded-2"
  style={{ maxWidth: "35px" }}
  alt={recipe.RecipeName}
></img> */
}
//           );
//         }
//       })}
//     </>
//   );
// }
