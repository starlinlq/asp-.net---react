import React from "react";
import { Card, Image, Button } from "semantic-ui-react";
import { Activity } from "../../Models/activity";

interface Props {
  activity: Activity;
  selectActivity: (activity: Activity) => void;
  cancelSelectActivity: () => void;
  openForm: (activity: Activity) => void;
}

export default function Details({
  activity,
  selectActivity,
  cancelSelectActivity,
  openForm,
}: Props) {
  function onClickCancel() {
    cancelSelectActivity();
  }
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
            onClick={() => openForm(activity)}
          />
          <Button basic color="grey" content="Cancel" onClick={onClickCancel} />
        </Button.Group>
      </Card.Content>
    </Card>
  );
}
