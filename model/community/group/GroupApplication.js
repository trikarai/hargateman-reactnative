class GroupApplication {
  constructor(
    applicationid,
    groupId,
    groupName,
    notes,
    concluded,
    appliedTime
  ) {
    this.applicationid = applicationid;
    this.groupId = groupId;
    this.groupName = groupName;
    this.notes = notes;
    this.concluded = concluded;
    this.appliedTime = appliedTime;
  }
}

export default GroupApplication;
