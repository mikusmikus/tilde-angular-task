import { Component, Input} from '@angular/core';
import {Loan, Person} from '../../models/loans.module'


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  sum = '';
  personId = '';
  sumPopup = '';
  namePopup = ''
  @Input() person!: Person;
  @Input() persons!: Person[]

  // handle name input state, clear popup
  handleInputName(event: string){
    this.personId = event;
    this.namePopup = ''
  }
  
  // handle sum input state, clear popup
  handleInputSum(event: string){
    this.sum = event;
    this.sumPopup = ''
  }

  // handle input errors (no id, wrong money/balance)
  hasInputError(money: number, balance: number) {
    if (!this.personId) {
      this.namePopup ='select Name';
      return true;
    }

    if (Number(this.sum) < 0 || isNaN(Number(this.sum))) { 
      this.sumPopup ='only Positive numbers';
      return true;
    }

    if (!money) {
      this.sumPopup ='enter Money';
      this.namePopup = ''
      return true;
    }

    if (balance < money) {
      this.sumPopup ='Not enough money';
      this.namePopup = ''
      return true;
    }
    
    return false
  }

  // clear popups, input values
  clearState() {
    this.namePopup = ''
    this.sumPopup = ''
    this.sum = ''
    this.personId= ''
  }

  // handle money send to other person, change balance for both people, add loans
  handleMoneySend(){
    const moneyNumber = Number(this.sum);
    const lenderBalance = this.person.balance;

    if (this.hasInputError(moneyNumber, lenderBalance)) {
      return;
    }

    const lenderIndex = this.persons.findIndex((p) => p.id === this.person.id);
    const receiverIndex = this.persons.findIndex((p) => p.id === this.personId);

    const newLoan: Loan = {
      id: String(Math.floor(Math.random() * 10000000)),
      receiver: this.persons[receiverIndex].name,
      lender: this.person.name,
      lenderId: this.person.id,
      receiverId: this.personId,
      sum: Number(this.sum),
    };

    this.persons[lenderIndex].balance -= moneyNumber;
    this.persons[lenderIndex].loans.push(newLoan);

    this.persons[receiverIndex].balance += moneyNumber;
    this.persons[receiverIndex].loans.push(newLoan);

    this.clearState()
  }

  // handle money recieve to other person, change balance for both people, add loans
  handleMoneyReceive(){

    const moneyNumber = Number(this.sum);
    const lenderIndex = this.persons.findIndex((p) => p.id === this.personId);
    const lenderBalance = this.persons[lenderIndex].balance;

    if (this.hasInputError(moneyNumber, lenderBalance)) {
      return;
    }

    const receiverIndex = this.persons.findIndex((p) => p.id === this.person.id);

    const newLoan: Loan = {
      id: String(Math.floor(Math.random() * 10000000)),
      lender: this.persons[lenderIndex].name,
      receiver: this.person.name,
      lenderId: this.personId,
      receiverId: this.person.id,
      sum: Number(this.sum),
    };
    
    this.persons[lenderIndex].balance -= moneyNumber;
    this.persons[lenderIndex].loans.push(newLoan);

    this.persons[receiverIndex].balance += moneyNumber;
    this.persons[receiverIndex].loans.push(newLoan);

    this.clearState()

  }

  // handle loans paybacks. change persons balances, delete loan from persons loans array.
  handleLoanPayback(loan : Loan){
  
    const lenderIndex = this.persons.findIndex((p) => p.id === this.person.id);
    const receiverIndex = this.persons.findIndex((p) => p.id === loan.lenderId);
    
    const lenderLoanIndex = this.persons[lenderIndex].loans.findIndex((l) => l.id === loan.id);
    const receiverLoanIndex = this.persons[receiverIndex].loans.findIndex((l) => l.id === loan.id);

    this.persons[lenderIndex].balance -= loan.sum;
    this.persons[receiverIndex].balance += loan.sum;

    this.persons[lenderIndex].loans.splice(lenderLoanIndex, 1);
    this.persons[receiverIndex].loans.splice(receiverLoanIndex, 1);
    
  }

}
