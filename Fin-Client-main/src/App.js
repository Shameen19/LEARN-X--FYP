import { useState } from "react";
import Home from "./pages/home/Home";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./app.css";
import Questions from "./pages/list/List";
import NQuestion from "./pages/Add New/NQuestion";
import ViewQuestion from "./pages/Single/SQuestion";
import NewViewQuestion from "./pages/Single/ViewSingle";
import ResetPasswordForm from "./pages/auth/ResetPassword/ResetPass";
import NLogin from "./pages/auth/Login";
import MLogin from "./pages/auth/MentorLogin";
import Register from "./pages/auth/Register";
import Front from "./pages/Front/Front";
import PersonalizedExp from "./pages/Personalized/UserPersonalization";
import Forgot from "./pages/auth/ForgotPass/ForgotPass";
import AddComp from "./support/addcomplaint";
import AllQPage from "./pages/AllQuestions/QuestionsPagination";
import Allq from "./components/GQues/allq";
import EditQuestion from "./pages/EditQuestion/Edit";
import MyPersonal from "./pages/UserOwnQuestions/MyQuestion";
import Answer from "./components/Answer/Com";
import ViewAnswers from "./pages/Answers/ViewAnswer/ViewAnswer";
import Filesto from "./components/FileStorage/Fst";
import EditProfile from "./pages/EditProfile/EditProfile";
import SearchPage from "./pages/SearchPage/Search";
import Topbar from "./imported/scenes/scenes/global/Topbar";
import Sidebar from "./imported/scenes/scenes/global/Sidebar";
import Dashboard from "./imported/scenes/scenes/dashboard";
import Wallet from "./pages/Wallet/Wallet";
import NewAllQuestions from "./pages/AllQuestions/Questions";
import Explore from "./pages/Explore/Explore";
import Payout from "./components/Transactions/Payout";
import Charts from "./components/Transactions/Charts";
import Withdraw from "./components/Transactions/Withdraw";
import Pricing from "./pages/Wallet/index.jsx";
import Redeem from "./pages/Wallet/Redeem";
import { CssBaseline, ThemeProvider } from "@mui/material";
import ViewComplaints from "./support/Viewcomplaints";
import { ColorModeContext, useMode } from "./theme";
import { useLocation } from "react-router-dom";
import "./ysh.css";
import SingleAnswer from "././components/Answer/SingleAnswer";

// import RegisterComplaint from "./pages/Complaints/RegisterComplaint";
function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const location = useLocation();
  var istoken = location.pathname.startsWith("/auth/reset/");

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        {/* Check if the user is on NLogin or MLogin pages */}
        {location.pathname !== "/auth/login" &&
          location.pathname !== "/" &&
          location.pathname !== "/auth/mentor-login" &&
          location.pathname !== "/auth/register" &&
          location.pathname !== "/auth/reset-password" &&
          !istoken && (
            <div className="app">
              <Sidebar isSidebar={isSidebar} className="sidebar" />
              <main className="content">
                <Topbar setIsSidebar={setIsSidebar} className="topbar" />
                <Routes>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="files" element={<Filesto />} />

                  <Route path="/personalized" element={<PersonalizedExp />} />

                  <Route path="/questions">
                    <Route index element={<NewAllQuestions />} />
                    <Route path="add" element={<NQuestion />} />
                    <Route path=":id" element={<NewViewQuestion />} />
                    <Route path="all" element={<AllQPage />} />
                    <Route path="single" element={<Allq />} />
                    <Route path="myquestions" element={<MyPersonal />} />
                    <Route path="edit/:id" element={<EditQuestion />} />
                  </Route>
                  <Route path="/search/:query" element={<SearchPage />} />
                  <Route path="/answers">
                    <Route index element={<ViewAnswers />} />
                  </Route>
                  <Route path="/profile">
                    <Route index element={<EditProfile />} />
                  </Route>

                  <Route path="/explore" element={<Explore />} />
                  <Route path="/complaints" element={<ViewComplaints />} />
                  <Route path="/addcomplaint" element={<AddComp />} />
                  <Route path="/wallet" element={<Wallet />} />
                  <Route path="/withdraw" element={<Withdraw />} />
                  <Route path="/payout" element={<Payout />} />
                  <Route path="/charts" element={<Charts />} />
                  <Route path="/pricing" element={<Pricing />} />
                  <Route path="/redeem" element={<Redeem />} />
                </Routes>
              </main>
            </div>
          )}
        <Routes>
          <Route path="/" element={<Navigate to="/auth/login" replace />} />
          <Route path="/auth/login" element={<NLogin />} />
          <Route path="/auth/mentor-login" element={<MLogin />} />
          <Route path="/auth/register" element={<Register />} />
          <Route path="/auth/reset-password" element={<Forgot />} />
          <Route path="auth/reset/:token" element={<ResetPasswordForm />} />
        </Routes>
        <CssBaseline />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
