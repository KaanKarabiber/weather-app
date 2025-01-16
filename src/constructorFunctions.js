export function CurrentConditions(
  conditions,
  resolvedAddress,
  temp,
  feelsLike,
  windspeed,
  humidity,
  precipProb,
  description,
  sunrise,
  sunset,
  dateTime,
  icon
) {
  this.conditions = conditions;
  this.resolvedAddress = resolvedAddress;
  this.temp = temp;
  this.feelsLike = feelsLike;
  this.windspeed = windspeed;
  this.humidity = humidity;
  this.preciProb = precipProb;
  this.description = description;
  this.sunrise = sunrise;
  this.sunset = sunset;
  this.dateTime = dateTime;
  this.icon = icon;
}
export function Days(
  date,
  condition,
  precipProb,
  tempmax,
  tempmin,
  icon,
  hours = []
) {
  this.date = date;
  this.condition = condition;
  this.preciProb = precipProb;
  this.tempmax = tempmax;
  this.tempmin = tempmin;
  this.icon = icon;
  this.hours = hours;
}
export function Hours(dateTime, precipProb, temp, condition, icon) {
  this.dateTime = dateTime;
  this.preciProb = precipProb;
  this.temp = temp;
  this.condition = condition;
  this.icon = icon;
}
