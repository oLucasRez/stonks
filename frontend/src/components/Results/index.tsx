import React, { FC, HTMLProps } from 'react';
//-------------------------------------------------------------< classes >
import FormSingleton from '../../classes/FormSingleton';
//----------------------------------------------------------< components >
import ProgressCircle from './ProgressCircle';
//--------------------------------------------------------------< assets >
import confused_stonks from '../../assets/confused-stonks.jpg';
import not_stonks from '../../assets/not-stonks.jpg';
import stinks from '../../assets/stinks.png';
import stonks from '../../assets/stonks.jpg';
import ultra_mega_stonks from '../../assets/ultra-mega-stonks.png';
import super_iper_mega_master_supremo_stonks from '../../assets/super-iper-mega-master-supremo-stonks.jpg';
//--------------------------------------------------------------< styles >
import { mix } from 'polished';
import { Container } from './styles';
//===========================================================[ COMPONENT ]
const Results: FC<HTMLProps<HTMLDivElement>> = ({ className }) => {
  //--------------------------------------------------------< properties >
  const { result } = FormSingleton.getInstance();
  if (!result) return <>loading</>;

  const getProportion = (value: number, avg: number, max: number) =>
    value < avg ? value / 2 / avg : (value + max) / 2 / max;

  const ratingScore = getProportion(result.predict.rating, 69.08, 100);
  const followsScore = getProportion(result.predict.follows, 17.59, 1697);
  const progress = (ratingScore + followsScore) / 2;
  const accuracy =
    1 -
    (result.predict.accuracy.follows /
      (result.predict.accuracy.follows + result.predict.follows) +
      result.predict.accuracy.rating / 100) /
      2;
  const stonkness =
    accuracy < 0.25
      ? {
          src: confused_stonks,
          feedback: (
            <>
              Confused
              <br />
              Stonks 🥴
            </>
          ),
        }
      : progress < 0.33
      ? { src: not_stonks, feedback: <>Not Stonks 😭</> }
      : progress < 0.67
      ? { src: stinks, feedback: <>Stinks 🙁</> }
      : progress < 0.85
      ? { src: stonks, feedback: <>Stonks! 😁</> }
      : progress < 0.95
      ? {
          src: ultra_mega_stonks,
          feedback: (
            <>
              Ultra Mega
              <br />
              Stonks!! 🤩
            </>
          ),
        }
      : {
          src: super_iper_mega_master_supremo_stonks,
          feedback: (
            <>
              SUPER IPER MEGA
              <br />
              MASTER SUPREMO
              <br />
              STONKS!!! 🤑
            </>
          ),
        };
  //-----------------------------------------------------------< methods >
  const color = (score: number) =>
    score < 1 / 4
      ? mix(score * 4, '#d66e2d', '#d62d2d')
      : score < 2 / 4
      ? mix((score - 1 / 4) * 4, '#ded228', '#d66e2d')
      : score < 3 / 4
      ? mix((score - 2 / 4) * 4, '#25b858', '#ded228')
      : mix((score - 3 / 4) * 4, '#26a69f', '#25b858');
  //------------------------------------------------------------< return >
  return (
    <Container className={className} color={color(progress)}>
      <div className='score-container'>
        <ProgressCircle progress={progress} color={color(progress)} />
        <h1>
          {stonkness.feedback}
          <br />
          <i>{(accuracy * 100).toFixed(2) + '%'} accuracy</i>
        </h1>
      </div>
      <div className='details-container'>
        <label className='top'>Rating</label>
        <div className='total bar top'>
          <div
            className='score bar'
            style={{
              width: ratingScore * 100 + '%',
              background: color(ratingScore),
            }}
          >
            <p>{(result.predict.rating / 10).toFixed(1)}</p>
          </div>
        </div>
        <label className='bot'>Follows</label>
        <div className='total bar bot'>
          <div
            className='score bar'
            style={{
              width: followsScore * 100 + '%',
              background: color(followsScore),
            }}
          >
            <p>{result.predict.follows.toFixed(0)}</p>
          </div>
        </div>
      </div>
      <div
        className='image-container'
        style={{ backgroundImage: 'url(' + stonkness.src + ')' }}
      />
    </Container>
  );
};

export default Results;
