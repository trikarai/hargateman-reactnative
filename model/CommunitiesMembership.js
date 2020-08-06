class CommunitiesMembership {
  constructor(id, communityId, communityName, anAdmin, joinTime, active) {
    this.id = id;
    this.communityId = communityId;
    this.communityName = communityName;
    this.anAdmin = anAdmin;
    this.joinTime = joinTime;
    this.active = active;
  }
}

export default CommunitiesMembership;
