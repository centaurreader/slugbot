function Event(data) {
  this.type = data.type;
  this.channel = data.channel;
  this.user = data.user;
  this.text = data.text;
  this.ts = data.ts;
  this.team = data.team;
}

module.exports = Event;