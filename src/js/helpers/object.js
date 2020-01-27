// https://stackoverflow.com/a/32108184/3263250
export function isEmptyObject(object) {
  return !object && object.constructor === Object && Object.keys(object).length > 0;
}

export function getObjectLength(object) {
  return !!object ? Object.values(object).length : 0;
}

export function sumObjectValues(object) {
  return !!object ? Object.values(object).reduce((previous, current) => previous + current, 0) : undefined;
}
