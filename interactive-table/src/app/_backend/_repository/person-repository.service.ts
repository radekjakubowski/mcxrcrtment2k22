import { CookieService } from 'ngx-cookie-service';
import { Injectable } from '@angular/core';
import { Person } from '../../_models/person';
import { AbstractRepository } from '../_abstractions/abstract-repository';

@Injectable({
  providedIn: 'root'
})
export class PersonRepository implements AbstractRepository<Person> {
  private readonly cookieKey = 'radoslawjakubowskihadfunheremacrix2022recruitationassignment';
  private currentDataReference: Person[] = [];

  constructor(private cookieService: CookieService) {
  }

  public update(person: Person): void {
    const personToUpdate: Person | undefined = this.currentDataReference.find((p: Person) => p.id === person.id)

    if (personToUpdate) {
      const index: number = this.currentDataReference.indexOf(personToUpdate);
      this.currentDataReference[index] = person;
      this.cookieService.set(this.cookieKey, JSON.stringify(this.currentDataReference));
    }
  }

  public delete(id: string): void {
    this.currentDataReference = JSON.parse(this.cookieService.get(this.cookieKey));

    const personToDelete: Person | undefined = this.currentDataReference.find((p: Person) => p.id === id );

    if (personToDelete) {
      const index: number = this.currentDataReference.indexOf(personToDelete);

      this.currentDataReference.splice(index, 1);

      if (!this.currentDataReference.length) {
        this.cookieService.delete(this.cookieKey);
      } else {
        this.cookieService.set(this.cookieKey, JSON.stringify(this.currentDataReference));
      }
    }
  }

  public getAll(): Person[] {
    this.currentDataReference = [];

    try {
      this.currentDataReference = JSON.parse(this.cookieService.get(this.cookieKey));
    } catch (e) {
    }

    return [...this.currentDataReference];
  }

  public add(person: Person): void {
    this.currentDataReference = [...this.currentDataReference, person];
    this.cookieService.set(this.cookieKey, JSON.stringify(this.currentDataReference));
  }
}
