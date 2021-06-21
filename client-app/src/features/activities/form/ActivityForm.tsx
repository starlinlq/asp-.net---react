import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { Button, Segment, Header } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import { Activity } from "../../../Models/activity";
import { useParams, useHistory, Link } from "react-router-dom";
import LoadingComponent from "../../../app/layout/loadingComponent";
import { v4 as uuid } from "uuid";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import MyTextInput from "../../../app/common/form/MyTextInput";
import MyTextArea from "../../../app/common/form/MyTextArea";
import MySelectInput from "../../../app/common/form/MySelectInput";
import MyDateInput from "../../../app/common/form/MyDateInput";
import { categoryOptions } from "../../../app/common/options/categoryOptions";

function ActivityForm() {
  const history = useHistory();
  const [
    activity = {
      id: "",
      title: "",
      category: "",
      description: "",
      date: null,
      city: "",
      venue: "",
    },
    setActivity,
  ] = useState<Activity>();
  const { activityStore } = useStore();
  const { id } = useParams<{ id: string }>();
  const { loading: submitting } = activityStore;

  const validationSchema = Yup.object({
    title: Yup.string().required("the activity title is required"),
    description: Yup.string().required("the activity description is required"),
    category: Yup.string().required(),
    date: Yup.string().required("date is required").nullable(),
    venue: Yup.string().required(),
    city: Yup.string().required(),
  });

  useEffect(() => {
    if (id) {
      activityStore.loadActivity(id).then((activity) => setActivity(activity!));
    }
  }, [id, activityStore.loadActivity]);

  const handleFormSubmit = (activity: Activity) => {
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

  return (
    <Segment clearing>
      <Header content="activity Details" sub color="teal" />
      <Formik
        validationSchema={validationSchema}
        enableReinitialize
        initialValues={activity}
        onSubmit={(values) => handleFormSubmit(activity)}
      >
        {({ handleSubmit, isValid, isSubmitting, dirty }) => (
          <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
            <MyTextInput name="title" placeholder="title" />
            <MyTextArea rows={3} placeholder="Description" name="description" />
            <MySelectInput
              options={categoryOptions}
              placeholder="category"
              name="category"
            />
            <MyDateInput
              placeholderText="Date"
              name="date"
              showTimeSelect
              timeCaption="time"
              dateFormat="MMM d, yyyy h:mm aa"
            />
            <Header content="Localtion Details" sub color="teal" />
            <MyTextInput placeholder="City" name="city" />
            <MyTextInput placeholder="Venue" name="venue" />
            <Button
              disable={isSubmitting || !dirty || !isValid}
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
        )}
      </Formik>
    </Segment>
  );
}
export default observer(ActivityForm);
