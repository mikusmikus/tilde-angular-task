export interface Loan {
	id: string;
	receiver: string;
	lender: string;
	receiverId: string;
	lenderId: string;
	sum: number;
  }
  
  export interface Person {
	id: string;
	name: string;
	loans: Loan[];
	balance: number;
  }