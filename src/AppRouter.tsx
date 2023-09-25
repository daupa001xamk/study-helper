// src/AppRouter.tsx
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import FlashcardGame from "./components/FlashcardMode/FlashcardGame";
import GameMode2 from "./components/ConnectMeaning/gamemode2";
import HomeScreen from "./components/HomeScreen";
import CollectionsScreen from "./components/Collection/CollectionsScreen";
import CreateCollection from "./components/Collection/CreateCollectionScreen";

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<HomeScreen />} />
        <Route path="/flashcards" element={<FlashcardGame />} />
        <Route path="/connectMeaning" element={<GameMode2 />} />
        <Route path="/collections" element={<CollectionsScreen />} />
        <Route path="/collections/create" element={<CreateCollection />} />
    </Routes>
    </Router>
  );
};

export default AppRouter;
