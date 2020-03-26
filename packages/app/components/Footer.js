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
  hover:bg-white
  hover:text-wikiwars-blue
`;

export default () => (
  <Wrapper>
    <footer>
      <Row>
        <Col tw="text-left">
          <a
            tw="hover:bg-white hover:text-wikiwars-blue"
            href="https://wikiwars.gg"
            target="_blank"
          >
            Wikiwars © YES WE CAPS
          </a>
        </Col>
        <Col></Col>
        <Col tw="text-right">
          <Link href="https://twitter.com/wikiwarsgg" target="_blank">
            <FontAwesomeIcon icon={faTwitter} />
          </Link>
          <Link href="https://facebook.com/wikiwarsgg" target="_blank">
            <FontAwesomeIcon icon={faFacebook} />
          </Link>
          <Link href="https://instagram.com/wikiwarsgg" target="_blank">
            <FontAwesomeIcon icon={faInstagram} />
          </Link>
          <Link href="https://github.com/wikiwarsgg/website" target="_blank">
            <FontAwesomeIcon icon={faGithub} />
          </Link>
          <Link href="mailto:hello@wikiwars.gg" target="_blank">
            <FontAwesomeIcon icon={faEnvelope} />
          </Link>
        </Col>
      </Row>
    </footer>
  </Wrapper>
);
