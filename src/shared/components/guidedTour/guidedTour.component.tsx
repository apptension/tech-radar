import { useEffect, useState } from 'react';
import Joyride, { CallBackProps, STATUS, LIFECYCLE } from 'react-joyride';
import { useDispatch } from 'react-redux';
import { setArea, setLevel } from '../../../modules/filters/filters.actions';
import { closeTechnologyPopup } from '../../../modules/technologyPopup/technologyPopup.actions';
import { Button } from '../button';
import { ButtonSize } from '../button/button.types';
import { Tooltip } from './components/';
import { stepsList } from './guidedTour.list';

export const GuidedTour = () => {
  const [run, setRun] = useState(false);
  const dispatch = useDispatch();

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status, lifecycle } = data;

    if (status === STATUS.SKIPPED || status === STATUS.FINISHED) {
      setRun(false);
    }
    if (lifecycle === LIFECYCLE.INIT) {
      dispatch(setArea(null));
      dispatch(setLevel(null));
      dispatch(closeTechnologyPopup());
    }
  };

  const handleClickStart = () => {
    setRun(true);
  };

  useEffect(() => {
    const visitedBefore = localStorage.getItem('visitedBefore');
    if (!visitedBefore) {
      localStorage.setItem('visitedBefore', 'true');
      setRun(true);
    }
  }, []);

  return (
    <>
      <Button size={ButtonSize.REGULAR} onClick={handleClickStart}>
        How it works
      </Button>

      <Joyride
        steps={stepsList}
        run={run}
        continuous
        showSkipButton
        callback={handleJoyrideCallback}
        disableOverlayClose
        disableScrolling
        showProgress
        tooltipComponent={Tooltip}
        floaterProps={{ hideArrow: true }}
      />
    </>
  );
};
