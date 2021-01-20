import React, { useCallback, useMemo } from "react";
import { Header, Segment, Feed, Sticky } from "semantic-ui-react";
import { useFirestoreConnect } from "react-redux-firebase";
import { useSelector } from "react-redux";
import JobActivityItem from "./JobActivityItem";

const JobActivity = ({ contextRef }) => {
  const query = useMemo(
    () => ({
      collection: "activity",
      orderBy: ["timestamp", "desc"],
      limit: 5,
      storeAs: "activity"
    }),
    []
  );
  useFirestoreConnect(query);
  // useSelector case, to memoize a selector.  This ensure the useSelector will have exactly same selector every time the component re-render
  const activitySelector = useCallback(
    state => state.firestore.ordered.activity,
    []
  );
  const activities = useSelector(activitySelector);
  const userUid = useSelector(state => state.firebase.auth.uid);

  return (
    <Sticky context={contextRef} styleElement={{ zIndex: 0 }}>
      <Header attached="top" content="Recent Activity" />
      <Segment attached>
        <Feed>
          {activities &&
            activities.map(activity =>
              activity.userUid === userUid ? (
                <JobActivityItem key={activity.id} activity={activity} />
              ) : null
            )}
        </Feed>
      </Segment>
    </Sticky>
  );
};

export default JobActivity;
