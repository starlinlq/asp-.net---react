import "./styles.css";
import { useState, useEffect } from "react";
import { Container } from "semantic-ui-react";
import { Activity } from "../../Models/activity";
import { NavBar } from "./NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import { v4 as uuid } from "uuid";
import agent from "../api/agent";
import LoadingComponent from "./loadingComponent";
import { act } from "react-dom/test-utils";

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedActivity, setSelectedActivity] =
    useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);
  const [submitting, setSubmitting] = useState(false);

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
    setSubmitting(true);
    if (activity.id) {
      agent.Activities.update(activity).then(() => {
        setActivities([
          ...activities.filter((act) => act.id !== activity.id),
          activity,
        ]);
        setSelectedActivity(activity);
        setEditMode(false);
        setSubmitting(false);
      });
    } else {
      activity.id = uuid();
      agent.Activities.create(activity).then(() => {
        setActivities([...activities, activity]);
        setSelectedActivity(activity);
        setEditMode(false);
        setLoading(false);
      });
    }
  }

  function handleDeleteActivity(id: string) {
    setSubmitting(true);
    if (id) {
      agent.Activities.delete(id);
      setActivities([...activities.filter((activity) => activity.id !== id)]);
      setSubmitting(false);
    }
  }

  useEffect(() => {
    agent.Activities.list()
      .then((response) => {
        let activities: Activity[] = [];
        response.forEach((activity) => {
          activity.date = activity.date.split("T")[0];
          activities.push(activity);
        });
        setActivities(activities);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  if (loading) {
    return <LoadingComponent content="loading app" />;
  }

  return (
    <>
      <NavBar openForm={handleFormOpen} />
      <Container style={{ marginTop: "7em" }}>
        <ActivityDashboard
          deleteActivity={handleDeleteActivity}
          editMode={editMode}
          openForm={handleFormOpen}
          closeForm={handleFormClose}
          selectedActivity={selectedActivity}
          activities={activities}
          selectActivity={selectActivity}
          cancelSelectActivity={handleCancelActivity}
          createOrEdit={handleCreateOrEditActivity}
          submitting={submitting}
        />
      </Container>
    </>
  );
}

export default App;
