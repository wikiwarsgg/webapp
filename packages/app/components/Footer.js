import React from "react";
import tw from "twin.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faGithub,
  faInstagram,
  faTwitter
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

const Wrapper = tw.div`
    h-16
    p-4
`;

const Row = tw.div`
  flex
  md:flex-row
  justify-around
`;

const Col = tw.div`
  w-1
  md:w-1/3
`;

const Link = tw.a`
  p-2
`;

export default () => (
  <Wrapper>
    <footer>
      <Row>
        <Col tw="text-left">Wikiwars © YES WE CAPS</Col>
        <Col></Col>
        <Col tw="text-right">
          <Link href="https://facebook.com/">
            <FontAwesomeIcon icon={faFacebook} />
          </Link>
          <Link href="https://twitter.com/wikiwarsgg">
            <FontAwesomeIcon icon={faTwitter} />
          </Link>
          <Link href="https://facebook.com/wikiwarsgg">
            <FontAwesomeIcon icon={faFacebook} />
          </Link>
          <Link href="https://instagram.com/wikiwarsgg">
            <FontAwesomeIcon icon={faInstagram} />
          </Link>
          <Link href="https://github.com/wikiwarsgg/website">
            <FontAwesomeIcon icon={faGithub} />
          </Link>
          <Link href="mailto:hello@wikiwars.gg">
            <FontAwesomeIcon icon={faEnvelope} />
          </Link>
        </Col>
      </Row>
    </footer>
  </Wrapper>
);
