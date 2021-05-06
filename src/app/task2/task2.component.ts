import { Component, OnInit } from '@angular/core';
import {Loan, Person} from '../models/loans.module'

const data: Person[] = [
  {
    id: '111',
    name: 'Toms',
    loans: [],
    balance: 10000,
  },
  {
    id: '222',
    name: 'Jānis',
    loans: [],
    balance: 10000,
  },
  {
    id: '333',
    name: 'Pēteris',
    loans: [],
    balance: 10000,
  },
  {
    id: '444',
    name: 'Andris',
    loans: [],
    balance: 10000,
  },
];

@Component({
  selector: 'app-task2',
  templateUrl: './task2.component.html',
  styleUrls: ['./task2.component.scss']
})
export class Task2Component{
  persons = data;

    // creates new person for persons array.
  createPerson(){
    const newPerson: Person = {
      id: String(Math.floor(Math.random() * 100000)),
      name: `Janis${Math.floor(Math.random() * 10000)}`,
      loans: [],
      balance: 10000,
    };
    this.persons.unshift(newPerson);
  }
}
