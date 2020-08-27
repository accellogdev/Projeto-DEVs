export default function(req, res, next) {
  const body = Object.keys(req.body).reduce(
    (acc, field) => ({
      ...acc,
      [field]: req.body[field].trim ? req.body[field].trim() : req.body[field],
    }),
    {},
  );

  req.body = body;
  return next();
}
