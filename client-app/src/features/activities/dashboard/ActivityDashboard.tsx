import React from "react";
import { Grid, List } from "semantic-ui-react";
import { Activity } from "../../../Models/activity";
import ActivityList from "./ActivityList";
import Details from "../../details/Details";
import ActivityForm from "../form/ActivityForm";
interface Props {
  activities: Activity[];
  selectActivity: (activity: Activity) => void;
  selectedActivity: Activity | undefined;
  cancelSelectActivity: () => void;
  editMode: Boolean;
  openForm: (activity: Activity) => void;
  closeForm: () => void;
  createOrEdit: (activity: Activity) =>void;
}

export default function ActivityDashboard({
  activities,
  selectActivity,
  selectedActivity,
  cancelSelectActivity,
  editMode,
  closeForm,
  openForm,createOrEdit
}: Props) {
  console.log(selectedActivity);
  return (
    <>
      <Grid>
        <Grid.Column width="10">
          <ActivityList
            activities={activities}
            selectActivity={selectActivity}
          />
        </Grid.Column>
        <Grid.Column width="6">
          {selectedActivity && !editMode && (
            <Details
              cancelSelectActivity={cancelSelectActivity}
              selectActivity={selectActivity}
              activity={selectedActivity}
              openForm={openForm}
            />
          )}
          {editMode && (
            <ActivityForm closeForm={closeForm} createOrEdit={createOrEdit} activity={selectedActivity} />
          )}
        </Grid.Column>
      </Grid>
    </>
  );
}
