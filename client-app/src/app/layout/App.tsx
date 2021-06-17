import "./styles.css";
import { useState, useEffect } from "react";
import { Container, Button } from "semantic-ui-react";
import NavBar from "./NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import LoadingComponent from "./loadingComponent";
import { useStore } from "../stores/store";
import { observer } from "mobx-react-lite";
import { Switch, Route, Link } from "react-router-dom";
import ActivityForm from "../../features/activities/form/ActivityForm";
import HomePage from "../../features/home/HomePage";

function App() {
  const { activityStore } = useStore();
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]);

  if (activityStore.loadingInitial) {
    return <LoadingComponent content="loading app" />;
  }

  return (
    <>
      <NavBar />
      <Container style={{ marginTop: "7em" }}>
        <Route path="/activities" component={ActivityDashboard} />
        <Route path="/createActivity" component={ActivityForm} />
        <Route path="/" component={HomePage} />
      </Container>
    </>
  );
}

export default observer(App);
