import { useEffect } from "react";
import { Grid } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import { useParams } from "react-router-dom";
import { observer } from "mobx-react-lite";
import ActivityDetailInfo from "../activities/ActivityDetailedinfo";
import ActivityDetailChat from "../activities/ActivityDetailChat";
import ActivityDetailSidebar from "../activities/ActivityDetailSideBar";
import ActivityDetailHeader from "../activities/ActivityDetailHeader";

interface Params {
  id: string;
}

function Details() {
  const { activityStore } = useStore();
  const { id } = useParams<Params>();

  useEffect(() => {
    activityStore.loadActivity(id);
  }, [id, activityStore.loadActivity]);

  const { selectedActivity: activity } = activityStore;
  if (!activityStore.setLoadingInitial || !activity) return <></>;

  return (
    <Grid>
      <Grid.Column width={10}>
        <ActivityDetailHeader activity={activity} />
        <ActivityDetailInfo activity={activity} />
        <ActivityDetailChat />
      </Grid.Column>
      <Grid.Column width={6}>
        <ActivityDetailSidebar />
      </Grid.Column>
    </Grid>
  );
}

export default observer(Details);
