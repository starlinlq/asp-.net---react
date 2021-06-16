import "./styles.css";
import { useState, useEffect } from "react";
import { Container, Button } from "semantic-ui-react";
import { Activity } from "../../Models/activity";
import { NavBar } from "./NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import { v4 as uuid } from "uuid";
import agent from "../api/agent";
import LoadingComponent from "./loadingComponent";
import { act } from "react-dom/test-utils";
import { useStore } from "../stores/store";
import { observer } from "mobx-react-lite";

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
      <NavBar  />
      <Container style={{ marginTop: "7em" }}>
        <ActivityDashboard
          
        />
      </Container>
    </>
  );
}

export default observer(App);
