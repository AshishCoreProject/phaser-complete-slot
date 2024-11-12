// moneyStore.js
export const moneyStore = {
    money:0,
    isAddMoney: false,
    handleIsAddMoney(value) {
      this.isAddMoney = value;
    },
    handleAddMoneyInBank(value){
        this.money = value;
    }
  };