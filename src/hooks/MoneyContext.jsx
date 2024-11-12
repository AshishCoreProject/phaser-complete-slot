import { useState, createContext, useContext, useEffect } from "react";
import { moneyStore } from "../money";

const MoneyContext = createContext();

function MoneyProvider({children}){
    const [money, setMoney] = useState(0);
    const [isAddMoney, setIsAddMoney] = useState(false);
    function handleIsAddMoney(){
        setIsAddMoney(!isAddMoney)
    }

    function AddMoney(addMoney){
        if(addMoney){
            setMoney(()=> money + Number(addMoney))
        }
        console.log(money);
    }

    useEffect(()=> {
        moneyStore.handleIsAddMoney(isAddMoney);
        moneyStore.handleAddMoneyInBank(money);
    }, [isAddMoney]);

    return (
        <MoneyContext.Provider
        value={{
            money:money,
            isAddMoney: isAddMoney,
            AddMoney: AddMoney,
            handleIsAddMoney: handleIsAddMoney
        }}>
            {children}
        </MoneyContext.Provider>
    )
}

function useMoney(){
    const context = useContext(MoneyContext);
    if (context === undefined)
    throw new Error("PostContext was used outside of the PostProvider");
    return context;

}

export {useMoney, MoneyProvider}