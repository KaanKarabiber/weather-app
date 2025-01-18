import {
  changeIconCamelCase,
  fahrenheitToCelcius,
  milesToKm,
  roundDownValue,
} from './index';

export function CurrentConditions(
  conditions,
  resolvedAddress,
  tempC,
  tempF,
  feelsLikeC,
  feelsLikeF,
  windspeedMiles,
  windspeedKm,
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
  this.tempC = fahrenheitToCelcius(tempC);
  this.tempF = roundDownValue(tempF);
  this.feelsLikeC = fahrenheitToCelcius(feelsLikeC);
  this.feelsLikeF = roundDownValue(feelsLikeF);
  this.windspeedMiles = roundDownValue(windspeedMiles);
  this.windspeedKm = milesToKm(windspeedKm);
  this.humidity = roundDownValue(humidity);
  this.preciProb = roundDownValue(precipProb);
  this.description = description;
  this.sunrise = sunrise.split(':').slice(0, 2).join(':');
  this.sunset = sunset.split(':').slice(0, 2).join(':');
  this.dateTime = dateTime;
  this.icon = changeIconCamelCase(icon);
}
export function Days(
  date,
  condition,
  precipProb,
  tempmaxC,
  tempmaxF,
  tempminC,
  tempminF,
  icon,
  hours = []
) {
  this.date = date;
  this.condition = condition;
  this.preciProb = roundDownValue(precipProb);
  this.tempmaxC = fahrenheitToCelcius(tempmaxC);
  this.tempmaxF = roundDownValue(tempmaxF);
  this.tempminC = fahrenheitToCelcius(tempminC);
  this.tempminF = roundDownValue(tempminF);
  this.icon = changeIconCamelCase(icon);
  this.hours = hours;
}
export function Hours(dateTime, precipProb, tempC, tempF, condition, icon) {
  this.dateTime = dateTime.split(':').slice(0, 2).join(':');
  this.preciProb = roundDownValue(precipProb);
  this.tempC = fahrenheitToCelcius(tempC);
  this.tempF = roundDownValue(tempF);
  this.condition = condition;
  this.icon = changeIconCamelCase(icon);
}
