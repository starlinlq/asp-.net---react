import React from "react";
import { Grid } from "semantic-ui-react";
import { Activity } from "../../../Models/activity";
import ActivityList from "./ActivityList";
import Details from "../../details/Details";
import ActivityForm from "../form/ActivityForm";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";

function ActivityDashboard() {
  const { activityStore } = useStore();
  const { selectedActivity, editMode } = activityStore;
  return (
    <>
      <Grid>
        <Grid.Column width="10">
          <ActivityList />
        </Grid.Column>
        <Grid.Column width="6">
          {selectedActivity && !editMode && <Details />}
          {editMode && <ActivityForm />}
        </Grid.Column>
      </Grid>
    </>
  );
}

export default observer(ActivityDashboard);
