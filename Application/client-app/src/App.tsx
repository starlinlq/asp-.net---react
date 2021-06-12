import "./App.css";
import { useState, useEffect } from "react";
import { Duck, ducks } from "./demo";
import { DuckItem } from "./DuckItem";
import axios from "axios";
import { Console } from "console";
import { Header, List } from "semantic-ui-react";

function App() {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/activities")
      .then((res) => {
        console.log(res);
        setActivities(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <Header as="h2" icon="users" content="Reactivities" />
      <List>
        {activities.map((activity: any) => (
          <List.Item key={activity.id}>{activity.title}</List.Item>
        ))}
      </List>
    </div>
  );
}

export default App;
