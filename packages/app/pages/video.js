import React from "react";
import { useRouter } from "next/router";

import createConnection from "../helpers/connection";

const Video = () => {
  const { query } = useRouter();
  const connection = createConnection(query.s);
  return <div />;
};
export default Video;
