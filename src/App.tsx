import { useState } from 'react';
import logo from './logo.svg';
import styles from './App.module.css';
import poweredImage from './assets/powered.png'
import { levels, calculateImc, Level } from './helprs/imc';
import leftArrowImage from './assets/leftarrow.png';
import { GridItem } from './components/GridItem';

const App = () => {
  const [heightField, setHeightField] = useState<number>(0);
  const [weightField, setWeightField] = useState<number>(0);
  const [toShow, setToShow] = useState<Level | null>(null)

  const handleCalculateButton = () => {
    if (heightField && weightField) {
      setToShow(calculateImc(heightField, weightField));
    } else {
      alert("Digite todos os campos.")
    }
  }

  const handleBackButton = () => {
    setToShow(null);
    setHeightField(0);
    setWeightField(0);
  }

  return (
    <div className={styles.main}>
      <header>
        <div className={styles.headerContainer}>
          <img src={poweredImage} alt='' width={150} />
        </div>
      </header>
      <div className={styles.container}>
        <div className={styles.leftSide}>
          <h1>Calcule seu IMC.</h1>
          <p>IMC é a sigla para indice de massa corporea</p>
          <input type="number" placeholder="Digite sua altura" value={heightField > 0 ? heightField : ''} onChange={e => setHeightField(parseFloat(e.target.value))} disabled={toShow ? true : false}></input>
          <input type="number" placeholder="Digite seu peso" value={weightField > 0 ? weightField : ''} onChange={e => setWeightField(parseFloat(e.target.value))} disabled={toShow ? true : false}></input>
          <button onClick={handleCalculateButton} disabled={toShow ? true : false}>Calcular</button>
        </div>
        <div className={styles.rightSide}>
          {!toShow &&
            <div className={styles.grid}>
              {levels.map((item, key) => (
                <GridItem key={key} item={item} />
              ))}
            </div>
          }
          {toShow &&
            <div className={styles.rightBig}>
              <div className={styles.rightArrow} onClick={handleBackButton}>
                <img src={leftArrowImage} alt='' width={25}/>
              </div>
              <GridItem item={toShow}/>
            </div>
          }
        </div>
      </div>
    </div>
  );
}

export default App;
