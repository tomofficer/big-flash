import React, { useState } from "react";
import { Switch, Route } from "react-router-dom";
import Header from "./Header";
import NotFound from "./NotFound";
import Home from "./Home";
import CreateDeck from "./Decks/CreateDeck";
import Deck from "./Decks/Deck";
import EditDeck from "./Decks/EditDeck";
import Study from "./Study";
import AddCard from "./Decks/AddCard";
import EditCard from "./Decks/EditCard";


export default function Layout() {

  //deck state
  const [totalDecks, setTotalDecks] = useState(0);

  //current deck count state
  const updateDecks = (newDecks) => {
    setTotalDecks(() => totalDecks + newDecks)
  };

  return (
    
    <div>
    
      <Header />

      <div className="container mb-4">

        <Switch>

          <Route path="/" exact>
            <Home updateDecks={updateDecks} totalDecks={totalDecks} />
          </Route>

          <Route path="/decks/:deckId/study">
            <Study />
          </Route>

          <Route path="/decks/new">
            <CreateDeck updateDecks={updateDecks} />
          </Route>

          <Route path="/decks/:deckId" exact>
            <Deck updateDecks={updateDecks} />
          </Route>

          <Route path="/decks/:deckId/edit">
            <EditDeck updateDecks={updateDecks} />
          </Route>

          <Route path="/decks/:deckId/cards/new">
            <AddCard updateDecks={updateDecks} />
          </Route>

          <Route path="/decks/:deckId/cards/:cardId/edit">
            <EditCard updateDecks={updateDecks} />
          </Route>

          <Route>
            <NotFound />
          </Route>

        </Switch>

      </div>

    </div>

  )
}
