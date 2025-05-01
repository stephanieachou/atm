import { memo } from "react";
import Button from "../../../components/Button";

type PinPadActionsProps = {
  handleEnter: () => void;
  handleClear: () => void;
  handleCancel: () => void;
  isEnterDisabled: boolean;
  isClearDisabled: boolean;
  isCancelDisabled: boolean;
};

function PinPadActions({
  handleEnter,
  handleClear,
  handleCancel,
  isEnterDisabled,
  isClearDisabled,
  isCancelDisabled,
}: PinPadActionsProps) {
  return (
    <div id="actions">
      <Button id="enter" onClick={handleEnter} disabled={isEnterDisabled}>
        Enter
      </Button>
      <Button id="clear" onClick={handleClear} disabled={isClearDisabled}>
        Clear
      </Button>
      <Button id="cancel" onClick={handleCancel} disabled={isCancelDisabled}>
        Cancel
      </Button>
    </div>
  );
}

export default memo(PinPadActions);
