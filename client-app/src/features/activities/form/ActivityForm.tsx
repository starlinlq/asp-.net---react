import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import { Activity } from "../../../Models/activity";
import { useParams, useLocation, useHistory, Link } from "react-router-dom";
import LoadingComponent from "../../../app/layout/loadingComponent";
import { v4 as uuid } from "uuid";

function ActivityForm() {
  const history = useHistory();
  const [
    activity = {
      id: "",
      title: "",
      category: "",
      description: "",
      date: "",
      city: "",
      venue: "",
    },
    setActivity,
  ] = useState<Activity>();
  const { activityStore } = useStore();
  const { id } = useParams<{ id: string }>();
  const { loading: submitting } = activityStore;

  useEffect(() => {
    if (id) {
      activityStore.loadActivity(id).then((activity) => setActivity(activity!));
    }
  }, [id, activityStore.loadActivity]);

  const handleSubmit = () => {
    if (activity.id.length === 0) {
      let newActivity = { ...activity, id: uuid() };
      activityStore.updateActivity(newActivity).then(() => {
        history.push(`/activities/${newActivity.id}`);
      });
    } else {
      activityStore.createActivity(activity).then(() => {
        history.push(`/activities/${activity.id}`);
      });
    }
  };

  if (activityStore.loadingInitial)
    return <LoadingComponent content="loading activty..." />;

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setActivity({ ...activity, [name]: value });
  };
  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit} autoComplete="off">
        <Form.Input
          placeholder="Title"
          value={activity.title}
          name="title"
          onChange={handleInputChange}
        />
        <Form.TextArea
          placeholder="Description"
          value={activity.description}
          onChange={handleInputChange}
          name="description"
        />
        <Form.Input
          placeholder="Category"
          value={activity.category}
          onChange={handleInputChange}
          name="category"
        />
        <Form.Input
          placeholder="Date"
          type="date"
          value={activity.date}
          onChange={handleInputChange}
          name="date"
        />
        <Form.Input
          placeholder="City"
          value={activity.city}
          onChange={handleInputChange}
          name="city"
        />
        <Form.Input
          placeholder="Venue"
          value={activity.venue}
          onChange={handleInputChange}
          name="venue"
        />
        <Button
          Loading={submitting}
          floated="right"
          positive
          type="submit"
          content="Submit"
        />
        <Button
          as={Link}
          to="/activities"
          floated="right"
          positive
          type="button"
          content="Cancel"
        />
      </Form>
    </Segment>
  );
}
export default observer(ActivityForm);
