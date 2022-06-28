import { Person } from './../../_models/person';
import { PersonRepository } from './../_repository/person-repository.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PersonController {
  constructor(private personRepository: PersonRepository) { }

  getAllPeople(): Person[] {
    return this.personRepository.getAll();
  }

  updatePerson(person: Person) {
    this.personRepository.update(person);
  }

  deletePerson(id: any) {
    this.personRepository.delete(id);
  }

  addPerson(person: Person) {
    this.personRepository.add(person);
  }
}
