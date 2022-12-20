import type { AWS } from "@serverless/typescript";

import schema from "./submitPayment/schema";

export const functions: AWS["functions"] = {
  submitPayment: {
    handler: "src/functions/submitPayment/handler.main",
    description: "Lambda function to say hello",
    memorySize: 256,
    events: [
      {
        http: {
          method: "post",
          path: "submitPayment",
          cors: true,
          request: {
            schemas: {
              "application/json": schema,
            },
          },
        },
      },
    ],
  },
};
