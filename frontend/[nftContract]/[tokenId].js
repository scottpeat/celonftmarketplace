import styled from 'styled-components';

// CSS

const Container = styled.div`
  display: flex;
  width: 80%;
  margin: auto;
  margin-top: 2rem;
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  & img {
    width: 512px;
    border-radius: 2rem;
  }

  & span {
    margin: 0.25rem;
    padding: 1rem;
    width: 100%;
    text-align: center;
    background-color: lightblue;
    border-radius: 1rem;
  }

  & span:first-of-type {
    margin-top: 1rem;
  }
`;

const Options = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const UpdateListing = styled.div`
  display: flex;
  justify-content: space-between;

  & input {
    margin-right: 1rem;
    padding: 0.5rem;
    border-radius: 0.5rem;
    border: 1px solid #cccccc;
  }
`;

const Button = styled.button`
  margin-top: 1rem;
  padding: 0.5rem;
`;
