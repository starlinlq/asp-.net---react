import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Item, Label } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import { Activity } from "../../../Models/activity";

interface Props {
  activity: Activity;
}

function ActivityListItem({ activity }: Props) {
  const [target, setTarget] = useState("");
  const { activityStore } = useStore();
  const { activitiesByDate } = activityStore;
  function handleActivityDelete(
    id: string,
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    setTarget(e.currentTarget.name);
    activityStore.deleteActivity(id);
  }
  return (
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
            as={Link}
            to={`/activities/${activity.id}`}
          />
          <Button
            name={activity.id}
            floated="right"
            content="Delete"
            color="red"
            onClick={(e) => handleActivityDelete(activity.id, e)}
          />
          <Label basic content={activity.category} />
        </Item.Extra>
      </Item.Content>
    </Item>
  );
}

export default ActivityListItem;