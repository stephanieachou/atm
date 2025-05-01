import { memo, useMemo } from "react";
import Button from "../../../components/Button";

type NumberPadProps = {
  onClick: (value: string) => void;
};

function NumberPad({ onClick }: NumberPadProps) {
  const numberPad = useMemo(() => [1, 2, 3, 4, 5, 6, 7, 8, 9, "-", 0, "+"], []);
  return (
    <div id="number-pad">
      {numberPad.map((val) => (
        <Button
          id={`${val}`}
          key={`${val}`}
          onClick={() => onClick(`${val}`)}
          disabled={val === "+" || val == "-"}
        >
          {val}
        </Button>
      ))}
    </div>
  );
}

export default memo(NumberPad);
