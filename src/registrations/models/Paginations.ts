import { ApiQueryOptions } from "@nestjs/swagger";

type ObjectOfOptions = { [key: string]: ApiQueryOptions };

export const FindAllRegistrationsPagination: ObjectOfOptions = {
  page: {
    name: "page",
    description: "Number of the current page. Default is 1",
    type: Number,
    required: false
  },
  limit: {
    name: "limit",
    description: "Limit of items per page. Default is 10",
    type: Number,
    required: false
  },
  inLabOnly: {
    name: "inLabOnly",
    description:
      "Choose to show only registers os people in the lab or all registers. Default is true.",
    type: Boolean,
    required: false
  }
};
