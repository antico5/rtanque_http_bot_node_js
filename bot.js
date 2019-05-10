const ONE_DEGREE = 0.01745

const MAX_RADAR_ROTATION = 0.05
const MAX_BOT_SPEED = 3
const MIN_FIRE_POWER = 1
const MAX_FIRE_POWER = 5
const TURRET_FIRE_RANGE = ONE_DEGREE * 5

class Bot {

  initialize(){
    this.lockedOn = null
    this.command = {}
    this.target = null

    this.sensors = null
  }

  tick(sensors) {
    this.sensors = sensors
    this.target = this.getRadarLock()

    if (this.target) {
      this.destroyTarget()
    } else {
      this.seekTarget()
    }

    return JSON.stringify(this.command)
  }

  getRadarLock() {
    return this.sensors.radar[0]
  }

  seekTarget(){
    this.command.radar_heading = this.sensors.radar_heading + MAX_RADAR_ROTATION
    this.command.speed = 1
  }

  destroyTarget(){
    this.command.heading = this.target.heading
    this.command.radar_heading = this.target.heading
    this.command.turret_heading = this.target.heading

    this.command.speed = this.target.distance > 200 ? MAX_BOT_SPEED : MAX_BOT_SPEED / 2.0
    this.command.fire_power = 5
  }
}

module.exports = {
  Bot: Bot
}
