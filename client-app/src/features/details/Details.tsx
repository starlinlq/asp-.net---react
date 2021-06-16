import React from "react";
import { Card, Image, Button } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import { Activity } from "../../Models/activity";

export default function Details() {
  const { activityStore } = useStore();
  const {
    selectedActivity: activity,
    openForm,
    cancelSelectedAtivity,
  } = activityStore;
  if (!activity) return<></>;
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
            basic
            color="blue"
            content="Edit"
            onClick={() => openForm(activity.id)}
          />
          <Button
            basic
            color="grey"
            content="Cancel"
            onClick={cancelSelectedAtivity}
          />
        </Button.Group>
      </Card.Content>
    </Card>
  );
}
