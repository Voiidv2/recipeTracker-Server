// import logo from "./logo.svg";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { useEffect, useState } from "react";
import Axios from "axios";

function Profession({ profession, tiers, recipes, sourceTypes, sources }) {
  return (
    <div className="my-5 py-5" id={profession.ProfessionId}>
      <header className="row py-2 my-2 border-bottom">
        <hr />
        <h1>{profession.ProfessionName}</h1>
      </header>
      <section>
        {tiers.map((expansion) => {
          if (expansion.FKProfessionId === profession.ProfessionId) {
            return (
              <Expansion
                key={expansion.SkillTierId}
                recipes={recipes}
                expansion={expansion}
                sourceTypes={sourceTypes}
              />
            );
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

  useEffect(() => {
    getExpansion();
  }, []);

  return (
    <>
      <header className="row">
        <h3>{getExpansion()}</h3>
      </header>
      <section className="d-flex flex-wrap">
        <div className="row g-1">
          {sourceTypes.map((sourceType) => {
            return (
              <SourceType key={sourceType.SourceType} recipes={recipes} expansion={expansion} sourceType={sourceType} />
            );
          })}
        </div>
      </section>
    </>
  );
}

function SourceType({ expansion, recipes, sourceType }) {
  const filterRecipes = () => {
    if ((recipes.SourceType = "Vendor")) {
      // console.log("sourceType matches Vendor");
      const filterVendor = recipes.filter(
        (recipe) => recipe.FKSkillTierId === expansion.SkillTierId && recipe.SourceType === "Faction"
      );
      return filterVendor;
    } else if ((recipes.SourceType = "Drop")) {
      // console.log("sourceType matches Drop");

      const filterDrop = recipes.filter(
        (recipe) => recipe.FKSkillTierId === expansion.SkillTierId && recipe.SourceType === "Drop"
      );
      return filterDrop;
    }
    if ((recipes.SourceType = "Quest")) {
      // console.log("sourceType matches Quest");

      const filterQuest = recipes.filter(
        (recipe) => recipe.FKSkillTierId === expansion.SkillTierId && recipe.SourceType === "Quest"
      );
      return filterQuest;
    }
    if ((recipes.SourceType = "Other")) {
      // console.log("sourceType matches Other");

      const filterOther = recipes.filter(
        (recipe) => recipe.FKSkillTierId === expansion.SkillTierId && recipe.SourceType === "Other"
      );
      return filterOther;
    }
    if ((recipes.SourceType = "Profession")) {
      // console.log("sourceType matches Profession");

      const filterProfession = recipes.filter(
        (recipe) => recipe.FKSkillTierId === expansion.SkillTierId && recipe.SourceType === "Profession"
      );
      return filterProfession;
    }
    if ((recipes.SourceType = "Discover")) {
      // console.log("sourceType matches Discover");

      const filterDiscover = recipes.filter(
        (recipe) => recipe.FKSkillTierId === expansion.SkillTierId && recipe.SourceType === "Discover"
      );
      return filterDiscover;
    }
    if ((recipes.SourceType = "Faction")) {
      // console.log("sourceType matches Faction");

      const filterFaction = recipes.filter(
        (recipe) => recipe.FKSkillTierId === expansion.SkillTierId && recipe.SourceType === "Faction"
      );
      return filterFaction;
    }
    if ((recipes.SourceType = "Currency")) {
      // console.log("sourceType matches Currency");

      const filterCurrency = recipes.filter(
        (recipe) => recipe.FKSkillTierId === expansion.SkillTierId && recipe.SourceType === "Currency"
      );
      return filterCurrency;
    }
    if ((recipes.SourceType = "Treasure")) {
      // console.log("sourceType matches Treasure");

      const filterTreasure = recipes.filter(
        (recipe) => recipe.FKSkillTierId === expansion.SkillTierId && recipe.SourceType === "Treasure"
      );
      return filterTreasure;
    }
  };

  return (
    <>
      <section className="row g-1 justify-content-start">
        <h6>{sourceType.SourceType}</h6>
        <div className="col-auto">
          {filterRecipes().map((recipe) => {
            return (
              <a key={recipe.RecipeId} className="col-auto" href={"https://www.wowhead.com/recipe/" + recipe.RecipeId}>
                <img
                  id={recipe.RecipeId}
                  src={process.env.PUBLIC_URL + "/icons/" + recipe.RecipeIcon}
                  className="rounded-3"
                  style={{ maxWidth: "35px" }}
                  alt={recipe.RecipeName}
                ></img>
              </a>
            );
          })}
        </div>
      </section>
    </>
  );
}

function App() {
  const [professions, setProfessions] = useState([{ ProfessionId: 164, ProfessionName: "Blacksmithing" }]);
  const [skillTiers, setSkillTiers] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [sourceTypes, setSourceTypes] = useState([]);
  const [sources, setSources] = useState([]);

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

  // const getVendors = () => {
  //   Axios.get("http://localhost:3001/sourcetypevendor").then((response) => {
  //     setVendors(response.data);
  //   });
  // };

  useEffect(() => {
    getProfessions();
    getSkillTiers();
    getRecipes();
    getSourceTypes();
    getSources();
    // getVendors();
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

// function Drop({ expansion, recipes }) {
// const filterRecipes = recipes.filter(
//   (recipe) => recipe.FKSkillTierId === expansion.SkillTierId && recipe.SourceType === "Drop"
// );
//   return (
//     <section className="">
//       <p className="">Drop</p>
//       <div className="row row-cols g-1">
//         {filterRecipes.map((recipe) => {
//           return (
// <a key={recipe.RecipeId} className="col" href={"https://www.wowhead.com/recipe/" + recipe.RecipeId}>
// <img
//   id={recipe.RecipeId}
//   src={process.env.PUBLIC_URL + "/icons/" + recipe.RecipeIcon}
//   className="rounded-3"
//   style={{ maxWidth: "35px" }}
//   alt={recipe.RecipeName}
// ></img>
// </a>
//           );
//         })}
//       </div>
//     </section>
//   );
// }
