import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import MUIButton from "material-ui/Button";
import { withTheme } from "material-ui/styles";

function ButtonWithTheme(props) {
  const { theme, ...rest } = props;

  const Button = styled(MUIButton)`
    && {
      ${props =>
        props.color === "primary" &&
        props.raised &&
        `background-color: ${theme.palette.secondary[500]};`};
      ${props =>
        props.color === "secondary" &&
        props.raised &&
        `background-color: ${theme.palette.accent[500]};
        color: ${theme.palette.primary[500]}; `};
      ${props =>
        props.color === "secondary" &&
        !props.raised &&
        `color: ${theme.palette.accent[500]}; `};
    }
    &&:hover {
      ${props =>
        props.color === "primary" &&
        props.raised &&
        `background-color: ${theme.palette.secondary[700]};`};
      ${props =>
        props.color === "secondary" &&
        props.raised &&
        `background-color: ${theme.palette.accent[700]};`};
    }
  `;

  return <Button {...rest} />;
}

ButtonWithTheme.propTypes = {
  theme: PropTypes.object.isRequired,
  color: PropTypes.string,
  raised: PropTypes.any
};

export default withTheme()(ButtonWithTheme);