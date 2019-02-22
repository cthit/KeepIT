import styled from "styled-components";

export const Space = styled.div`
    margin: 5px;
`;

export const BigSpace = styled.div`
    margin: 10px;
`;

export const FillContainer = styled.div`
    margin-right: 10px;
    flex: 1;
`;

export const VR = styled.div`
    background-color: #c0c0c0;
    min-height: 100vh;
    height: 100%;
    width: 1px;
`;

export const ListPuhScreenContainer = styled.div`
    margin: 10px;
    margin-right: 0px;
`;

export const WindowContainer = styled.div`
    justify-self: stretch;
`;

export const KeepITGrid = styled.div`
    display: flex;
    flex-direction: row-reverse;
    flex-wrap: wrap;
    justify-content: space-evenly;
`;

export const KeepITGridItem = styled.div`
    flex-grow: 1;
    min-width: 900px;
    margin: 10px;
`;
