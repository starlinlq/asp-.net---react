import react from "react";
import { Switch, Route, Link } from "react-router-dom";
import { Container } from "semantic-ui-react";
import ActivityDashboard from "../activities/dashboard/ActivityDashboard";
import NavBar from "../../app/layout/NavBar";
import ActivityForm from "../activities/form/ActivityForm";

function HomePage() {
  return (
    <>
      <Container style={{ marginTop: "7em" }}>
        <h2>home page</h2>
        <h3>
          go to <Link to="/activities">Activities</Link>
        </h3>
      </Container>
    </>
  );
}

export default HomePage;
