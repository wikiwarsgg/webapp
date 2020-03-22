import React from "react";
import tw from "twin.macro";

const Wrapper = tw.div`
  h-32
  p-4
`;

const Logo = tw.img`
  h-full
  mx-auto
`;

export default () => (
  <Wrapper>
    <Logo src="/logo.png" />
  </Wrapper>
);
