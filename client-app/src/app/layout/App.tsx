import "./styles.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { Container, Header, List } from "semantic-ui-react";
import { Activity } from "../../Models/activity";
import { NavBar } from "./NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] =
    useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);

  function selectActivity(activity: Activity) {
    setSelectedActivity(activity);
  }

  function handleCancelActivity() {
    setSelectedActivity(undefined);
  }

  function handleFormOpen(activity?: Activity) {
    activity ? selectActivity(activity) : handleCancelActivity();
    setEditMode(true);
  }

  function handleFormClose() {
    setEditMode(false);
  }

  function handleCreateOrEditActivity(activity: Activity) {
    activity.id
      ? setActivities([
          ...activities.filter((x) => x.id !== activity.id),
          activity,
        ])
      : setActivities([...activities, activity]);
    setEditMode(false);
    setSelectedActivity(activity);
  }

  useEffect(() => {
    axios
      .get<Activity[]>("http://localhost:5000/api/activities")
      .then((res) => {
        console.log(res);
        setActivities(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <NavBar openForm={handleFormOpen} />
      <Container style={{ marginTop: "7em" }}>
        <ActivityDashboard
          editMode={editMode}
          openForm={handleFormOpen}
          closeForm={handleFormClose}
          selectedActivity={selectedActivity}
          activities={activities}
          selectActivity={selectActivity}
          cancelSelectActivity={handleCancelActivity}
          createOrEdit={handleCreateOrEditActivity}
        />
      </Container>
    </>
  );
}

export default App;
