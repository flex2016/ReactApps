import React from "react";
import { Feed } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { formatDistance } from "date-fns";

const EventActivityItem = ({ activity }) => {
  const renderSummary = activity => {
    switch (activity.type) {
      case "newJob":
        return (
          <div>
            New Job!{" "}
            <Feed.User
              as={Link}
              to={{ pathname: "/profile/" + activity.userUid }}
            >
              {activity.appliedBy}
            </Feed.User>{" "}
            applied for{" "}
            <Link to={{ pathname: "/jobs/" + activity.jobId }}>
              {activity.position}
            </Link>
          </div>
        );
      case "deleteJob":
        return (
          <div>
            Job Deleted!{" "}
            <Feed.User
              as={Link}
              to={{ pathname: "/profile/" + activity.userUid }}
            >
              {activity.appliedBy}
            </Feed.User>{" "}
            Deleted-{" "}
            <Link to={{ pathname: "/jobs/" + activity.jobId }}>
              {activity.position}
            </Link>
          </div>
        );
      case "updatedJobStatus":
        return (
          <div>
            Job Status Updated!{" "}
            <Feed.User
              as={Link}
              to={{ pathname: "/profile/" + activity.userUid }}
            >
              {activity.appliedBy}
            </Feed.User>{" "}
            has Updated Job Status to{" "}
            <Link to={{ pathname: "/jobs/" + activity.jobId }}>
              {activity.status}
            </Link>
          </div>
        );
      default:
        return;
    }
  };

  return (
    <Feed.Event>
      {/* <Feed.Label>
          <img src={activity.photoURL || "/assets/user.png"} alt="" />
        </Feed.Label> */}
      <Feed.Content>
        <Feed.Summary>{renderSummary(activity)}</Feed.Summary>
        <Feed.Meta>
          <Feed.Date>
            {formatDistance(
              activity.timestamp && activity.timestamp.toDate(),
              Date.now()
            )}{" "}
            ago
          </Feed.Date>
        </Feed.Meta>
      </Feed.Content>
    </Feed.Event>
  );
};

export default EventActivityItem;
