import { validationResult } from "express-validator";

const expressValidator = (schema) => {
  return [
    schema,
    (req, res, next) => {
      const result = validationResult(req);
      if (!result.isEmpty()) {
        const resultArr = result.array();
        const validationError = resultArr.reduce((prev, curr) => {
          if (!prev[curr.path]) prev[curr.path] = [];
          prev[curr.path].push(curr.msg);
          return prev;
        }, {});

        return next({
          status: 400,
          name: "ValidationError",
          message: "Some of the inputs sent from the body are invalid.",
          errorDetails: {
            validationError,
          },
        });
      }

      next();
    },
  ];
};

export default expressValidator;
