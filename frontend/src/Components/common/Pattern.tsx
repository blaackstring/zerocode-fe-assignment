
import styled from 'styled-components';

const   Pattern = () => {
  return (
    <StyledWrapper>
      <div className="container" />
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
   position: fixed;
   top:0;
   left:0;
   z-index: -1;
   width: 100vw;
   height: 100vh;

  .container {
    width: 100%;
    height: 100%;
    background-color: ;
    background-image: linear-gradient(
      32deg,
      rgba(8, 8, 8, 0.4) 10px,
      transparent
    );
    background-size: 90px 90px;
    background-position: -5px -5px;
  }`;

export default Pattern;
