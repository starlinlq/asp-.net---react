import React, { useEffect } from "react";
import { Card, Image, Button } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import { Activity } from "../../Models/activity";
import { Link, useParams } from "react-router-dom";
import { observer } from "mobx-react-lite";

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
    <Card fluid>
      <Image
        src={`/assets/images/${activity.category}.jpg`}
        wrapped
        ui={false}
      />
      <Card.Content>
        <Card.Header>{activity.title}</Card.Header>
        <Card.Meta>
          <span>{activity.date}</span>
        </Card.Meta>
        <Card.Description>{activity.description}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button.Group>
          <Button
            as={Link}
            to={`/manage/${activity.id}`}
            basic
            color="blue"
            content="Edit"
          />
          <Button
            as={Link}
            to="/activities"
            basic
            color="grey"
            content="Cancel"
          />
        </Button.Group>
      </Card.Content>
    </Card>
  );
}

export default observer(Details);
