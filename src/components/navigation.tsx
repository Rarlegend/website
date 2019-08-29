import { Link, useStaticQuery, graphql } from "gatsby";
import React, { useState } from "react";
import styled from "styled-components";
import tw from "tailwind.macro";

import Image from "./image";
import colors from "../colors";

const NavContainer = styled.section`
  ${tw`bg-white`}
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  z-index: 98;

  & nav {
    ${tw`flex justify-between mx-auto max-w-5xl lg:mt-8 py-4`}
  }
`;

const MobileNavMenu = styled.ul`
  ${tw`fixed top-0 left-0 m-0 p-0 w-full h-full list-none`}
  z-index: 99;
  background-color: #9d3789;
  & li {
    ${tw`pt-8 px-8 text-2xl`}
    & a {
      ${tw`text-white no-underline`}
    }
  }
  & li.close {
    ${tw`text-right text-sm relative`}
    top: -8px;
    left: 7px;
  }
`;

const NavigationItems = styled.ul`
  ${tw`m-0 p-0`}
  & li {
    ${tw`list-none hidden md:inline-block mr-4 lg:mr-8 align-top`}
    height: 30px;
    & a {
      ${tw`no-underline text-xs`}
      color: ${colors.berry};
      line-height: 30px;
    }
  }
  & li.logo {
    ${tw`inline-block pl-4 md:pl-4 lg:pl-0`}
    width: 110px;
    height: 30px;
  }
`;

const NavItemSeparator = styled.div`
  ${tw`border-solid border-0 border-r-2 align-middle`}
  height: 20px;
  border-color: #e9e9e9;
  margin-top: 5px;
`;

const AccountButtons = styled.ul`
  ${tw`m-0 p-0 mr-4 lg:mr-0`}
  & li {
    ${tw`list-none inline-block ml-3 align-top hidden md:inline-block`}
    height: 30px;
  }
  & li.sign-up {
    ${tw`inline-block`}
  }
  & li.hamburger {
    ${tw`inline-block md:hidden cursor-pointer`}
    width: 30px;
    height: 30px;
  }
`;

const ActionButtonLink = styled.a<{
  primary?: boolean;
}>`
  ${tw`no-underline text-xs border border-solid py-2 px-6 rounded-full`}
  color: ${props => (props.primary ? "white" : colors.berry)};
  background-color: ${props => (props.primary ? colors.berry : "white")};
  line-height: 30px;
`;

const NavigationComponent: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  const { hamburger, logo } = useStaticQuery(graphql`
    query {
      hamburger: file(relativePath: { eq: "hamburger@2x.png" }) {
        childImageSharp {
          fluid(maxWidth: 110) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      logo: file(relativePath: { eq: "Courier Logo@2x.png" }) {
        childImageSharp {
          fluid(maxWidth: 110) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `);

  const toggleMenu = (ev: React.SyntheticEvent) => {
    ev.preventDefault();
    setShowModal(!showModal);
  };

  const hideMenu = () => {
    setShowModal(false);
  };

  return (
    <>
      <NavContainer>
        <nav>
          <NavigationItems>
            <li className="logo">
              <Link to="/">
                <Image image={logo} />
              </Link>
            </li>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/#pricing">Pricing</Link>
            </li>
            <li>
              <Link to="/#company">Company</Link>
            </li>
            <li>
              <NavItemSeparator />
            </li>
            <li>
              <a href="https://docs.trycourier.com/" target="_blank">
                Documentation
              </a>
            </li>
          </NavigationItems>
          <AccountButtons>
            <li>
              <ActionButtonLink
                href="https://www.trycourier.app/login"
                target="_blank"
              >
                Login
              </ActionButtonLink>
            </li>
            <li className="sign-up">
              <ActionButtonLink
                href="https://www.trycourier.app/register"
                target="_blank"
                primary={true}
              >
                Sign Up
              </ActionButtonLink>
            </li>
            <li className="hamburger">
              <a href="/" onClick={toggleMenu}>
                <Image image={hamburger} />
              </a>
            </li>
          </AccountButtons>
        </nav>
      </NavContainer>
      {showModal ? (
        <MobileNavMenu onClick={hideMenu}>
          <li className="close">
            <a href="/" onClick={toggleMenu}>
              close X
            </a>
          </li>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/#pricing">Pricing</Link>
          </li>
          <li>
            <Link to="/#company">Company</Link>
          </li>
          <li>
            <a href="https://docs.trycourier.com/" target="_blank">
              Documentation
            </a>
          </li>
          <li>
            <a href="https://www.trycourier.app/login" target="_blank">
              Login
            </a>
          </li>
          <li>
            <a href="https://www.trycourier.app/register" target="_blank">
              Sign Up
            </a>
          </li>
        </MobileNavMenu>
      ) : null}
    </>
  );
};

export default NavigationComponent;