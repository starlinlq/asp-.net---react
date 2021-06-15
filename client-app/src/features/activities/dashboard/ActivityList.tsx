import React, { useState } from "react";
import { Button, Item, Label, Segment } from "semantic-ui-react";
import { Activity } from "../../../Models/activity";

interface Props {
  activities: Activity[];
  selectActivity: (activity: Activity) => void;
  deleteActivity: (id: string) => void;
  submitting: Boolean;
}
export default function ActivityList({
  activities,
  selectActivity,
  deleteActivity,
  submitting,
}: Props) {
  const [target, setTarget] = useState("");
  function handleClick(activity: Activity) {
    selectActivity(activity);
  }
  function handleActivityDelete(
    id: string,
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    setTarget(e.currentTarget.name);
    deleteActivity(id);
  }

  return (
    <Segment>
      <Item.Group divided>
        {" "}
        {activities.map((activity) => (
          <Item key={activity.id}>
            <Item.Content>
              <Item.Header as="a">{activity.title}</Item.Header>
              <Item.Meta>{activity.date}</Item.Meta>
              <Item.Description>
                <div>{activity.description}</div>
                <div>
                  {activity.city}, {activity.venue}
                </div>
              </Item.Description>
              <Item.Extra>
                <Button
                  floated="right"
                  content="View"
                  color="blue"
                  onClick={() => handleClick(activity)}
                />
                <Button
                  name={activity.id}
                  Loading={submitting && target === activity.id}
                  floated="right"
                  content="Delete"
                  color="red"
                  onClick={(e) => handleActivityDelete(activity.id, e)}
                />
                <Label basic content={activity.category} />
              </Item.Extra>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    </Segment>
  );
}
