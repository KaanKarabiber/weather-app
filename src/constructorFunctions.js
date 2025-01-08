export function CurrentConditions(
  conditions,
  resolvedAddress,
  feelsLike,
  windspeed,
  humidity,
  precipProb,
  description,
  sunrise,
  sunset,
  dateTime
) {
  this.conditions = conditions;
  this.resolvedAddress = resolvedAddress;
  this.feelsLike = feelsLike;
  this.windspeed = windspeed;
  this.humidity = humidity;
  this.preciProb = precipProb;
  this.description = description;
  this.sunrise = sunrise;
  this.sunset = sunset;
  this.dateTime = dateTime;
}
export function Days(
  date,
  condition,
  precipProb,
  tempmax,
  tempmin,
  hours = []
) {
  this.date = date;
  this.condition = condition;
  this.preciProb = precipProb;
  this.tempmax = tempmax;
  this.tempmin = tempmin;
  this.hours = hours;
}
export function Hours(dateTime, precipProb, temp, condition) {
  this.dateTime = dateTime;
  this.preciProb = precipProb;
  this.temp = temp;
  this.condition = condition;
}
