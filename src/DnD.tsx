import { useRef, useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  height: 6vh;
  width: 70vw;

  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(3, 1fr);
`;

const PlaceHolder = styled.div`
  border: 0.7rem dashed hsl(192, 100%, 50%);
  padding: 0.7rem;
  &.highlight {
    background-color: rgba(255, 255, 255, 0.7);
    border: 0.7rem dashed hsl(32, 100%, 50%);
  }
`;

const ItemContainer = styled.div`
  border: 0.3rem dotted hsl(128, 100%, 50%);
  padding: 0.1rem;
  width: 7rem;
  height: 7rem;
  line-height: 7rem;
`;

const Card = styled.div`
  font-size: 4rem;
  background-color: hsl(168, 80%, 80%);
  color: hsl(30, 90%, 50%);
  font-weight: bold;

  &.current {
    background-color: hsl(168, 60%, 90%);
    color: white;
  }
`;

const INIT_ITEMS = [
  "🍏",
  "🍎",
  "",
  "🍊",
  "",
  "🍌",
  "🍉",
  "",
  "🍓",
  "",
  "🍒",
  "",
];
export const DnD = () => {
  const refInput = useRef<any>();
  const [items, setItems] = useState(INIT_ITEMS);
  const [source, setSource] = useState<null | number>(null);
  const [target, setTarget] = useState<null | number>(null);

  const onDragStart = (id: number) => (e: any) => {
    console.log("drag Start", id, e);
    setSource(id);
  };

  const onDragOver = (id: number) => (e: any) => {
    e.preventDefault();
    setTarget(id);
  };

  const onDragLeave = (id: number) => (e: any) => {
    e.preventDefault();
    setTarget(null);
  };

  const onDragEnd=()=>{
    setSource(null)
    setTarget(null)
  }

  const onDrop = () => {
    console.log("onDrop");
    setSource(null);
    setTarget(null);
    if (target !== null && source !== null) {
      items[target] = items[source];
      items[source] = "";
      setItems([...items]);
    }
  };

  const onDropFile = (e: any) => {
    console.log(e);
    refInput.current.files = e.dataTransfer.files;
  };
  return (
    <>
      <div>
        <input type="file" ref={refInput} />
      </div>
      <Wrapper>
        {items.map((x: string, index: number) => (
          <PlaceHolder
            className={target === index ? "highlight" : ""}
            key={index}
            onDragOver={!x?onDragOver(index):undefined}
            onDragLeave={onDragLeave(index)}
            onDrop={onDropFile}
          >
            <ItemContainer
              draggable={!!x}
              onDragStart={onDragStart(index)}
              onDrop={onDrop}
              onDragEnd={onDragEnd}
            >
              <Card className={source === index ? "current" : ""}>{x}</Card>
            </ItemContainer>
          </PlaceHolder>
        ))}
      </Wrapper>
    </>
  );
};
