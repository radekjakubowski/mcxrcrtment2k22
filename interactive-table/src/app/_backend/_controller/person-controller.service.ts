import { Person } from './../../_models/person';
import { PersonRepository } from './../_repository/person-repository.service';
import { Injectable } from '@angular/core';
import { AbstractController } from '../_abstractions/abstract-controller';

@Injectable({
  providedIn: 'root'
})
export class PersonController implements AbstractController<Person> {
  constructor(private personRepository: PersonRepository) { }

  public getAll(): Person[] {
    return this.personRepository.getAll();
  }

  public update(person: Person) {
    this.personRepository.update(person);
  }

  public delete(id: any) {
    this.personRepository.delete(id);
  }

  public addNew(person: Person) {
    this.personRepository.add(person);
  }
}
