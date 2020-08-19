class CommunityThread {
  constructor(id, title, submitTime, membershipId, userId, userName, closed) {
    this.id = id;
    this.title = title;
    this.submitTime = submitTime;
    this.membershipId = membershipId;
    this.userId = userId;
    this.userName = userName;
    this.closed = closed;
  }
}

export default CommunityThread;
