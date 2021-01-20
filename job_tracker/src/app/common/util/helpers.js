export const objectToArray = object => {
  if (object) {
    return Object.entries(object).map(e =>
      Object.assign({}, e[1], { id: e[0] })
    );
  }
};

export const createNewJob = (user, photoURL, job) => {
  return {
    ...job,
    userUid: user.uid,
    appliedBy: user.displayName,
    creatorPhotoURL: photoURL || "/assets/user.png",
    created: new Date()
    // attendees: {
    //   [user.uid]: {
    //     going: true,
    //     joinDate: new Date(),
    //     photoURL: photoURL || "/assets/user.png",
    //     displayName: user.displayName,
    //     host: true
    //   }
    // }
  };
};
