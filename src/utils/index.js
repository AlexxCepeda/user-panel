export function getPropertyAssociate(item, field) {
  return field.split(".").reduce((acc, part) => acc && acc[part], item);
}
