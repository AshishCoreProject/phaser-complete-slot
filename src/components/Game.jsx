import { useNavigate } from 'react-router-dom';
import { PhaserGame } from '../game/PhaserGame';
import { useState, useRef } from 'react';
import options from '../options';
import { useMoney } from '../hooks/MoneyContext.jsx';

function Game({setLoggedIn, loggedIn}) {
    const navigate = useNavigate()
    const phaserRef = useRef(null);
    const [canMoveSprite, setCanMoveSprite] = useState(true);
    const [inputMoney, setMoneyInput] = useState(0);
    const { money, AddMoney , handleIsAddMoney  , isAddMoney} = useMoney();

    // Event emitted from the PhaserGame component
    const currentScene = (scene) => {
        setCanMoveSprite(scene.scene.key !== 'MainMenu');
    };
    
    function handleClick(){
        if (loggedIn) {
            const text = "Are you sure you want to log out?"
            if(confirm(text) == true){
                localStorage.removeItem('user')
                setLoggedIn(false)
                navigate('/')
            }
            else{
                navigate('/game')
                console.log("cancelled logout");
                return
            }
        }
    }
    

    function handleMoney(){
        handleIsAddMoney(!isAddMoney)
        AddMoney(inputMoney);
        setMoneyInput(0);
    }

    function handleInput(e){
        setMoneyInput(e.target.value)
    }
    return (
        <>
            {/* <div className='flex flex-col justify-center'>
                <div className='gameHeader'>
                    <label>$</label>
                    <input min="0" step="1" value={inputMoney} onChange={handleInput} placeholder='Add Money' className='bg-[#fff] h-[22px] ml-2 my-2 w-32 pl-3 rounded-sm' type="number"/>
                    <button className='addButton' onClick={handleMoney}>+</button>
                </div> */}
                <PhaserGame ref={phaserRef} currentActiveScene={currentScene} />
                {/* <div className='logout-box'>
                    <button onClick={handleClick}>Log out</button>
                </div>
            </div> */}
        </>
    )
}

export default Game
