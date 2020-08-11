class CommunityMember {
  constructor(id, memberId, memberName, joinTime, admin, active) {
    this.id = id;
    this.memberId = memberId;
    this.memberName = memberName;
    this.joinTime = joinTime;
    this.admin = admin;
    this.active = active;
  }
}

export default CommunityMember;
