const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);

const newActivity = (type, job, id) => {
  return {
    type: type,
    jobDate: job.date,
    appliedBy: job.appliedBy,
    position: job.position,
    company: job.company,
    photoURL: job.creatorPhotoURL,
    status: job.status,
    timestamp: admin.firestore.FieldValue.serverTimestamp(),
    userUid: job.userUid,
    jobId: id
  };
};

exports.createJob = functions.firestore
  .document("jobs/{jobId}")
  .onCreate(job => {
    let newJob = job.data();

    console.log(newJob);

    const activity = newActivity("newJob", newJob, job.id);

    console.log(activity);

    return admin
      .firestore()
      .collection("activity")
      .add(activity)
      .then(docRef => {
        return console.log("Activity created with ID ", docRef.id);
      })
      .catch(err => {
        return console.log("Error adding activity", err);
      });
  });
exports.deleteJob = functions.firestore
  .document("jobs/{jobId}")
  .onDelete(job => {
    let deleteJob = job.data();

    console.log(deleteJob);

    const activity = newActivity("deleteJob", deleteJob, job.id);

    console.log(activity);

    return admin
      .firestore()
      .collection("activity")
      .add(activity)
      .then(docRef => {
        return console.log("Activity deleted with ID ", docRef.id);
      })
      .catch(err => {
        return console.log("Error adding activity", err);
      });
  });

exports.updateJobStatusActivity = functions.firestore
  .document("jobs/{jobId}")
  .onUpdate((job, context) => {
    let updatedJob = job.after.data();
    let previousJobData = job.before.data();
    console.log({ job });
    console.log({ context });
    console.log({ updatedJob });
    console.log({ previousJobData });

    const activity = newActivity(
      "updatedJobStatus",
      updatedJob,
      context.params.jobId
    );

    console.log({ activity });

    return admin
      .firestore()
      .collection("activity")
      .add(activity)
      .then(docRef => {
        return console.log("Activity created with ID ", docRef.id);
      })
      .catch(err => {
        return console.log("Error adding activity", err);
      });
  });
