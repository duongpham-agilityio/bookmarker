import { memo } from 'react';

// Components
import { Button } from 'components/commons';

// Assets
import UploadIcon from 'assets/icons/upload.svg';

const ChooseImage = ({
  name,
  chooseHandler,
}: {
  name: string;
  chooseHandler: () => void;
}) =>
  !name ? (
    <Button
      label="Upload"
      width="w-lg"
      border="b-lg"
      variant="primary"
      leftIcon={UploadIcon}
      onClick={chooseHandler}
      data-testid="upload-btn"
    />
  ) : (
    <p onClick={chooseHandler}>{name}</p>
  );

export default memo(ChooseImage);
