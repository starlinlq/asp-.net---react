import react from "react";
import { Link } from "react-router-dom";
import { Button, Header, Icon, Segment } from "semantic-ui-react";

function NotFound() {
  return (
    <Segment>
      <Header icon>
        <Icon name="search" />
        oops we've looked everywhere and could not find this.
      </Header>
      <Segment.Inline>
        <Button as={Link} to="/activities">
          back to activities
        </Button>
      </Segment.Inline>
    </Segment>
  );
}

export default NotFound;
