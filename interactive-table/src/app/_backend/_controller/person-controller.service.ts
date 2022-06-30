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

  public update(person: Person): void {
    this.recalculateAge(person);
    this.personRepository.update(person);
  }

  public delete(id: string): void {
    this.personRepository.delete(id);
  }

  public addNew(person: Person): void {
    this.personRepository.add(person);
  }

  private recalculateAge(person: Person): void {
    let timeDiff = Math.abs(Date.now() - new Date(person.dateOfBirth).getTime());
    let age = Math.floor((timeDiff / (1000 * 3600 * 24))/365.25);

    if (age) {
      person.age = age;
    }
  }
}
