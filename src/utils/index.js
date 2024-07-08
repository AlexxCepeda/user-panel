export function getPropertyAssociate(item, field) {
  return field.split(".").reduce((acc, part) => acc && acc[part], item);
}

export function getFullName(firstName = "", lastName = "") {
  return `${firstName} ${lastName}`;
}
export function parseLocation(city = "", country = "") {
  return `${city}, ${country}`;
}
