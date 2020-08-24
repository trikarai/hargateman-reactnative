class ThreadComment {
  constructor(id, membershipId, userId, userName, content, submitTime) {
    this.id = id;
    this.membershipId = membershipId;
    this.userId = userId;
    this.userName = userName;
    this.content = content;
    this.submitTime = submitTime;
  }
}

export default ThreadComment;
