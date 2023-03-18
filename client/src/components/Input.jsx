import styled from "styled-components";
import React, { Component }  from 'react';

export default function Input({ type, placeholder, value, onChange }) {
  return <StyledInput type={type} placeholder={placeholder} value={value} onChange={onChange} />;
}

const StyledInput = styled.input`
  height: 3rem;
  font-size: 1rem;
  &:focus {
    display: inline-block;
  }
  &::placeholder {
    color: #b9abe099;
    font-weight: 100;
    font-size: 1rem;
  }
`;