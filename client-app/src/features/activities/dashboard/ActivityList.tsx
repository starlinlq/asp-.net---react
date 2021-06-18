import React, { Fragment, useState } from "react";
import { Header, Item, Label, Segment } from "semantic-ui-react";
import { Activity } from "../../../Models/activity";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import ActivityListItem from "./AcitvityListItem";

function ActivityList() {
  const { activityStore } = useStore();
  const { groupActivities } = activityStore;

  return (
    <>
      {groupActivities.map(([group, activities]) => (
        <Fragment key={group}>
          <Header sub color="teal">
            {group}
          </Header>
          <Segment>
            <Item.Group divided>
              {activities.map((activity) => (
                <ActivityListItem key={activity.id} activity={activity} />
              ))}
            </Item.Group>
          </Segment>
        </Fragment>
      ))}
    </>
  );
}

export default observer(ActivityList);
